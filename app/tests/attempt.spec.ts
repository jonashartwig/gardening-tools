import { expect } from "chai";
import { describe, it } from "mocha";

import Attempt from "../src/components/cut/attempt";
import Piece from "../src/components/cut/piece";

describe("attempt", () => {
    it("constructor should calculate leftovers", () => {
      expect(new Attempt([], [ new Piece(10, [ 1 ], 8), new Piece(5), new Piece(5, [ 1 ], 3), new Piece(1) ]).leftovers).to.equal(17);
    });
    
    it("constructor should find leftover pieces", () => {
      expect(new Attempt([], [ new Piece(10), new Piece(10, [], 0) ]).leftoverPieces).to.deep.equal([ new Piece(10) ]);
    });

    it("cutFromLeftover should return self if no piece available", () => {
      const attempt = new Attempt([1]);

      expect(attempt.cutFromLeftover(1)).to.deep.equal([ attempt ]);
    });

    it("cutFromLeftover should return self if no leftover available", () => {
      const attempt = new Attempt([1], [ new Piece(10, [], 0) ]);

      expect(attempt.cutFromLeftover(1)).to.deep.equal([ attempt ]);
    });

    it("cutFromLeftover should find attempt for leftovers that fit", () => {
      const attempt = new Attempt([1], [ new Piece(10), new Piece(5), new Piece(5, [ 1 ], 3), new Piece(1) ]);

      expect(attempt.cutFromLeftover(1)).to.deep.equal([
        new Attempt([], [ new Piece(10, [ 1 ], 8), new Piece(5), new Piece(5, [ 1 ], 3), new Piece(1) ]),
        new Attempt([], [ new Piece(5, [ 1 ], 3), new Piece(10), new Piece(5, [ 1 ], 3), new Piece(1) ]),
        new Attempt([], [ new Piece(5, [ 1, 1 ], 1), new Piece(10), new Piece(5), new Piece(1) ]),
        new Attempt([], [ new Piece(1, [ 1 ], -1), new Piece(10), new Piece(5), new Piece(5, [ 1 ], 3) ])
      ]);
    });

    it("cutFromLeftover should remove equal options", () => {
      const attempt = new Attempt([1], [ new Piece(10), new Piece(10) ]);

      expect(attempt.cutFromLeftover(1)).to.deep.equal([
        new Attempt([], [ new Piece(10, [ 1 ], 8), new Piece(10) ])
      ]);
    });

    it("cutFromAvailablePiece should return self if no more piece wanted", () => {
      const attempt = new Attempt([]);

      expect(attempt.cutFromAvailablePiece(1, 1)).to.deep.equal(attempt);
    });

    it("cutFromAvailablePiece should return self if no piece available", () => {
      const attempt = new Attempt([2]);

      expect(attempt.cutFromAvailablePiece(1, 1)).to.deep.equal(attempt);
    });

    it("cutFromAvailablePiece should find attempt for piece that fits", () => {
      const attempt = new Attempt([1]);

      expect(attempt.cutFromAvailablePiece(1, 2)).to.deep.equal(
        new Attempt([], [ new Piece(2, [ 1 ], 0) ])
      );
    });
  });