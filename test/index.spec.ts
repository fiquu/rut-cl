import { expect } from "chai";

import {
  calculate,
  clean,
  cleanParts,
  digits,
  format,
  isClRut,
  validate,
  verifier,
} from "../src";

describe("@fiquu/cl-rut", function () {
  describe("calculate()", function () {
    it("Should not calculate from an invalid value", function () {
      expect(calculate("7hf23775lwk052dgfdm")).to.be.null;
      expect(calculate("15033140-")).to.be.null;
      expect(calculate("asdf")).to.be.null;
    });

    it("Should calculate and return the verifier from a valid value", function () {
      expect(calculate("14.602.789")).to.equal("k");
      expect(calculate("14.450447")).to.equal("k");
      expect(calculate("16565354")).to.equal("8");
      expect(calculate("22542657")).to.equal("0");
    });

    it("Should not calculate a short value", function () {
      expect(calculate("12")).to.be.null;
      expect(calculate("ab")).to.be.null;
      expect(calculate("a")).to.be.null;
      expect(calculate("67")).to.be.null;
      expect(calculate("3")).to.be.null;
    });

    it("Should not calculate an empty value", function () {
      expect(calculate(null)).to.be.null;
      expect(calculate("")).to.be.null;
      expect(calculate("-")).to.be.null;
      expect(calculate(undefined)).to.be.null;
    });
  });

  describe("clean()", function () {
    it("Should clean a valid value", function () {
      expect(clean("19991362-k")).to.equal("19991362k");
      expect(clean("21.744.998-7")).to.equal("217449987");
    });

    it("Should not clean an invalid value", function () {
      expect(clean("7hf23775lwk052dgfdm1")).to.be.null;
      expect(clean("not a rut")).to.be.null;
    });

    it("Should not clean a short value", function () {
      expect(clean("12")).to.be.null;
      expect(clean("ab")).to.be.null;
      expect(clean("a")).to.be.null;
      expect(clean("24")).to.be.null;
      expect(clean("2")).to.be.null;
    });

    it("Should not clean an empty value", function () {
      expect(clean(null)).to.be.null;
      expect(clean("")).to.be.null;
      expect(clean("0")).to.be.null;
      expect(clean(undefined)).to.be.null;
    });
  });

  describe("cleanParts()", function () {
    it("Should clean a valid value", function () {
      expect(cleanParts("19991362-k")).to.deep.equal(["19991362", "k"]);
      expect(cleanParts("21.744.998-7")).to.deep.equal(["21744998", "7"]);
    });

    it("Should not clean an invalid value", function () {
      expect(cleanParts("7hf23775lwk052dgfdm1")).to.be.null;
      expect(cleanParts("not a rut")).to.be.null;
    });

    it("Should not clean a short value", function () {
      expect(cleanParts("12")).to.be.null;
      expect(cleanParts("ab")).to.be.null;
      expect(cleanParts("a")).to.be.null;
      expect(cleanParts("24")).to.be.null;
      expect(cleanParts("2")).to.be.null;
    });

    it("Should not clean an empty value", function () {
      expect(cleanParts(null)).to.be.null;
      expect(cleanParts("")).to.be.null;
      expect(cleanParts("0")).to.be.null;
      expect(cleanParts(undefined)).to.be.null;
    });
  });

  describe("digits()", function () {
    it("Should return the digit part of a value only", function () {
      expect(digits("14450447-k")).to.equal("14450447");
      expect(digits("14.602.789-k")).to.equal("14602789");
      expect(digits("150331404")).to.equal("15033140");
      expect(digits("165653548")).to.equal("16565354");
      expect(digits("225426570")).to.equal("22542657");
    });

    it("Should not return the digits an invalid value", function () {
      expect(digits("7hf23775lwk052dgfdm1")).to.be.null;
      expect(digits("not a rut")).to.be.null;
    });

    it("Should not return the digits a short value", function () {
      expect(digits("12")).to.be.null;
      expect(digits("ab")).to.be.null;
      expect(digits("a")).to.be.null;
      expect(digits("67")).to.be.null;
      expect(digits("3")).to.be.null;
    });

    it("Should not return the digits an empty value", function () {
      expect(digits(null)).to.be.null;
      expect(digits("")).to.be.null;
      expect(digits("0")).to.be.null;
      expect(digits(undefined)).to.be.null;
    });
  });

  describe("format()", function () {
    it("Should format a valid value by grouping digits and adding a dash", function () {
      expect(format("16992239k")).to.equal("16.992.239-k");
      expect(format("18042795-3")).to.equal("18.042.795-3");
      expect(format("21.629.288-k")).to.equal("21.629.288-k");
      expect(format("135145270")).to.equal("13.514.527-0");
    });

    it("Should format a random value by grouping digits and adding a dash", function () {
      expect(format("7237750521")).to.equal("723.775.052-1");
    });

    it("Should format a value always to lower case", function () {
      expect(format("16.406.235-K")).to.equal("16.406.235-k");
      expect(format("1111456-K")).to.equal("1.111.456-k");
    });

    it("Should format with digit grouping", function () {
      expect(format("16.406.235-K", true)).to.equal("16.406.235-k");
      expect(format("16.406.235-K")).to.equal("16.406.235-k");
      expect(format("135145270", true)).to.equal("13.514.527-0");
      expect(format("135145270")).to.equal("13.514.527-0");
    });

    it("Should format without digit grouping", function () {
      expect(format("16.406.235-K", true)).to.equal("16.406.235-k");
      expect(format("16.406.235-K", false)).to.equal("16406235-k");
      expect(format("16.406.235-K")).to.equal("16.406.235-k");
      expect(format("135145270", true)).to.equal("13.514.527-0");
      expect(format("135145270", false)).to.equal("13514527-0");
      expect(format("135145270")).to.equal("13.514.527-0");
    });

    it("Should not format a short value", function () {
      expect(format("12")).to.be.null;
      expect(format("ab")).to.be.null;
      expect(format("a")).to.be.null;
      expect(format("67")).to.be.null;
      expect(format("3")).to.be.null;
    });

    it("Should not format an empty value", function () {
      expect(format(null)).to.be.null;
      expect(format("")).to.be.null;
      expect(format("0")).to.be.null;
      expect(format(undefined)).to.be.null;
    });
  });

  describe("validate()", function () {
    it("Should validate a valid value", function () {
      expect(validate("24965101k")).to.be.true;
      expect(validate("20.063.361-k")).to.be.true;
      expect(validate("123817974")).to.be.true;
    });

    it("Should validate an invalid value", function () {
      expect(validate("16417428-0")).to.be.false;
      expect(validate("126946361")).to.be.false;
    });

    it("Should not validate an empty value", function () {
      expect(validate(null)).to.be.false;
      expect(validate("")).to.be.false;
      expect(validate(undefined)).to.be.false;
    });
  });

  describe("verifier()", function () {
    it("Should not return the verifier of an invalid value", function () {
      expect(verifier("7hf23775lwk052dgfdm1")).to.be.null;
    });

    it("Should return the verifier of a value only", function () {
      expect(verifier("14450447-k")).to.equal("k");
      expect(verifier("14.602.789-k")).to.equal("k");
      expect(verifier("150331404")).to.equal("4");
      expect(verifier("165653548")).to.equal("8");
      expect(verifier("225426570")).to.equal("0");
    });

    it("Should not return the verifier a short value", function () {
      expect(verifier("12")).to.be.null;
      expect(verifier("ab")).to.be.null;
      expect(verifier("a")).to.be.null;
      expect(verifier("67")).to.be.null;
      expect(verifier("3")).to.be.null;
    });

    it("Should not return the verifier an empty value", function () {
      expect(verifier(null)).to.be.null;
      expect(verifier("")).to.be.null;
      expect(verifier("0")).to.be.null;
      expect(verifier(undefined)).to.be.null;
    });
  });
});
