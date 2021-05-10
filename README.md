# @fiquu/cl-rut

[![Build Status](https://travis-ci.org/fiquu/cl-rut.svg?branch=master)](https://travis-ci.org/fiquu/cl-rut)
![GitHub](https://img.shields.io/github/license/fiquu/cl-rut)
![GitHub last commit](https://img.shields.io/github/last-commit/fiquu/cl-rut)
![npm (scoped)](https://img.shields.io/npm/v/@fiquu/cl-rut)
![npm](https://img.shields.io/npm/dw/@fiquu/cl-rut)

Dependency-free, Chilean RUT utils for Node.js and browsers (transpiled).

## Requirements

This library has been tested with **Node.js 12, 14** and **NPM 6**.

## Installation

```sh
npm i @fiquu/cl-rut
```

## Usage

### Node.js

Import it into you projects as `'@fiquu/cl-rut'`:

```ts
import {
  cleanParts,
  calculate,
  verifier,
  validate,
  format,
  digits,
  clean,
} from '@fiquu/cl-rut';
```

## Examples

```ts
import clRut from '@fiquu/cl-rut';

const value = '22222222';

const calculated = calculate(value);
const verifier = verifier(value);
const isValid = validate(value);
const formatted = format(value);
const parts = cleanParts(value);
const digits = digits(value);
const clean = clean(value);
```

## Documentation

Please see [the documentation page](https://fiquu.github.io/cl-rut/) for more details.
