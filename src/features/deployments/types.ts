import { WebDeployInfo } from '@liftedinit/many-js'

export type WebDeployInfoWithUuid = WebDeployInfo & { uuid: string }
export type Deployment = WebDeployInfo & {
  uuid: string
  transactionMemo?: string
}

export type Lengths = {
  siteName: number
  siteDescription: number
  transactionMemo: number
}
