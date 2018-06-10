# Bitbox
Assign numeric flags (binary sequence) to all kinds or values, allowing for unique reference numbers and reproducable sets by using bitwise comparison

## Installation

```
$ npm install @konfirm/bitbox
```

## Usage
As the Bitbox library as a scoped package, the scope is also need when the library is used.

```js
const Bitbox = require('@konfirm/bitbox');
const bitbox = new Bitbox();

//  adding individual values
console.log(bitbox.flag('foo'));     //  1
console.log(bitbox.flag(Infinity));  //  2
console.log(bitbox.flag(Math.PI));   //  4
console.log(bitbox.flag('bar'));     //  8

//  adding multiple values (note that 'foo' and 'bar' were already added)
console.log(bitbox.flag('baz', 'bar', 'foo'));  // 25 (foo 1 + bar 8 + baz 16)

//  value retrieval (note that the order in is always the order in which the values were added)
console.log(bitbox.values(25));  //  ['foo', 'bar', 'baz']
console.log(bitbox.values(2));   //  [ Infinity ]
console.log(bitbox.values(10));  //  [ Infinity, 'bar' ]
```

## API

### `flag(value [, value, ...])`
Obtain the unique 'flag' for the given value, or the sum if multiple values are provided. Any value which is not yet known is associated with a new 'flag'.

```js
const Bitbox = require('@konfirm/bitbox');
const bitbox = new Bitbox();

console.log(bitbox.flag('foo'));         //  1
console.log(bitbox.flag('bar'));         //  2
console.log(bitbox.flag('foo', 'bar'));  //  3
```

Do note that if an array of previously existing values is provided, the array itself is considered the value. If the 'flag' of the arrays' values is to be calculated, use the spread (splat) operator.

```js
const Bitbox = require('@konfirm/bitbox');
const bitbox = new Bitbox();

console.log(bitbox.flag('foo'));         //  1
console.log(bitbox.flag('bar'));         //  2
console.log(bitbox.flag('baz'));         //  4

const array = [ 'foo', 'bar', 'baz' ];

//  the array itself
console.log(bitbox.flag(array));         //  8
//  the spread array
console.log(bitbox.flag(...array));      //  7
```

### `values(flag [, verify=true])`
The inverse of `flag`, obtaining the values associated with the provided flag. The `values` method will always provide the values as an array and will be in the order the values were given their flags.

```js
const Bitbox = require('@konfirm/bitbox');
const bitbox = new Bitbox();

//  quickly flag a couple of values
bitbox.flag('foo', 'bar', 'baz', 'qux');

console.log(bitbox.values(9));          //  [ 'foo', 'qux' ]
console.log(bitbox.values(33));         //  throws an Error
//  bypass the error by turning off verification
console.log(bitbox.values(33, false));  //  [ 'foo' ]
```


## Dependencies
All dependencies are development only:
 - [`@konfirm/labrat`](https://www.npmjs.com/package/@konfirm/labrat) - BDD syntax exposure of [Hapi's Lab](https://github.com/hapijs/lab) test framework
 - [`eslint-config-strict`](https://www.npmjs.com/package/eslint-config-strict)

## License

MIT License Copyright (c) 2018 Rogier Spieker (Konfirm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
