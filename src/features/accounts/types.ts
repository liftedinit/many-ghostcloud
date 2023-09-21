import {
  WebAuthnIdentity,
  Ed25519KeyPairIdentity,
  AnonymousIdentity,
  Address,
} from '@liftedinit/many-js'

export type AccountId = number
export interface Account {
  name: string
  address: Address
  identity: WebAuthnIdentity | Ed25519KeyPairIdentity | AnonymousIdentity
}

export interface AccountsState {
  activeId: AccountId
  byId: Map<AccountId, Account>
  nextId: AccountId
}

export type Credential = {
  base64Id: string
  address: Address
}

export enum RecoverOptions {
  'phrase' = 'phrase',
  'address' = 'address',
}

export type CredentialData = {
  base64CredentialId: string
  cosePublicKey: ArrayBuffer
}
