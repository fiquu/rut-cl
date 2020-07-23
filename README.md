# @fiquu/cl-rut

[![Build Status](https://travis-ci.org/fiquu/cl-rut.svg?branch=master)](https://travis-ci.org/fiquu/cl-rut)
![GitHub](https://img.shields.io/github/license/fiquu/cl-rut)
![GitHub last commit](https://img.shields.io/github/last-commit/fiquu/cl-rut)
![npm (scoped)](https://img.shields.io/npm/v/@fiquu/cl-rut)
![npm](https://img.shields.io/npm/dw/@fiquu/cl-rut)

Dependency-free, Chilean RUT utils for Node.js and browsers (transpiled).

## Requirements

This library has been tested with **Node.js v12.x** and **NPM v6.x**.

## Installation

```sh
npm i @fiquu/cl-rut
```

## Usage

### Node.js

Require or import it into you projects as `'@fiquu/cl-rut'`:

```js
const clRut = require('@fiquu/cl-rut');
```

```ts
import clRut  from '@fiquu/cl-rut';
```

## Examples

```ts
import clRut  from '@fiquu/cl-rut';

const value = '22222222';

const calculated = clRut.calculate(value);
const verififer = clRut.verifier(value);
const isValid = clRut.validate(value);
const formatted = clRut.format(value);
const digits = clRut.digits(value);
const clean = clRut.clean(value);
```

## Documentation

Please see [the documentation page](https://fiquu.github.io/cl-rut/) for more details.
