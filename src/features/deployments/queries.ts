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
      owner?: Address | string
      siteName: string
      siteDescription?: string
      deploymentSource: DeploymentSource
      memo?: Memo
    }
  >(
    async (vars: {
      owner?: Address | string
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
      owner?: Address | string
      siteName: string
      siteDescription?: string
      deploymentSource: DeploymentSource
      memo?: Memo
    }
  >(
    async (vars: {
      owner?: Address | string
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
      owner?: Address | string
      siteName: string
      memo?: Memo
    }
  >(
    async (vars: {
      owner?: Address | string
      siteName: string
      memo?: Memo
    }) => {
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

export function useDeploymentList({ address }: DeploymentsListArgs) {
  const [deployments, setDeployments] = useState<Deployment[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [activeNetwork, ,] = useNetworkContext()

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
        order: ListOrderType.descending,
        filters,
      })

      const data: WebDeployInfoWithUuid[] = response?.deployments.map(
        (item: WebDeployInfo) => ({
          ...item,
          uuid: uuidv5(item.deploymentUrl, uuidv5.URL),
        }),
      )
      setDeployments(data)
      return data
    } catch (err) {
      throw err
    }
  }

  const { data, isError, error, isLoading } = useQuery<Deployment[], Error>(
    ['web', 'list', address],
    fetchDeployments,
  )

  const total = data?.length ?? 0
  const numPages = Math.ceil(total / PAGE_SIZE)
  const hasNextPage = currentPage < numPages
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  return {
    isError,
    error: error?.message,
    isLoading,
    hasNextPage,
    visibleDeployments: data?.slice(start, end) ?? [],
    total,
    numPages,
    currentPage,
    setDeployments,
    prevBtnProps: {
      disabled: currentPage === 1,
      onClick: () => {
        setCurrentPage(s => s - 1)
      },
    },
    nextBtnProps: {
      disabled: !hasNextPage,
      onClick: () => {
        setCurrentPage(s => s + 1)
      },
    },
    deployments,
  }
}
