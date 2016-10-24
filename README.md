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
- [API](#api)
- [Contribute](#contribute)
  - [Want to hack on IPFS?](#want-to-hack-on-ipfs)
- [License](#license)

## Background

The primary goal of this module is to define an interface that IPLD formats can implement and attach to any IPLD Resolver. The API is presented with both Node.js and Go primitives. However, there are no actual limitations keeping it from being extended for any other language, pushing forward cross compatibility and interoperability through different stacks.

### Modules that implement the interface

- [JavaScript ipld-dag-pb](https://github.com/ipld/js-ipld-dag-pb)
- [JavaScript ipld-dag-cbor](https://github.com/ipld/js-ipld-dag-cbor)
- [JavaScript ipld-eth-block](https://github.com/ipld/js-ipld-eth-block)

Send in a PR if you find or write one!

### Badge

Include this badge in your readme if you make a new module that implements interface-ipld-format API.

![](/img/badge.png)

## API

A valid (read: that follows this interface) IPLD format implementation the following API.

**Table of contents:**

- IPLD format utils - Necessary by the main resolver
  - `util.serialize`
  - `util.deserialize`
  - `util.cid`
- Local resolver methods - the block level resolver (knows how to resolve paths at the block scope)
  - `resolver.resolve`
  - `resolver.tree`

### IPLD format utils

#### `binaryBlob = util.serialize(dagNode)`

> returns a serialized version of this instance

#### `dagNode = util.deserialize(binaryBlob)`

> deserializes a binary blob into the instance

#### `cid = util.cid(dagNode)`

> returns the CID of the dagNode

### Local resolver methods

#### `{ value: <>, remainderPath: <> } = resolver.resolve(binaryBlob, path)`

> resolves a path in block, returns the value and or a link and the partial missing path. This way the IPLD Resolver can fetch the link and continue to resolve.

#### `[ { path: value } ...] = resolver.tree(binaryBlob[, options])`

> returns all the paths available in this block.

Options include:
  - level: 0 to n - how many levels deep should the traversal go.

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipld/interface-ipld-format/issues)!

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

### Want to hack on IPFS?

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/contributing.md)

## License

MIT

[UnixFS]: https://github.com/ipfs/specs/tree/master/unixfs
