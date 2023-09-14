import { WebDeployInfo } from '@liftedinit/many-js'

export type WebDeployInfoWithUuid = WebDeployInfo & { uuid: string }
export type Deployment = WebDeployInfo & {
  uuid: string
  transactionMemo?: string[]
}
