import { uniqWith } from "lodash";
import Piece from "./piece";

class Attempt {
    readonly usedPieces: Array<Piece>;
    readonly leftovers: number;
    readonly leftoverPieces: Array<Piece>;
    readonly wantedPieces: Array<number>;

    constructor(wantedPieces: Array<number>, usedPieces: Array<Piece> = new Array()) {
        this.wantedPieces = wantedPieces;
        this.usedPieces = usedPieces;
        this.leftoverPieces = usedPieces.filter(piece => piece.hasLeft());
        this.leftovers = this.leftoverPieces.reduce(
            (leftovers: number, piece: Piece) => piece.leftover + leftovers,
            0
        );
    }

    private getAvailableLeftoversForCut(wantedPiece: number): Array<Piece> {
        return this.leftoverPieces.filter(piece => piece.canCut(wantedPiece));
    }

    canCutFromLeftover() : boolean {
        if(!this.wantedPieces.length) {
            return false;
        }
        
        const wantedPiece = this.wantedPieces[0];
        
        return this.getAvailableLeftoversForCut(wantedPiece).length > 0;
    }

    cutFromLeftover(margin: number): Array<Attempt> {
        if (!this.wantedPieces.length) {
            return [ this ];
        }
        
        const wantedPiece = this.wantedPieces[0],
            availableLeftovers = this.getAvailableLeftoversForCut(wantedPiece);

        if (availableLeftovers.length == 0) {
            return [ this ];
        }

        const notAvailableLeftovers = this.leftoverPieces.filter(piece => !piece.canCut(wantedPiece)),
            uniqueAvailableLeftovers = uniqWith(availableLeftovers, (a, b) => a.leftover == b.leftover);

        return uniqueAvailableLeftovers.map((piece, index) => {
            return new Attempt(
                this.wantedPieces.slice(1),
                [
                    piece.cut(wantedPiece, margin),
                    ...uniqueAvailableLeftovers.slice(0, index),
                    ...uniqueAvailableLeftovers.slice(index + 1, uniqueAvailableLeftovers.length),
                    ...availableLeftovers.filter(availableLeftover => uniqueAvailableLeftovers.indexOf(availableLeftover) == -1),
                    ...notAvailableLeftovers
                ]
            );
        });
    }

    canCutFromAvailablePiece(availablePiece: number): boolean {
        const wantedPiece = this.wantedPieces[0];

        return wantedPiece <= availablePiece;
    }

    cutFromAvailablePiece(margin: number, availablePiece: number): Attempt {
        if (!this.wantedPieces.length) {
            return this;
        }
        if (!this.canCutFromAvailablePiece(availablePiece)) {
            return this;
        }
        const wantedPiece = this.wantedPieces[0];
        
        return new Attempt(
            this.wantedPieces.slice(1),
            [
                new Piece(availablePiece).cut(wantedPiece, margin),
                ...this.usedPieces
            ]
        );
    }

    toString(): string {
        return `Attempt<(
            wantedPieces: ${this.wantedPieces}
            usedPieces: ${this.usedPieces}
            leftovers: ${this.leftovers}
            leftoverPieces: ${this.leftoverPieces}
        )>`;
    }

    isDone(): boolean {
        return this.wantedPieces.length == 0;
    }

    static worstCaseOf(wantedPieces: Array<number>): Attempt {
        return new Attempt(
            wantedPieces,
            wantedPieces.map(() => new Piece(Infinity, [], Infinity))
        )
    }

    static compare(a: Attempt, b: Attempt): number {
        const bestSuccessfullAttemptOf = Attempt.bestSuccessfullAttemptOf(a, b);

        if (!bestSuccessfullAttemptOf) {
            return 0;
        }

        if (bestSuccessfullAttemptOf == a) {
            return -1;
        } else {
            return 1;
        }
    }

    static bestSuccessfullAttemptOf(a: Attempt, b: Attempt): Attempt {
        if (a.isDone() && !b.isDone()) {
            return a;
        }
    
        if (!a.isDone() && b.isDone()) {
            return b;
        }

        if (a.isDone() && b.isDone()) {
            if (a.usedPieces.length == b.usedPieces.length) {
                if (a.leftovers < b.leftovers) {
                    return a;
                } else {
                    return b;
                }
            } else if (a.usedPieces.length < b.usedPieces.length) {
                return a;
            } else {
                return b;
            }
        }

        // inconclusive
        return undefined;
    }
}

export default Attempt;