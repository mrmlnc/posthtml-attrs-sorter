# posthtml-attrs-sorter

> A [PostHTML](https://github.com/posthtml/posthtml) plugin for sort attribute of the tag based on the given order.

[![Travis](https://img.shields.io/travis/mrmlnc/posthtml-attrs-sorter.svg?style=flat-square)](https://travis-ci.org/mrmlnc/posthtml-attrs-sorter)
[![NPM version](https://img.shields.io/npm/v/posthtml-attrs-sorter.svg?style=flat-square)](https://www.npmjs.com/package/posthtml-attrs-sorter)
[![devDependency Status](https://img.shields.io/david/mrmlnc/posthtml-attrs-sorter.svg?style=flat-square)](https://david-dm.org/mrmlnc/posthtml-attrs-sorter#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/mrmlnc/posthtml-attrs-sorter.svg?style=flat-square)](https://david-dm.org/mrmlnc/posthtml-attrs-sorter#info=devDependencies)

## Install

```shell
$ npm i -D posthtml-attrs-sorter
```

## Why?

To follow the guidelines for writing code such as [Code Guide by @mdo](http://codeguide.co/).

## Usage

```js
const posthtml = require('posthtml');
const attrsSorter = require('posthtml-attrs-sorter');
const htmlRaw = fs.readFileSync('path/to/file.html');

posthtml()
  .use(attrsSorter({
    // Options
  }))
  .process(htmlRaw)
  .then(function(result) {
     fs.writeFileSync('path/to/file.html');
  })
```

You can also use this plugin in the PostHTML plugin to [Gulp](https://www.npmjs.com/package/gulp-posthtml) or [Grunt](https://www.npmjs.com/package/grunt-posthtml).

## Options

```js
{
  // An array of attributes in the correct order
  // Default: see http://codeguide.co/#html-attribute-order
  order: []
}
```

## Plugins for editors and IDE

  * [Visual Studio Code](https://github.com/mrmlnc/vscode-attrs-sorter)

## Changelog

See the [Releases section of our GitHub project](https://github.com/mrmlnc/vscode-attrs-sorter/releases) for changelogs for each release version.

## License

MIT.
