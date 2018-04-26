# interface-ipld-format

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![](https://img.shields.io/badge/project-IPLD-blue.svg?style=flat-square)](http://github.com/ipld/ipld)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> A interface you can follow to implement a valid IPLD format, resolvable through the IPLD Resolver (available in IPFS)

## Table of Contents

- [Background](#background)
  - [Modules that implement the interface](#modules-that-implement-the-interface)
  - [Badge](#badge)
- [Definitions](#definitions)
- [API](#api)
  - [IPLD format utils](#ipld-format-utils)
    - [`util.serialize(dagNode, callback)`](#utilserializedagnode-callback)
    - [`util.deserialize(binaryBlob, callback)`](#utildeserializebinaryblob-callback)
    - [`util.cid(dagNode, callback)`](#utilciddagnode-callback)
  - [Local resolver methods](#local-resolver-methods)
    - [`resolver.resolve(binaryBlob, path, callback)`](#resolverresolvebinaryblob-path-callback)
    - [`resolver.tree(binaryBlob[, options], callback)`](#resolvertreebinaryblob-options-callback)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Background

The primary goal of this module is to define an interface that IPLD formats can implement and attach to any IPLD Resolver. The API is presented with both Node.js and Go primitives. However, there are no actual limitations keeping it from being extended for any other language, pushing forward cross compatibility and interoperability through different stacks.

### Modules that implement the interface

- [JavaScript ipld-dag-pb](https://github.com/ipld/js-ipld-dag-pb)
- [JavaScript ipld-dag-cbor](https://github.com/ipld/js-ipld-dag-cbor)
- [JavaScript ipld-ethereum](https://github.com/ipld/js-ipld-ethereum)
- [JavaScript ipld-bitcoin](https://github.com/ipld/js-ipld-bitcoin)
- [JavaScript ipld-zcash](https://github.com/ipld/js-ipld-zcash)
- [JavaScript ipld-git](https://github.com/ipld/js-ipld-git)
- [JavaScript ipld-raw](https://github.com/ipld/js-ipld-raw)

Send in a PR if you find or write one!

### Badge

Include this badge in your readme if you make a new module that implements interface-ipld-format API.

![](/img/badge.png)

## Definitions

- **dagNode**: The implementation specific representation of a deserialized block.

## API

A valid (read: that follows this interface) IPLD format implementation the following API.

### IPLD format utils

#### `util.serialize(dagNode, callback)`

> serializes a dagNode of an IPLD format into its binary format

`callback` must have the signature `function (err, binaryBlob)`, where `err` is an Error is the function fails and `binaryBlob` is a Buffer containing the serialized version.

#### `util.deserialize(binaryBlob, callback)`

> deserializes a binary blob into the instance

`callback` must have the signature `function (err, dagNode)`, where `err` is an Error if the function fails and `dagNode` is the dagNode that got deserialized in the process.

#### `util.cid(dagNode, callback)`

> get the CID of the dagNode

`callback` must have the signature `function (err, cid)`, where `err` is an Error if the function fails and `cid` is a CID instance of the dagNode.

### Local resolver methods

#### `resolver.resolve(binaryBlob, path, callback)`

> resolves a path in block, returns the value and or a link and the partial missing path. This way the IPLD Resolver can fetch the link and continue to resolve.

`callback` must have the signature `function (err, result)`, where `err` is an Error if the function fails and `result` is an object with the following keys:

- value: <> - The value resolved or an IPLD link if it was unable to resolve it through.
- remainderPath: <> - The remaining path that was not resolved under block scope.

#### `resolver.tree(binaryBlob[, options], callback)`

> returns all the paths available in this block.

Options include:
  - level: 0 to n - how many levels deep should the traversal go.
  - values: bool - resolve the values (defaults to false)

`callback` must have the signature `function (err, result)`, where `err` is an Error if the function fails and `result` is an array depending on `options.value`. If it is `true` it is an array of objects containing `path:value` tuples, such as: `[ { '/foo': 'bar' } ...]`. If it is `false` it contains only the paths, such as `['/foo', '/bar', ...]`.

#### `resolver.isLink(binaryBlob, path, callback)`

> returns an IPLD Link of a given path, if it is a valid link, false otherwise.

`callback` must have the signature `function (err, link)`, where `err` is an Error if the function fails and `link` is the CID that was in a given path. `link` follows the format:

```JavaScript
{
  '/': <cid>
}
```

## Maintainers

Captain: [@diasdavid](https://github.com/diasdavid).

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipld/interface-ipld-format/issues)!

Check out our [contributing document](https://github.com/ipld/ipld/blob/master/contributing.md) for more information on how we work, and about contributing in general. Please be aware that all interactions related to IPLD are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

This repository is only for documents. These are licensed under a [CC-BY 3.0 Unported](LICENSE) License © 2016 Protocol Labs Inc. Any code is licensed under a [MIT](MIT-LICENSE) © 2016 Protocol Labs Inc.

[UnixFS]: https://github.com/ipfs/specs/tree/master/unixfs
