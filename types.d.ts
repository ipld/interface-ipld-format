import CID from 'cids'
import Multihashes from 'multihashes'
import Multicodec from 'multicodec'

export interface CIDOptions {
  cidVersion: CID.CIDVersion,
  hashAlg: Multihashes.HashCode
}

export interface Format<T> {
  codec: Multicodec.CodecCode
  defaultHashAlg: Multihashes.HashCode

  util: {
    serialize (ipldNode: T) : Promise<Uint8Array>
    deserialize (binaryBlob: Uint8Array) : Promise<T>
    cid (binaryBlob: Uint8Array, options: { }) : Promise<CID>
  }

  resolver: {
    resolve (binaryBlob: Uint8Array, path: string) : Promise<{ value: any, remainderPath?: string }>
    tree (binaryBlob: Uint8Array) : AsyncGenerator<string, void, undefined>
  }
}
