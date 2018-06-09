# Project template

Basic Node.js project template, helps to set up the basics real quick.


## Installation

```
$ npx degit konfirm/node-template <project>

$ cd <project>

$ make bootstrap
```

The `make bootstrap` command will take care of replacing the `PROJECT_NAME` and `PROJECT_YEAR` placeholders in all files as well as initialize a git repo and making the first commit.

## Structure

### Dependencies
All dependencies are development only:
 - [`@konfirm/labrat`](https://www.npmjs.com/package/@konfirm/labrat) - BDD syntax exposure of [Hapi's Lab](https://github.com/hapijs/lab) test framework
 - [`eslint-config-strict`](https://www.npmjs.com/package/eslint-config-strict)

### Folders
The folder structure is simple:

 - /source - The folder where the actual module source code resides
 - /test - The starting point of all unit tests
 - /test/index.spec.js - Bootstrap of the `@konfirm/labrat` package, preparing all basics for [Hapi's Lab](https://github.com/hapijs/lab) test framework.
 - /test/source/* - sources to test, allows for using the same structure as the actual source folder

## Configuration
The configuration is both basic and opiniated
 - `.editorconfig` - uses tabs (except for package.json)
 - `.eslintrc.json` - some additional restrictions and relaxing settings for eslint-config-strict
 - `.npmignore` - Ignores the test folder and configuration files from being published
 - `.gitignore` - Ignores the node_modules folder


## License

MIT License Copyright (c) 2018 Rogier Spieker (Konfirm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
