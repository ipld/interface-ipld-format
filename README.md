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
    - [`resolver.tree(binaryBlob, callback)`](#resolvertreebinaryblob-callback)
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

IPLD Format APIs are restricted to a single IPLD Node, they never access any linked IPLD Nodes.


### serialize(IpldNode)

> Serializes the internal representation of an IPLD Node into a binary blob.

`IpldNode` is a previously deserialized binary Block.

Returns a Promise containing a `Buffer` with the serialized version of the given IPLD Node.


### deserialize(binaryBlob)

> Deserialize into internal representation.

The result is a JavaScript object, which may also be a Proxy object in case the data shouldn’t be deserialized as a whole. Its fields are the public API that can be resolved through. It’s up to the format to add convenient methods for manipulating the data. The returned object may also be a Proxy object in case the data shouldn’t be deserialized as a whole.

Returns a Promise containing the Javascript object. This object must be able to be serialized with a `serialize()` call.


### cid(binaryBlob, [options])

> Return the CID of the binary blob.

Possible `options` are:
  - `version` (`number`, default: 1): the CID version to be used
  - `hashAlg` (`Multicodec`, default: the one the format specifies): the hash algorithm to be used

This can be used to verify that some data actually has a certain CID.


### toJSON(IpldNode)

> Converts an IPLD Node into a JavaScript object that contains only basic types.

Returns a JavaScript object that can be used as input for `JSON.stringify()`. It is *not* a goal to have a JSON representation that is roundtripable back into an IPLD Node. It is meant as a representation that can be processed by third party consumers.

The [IPLD Data Model](https://github.com/ipld/specs/blob/master/IPLD-Data-Model-v1.md) defines two special types that need special attention when converting to JSON:
  - Binary: the binary data is transformed into a Base64 encoded string.
  - Links: the links are CID objects. Consumers of this JSON shouldn’t need to have their own CID parsing implementation, hence the CID is provided in its original base encoded format as well as the human readable one.

Example with [dag-cbor](https://github.com/ipld/js-ipld-dag-cbor):

```JavaScript
'use strict'

const CID = require('cids')
const ipldDagCbor = require('ipld-dag-cbor')

const input = {
  binary: Buffer.from('1155fa3c', 'hex'),
  link: new CID('zdpuAxdeot12gCeKJxANaDAL2juLQDB2QK4PFKnnxdAJLpAZf')
}

const serialized = await ipldDagCbor.serialize(input)
const ipldNode = await ipldDagCbor.deserialize(serialized)
const json = ipldDagCbor.toJSON(ipldNode)
console.log(JSON.stringify(json, null, 2))
```

The output is:

```JSON
{
  "binary": "EVX6PA==",
  "link": {
    "cid": "bafyreifvnutjz6sgkym5cw3fw5e2opfew2gy5dw4wui4tzpphylbmmjsci",
    "multibase": "base32",
    "version": 1,
    "multicodec": "dag-cbor",
    "multihash": {
      "name": "sha2-256",
      "bits": 256,
      "digest": "b56d269cfa465619d15b65b749a73ca4b68d8e8edcb511c9e5ef3e1616313212"
    }
  }
}
```


### Properties

#### `defaultHashCode`

> Default hash algorithm of the format,

Most formats have one specific hash algorithm, e.g. Bitcoin’s is `dbl-sha2-256`. CBOR can be used with any hash algorithm, though the default in the IPFS world is `sha256`. `defaultHashAlg` is used in the `cid()` call if no hash algorithm is given. The value of `defaultHashAlg` must be one code defined in the [Multihash Table](https://github.com/multiformats/multihash#table-for-multihash).

#### `codec`

> Identifier for the format implementation.

The `codec` property is used to register a format implementation in IPLD. It needs to be one of the codes specified in the [Multicodec Table](https://github.com/multiformats/multicodec#multicodec-table).


## Maintainers

Captain: [@diasdavid](https://github.com/diasdavid).

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipld/interface-ipld-format/issues)!

Check out our [contributing document](https://github.com/ipld/ipld/blob/master/contributing.md) for more information on how we work, and about contributing in general. Please be aware that all interactions related to IPLD are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

This repository is only for documents. These are licensed under a [CC-BY 3.0 Unported](LICENSE) License © 2016 Protocol Labs Inc. Any code is licensed under a [MIT](MIT-LICENSE) © 2016 Protocol Labs Inc.

[UnixFS]: https://github.com/ipfs/specs/tree/master/unixfs
