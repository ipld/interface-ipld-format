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
    - [`util.cid(binaryBlob[, options], callback)`](#utilcidbinaryblob-options-callback)
  - [Local resolver methods](#local-resolver-methods)
    - [`resolver.resolve(binaryBlob, path, callback)`](#resolverresolvebinaryblob-path-callback)
    - [`resolver.tree(binaryBlob[, options], callback)`](#resolvertreebinaryblob-options-callback)
  - [Properties](#properties)
    - [`defaultHashAlg`](#defaulthashalg)
    - [`multicodec`](#multicodec)
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

#### `util.cid(binaryBlob[, options], callback)`

> get the CID of a binary blob

Options include:
  - version - the CID version to be used (defaults to 1)
  - hashAlg - the hash algorithm to be used (default to the one set by the format)

`callback` must have the signature `function (err, cid)`, where `err` is an Error if the function fails and `cid` is a CID instance of the binary blob.

### Local resolver methods

#### `resolver.resolve(binaryBlob, path, callback)`

> resolves a path in block, returns the value and or a link and the partial missing path. This way the IPLD Resolver can fetch the link and continue to resolve.

`callback` must have the signature `function (err, result)`, where `err` is an Error if the function fails and `result` is an object with the following keys:

- value: <> - The value resolved or an IPLD link if it was unable to resolve it through.
- remainderPath: <> - The remaining path that was not resolved under block scope.

If `path` is the root `/`, the result is a nested object that contains all paths that `tree()` returns. The values are the same as accessing them directly with the full path. Example:

`tree()` returns:

```JSON
["author/name", "author/email"]
```

`resolve(binaryblob, "/", callback)` would then have as a result:

```JSON
{
  "author": {
    "name": "vmx",
    "email": "vmx@example.com"
  }
}
```

Numbers within a path are interpreted as an array.

#### `resolver.tree(binaryBlob, callback)`

> returns all the paths available in this block.

`callback` must have the signature `function (err, result)`, where `err` is an Error if the function fails and `result` is a list of path such as `["/foo", "/bar", "/author/name", ...]`.

### Properties

#### `defaultHashAlg`

> Default hash algorithm of the format

Most formats have one specific hash algorithm, e.g. Bitcoin’s is `dbl-sha2-256`. CBOR can be used with any hash algorithm, though the default in the IPFS world is `sha256`. `defaultHashAlg` is used in the `util.cid()` call if no hash algorithm was given. The value of `defaultHashAlg` must be one defined in the [Multihash Table](https://github.com/multiformats/multihash#table-for-multihash-v100-rc-semver).

#### `multicodec`

> Identifier for the format implementation

The `multicodec` property is used to register a format implementation in IPLD. It needs to be one specified in the [Multicodec Table](https://github.com/multiformats/multicodec#multicodec-table).

## Maintainers

Captain: [@diasdavid](https://github.com/diasdavid).

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipld/interface-ipld-format/issues)!

Check out our [contributing document](https://github.com/ipld/ipld/blob/master/contributing.md) for more information on how we work, and about contributing in general. Please be aware that all interactions related to IPLD are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

This repository is only for documents. These are licensed under a [CC-BY 3.0 Unported](LICENSE) License © 2016 Protocol Labs Inc. Any code is licensed under a [MIT](MIT-LICENSE) © 2016 Protocol Labs Inc.

[UnixFS]: https://github.com/ipfs/specs/tree/master/unixfs
