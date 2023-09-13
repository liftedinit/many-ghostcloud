import React from 'react'
import {
  Network,
  AnonymousIdentity,
  Account,
  Base,
  Events,
  Web,
} from '@liftedinit/many-js'
import { useNetworkStore } from './store'
import { useAccountsStore } from 'features/accounts'

const NetworkContext = React.createContext<[Network?, Network?, Network[]?]>([
  undefined, // Query network
  undefined, // Legacy networks
  undefined, // Command network
])

export function NetworkProvider({ children }: React.PropsWithChildren<{}>) {
  const activeNetwork = useNetworkStore(state => state.getActiveNetwork())
  const legacyNetworks = useNetworkStore(state => state.getLegacyNetworks())
  const activeAccount = useAccountsStore(state =>
    state.byId.get(state.activeId),
  )!

  const network = React.useMemo(() => {
    const anonIdentity = new AnonymousIdentity()
    const identity = activeAccount?.identity ?? anonIdentity
    const url = activeNetwork?.url || ''
    const queryNetwork = new Network(url, anonIdentity)
    queryNetwork.apply([Web, Events, Base])
    const cmdNetwork = new Network(url, identity)
    cmdNetwork.apply([Web])
    const eventNetworks =
      activeNetwork?.name.toLowerCase() === 'manifest ledger' // FIXME: Filtering by the network name is dumb. Improve me.
        ? legacyNetworks?.map(params => {
            const network = new Network(params.url, anonIdentity)
            network.apply([Account, Events])
            return network
          })
        : []
    return [queryNetwork, cmdNetwork, eventNetworks] as [
      Network,
      Network,
      Network[],
    ]
  }, [activeNetwork, legacyNetworks, activeAccount])

  return (
    <NetworkContext.Provider value={network}>
      {children}
    </NetworkContext.Provider>
  )
}

export function useNetworkContext() {
  return React.useContext(NetworkContext)
}
