/**
 * @module cl-rut
 *
 * @description Chilean RUT utilities for Node.js and the Browser.
 */

/**
 * Cleans a string out of invalid RUT characters.
 *
 * @param {string} value The value to clean.
 * @param {boolean} parts If the function should return an array of parts
 * instead of the concatenated string.
 *
 * @returns {string|string[]|null} The cleaned string, a string array of parts
 * if requested or `null` if invalid.
 *
 * @example
 * // Returns '7237750521'
 * rut.clean('7237750521');
 *
 * // Returns '7237750521'
 * rut.clean('723.775.052-1');
 *
 * // Returns '7237750521'
 * rut.clean('723.775.052-1', false);
 *
 * // Returns ['723775052', '1']
 * rut.clean('723.775.052-1', true);
 *
 * // Returns null
 * rut.clean('7hf237-75lwk.052dgfdm1');
 *
 * // Returns null
 * rut.clean('7hf23.775lwk.052d-gfdm1', true);
 */
export function clean(value: string, parts = false): string | string[] | null {
  if (!/^[\d.]{3,}-?[\dk]?$/i.test(value)) {
    return null;
  }

  const verifier = value.substr(-1, 1).toLowerCase();
  const digits = value.substr(0, value.length - 1)
    .replace(/\D+/g, '')
    .toLowerCase();

  if (parts) {
    return [digits, verifier];
  }

  return `${digits}${verifier}`;
}

/**
 * Formats a string as a RUT number.
 *
 * @param {string} value The value to format.
 * @param {boolean} group Whether to use digit grouping. Defaults to `true`.
 *
 * @returns {string|null} The formatted string or `null` if invalid.
 *
 * @example
 * // Returns '16.992.239-k'
 * rut.format('16992239k');
 *
 * // Returns '16.992.239-k'
 * rut.format('16992239k', true);
 *
 * // Returns '16992239-k'
 * rut.format('16992239k', false);
 */
export function format(value: string, group = true): string {
  if (!/^[\d.]{3,}-?[\dk]?$/i.test(value)) {
    return null;
  }

  const [digits, verifier] = clean(value, true);
  // eslint-disable-next-line security/detect-unsafe-regex
  const grouped = digits.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, group ? '.' : '');

  return `${grouped}-${verifier.toLowerCase()}`;
}

/**
 * Calculates the RUT verifier.
 *
 * @param {string} digits The RUT digits to calculate the verifier from.
 *
 * @returns {string|null} The verifier digit or `null` if invalid.
 *
 * @example
 * // Both return 'k'
 * rut.calculate('16992239');
 * rut.calculate('24965101');
 */
export function calculate(digits: string): string {
  if (!/^[\d.]{3,}$/i.test(digits)) {
    return null;
  }

  let cleaned = parseInt(clean(digits) as string, 10);
  let m = 0;
  let r = 1;

  // Do the math :)
  for (; cleaned; cleaned = Math.floor(cleaned / 10)) {
    r = (r + cleaned % 10 * (9 - m++ % 6)) % 11;
  }

  // Return the calculated verifier or 'k'
  return r ? String(r - 1) : 'k';
}

/**
 * Validates a string for a valid RUT number.
 *
 * @param {string} value The string to validate.
 *
 * @returns {boolean} Whether the string is a valid RUT number.
 *
 * @example
 * // Returns true
 * rut.validate('24965101k');
 */
export function validate(value: string): boolean {
  if (!/^[\d.]{3,}-?[\dk]?$/i.test(value)) {
    return false;
  }

  const [digits, verifier] = clean(value, true);
  const calculated = calculate(digits);

  return calculated === verifier;
}

/**
 * Obtains the RUT digits only.
 *
 * @param {string} value The value to obtain the digits from.
 *
 * @returns {string|null} The digits or `null` if invalid.
 *
 * @example
 * // Returns '14602789'
 * rut.digits('14.602.789-k');
 */
export function digits(value: string): string {
  if (!/^[\d.]{3,}-?[\dk]?$/i.test(value)) {
    return null;
  }

  const [digits] = clean(value, true);

  return digits;
}

/**
 * Get the RUT verifier only.
 *
 * @param {string} value The value to obtain the verifier from.
 *
 * @returns {string|null} The verifier digit or `null` if invalid.
 *
 * @example
 * // Returns 'k'
 * rut.verifier('14.602.789-k');
 */
export function verifier(value: string): string {
  if (!/^[\d.]{3,}-?[\dk]?$/i.test(value)) {
    return null;
  }

  const [, verifier] = clean(value, true);

  return verifier;
}

export default {
  calculate,
  verifier,
  validate,
  format,
  digits,
  clean
};
