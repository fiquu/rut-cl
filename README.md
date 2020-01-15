# @fiquu/cl-rut [![Build Status](https://travis-ci.org/fiquu/cl-rut.svg?branch=master)](https://travis-ci.org/fiquu/cl-rut)

Chilean RUT utils for Node.js, the browser and AngularJS.

## Browser

### Installation

```sh
bower install --save @fiquu/cl-rut
```

### Usage

Include the distributable versions into your scripts bundle or load them as scripts in your HTML.

The library will be assigned as `rut` into the `window` so you can access its methods directly via `window.rut`.

**IMPORTANT:** Values will allways be converted to lower case to enforce consistency.

#### Development / Debugging

For production use the non-minified version:

```html
<script src="/bower_components/fi-rut/dist/fi-rut.js"></script>
```

#### Production

For production use the minified version:

```html
<script src="/bower_components/fi-rut/dist/fi-rut.min.js"></script>
```

#### Examples

```javascript
var input = document.querySelector('input#rut');

var calculated = rut.calculate(input.value);
var verififer = rut.verifier(input.value);
var isValid = rut.validate(input.value);
var formatted = rut.format(input.value);
var digits = rut.digits(input.value);
var clean = rut.clean(input.value);
```

### Documentation

Read the [library docs](docs/lib.md) for the library's methods specification.


## AngularJS

### Installation

```sh
bower install --save fi-rut
```

### Usage

Include the distributable versions into your scripts bundle or load them as scripts in your HTML.

This version includes both the browser and AngularJS modules.

The library will be assigned as `rut` into the `window` so you can access its methods directly via `window.rut`.

#### Development / Debugging

For development or easy debugging use the non-minified version:

```html
<script src="/bower_components/fi-rut/dist/fi-rut-ng.js"></script>
```

#### Production

For production use the minified version:

```html
<script src="/bower_components/fi-rut/dist/fi-rut-ng.min.js"></script>
```

#### Examples

Include the `ngRut` dependency into your app:

```javascript
angular.module('MyApp', [
  // ...
  'ngRut'
  // ...
]);
```

##### Directive

The `ng-rut` directive must be used only in an `<input>` element and will add real-time format and validation to the associated `ngModel`:

```html
<input ng-model="data.rut" ng-rut>
```

##### Service

Use the `ngRut` service to access the module's methods programatically:

```javascript
function MyController($scope, ngRut) {
  var calculated = ngRut.calculate($scope.data.rut);
  var verififer = ngRut.verifier($scope.data.rut);
  var isValid = ngRut.validate($scope.data.rut);
  var formatted = ngRut.format($scope.data.rut);
  var digits = ngRut.digits($scope.data.rut);
  var clean = ngRut.clean($scope.data.rut);
}

angular.module('MyApp').controller('MyController', ['$scope', 'ngRut', MyController]);
```

##### Filter

Use the `ngRut` filter to interpolate template strings:

```html
<p>{{ data.rut | ngRut }}</p>
<p>{{ data.rut | ngRut : 'calculate' }}</p>
<p>{{ data.rut | ngRut : 'validate' }}</p>
<p>{{ data.rut | ngRut : 'verifier' }}</p>
<p>{{ data.rut | ngRut : 'digits' }}</p>
<p>{{ data.rut | ngRut : 'clean' }}</p>
```

#### Note

The module, filter, directive and service are called `ngRut` (not `fi-rut`) to maintain compatibility with the deprecated [ngRut](https://github.com/FinalDevStudio/ng-rut) module.

### Documentation

Read the [library docs](docs/lib.md) for the library's methods specification.

Read the [AngularJS docs](docs/angular.md) for usage and specification on the module, service, directive and filter.

## For Node.js

### Installation

```sh
npm install --save fi-rut
```

### Usage

Just require `fi-rut`.

```javascript
const rut = require('fi-rut');
```

### Examples

```javascript
const rut = require('fi-rut');

var value = '22222222';

var calculated = rut.calculate(value);
var verififer = rut.verifier(value);
var isValid = rut.validate(value);
var formatted = rut.format(value);
var digits = rut.digits(value);
var clean = rut.clean(value);
```

### Documentation

Read the [library docs](docs/lib.md) for the methods specification.
