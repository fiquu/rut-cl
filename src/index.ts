/**
 * @module cl-rut
 *
 * @description Chilean RUT utilities for Node.js and browsers.
 */

/**
 * Checks if a value is a possible CL RUT without validating it.
 *
 * @param {String} value The value to check.
 *
 * @returns {Boolean} Whether the value is a possible CL.
 *
 * ```
 * // Returns true
 * clean('723.775.052-1');
 *
 * // Returns true
 * clean('7237750521');
 *
 * // Returns false
 * clean('qfv23ibjfoz9');
 * ```
 */
export const isClRut = (value: string): boolean =>
  /^[\d.]{3,}-?[\dk]?$/i.test(value);

/**
 * Cleans a string out of invalid RUT characters.
 *
 * @param {string} value The value to clean.
 *
 * @returns {string|null} The clean string, or `null` if invalid.
 *
 * ```
 * // Returns '7237750521'
 * clean('7237750521');
 *
 * // Returns '7237750521'
 * clean('723.775.052-1');
 *
 * // Returns '7237750521'
 * clean('723.775.052-1');
 *
 * // Returns null
 * clean('7hf237-75lwk.052dgfdm1');
 * ```
 */
export const clean = (value: string): string | null => {
  if (!isClRut(value)) {
    return null;
  }

  const verifier = value.substr(-1, 1).toLowerCase();
  const digits = value
    .substr(0, value.length - 1)
    .replace(/\D+/g, '')
    .toLowerCase();

  return `${digits}${verifier}`;
};

/**
 * Cleans a string out of invalid RUT characters.
 *
 * @param {string} value The value to clean.
 *
 * @returns {string[]|null} The clean string array of parts or `null` if invalid.
 *
 * ```
 * // Returns ['723775052', '1']
 * cleanParts('7237750521');
 *
 * // Returns ['723775052', '1']
 * cleanParts('723.775.052-1');
 *
 * // Returns ['723775052', '1']
 * cleanParts('723.775.052-1');
 *
 * // Returns null
 * cleanParts('7hf237-75lwk.052dgfdm1');
 * ```
 */
export const cleanParts = (value: string): string[] | null => {
  if (!isClRut(value)) {
    return null;
  }

  const verifier = value.substr(-1, 1).toLowerCase();
  const digits = value
    .substr(0, value.length - 1)
    .replace(/\D+/g, '')
    .toLowerCase();

  return [digits, verifier];
};

/**
 * Formats a string as a RUT number.
 *
 * @param {string} value The value to format.
 * @param {boolean} group Whether to use digit grouping. Defaults to `true`.
 *
 * @returns {string|null} The formatted string or `null` if invalid.
 *
 * ```
 * // Returns '16.992.239-k'
 * format('16992239k');
 *
 * // Returns '16.992.239-k'
 * format('16992239k', true);
 *
 * // Returns '16992239-k'
 * format('16992239k', false);
 * ```
 */
export const format = (value: string, group = true): string => {
  if (!isClRut(value)) {
    return null;
  }

  const [digits, verifier] = cleanParts(value);
  const grouped = digits.replace(
    // eslint-disable-next-line security/detect-unsafe-regex
    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    group ? '.' : ''
  );

  return `${grouped}-${verifier.toLowerCase()}`;
};

/**
 * Calculates the RUT verifier.
 *
 * @param {string} digits The RUT digits to calculate the verifier from.
 *
 * @returns {string|null} The verifier digit or `null` if invalid.
 *
 * ```
 * // Both return 'k'
 * calculate('16992239');
 * calculate('24965101');
 * ```
 */
export const calculate = (digits: string): string => {
  if (!/^[\d.]{3,}$/i.test(digits)) {
    return null;
  }

  let cleaned = parseInt(clean(digits) as string, 10);
  let m = 0;
  let r = 1;

  // Do the math :)
  for (; cleaned; cleaned = Math.floor(cleaned / 10)) {
    r = (r + (cleaned % 10) * (9 - (m++ % 6))) % 11;
  }

  // Return the calculated verifier or 'k'
  return r ? String(r - 1) : 'k';
};

/**
 * Validates a string for a valid RUT number.
 *
 * @param {string} value The string to validate.
 *
 * @returns {boolean} Whether the string is a valid RUT number.
 *
 * ```
 * // Returns true
 * validate('24965101k');
 * ```
 */
export const validate = (value: string): boolean => {
  if (!isClRut(value)) {
    return false;
  }

  const [digits, verifier] = cleanParts(value);
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
 * ```
 * // Returns '14602789'
 * digits('14.602.789-k');
 * ```
 */
export const digits = (value: string): string => {
  if (!isClRut(value)) {
    return null;
  }

  const [digits] = cleanParts(value);

  return digits;
};

/**
 * Get the RUT verifier only.
 *
 * @param {string} value The value to obtain the verifier from.
 *
 * @returns {string|null} The verifier digit or `null` if invalid.
 *
 * ```
 * // Returns 'k'
 * verifier('14.602.789-k');
 * ```
 */
export const verifier = (value: string): string => {
  if (!isClRut(value)) {
    return null;
  }

  const [, verifier] = cleanParts(value);

  return verifier;
};
