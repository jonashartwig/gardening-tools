import Attempt from "./attempt";
function cut(attempts: Array<Attempt>, availablePieces: Array<number>, margin: number): Array<Attempt> {
    if (attempts.findIndex(attempt => attempt.wantedPieces.length > 0) == -1) {
        return attempts;
    }

    return cut(
        availablePieces.flatMap(availablePiece => [
            ...attempts.map(attempt => attempt.cutFromAvailablePiece(margin, availablePiece)),
            ...attempts.filter(attempt => attempt.canCutFromLeftover()).flatMap(attempt => attempt.cutFromLeftover(margin))
        ]),
        availablePieces,
        margin
    );

    /*return [
        // try and cut any of the other wanted pieces from leftovers
        ...wantedPieces.flatMap(piece => cutAttempt(attempt, piece, availablePieces, margin)),
        // cut the first wanted piece out of new pieces
        ...availablePieces.flatMap(availablePiece => attempt.cutFromAvailablePiece(wantedPieces[0], margin, availablePiece)),
        // cut the other wanted pieces from new pieces
        ...cut(attempt, wantedPieces.slice(1), availablePieces, margin)
    ]*/;
}

function groupBy<T, K, V>(values: Array<T>, keySelectorFn: (value: T) => K, valueSelectorFn: (value: T) => V): Map<K, Array<V>> {
    const map = new Map<K, Array<V>>();
    
    values.forEach(value => {
        const key = keySelectorFn(value),
            actualValue = valueSelectorFn(value),
            existingValue = map.get(key);
        
        if (!existingValue) {
            map.set(key, [ actualValue ]);
        } else {
            map.set(key, [ actualValue, ...existingValue ]);
        }
    });

    return map;
}

function unique<T>(values: Array<T>): Array<T> {
    return [ ...groupBy<T, T, T>(values, (value) => value, (value) => value).keys() ];
}

export default function(wantedPieces: Array<number>, availablePieces: Array<number>, margin: number = 3): Attempt {
    if(availablePieces.find(piece => wantedPieces.find(wPiece => wPiece > piece))) {
        throw "not possible";
    }
    
    const attempts = cut(
        [new Attempt(wantedPieces.sort((a, b) => a - b))],
        unique(availablePieces)
            .sort((a, b) => a - b),
        margin
    );

    const result = attempts.sort((a: Attempt, b: Attempt) => a.leftovers - b.leftovers)[0];

    return result;
}