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
      expect(cut([ 1200 ], [ 1200 ], 0)).to.equal(new Attempt([ new Piece(1200, [ 1200 ], 0) ]));
    });
  });