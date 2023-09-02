import { useAccountsStore, useAccountStore } from 'features/accounts'

export function useGetContactName() {
  const identities = useAccountsStore(s => Array.from(s.byId).map(a => a[1]))
  const accounts = useAccountStore(s => s.byId)
  return function (address?: string) {
    return address
      ? (accounts.get(address)?.name as string) ??
          identities.find(acc => acc.address === address)?.name
      : ''
  }
}
