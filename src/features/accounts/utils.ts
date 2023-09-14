import { Address } from '@liftedinit/many-js'
import { Account } from './types'

export async function doesAccountExist(
  targetAddress: Address,
  accounts: [id: number, account: Account][],
): Promise<boolean> {
  return accounts.some(a => {
    const [, { address }] = a
    return targetAddress === address
  })
}
