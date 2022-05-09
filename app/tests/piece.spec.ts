import { expect } from "chai";
import { describe, it } from "mocha";

import Piece from "../src/components/cut/piece";

describe("piece", () => {
    it("canCut should cut equal length", () => {
      expect(new Piece(10).canCut(10)).to.equal(true);
    });
    
    it("canCut should cut less length", () => {
      expect(new Piece(10).canCut(9)).to.equal(true);
    });
    
    it("canCut should not cut longer length", () => {
      expect(new Piece(10).canCut(11)).to.equal(false);
    });

    it("cut should throw error", () => {
      expect(() => new Piece(10).cut(10, 1)).to.throw("Cannot cut 10 with 1 from 10");
    });

    it("cut should cut properly", () => {
      const piece = new Piece(10).cut(5, 1)
      
      expect(piece).to.deep.equal(new Piece(10, [ 5 ], 4));
    });

    it("hasLeft should return true if leftover > 0", () => {
      expect(new Piece(10).hasLeft()).to.equal(true);
    });

    it("hasLeft should return false if leftover = 0", () => {
      expect(new Piece(10, [], 0).hasLeft()).to.equal(false);
    });

    it("hasLeft should return false if leftover > length", () => {
      expect(new Piece(10, [], 11).hasLeft()).to.equal(false);
    });
  });