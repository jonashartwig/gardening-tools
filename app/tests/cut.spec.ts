import { expect } from "chai";
import { describe, it } from "mocha";

import cut from "../src/components/cut";
import Attempt from "../src/components/cut/attempt";
import Piece from "../src/components/cut/piece";

describe("cut", () => {
    it("cut should error on too long wanted", () => {
      expect(() => cut([ 1200 ], [ 1000 ])).to.throw("not possible");
    });

    it("should find perfect length", () => {
      expect(cut([ 1200 ], [ 1200 ], 0)).to.deep.equal(new Attempt([], [ new Piece(1200, [ 1200 ], 0) ]));
    });

    it("should ignore duplicates available pieces", () => {
      expect(cut([ 1200 ], [ 1200, 1200 ], 0)).to.deep.equal(new Attempt([], [ new Piece(1200, [ 1200 ], 0) ]));
    });

    it("should find best option", () => {
      expect(cut([ 1200 ], [ 1300, 1200 ], 0)).to.deep.equal(new Attempt([], [ new Piece(1200, [ 1200 ], 0) ]));
    });

    it("should find trivial complex solution", () => {
      expect(cut([ 1200, 1200, 1200, 1200, 1200 ], [ 1300, 1200 ], 0)).to.deep.equal(
        new Attempt(
          [],
          [
            new Piece(1200, [ 1200 ], 0),
            new Piece(1200, [ 1200 ], 0),
            new Piece(1200, [ 1200 ], 0),
            new Piece(1200, [ 1200 ], 0),
            new Piece(1200, [ 1200 ], 0)
          ]
        )
      );
    });

    it("should find complex solution", () => {
      expect(
        cut(
          [
            ...Array(22).fill(200),
            ...Array(4).fill(390),
            ...Array(12).fill(410),
            ...Array(4).fill(960),
            ...Array(4).fill(920),
            ...Array(4).fill(390),
            ...Array(12).fill(960),
            ...Array(4).fill(1250)
          ],
          [ 3000, 3600, 4200, 4500, 4800, 5400 ], 0)).to.deep.equal(
          new Attempt(
            [],
            [
              new Piece(1200, [ 1200 ], 0),
              new Piece(1200, [ 1200 ], 0),
              new Piece(1200, [ 1200 ], 0),
              new Piece(1200, [ 1200 ], 0),
              new Piece(1200, [ 1200 ], 0)
            ]
          )
        );
      });
  });