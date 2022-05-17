import Attempt from "./attempt";

function cutAttempt(attempt: Attempt, wantedPiece: number, availablePieces: Array<number>, margin: number): Array<Attempt> {
    const availablePiecesWithRightLength = availablePieces.filter(piece => piece <= wantedPiece),
        attemptsWithNewPiece = availablePiecesWithRightLength.flatMap(availablePiece => attempt.cutFromAvailablePiece(wantedPiece, margin, availablePiece));
    
    if(attempt.canCut(wantedPiece)) {
        return [
            ...attempt.cut(wantedPiece, margin),
            ...attemptsWithNewPiece
        ];
    } else {
        return attemptsWithNewPiece
    }
}

function cut(attempt: Attempt, wantedPieces: Array<number>, availablePieces: Array<number>, margin: number): Array<Attempt> {
    if(wantedPieces.length == 0) {
        return [ attempt ];
    }

    return wantedPieces.flatMap(piece => cutAttempt(attempt, piece, availablePieces, margin).flatMap(attempt => {
        return cut(attempt, wantedPieces.slice(1), availablePieces, margin);
    }));
}

export default function(wantedPieces: Array<number>, availablePieces: Array<number>, margin: number = 3): Attempt {
    if(availablePieces.find(piece => wantedPieces.find(wPiece => wPiece > piece))) {
        throw "not possible";
    }
    
    const attempts = cut(new Attempt(), wantedPieces.sort((a, b) => a - b), availablePieces.sort((a, b) => a - b), margin);

    return attempts.sort((a: Attempt, b: Attempt) => a.leftovers - b.leftovers)[0];
}