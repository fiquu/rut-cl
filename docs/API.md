<a name="module_cl-rut"></a>

## cl-rut
This module is exposed as `window.clRut` in the browser.
In Node.js require it as `cl-rut`.


* [cl-rut](#module_cl-rut)
    * [.clean(value, parts)](#module_cl-rut.clean) ⇒ <code>string</code> \| <code>Array</code>
    * [.format(value, sep)](#module_cl-rut.format) ⇒ <code>string</code>
    * [.calculate(digits)](#module_cl-rut.calculate) ⇒ <code>string</code>
    * [.validate(value)](#module_cl-rut.validate) ⇒ <code>boolean</code>
    * [.digits(value)](#module_cl-rut.digits) ⇒ <code>string</code>
    * [.verifier(value)](#module_cl-rut.verifier) ⇒ <code>string</code>

<a name="module_cl-rut.clean"></a>

### cl-rut.clean(value, parts) ⇒ <code>string</code> \| <code>Array</code>
Cleans a string out of invalid RUT characters.

**Kind**: static method of [<code>cl-rut</code>](#module_cl-rut)  
**Returns**: <code>string</code> \| <code>Array</code> - The clean string or a String Array of parts
if requested.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The value to clean. |
| parts | <code>boolean</code> | If the function should return an array of parts instead of the concatenated string. |

**Example**  
```js
// Returns '7237750521'
rut.clean('7hf237-75lwk.052dgfdm1');

// Returns ['723775052', '1']
rut.clean('7hf23.775lwk.052d-gfdm1', true);
```
<a name="module_cl-rut.format"></a>

### cl-rut.format(value, sep) ⇒ <code>string</code>
Formats a string as a RUT number.

**Kind**: static method of [<code>cl-rut</code>](#module_cl-rut)  
**Returns**: <code>string</code> - The formatted string.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The value to format. |
| sep | <code>string</code> | Whether to group the digits. Defaults to `true`. |

**Example**  
```js
// Returns '16.992.239-k'
rut.format('16992239k');

// Returns '16992239-k'
rut.format('16992239k', null);

// Returns '16,992,239-k'
rut.format('16992239k', ',');
```
<a name="module_cl-rut.calculate"></a>

### cl-rut.calculate(digits) ⇒ <code>string</code>
Calculates the RUT verifier.

**Kind**: static method of [<code>cl-rut</code>](#module_cl-rut)  
**Returns**: <code>string</code> - The verifier.  

| Param | Type | Description |
| --- | --- | --- |
| digits | <code>string</code> | The RUT digits to calculate the verifier from. |

**Example**  
```js
// Both return 'k'
rut.calculate(16992239);
rut.calculate('24965101');
```
<a name="module_cl-rut.validate"></a>

### cl-rut.validate(value) ⇒ <code>boolean</code>
Validates a string for a valid RUT number.

**Kind**: static method of [<code>cl-rut</code>](#module_cl-rut)  
**Returns**: <code>boolean</code> - If the string is a valid RUT number.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The string to validate. |

**Example**  
```js
// Returns true
rut.validate('24965101k');
```
<a name="module_cl-rut.digits"></a>

### cl-rut.digits(value) ⇒ <code>string</code>
Get the RUT digits only.

**Kind**: static method of [<code>cl-rut</code>](#module_cl-rut)  
**Returns**: <code>string</code> - The digits if any.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The value to obtain the digits from. |

**Example**  
```js
// Returns '14602789'
rut.digits('14.602.789-k');
```
<a name="module_cl-rut.verifier"></a>

### cl-rut.verifier(value) ⇒ <code>string</code>
Get the RUT verifier only.

**Kind**: static method of [<code>cl-rut</code>](#module_cl-rut)  
**Returns**: <code>string</code> - The verifier if any.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The value to obtain the verifier from. |

**Example**  
```js
// Returns 'k'
rut.verifier('14.602.789-k');
```
