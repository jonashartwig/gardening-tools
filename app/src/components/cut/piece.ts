class Piece {
    readonly length: number;
    readonly cutParts: Array<number>;
    readonly leftover: number;

    constructor(length: number, cutParts: Array<number> = new Array(), leftover: number = length) {
        this.length = length;
        this.cutParts = cutParts || new Array();
        this.leftover = leftover;
    }

    hasLeft(): boolean {
        return this.leftover > 0 && this.leftover <= this.length;
    }

    canCut(length: number): boolean {
        return length <= this.leftover;
    }

    cut(length: number, margin: number): Piece {
        if(!this.canCut(length)) {
            throw `Cannot cut ${length} with ${margin} from ${this.leftover}`;
        }
        
        return new Piece(
            this.length,
            [ ...this.cutParts, length ],
            this.leftover - length - margin
        );
    }
}

export default Piece;