/**
 * @module rut-cl
 *
 * @description This module is exposed as `window.rutcl` in the browser.
 * In Node.js require it as `rut-cl`.
 */

/**
 * Cleans a string out of invalid RUT characters.
 *
 * @param {string} value The value to clean.
 * @param {boolean} parts If the function should return an array of parts
 * instead of the concatenated string.
 *
 * @returns {string|Array} The clean string or a String Array of parts
 * if requested.
 *
 * @example
 * // Returns '7237750521'
 * rut.clean('7hf23775lwk052dgfdm1');
 *
 * // Returns ['723775052', '1']
 * rut.clean('7hf23775lwk052dgfdm1', true);
 */
function clean (value, parts) {
  /* Ensure value is a string and keep only numbers and 'k' or 'K' */
  const _value = (`${value}`).replace(/[^\dk]+/gi, '');

  /* Obtain the verifier */
  const verifier = _value.substr(-1, 1).toLowerCase();

  /* Obtain the RUT digits and keep only numbers */
  const digits = _value.substr(0, _value.length - 1)
    .replace(/\D+/g, '')
    .toLowerCase();

  /* Return array of parts... */
  if (parts) {
    return [digits, verifier];
  }

  /* ... or return a single string */
  return digits + verifier;
}

/**
 * Formats a string as a RUT number.
 *
 * @param {string} value The value to format.
 *
 * @returns {string} The formatted string.
 *
 * @example
 * // Returns '16.992.239-k'
 * rut.format('16992239k');
 */
function format (value) {
  const _value = clean(value);

  /* Check if value is too short to format */
  if (_value.length < 3) {
    return _value;
  }

  const parts = clean(_value, true);

  /* Group digits with dots */
  parts[0] = parts[0].replace(/(\d)(?=(\d{3})+\b)/g, '$1.');

  return parts.join('-').toLowerCase();
}

/**
 * Calculates the RUT verifier.
 *
 * @param {string} digits The RUT digits to calculate the verifier from.
 *
 * @returns {string} The verifier.
 *
 * @example
 * // Both return 'k'
 * rut.calculate(16992239);
 * rut.calculate('24965101');
 */
function calculate (digits) {
  let _digits = clean(digits);

  /* Check if there's a value to validate */
  if (!digits || !String(digits).length) {
    return null;
  }

  let m = 0;
  let r = 1;

  /* Do the math :) */
  for (; _digits; _digits = Math.floor(parseInt(_digits) / 10)) {
    r = (r + digits % 10 * (9 - m++ % 6)) % 11;
  }

  /* Return the calculated verifier of 'k' */
  return r ? String(r - 1) : 'k';
}

/**
 * Validates a string for a valid RUT number.
 *
 * @param {string} value The string to validate.
 *
 * @returns {boolean} If the string is a valid RUT number.
 *
 * @example
 * // Returns true
 * rut.validate('24965101k');
 */
function validate (value) {
  /* Check if there's a value to validate */
  if (!value || String(value).length < 6) {
    return false;
  }

  const parts = clean(value, true);
  const digits = parts[0];
  let verifier = parts[1];

  /* If the verifier is not a number then it must be 'k' */
  if (isNaN(verifier)) {
    verifier = 'k';
  }

  return verifier === calculate(digits);
}

/**
 * Get the RUT digits only.
 *
 * @param {Mixed} value The value to obtain the digits from.
 *
 * @returns {string} The digits if any.
 *
 * @example
 * // Returns '14602789'
 * rut.digits('14.602.789-k');
 */
function digits (value) {
  return clean(value, true)[0];
}

/**
 * Get the RUT verifier only.
 *
 * @param {Mixed} value The value to obtain the verifier from.
 *
 * @returns {string} The verifier if any.
 *
 * @example
 * // Returns 'k'
 * rut.verifier('14.602.789-k');
 */
function verifier (value) {
  return clean(value, true)[1];
}

module.exports = {
  calculate: calculate,
  validate: validate,
  verifier: verifier,
  digits: digits,
  format: format,
  clean: clean
};
