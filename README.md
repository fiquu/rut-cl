# @fiquu/cl-rut [![Build Status](https://travis-ci.org/fiquu/cl-rut.svg?branch=master)](https://travis-ci.org/fiquu/cl-rut)

Chilean RUT utils for Node.js and the browser.

## Requirements

This library has been tested with **Node.js 12.x**.

## Installation

```sh
npm i @fiquu/cl-rut
```

## Usage

### Node.js
Require it into you projects as `'cl-rut'`:

```js
const clRut = require('cl-rut');
```

### Browser
You can require it and use a bundler or use the prebuilt standalone versions on the `dist` folder:

```html
<script src="../path/to/scripts/cl-rut.js"></script>
```

Or use the minified version:

```html
<script src="../path/to/scripts/cl-rut.min.js"></script>
```

And it will be available as `window.clRut`.

## Examples

```javascript
const clRut = require('fi-rut');
const value = '22222222';

const calculated = clRut.calculate(value);
const verififer = clRut.verifier(value);
const isValid = clRut.validate(value);
const formatted = clRut.format(value);
const digits = clRut.digits(value);
const clean = clRut.clean(value);
```

## Documentation

Read the [library docs](docs/API.md) for the library's methods specification.
