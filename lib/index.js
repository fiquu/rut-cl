var GROUP_REGEX = /(\d)(?=(\d{3})+\b)/g;
var CLEAN_REGEX = /[^\dk]+/gi;
var DIGITS_REGEX = /\D+/g;
var GROUP_REPLACE = '$1.';
var EMPTY = '';
var DASH = '-';
var K = 'k';

/**
 * @module rut-cl
 *
 * @description This module is exposed as `window.rutcl` in the browser.
 * In Node.js require it as `rut-cl`.
 */

/**
 * Cleans a string out of invalid RUT characters.
 *
 * @param {String} value The value to clean.
 * @param {Boolean} parts If the function should return an array of parts
 * instead of the concatenated string.
 *
 * @returns {String|Array} The clean string or a String Array of parts
 * if requested.
 *
 * @example
 * // Returns '7237750521'
 * rut.clean('7hf23775lwk052dgfdm1');
 *
 * // Returns ['723775052', '1']
 * rut.clean('7hf23775lwk052dgfdm1', true);
 */
function clean(value, parts) {
  /* Ensure value is a string and keep only numbers and 'k' or 'K' */
  value = (value + '').replace(CLEAN_REGEX, EMPTY);

  /* Obtain the verifier */
  var verifier = value.substr(-1, 1).toLowerCase();

  /* Obtain the RUT digits and keep only numbers */
  var digits = value.substr(0, value.length - 1)
    .replace(DIGITS_REGEX, EMPTY)
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
 * @param {String} value The value to format.
 *
 * @returns {String} The formatted string.
 *
 * @example
 * // Returns '16.992.239-k'
 * rut.format('16992239k');
 */
function format(value) {
  value = clean(value);

  /* Check if value is too short to format */
  if (value.length < 3) {
    return value;
  }

  var parts = clean(value, true);

  /* Group digits with dots */
  parts[0] = parts[0].replace(GROUP_REGEX, GROUP_REPLACE);

  return parts.join(DASH).toLowerCase();
}

/**
 * Calculates the RUT verifier.
 *
 * @param {String} digits The RUT digits to calculate the verifier from.
 *
 * @returns {String} The verifier.
 *
 * @example
 * // Both return 'k'
 * rut.calculate(16992239);
 * rut.calculate('24965101');
 */
function calculate(digits) {
  digits = clean(digits);

  /* Check if there's a value to validate */
  if (!digits || !String(digits).length) {
    return null;
  }

  var m = 0;
  var r = 1;

  /* Do the math :) */
  for (; digits; digits = Math.floor(parseInt(digits) / 10)) {
    r = (r + digits % 10 * (9 - m++ % 6)) % 11;
  }

  /* Return the calculated verifier of 'k' */
  return r ? ((r - 1) + '') : K;
}

/**
 * Validates a string for a valid RUT number.
 *
 * @param {String} value The string to validate.
 *
 * @returns {Boolean} If the string is a valid RUT number.
 *
 * @example
 * // Returns true
 * rut.validate('24965101k');
 */
function validate(value) {
  /* Check if there's a value to validate */
  if (!value || !(value + '').length) {
    return false;
  }

  var parts = clean(value, true);
  var verifier = parts[1];
  var digits = parts[0];

  /* If the verifier is not a number then it must be 'k' */
  if (isNaN(verifier)) {
    verifier = K;
  }

  return verifier === calculate(digits);
}

/**
 * Get the RUT digits only.
 *
 * @param {Mixed} value The value to obtain the digits from.
 *
 * @returns {String} The digits if any.
 *
 * @example
 * // Returns '14602789'
 * rut.digits('14.602.789-k');
 */
function digits(value) {
  return clean(value, true)[0];
}

/**
 * Get the RUT verifier only.
 *
 * @param {Mixed} value The value to obtain the verifier from.
 *
 * @returns {String} The verifier if any.
 *
 * @example
 * // Returns 'k'
 * rut.verifier('14.602.789-k');
 */
function verifier(value) {
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
