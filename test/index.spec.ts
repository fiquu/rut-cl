import {expect} from 'chai';

import clRut from '../src';

describe('@fiquu/cl-rut (Node.js)', function () {
  describe('module', function () {
    it('Should expose functions', function () {
      const keys = ['calculate', 'validate', 'verifier', 'format', 'digits', 'clean'];

      expect(clRut).to.have.all.keys(keys);

      for (const key of keys) {
        expect(clRut[String(key)]).to.be.a('function');
      }
    });
  });

  describe('calculate', function () {
    it('Should not calculate from an invalid value', function () {
      expect(clRut.calculate('asdf')).to.be.null;
    });

    it('Should calculate and return the verifier from a valid value', function () {
      expect(clRut.calculate('7hf23775lwk052dgfdm')).to.equal('1');
      expect(clRut.calculate('14.602.789')).to.equal('k');
      expect(clRut.calculate('14.450447')).to.equal('k');
      expect(clRut.calculate('15033140-')).to.equal('4');
      expect(clRut.calculate('16565354')).to.equal('8');
      expect(clRut.calculate('22542657')).to.equal('0');
    });

    it('Should not calculate a short value', function () {
      expect(clRut.calculate('12')).to.be.null;
      expect(clRut.calculate('ab')).to.be.null;
      expect(clRut.calculate('a')).to.be.null;
      expect(clRut.calculate('67')).to.be.null;
      expect(clRut.calculate('3')).to.be.null;
    });

    it('Should not calculate an empty value', function () {
      expect(clRut.calculate(null)).to.be.null;
      expect(clRut.calculate('')).to.be.null;
      expect(clRut.calculate('-')).to.be.null;
      expect(clRut.calculate(undefined)).to.be.null;
    });
  });

  describe('clean', function () {
    it('Should clean a valid value', function () {
      expect(clRut.clean('19991362-k')).to.equal('19991362k');
      expect(clRut.clean('21.744.998-7')).to.equal('217449987');
    });

    it('Should clean an invalid value', function () {
      expect(clRut.clean('7hf23775lwk052dgfdm1')).to.equal('7237750521');
    });

    it('Should not clean a short value', function () {
      expect(clRut.clean('12')).to.be.null;
      expect(clRut.clean('ab')).to.be.null;
      expect(clRut.clean('a')).to.be.null;
      expect(clRut.clean('24')).to.be.null;
      expect(clRut.clean('2')).to.be.null;
    });

    it('Should not clean an empty value', function () {
      expect(clRut.clean(null)).to.be.null;
      expect(clRut.clean('')).to.be.null;
      expect(clRut.clean('0')).to.be.null;
      expect(clRut.clean(undefined)).to.be.null;
    });
  });

  describe('digits', function () {
    it('Should return the digit part of a value only', function () {
      expect(clRut.digits('7hf23775lwk052dgfdm1')).to.equal('723775052');
      expect(clRut.digits('14450447-k')).to.equal('14450447');
      expect(clRut.digits('14.602.789-k')).to.equal('14602789');
      expect(clRut.digits('150331404')).to.equal('15033140');
      expect(clRut.digits('165653548')).to.equal('16565354');
      expect(clRut.digits('225426570')).to.equal('22542657');
    });

    it('Should not return the digits a short value', function () {
      expect(clRut.digits('12')).to.be.null;
      expect(clRut.digits('ab')).to.be.null;
      expect(clRut.digits('a')).to.be.null;
      expect(clRut.digits('67')).to.be.null;
      expect(clRut.digits('3')).to.be.null;
    });

    it('Should not return the digits an empty value', function () {
      expect(clRut.digits(null)).to.be.null;
      expect(clRut.digits('')).to.be.null;
      expect(clRut.digits('0')).to.be.null;
      expect(clRut.digits(undefined)).to.be.null;
    });
  });

  describe('format', function () {
    it('Should format a valid value by grouping digits and adding a dash', function () {
      expect(clRut.format('16992239k')).to.equal('16.992.239-k');
      expect(clRut.format('18042795-3')).to.equal('18.042.795-3');
      expect(clRut.format('21.629.288-k')).to.equal('21.629.288-k');
      expect(clRut.format('135145270')).to.equal('13.514.527-0');
    });

    it('Should format a random value by grouping digits and adding a dash', function () {
      expect(clRut.format('7hf23775lwk052dgfdm1')).to.equal('723.775.052-1');
    });

    it('Should format a value always to lower case', function () {
      expect(clRut.format('16.406.235-K')).to.equal('16.406.235-k');
      expect(clRut.format('1111456-K')).to.equal('1.111.456-k');
    });

    it('Should format with a custom separator', function () {
      expect(clRut.format('16.406.235-K', ',')).to.equal('16,406,235-k');
      expect(clRut.format('135145270', ',')).to.equal('13,514,527-0');
      expect(clRut.format('1111456-K', '')).to.equal('1111456-k');
      expect(clRut.format('135145270', '')).to.equal('13514527-0');
      expect(clRut.format('1111456-K', '++')).to.equal('1++111++456-k');
      expect(clRut.format('135145270', '___')).to.equal('13___514___527-0');
      expect(clRut.format('1111456-K', ' ')).to.equal('1 111 456-k');
      expect(clRut.format('135145270', ' ')).to.equal('13 514 527-0');
    });

    it('Should not format a short value', function () {
      expect(clRut.format('12')).to.be.null;
      expect(clRut.format('ab')).to.be.null;
      expect(clRut.format('a')).to.be.null;
      expect(clRut.format('67')).to.be.null;
      expect(clRut.format('3')).to.be.null;
    });

    it('Should not format an empty value', function () {
      expect(clRut.format(null)).to.be.null;
      expect(clRut.format('')).to.be.null;
      expect(clRut.format('0')).to.be.null;
      expect(clRut.format(undefined)).to.be.null;
    });
  });

  describe('validate', function () {
    it('Should validate a valid value', function () {
      expect(clRut.validate('24965101k')).to.be.true;
      expect(clRut.validate('20.063.361-k')).to.be.true;
      expect(clRut.validate('123817974')).to.be.true;
    });

    it('Should validate an invalid value', function () {
      expect(clRut.validate('16417428-0')).to.be.false;
      expect(clRut.validate('126946361')).to.be.false;
    });

    it('Should not validate an empty value', function () {
      expect(clRut.validate(null)).to.be.false;
      expect(clRut.validate('')).to.be.false;
      expect(clRut.validate(undefined)).to.be.false;
    });
  });

  describe('verifier', function () {
    it('Should return the verifier of a value only', function () {
      expect(clRut.verifier('7hf23775lwk052dgfdm1')).to.equal('1');
      expect(clRut.verifier('14450447-k')).to.equal('k');
      expect(clRut.verifier('14.602.789-k')).to.equal('k');
      expect(clRut.verifier('150331404')).to.equal('4');
      expect(clRut.verifier('165653548')).to.equal('8');
      expect(clRut.verifier('225426570')).to.equal('0');
    });

    it('Should not return the verifier a short value', function () {
      expect(clRut.verifier('12')).to.be.null;
      expect(clRut.verifier('ab')).to.be.null;
      expect(clRut.verifier('a')).to.be.null;
      expect(clRut.verifier('67')).to.be.null;
      expect(clRut.verifier('3')).to.be.null;
    });

    it('Should not return the verifier an empty value', function () {
      expect(clRut.verifier(null)).to.be.null;
      expect(clRut.verifier('')).to.be.null;
      expect(clRut.verifier('0')).to.be.null;
      expect(clRut.verifier(undefined)).to.be.null;
    });
  });
});
