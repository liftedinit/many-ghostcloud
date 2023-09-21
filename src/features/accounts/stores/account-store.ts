import create from 'zustand'
import { persist } from 'zustand/middleware'
import localforage from 'localforage'
import { replacer, reviver } from 'shared'
import { Address } from '@liftedinit/many-js'

interface Actions {
  update: (address: Address, a: Record<string, unknown>) => void
  delete: (address: Address) => void
}

const initialState: { byId: Map<string, Record<string, unknown>> } = {
  byId: new Map(),
}

export const useAccountStore = create<
  { byId: Map<string, Record<string, unknown>> } & Actions
>(
  persist(
    set => ({
      ...initialState,
      update: (address: Address, account: Record<string, unknown>) =>
        set(s => ({
          byId: new Map(s.byId).set(address.toString(), {
            ...s.byId.get(address.toString()),
            ...account,
          }),
        })),
      delete: (address: Address) => {
        set(s => {
          const byId = new Map(s.byId)
          byId.delete(address.toString())
          return {
            byId,
          }
        })
      },
    }),
    {
      name: 'GHOSTCLOUD.ACCOUNTS',
      // @ts-ignore
      getStorage: () => localforage,
      serialize: state => JSON.stringify(state, replacer),
      deserialize: str => JSON.parse(str, reviver),
    },
  ),
)
