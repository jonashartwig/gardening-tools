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
    if (attempt.wantedPieces.length == 0) {
        return attempt;
    }

    const canCutFromLeftover = attempt.canCutFromLeftover(),
        cutFromLeftovers = canCutFromLeftover ? attempt.cutFromLeftover(margin).flatMap(attempt=> cutAsTree(attempt, availablePieces, margin)) : [],
        cutFromAvailablePieces = availablePieces.flatMap(availablePiece => cutAsTree(attempt.cutFromAvailablePiece(margin, availablePiece), availablePieces, margin)),
        result = [
            ...cutFromLeftovers,
            ...cutFromAvailablePieces
        ].sort((a: Attempt, b: Attempt) => a.leftovers - b.leftovers)[0];

    return result;
}

export default function(wantedPieces: Array<number>, availablePieces: Array<number>, margin: number = 3): Attempt {
    if(availablePieces.find(piece => wantedPieces.find(wPiece => wPiece > piece))) {
        throw "not possible";
    }

    const attempt = new Attempt(wantedPieces.sort((a, b) => b - a)),
        result = cutAsTree(
            attempt,
            uniq(availablePieces)
                .sort((a, b) => a - b),
            margin
        );

    console.log(result)
    
    return result;
}