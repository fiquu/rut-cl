/* Test the filter */
describe('The fi-rut browser module', function () {
  var rut = window.rut;

  it('Exposes functions', function () {
    expect(rut.validate).to.be.a('function');
    expect(rut.verifier).to.be.a('function');
    expect(rut.format).to.be.a('function');
    expect(rut.digits).to.be.a('function');
    expect(rut.clean).to.be.a('function');
  });

  it('Formats a valid RUT by grouping digits and adding a dash', function () {
    expect(rut.format('16992239k')).to.equal('16.992.239-k');
    expect(rut.format('18042795-3')).to.equal('18.042.795-3');
    expect(rut.format('21.629.288-k')).to.equal('21.629.288-k');
    expect(rut.format(135145270)).to.equal('13.514.527-0');
  });

  it('Cleans a valid RUT', function () {
    expect(rut.clean('19991362-k')).to.equal('19991362k');
    expect(rut.clean('21.744.998-7')).to.equal('217449987');
  });

  it('Cleans a random string from non-RUT characters', function () {
    expect(rut.clean('7hf23775lwk052dgfdm1')).to.equal('7237750521');
  });

  it('Formats a random string by grouping digits and adding a dash', function () {
    expect(rut.format('7hf23775lwk052dgfdm1')).to.equal('723.775.052-1');
  });

  it('Cleans and validates a valid RUT', function () {
    expect(rut.validate('24965101k')).to.be.true;
    expect(rut.validate('20.063.361-k')).to.be.true;
    expect(rut.validate(123817974)).to.be.true;
  });

  it('Cleans and validates an invalid RUT', function () {
    expect(rut.validate('16417428-0')).to.be.false;
    expect(rut.validate(126946361)).to.be.false;
  });

  it('Returns the digit part of a RUT only', function () {
    expect(rut.digits('7hf23775lwk052dgfdm1')).to.equal('723775052');
    expect(rut.digits('14450447-k')).to.equal('14450447');
    expect(rut.digits('14.602.789-k')).to.equal('14602789');
    expect(rut.digits('150331404')).to.equal('15033140');
    expect(rut.digits(165653548)).to.equal('16565354');
    expect(rut.digits(225426570)).to.equal('22542657');
  });

  it('Returns the verifier of a RUT only', function () {
    expect(rut.verifier('7hf23775lwk052dgfdm1')).to.equal('1');
    expect(rut.verifier('14450447-k')).to.equal('k');
    expect(rut.verifier('14.602.789-k')).to.equal('k');
    expect(rut.verifier('150331404')).to.equal('4');
    expect(rut.verifier(165653548)).to.equal('8');
    expect(rut.verifier(225426570)).to.equal('0');
  });

  it('Formats RUT to lower case', function () {
    expect(rut.format('16.406.235-K')).to.equal('16.406.235-k');
  });

});
