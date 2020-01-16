/**
 * @module cl-rut
 *
 * @description This module is exposed as `window.clRut` in the browser.
 * In Node.js require it as `cl-rut`.
 */
module.exports = {
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
   * rut.clean('7hf237-75lwk.052dgfdm1');
   *
   * // Returns ['723775052', '1']
   * rut.clean('7hf23.775lwk.052d-gfdm1', true);
   */
  clean (value, parts) {
    if (!value || String(value).length < 3) {
      return null;
    }

    // Ensure value is a string and keep only numbers and 'k' or 'K'.
    const clean = String(value).replace(/[^\dk]+/gi, '');

    const verifier = clean.substr(-1, 1).toLowerCase();
    const digits = clean.substr(0, clean.length - 1)
      .replace(/\D+/g, '')
      .toLowerCase();

    if (parts) {
      return [digits, verifier];
    }

    return `${digits}${verifier}`;
  },

  /**
   * Formats a string as a RUT number.
   *
   * @param {string} value The value to format.
   * @param {string} sep Whether to group the digits. Defaults to `true`.
   *
   * @returns {string} The formatted string.
   *
   * @example
   * // Returns '16.992.239-k'
   * rut.format('16992239k');
   *
   * // Returns '16992239-k'
   * rut.format('16992239k', null);
   *
   * // Returns '16,992,239-k'
   * rut.format('16992239k', ',');
   */
  format (value, sep = '.') {
    if (!value || String(value).length < 3) {
      return null;
    }

    const formatted = this.clean(value);
    const [digits, verifier] = this.clean(formatted, true);

    /* eslint-disable security/detect-unsafe-regex */
    const grouped = digits.replace(/(\d)(?=(\d{3})+\b)/g, `$1${sep}`);
    /* eslint-enable security/detect-unsafe-regex */

    return `${grouped}-${verifier.toLowerCase()}`;
  },

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
  calculate (digits) {
    if (!digits || String(digits).length < 3) {
      return null;
    }

    let clean = this.clean(digits);

    /* Check if there's a value to validate */
    if (!clean || String(clean).length < 1) {
      return null;
    }

    let m = 0;
    let r = 1;

    /* Do the math :) */
    for (; clean; clean = Math.floor(clean / 10)) {
      r = (r + clean % 10 * (9 - m++ % 6)) % 11;
    }

    /* Return the calculated verifier of 'k' */
    return r ? String(r - 1) : 'k';
  },

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
  validate (value) {
    if (!value || String(value).length < 3) {
      return false;
    }

    const [digits, verifier] = this.clean(value, true);
    const calculated = this.calculate(digits);

    return calculated === verifier;
  },

  /**
   * Get the RUT digits only.
   *
   * @param {string} value The value to obtain the digits from.
   *
   * @returns {string} The digits if any.
   *
   * @example
   * // Returns '14602789'
   * rut.digits('14.602.789-k');
   */
  digits (value) {
    if (!value || String(value).length < 3) {
      return null;
    }

    return this.clean(value, true)[0];
  },

  /**
   * Get the RUT verifier only.
   *
   * @param {string} value The value to obtain the verifier from.
   *
   * @returns {string} The verifier if any.
   *
   * @example
   * // Returns 'k'
   * rut.verifier('14.602.789-k');
   */
  verifier (value) {
    if (!value || String(value).length < 3) {
      return null;
    }

    return this.clean(value, true)[1];
  }
};
