# interface-ipld-format

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> A interface you can follow to implement a valid IPLD format, resolvable through the IPLD Resolver (available in IPFS)

## Table of Contents

- [Background](#background)
  - [Modules that implement the interface](#modules-that-implement-the-interface)
  - [Badge](#badge)
- [Install](#install)
- [Usage](#usage)
  - [Node.js](#nodejs)
  - [Go](#go)
- [API](#api)
- [Contribute](#contribute)
  - [Want to hack on IPFS?](#want-to-hack-on-ipfs)
- [License](#license)

## Background

The primary goal of this module is to define an interface that IPLD formats can implement and attach to any IPLD Resolver. The API is presented with both Node.js and Go primitives. However, there are no actual limitations keeping it from being extended for any other language, pushing forward cross compatibility and interoperability through different stacks.

### Modules that implement the interface

- **WIP** [JavaScript IPFS implementation](https://github.com/ipfs/js-ipfs)
- **WIP** [JavaScript ipfs-api](https://github.com/ipfs/js-ipfs-api)
- Soon, go-ipfs, go-ipfs-api, java-ipfs-api, python-ipfs-api and others will implement it as well.

Send in a PR if you find or write one!

### Badge

Include this badge in your readme if you make a new module that implements
interface-ipfs-core API.

![](/img/badge.png)

## Install

In JavaScript land:
```js
npm install interface-ipfs-core
```

In Go land:

```go
# Not available
```

## Usage

### Node.js

Install `interface-ipfs-core` as one of the dependencies of your project and as a test file. Then, using `mocha` (for Node.js) or a test runner with compatible API, do:

```
var test = require('interface-ipfs-core')

var common = {
  setup: function (cb) {
    cb(null, yourIPFSInstance)
  },
  teardown: function (cb) {
    cb()
  }
}

// use all of the test suits
test.all(common)
```

### Go

> WIP

## API

A valid (read: that follows this interface) IPFS core implementation must expose the API described in [/API](/API).

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipfs/interface-ipfs-core/issues)!

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

### Want to hack on IPFS?

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/contributing.md)

## License

MIT

[UnixFS]: https://github.com/ipfs/specs/tree/master/unixfs
