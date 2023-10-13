import { useNetworkContext } from 'features/network'
import { useState } from 'react'
import {
  Address,
  DeploymentSource,
  FilterTypes,
  ListOrderType,
  Memo,
  OwnerFilter,
  WebDeployInfo,
} from '@liftedinit/many-js'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { v5 as uuidv5 } from 'uuid'
import { Deployment, WebDeployInfoWithUuid } from './types'

const PAGE_SIZE = 11

export function useCreateDeployment(address: Address | undefined) {
  const [, network] = useNetworkContext()
  const queryClient = useQueryClient()
  return useMutation<
    WebDeployInfo,
    Error,
    {
      owner?: Address
      siteName: string
      siteDescription?: string
      deploymentSource: DeploymentSource
      memo?: Memo
    }
  >(
    async (vars: {
      owner?: Address
      siteName: string
      siteDescription?: string
      deploymentSource: DeploymentSource
      memo?: Memo
    }) => {
      return await network?.web.deploy(vars)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['web', 'list', address])
      },
    },
  )
}

export function useUpdateDeployment(address: Address | undefined) {
  const [, network] = useNetworkContext()
  const queryClient = useQueryClient()
  return useMutation<
    WebDeployInfo,
    Error,
    {
      owner?: Address
      siteName: string
      siteDescription?: string
      deploymentSource: DeploymentSource
      memo?: Memo
    }
  >(
    async (vars: {
      owner?: Address
      siteName: string
      siteDescription?: string
      deploymentSource: DeploymentSource
      memo?: Memo
    }) => {
      return await network?.web.update(vars)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['web', 'list', address])
      },
    },
  )
}

export function useRemoveDeployment(address: Address | undefined) {
  const [, network] = useNetworkContext()
  const queryClient = useQueryClient()
  return useMutation<
    void,
    Error,
    {
      owner?: Address
      siteName: string
      memo?: Memo
    }
  >(
    async (vars: { owner?: Address; siteName: string; memo?: Memo }) => {
      return await network?.web.remove(vars)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['web', 'list', address])
      },
    },
  )
}

interface DeploymentsListArgs {
  address?: Address
  filter?: {}
}

interface DeploymentsListReturn {
  totalCount: number
  deployments: Deployment[]
}

export function useDeploymentList({ address }: DeploymentsListArgs) {
  const [page, setPage] = useState(1)
  const [activeNetwork] = useNetworkContext()

  const fetchDeployments = async () => {
    try {
      const filters = []
      if (address) {
        const payload: OwnerFilter = [0, new Map().set(0, address)]
        filters.push({
          type: FilterTypes.Owner,
          payload,
        })
      }

      const response = await activeNetwork?.web?.list({
        count: PAGE_SIZE,
        order: ListOrderType.descending,
        page,
        filters,
      })
      const data: WebDeployInfoWithUuid[] = response?.deployments.map(
        (item: WebDeployInfo) => ({
          ...item,
          uuid: uuidv5(item.deploymentUrl, uuidv5.URL),
        }),
      )
      const totalCount = response?.totalCount ?? 0
      return {
        deployments: data,
        totalCount,
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const { data, isError, error, isLoading } = useQuery<
    DeploymentsListReturn,
    Error
  >(['web', 'list', address, page], fetchDeployments, {
    keepPreviousData: true,
  })

  const total = data?.totalCount ?? 0
  const numPages = Math.ceil(total / PAGE_SIZE)
  const hasNextPage = page < numPages
  const deployments = data?.deployments ?? []

  return {
    isError,
    error: error?.message,
    isLoading,
    hasNextPage,
    currentPage: page,
    numPages,
    total,
    prevBtnProps: {
      disabled: page === 1,
      onClick: async () => {
        setPage(s => Math.max(s - 1, 0))
      },
    },
    nextBtnProps: {
      disabled: !hasNextPage,
      onClick: async () => {
        setPage(s => s + 1)
      },
    },
    deployments,
  }
}
