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
 * rut.clean('7hf237-75lwk.052dgfdm1');
 *
 * // Returns ['723775052', '1']
 * rut.clean('7hf23.775lwk.052d-gfdm1', true);
 */
export function clean(value: string, parts = false): string | string[] | null {
  if (value.length < 3) {
    return null;
  }

  // Ensure value is a string and keep only numbers and 'k' or 'K'.
  const cleaned = String(value).replace(/[^\dk]+/gi, '');
  const verifier = cleaned.substr(-1, 1).toLowerCase();
  const digits = cleaned.substr(0, cleaned.length - 1)
    .replace(/\D+/g, '')
    .toLowerCase();

  if (parts) {
    return [digits, verifier];
  }

  return `${digits}${verifier}`;
};

/**
 * Formats a string as a RUT number.
 *
 * @param {string} value The value to format.
 * @param {string} sep What to use as group separator. Defaults to `'.'`.
 *
 * @returns {string|null} The formatted string or `null` if invalid.
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
export function format(value: string, sep = '.'): string {
  if (!value || String(value).length < 3) {
    return null;
  }

  const [digits, verifier] = clean(value, true);
  const grouped = digits.replace(/(\d)(?=(\d{3})+\b)/g, `$1${sep}`);

  return `${grouped}-${verifier.toLowerCase()}`;
};

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
  if (!digits || String(digits).length < 3) {
    return null;
  }

  let cleaned: number = parseInt(clean(digits) as string);

  // Check if there's a value to validate
  if (cleaned < 1) {
    return null;
  }

  let m = 0;
  let r = 1;

  // Do the math :)
  for (; cleaned; cleaned = Math.floor(cleaned / 10)) {
    r = (r + cleaned % 10 * (9 - m++ % 6)) % 11;
  }

  // Return the calculated verifier of 'k'
  return r ? String(r - 1) : 'k';
};

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
  if (value.length < 3) {
    return false;
  }

  const [digits, verifier] = clean(value, true);
  const calculated = calculate(digits);

  return calculated === verifier;
};

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
  if (value.length < 3) {
    return null;
  }

  return clean(value, true)[0];
};

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
  if (value.length < 3) {
    return null;
  }

  return clean(value, true)[1];
};

export default {
  calculate,
  verifier,
  validate,
  format,
  digits,
  clean
};
