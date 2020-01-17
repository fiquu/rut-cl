(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.clRut = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
 * @returns {string|Array|null} The cleaned string, a string array of parts
 * if requested or `null` if invalid.
 *
 * @example
 * // Returns '7237750521'
 * rut.clean('7hf237-75lwk.052dgfdm1');
 *
 * // Returns ['723775052', '1']
 * rut.clean('7hf23.775lwk.052d-gfdm1', true);
 */
var clean = function clean(value, parts) {
  if (!value || String(value).length < 3) {
    return null;
  } // Ensure value is a string and keep only numbers and 'k' or 'K'.


  var cleaned = String(value).replace(/[^\dk]+/gi, '');
  var verifier = cleaned.substr(-1, 1).toLowerCase();
  var digits = cleaned.substr(0, cleaned.length - 1).replace(/\D+/g, '').toLowerCase();

  if (parts) {
    return [digits, verifier];
  }

  return "".concat(digits).concat(verifier);
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


var format = function format(value) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

  if (!value || String(value).length < 3) {
    return null;
  }

  var cleaned = clean(value);

  var _clean = clean(cleaned, true),
      _clean2 = _slicedToArray(_clean, 2),
      digits = _clean2[0],
      verifier = _clean2[1];
  /* eslint-disable security/detect-unsafe-regex */


  var grouped = digits.replace(/(\d)(?=(\d{3})+\b)/g, "$1".concat(sep));
  /* eslint-enable security/detect-unsafe-regex */

  return "".concat(grouped, "-").concat(verifier.toLowerCase());
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
 * rut.calculate(16992239);
 * rut.calculate('24965101');
 */


var calculate = function calculate(digits) {
  if (!digits || String(digits).length < 3) {
    return null;
  }

  var cleaned = clean(digits);
  /* Check if there's a value to validate */

  if (!cleaned || String(cleaned).length < 1) {
    return null;
  }

  var m = 0;
  var r = 1;
  /* Do the math :) */

  for (; cleaned; cleaned = Math.floor(cleaned / 10)) {
    r = (r + cleaned % 10 * (9 - m++ % 6)) % 11;
  }
  /* Return the calculated verifier of 'k' */


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


var validate = function validate(value) {
  if (!value || String(value).length < 3) {
    return false;
  }

  var _clean3 = clean(value, true),
      _clean4 = _slicedToArray(_clean3, 2),
      digits = _clean4[0],
      verifier = _clean4[1];

  var calculated = calculate(digits);
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


var digits = function digits(value) {
  if (!value || String(value).length < 3) {
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


var verifier = function verifier(value) {
  if (!value || String(value).length < 3) {
    return null;
  }

  return clean(value, true)[1];
};

module.exports = {
  calculate: calculate,
  verifier: verifier,
  validate: validate,
  format: format,
  digits: digits,
  clean: clean
};

},{}]},{},[1])(1)
});
