import Piece from "./piece";

class Attempt {
    readonly usedPieces: Array<Piece>;
    readonly leftovers: number;
    readonly leftoverPieces: Array<Piece>;

    constructor(usedPieces: Array<Piece> = new Array()) {
        this.usedPieces = usedPieces;
        this.leftoverPieces = usedPieces.filter(piece => piece.hasLeft());
        this.leftovers = this.leftoverPieces.reduce(
            (leftovers: number, piece: Piece) => piece.leftover + leftovers,
            0
        );
    }

    getAvailableLeftoversForCut(wantedPiece: number): Array<Piece> {
        return this.leftoverPieces.filter(piece => piece.canCut(wantedPiece));
    }

    canCut(wantedPiece: number) : boolean {
        return this.getAvailableLeftoversForCut(wantedPiece).length > 0;
    }

    cut(wantedPiece: number, margin: number): Array<Attempt> {
        const availableLeftovers = this.getAvailableLeftoversForCut(wantedPiece),
            notAvailableLeftovers = this.leftoverPieces.filter(piece => !piece.canCut(wantedPiece));

        if (availableLeftovers.length == 0) {
            return [ this ];
        }

        return availableLeftovers.map((piece, index) => {
            return new Attempt(
                [
                    piece.cut(wantedPiece, margin),
                    ...availableLeftovers.slice(0, index),
                    ...availableLeftovers.slice(index + 1, availableLeftovers.length),
                    ...notAvailableLeftovers
                ]
            );
        });
    }

    cutFromAvailablePiece(wantedPiece: number, margin: number, availablePiece: number): Array<Attempt> {
        return new Attempt([
            new Piece(availablePiece),
            ...this.usedPieces
        ])
            .cut(wantedPiece, margin);
    }
}

export default Attempt;