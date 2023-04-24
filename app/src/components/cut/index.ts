import { uniq } from "lodash";

import Attempt from "./attempt";

function cutAsCombination(attempt: Attempt, availablePieces: Array<number>, margin: number): Attempt {
    const cutAsCombination = function (attempts: Array<Attempt>, availablePieces: Array<number>, margin: number): Array<Attempt> {
            if (attempts.findIndex(attempt => attempt.wantedPieces.length > 0) == -1) {
                return attempts;
            }
        
            const cutFromLeftovers = attempts.filter(attempt => attempt.canCutFromLeftover()).flatMap(attempt => attempt.cutFromLeftover(margin)),
                cutFromAvailablePieces = availablePieces.flatMap(availablePiece => attempts.map(attempt => attempt.cutFromAvailablePiece(margin, availablePiece)));
        
            return cutAsCombination(
                [
                    ...cutFromLeftovers,
                    ...cutFromAvailablePieces
                ],
                availablePieces,
                margin
            );
        },
        result = cutAsCombination(
            [attempt],
            uniq(availablePieces)
                .sort((a, b) => a - b),
            margin
        ).sort((a: Attempt, b: Attempt) => a.leftovers - b.leftovers)[0];

    return result;
}

function cutAsTree(attempt: Attempt, availablePieces: Array<number>, margin: number): Attempt {
    // the worst attempt that can happen is one used piece per wanted piece
    // so we generate an attempt that has infinite leftovers, is not done and uses one piece per wanted
    // later on we use this variable to cut exploration of further options we know are worse
    let bestAttemp = Attempt.worstCaseOf(attempt.wantedPieces);

    // we walk the tree of all possible combinations
    // each solution is a leaf
    function walk(attempt: Attempt, availablePieces: Array<number>, margin: number): Attempt {
        // we found a solution
        if (attempt.isDone()) {
            // lets save the better option to cut off trees with attempts that are worse
            bestAttemp = Attempt.bestSuccessfullAttemptOf(bestAttemp, attempt);
            
            return attempt;
        }

        // if the current attempt uses more pieces than the best attemp, we can abort
        // because we know that if we have a solution, or the worse case, than anything that uses more pieces
        // cannot be better
        if (attempt.usedPieces.length > bestAttemp.usedPieces.length) {
            return bestAttemp;
        }

        // look for options
        const canCutFromLeftover = attempt.canCutFromLeftover(),
            // if we can cut any wanted piece out of a leftover piece, lets explore that path
            // we generate all options whate the next wanted piece fits on any leftover piece
            cutFromLeftovers = canCutFromLeftover ? attempt.cutFromLeftover(margin).flatMap(attempt => walk(attempt, availablePieces, margin)) : [],
            // we explore further solutions looking taking new pieces of all available
            cutFromAvailablePieces = availablePieces.flatMap(availablePiece => walk(attempt.cutFromAvailablePiece(margin, availablePiece), availablePieces, margin)),
            // generate all solutions for that partial tree, but only return the best one
            [result] = [
                ...cutFromLeftovers,
                ...cutFromAvailablePieces
            ]
                .filter(attempt => attempt.isDone())
                .sort(Attempt.compare);

        return result;
    }

    // walk the tree of all solutions
    return walk(attempt, availablePieces, margin);
}

export default function(wantedPieces: Array<number>, availablePieces: Array<number>, margin: number = 3): Attempt {
    if(availablePieces.find(piece => wantedPieces.find(wPiece => wPiece > piece))) {
        throw "not possible";
    }

    const attempt = new Attempt(wantedPieces.sort().reverse()),
        result = cutAsTree(
            attempt,
            uniq(availablePieces)
                .sort()
                .reverse(),
            margin
        );

    console.log(result)
    
    return result;
}