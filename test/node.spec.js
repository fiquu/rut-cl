const { expect } = require('chai');
const clRut = require('../lib');

/* Test the filter */
describe('The fi-rut module', function () {
  it('Exposes functions', function () {
    expect(clRut.calculate).to.be.a('function');
    expect(clRut.validate).to.be.a('function');
    expect(clRut.verifier).to.be.a('function');
    expect(clRut.format).to.be.a('function');
    expect(clRut.digits).to.be.a('function');
    expect(clRut.clean).to.be.a('function');
  });

  it('Formats a valid RUT by grouping digits and adding a dash', function () {
    expect(clRut.format('16992239k')).to.equal('16.992.239-k');
    expect(clRut.format('18042795-3')).to.equal('18.042.795-3');
    expect(clRut.format('21.629.288-k')).to.equal('21.629.288-k');
    expect(clRut.format(135145270)).to.equal('13.514.527-0');
  });

  it('Cleans a valid RUT', function () {
    expect(clRut.clean('19991362-k')).to.equal('19991362k');
    expect(clRut.clean('21.744.998-7')).to.equal('217449987');
  });

  it('Cleans a random string from non-RUT characters', function () {
    expect(clRut.clean('7hf23775lwk052dgfdm1')).to.equal('7237750521');
  });

  it('Formats a random string by grouping digits and adding a dash', function () {
    expect(clRut.format('7hf23775lwk052dgfdm1')).to.equal('723.775.052-1');
  });

  it('Cleans and validates a valid RUT', function () {
    expect(clRut.validate('24965101k')).to.be.true;
    expect(clRut.validate('20.063.361-k')).to.be.true;
    expect(clRut.validate(123817974)).to.be.true;
  });

  it('Cleans and validates an invalid RUT', function () {
    expect(clRut.validate('16417428-0')).to.be.false;
    expect(clRut.validate(126946361)).to.be.false;
  });

  it('Returns the digit part of a RUT only', function () {
    expect(clRut.digits('7hf23775lwk052dgfdm1')).to.equal('723775052');
    expect(clRut.digits('14450447-k')).to.equal('14450447');
    expect(clRut.digits('14.602.789-k')).to.equal('14602789');
    expect(clRut.digits('150331404')).to.equal('15033140');
    expect(clRut.digits(165653548)).to.equal('16565354');
    expect(clRut.digits(225426570)).to.equal('22542657');
  });

  it('Returns the verifier of a RUT only', function () {
    expect(clRut.verifier('7hf23775lwk052dgfdm1')).to.equal('1');
    expect(clRut.verifier('14450447-k')).to.equal('k');
    expect(clRut.verifier('14.602.789-k')).to.equal('k');
    expect(clRut.verifier('150331404')).to.equal('4');
    expect(clRut.verifier(165653548)).to.equal('8');
    expect(clRut.verifier(225426570)).to.equal('0');
  });

  it('Calculates and returns the verifier from RUT digits', function () {
    expect(clRut.calculate('7hf23775lwk052dgfdm')).to.equal('1');
    expect(clRut.calculate('14.602.789')).to.equal('k');
    expect(clRut.calculate('14.450447')).to.equal('k');
    expect(clRut.calculate('15033140-')).to.equal('4');
    expect(clRut.calculate(16565354)).to.equal('8');
    expect(clRut.calculate(22542657)).to.equal('0');
  });

  it('Formats RUT to lower case', function () {
    expect(clRut.format('16.406.235-K')).to.equal('16.406.235-k');
  });
});
