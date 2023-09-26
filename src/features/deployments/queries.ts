import { useNetworkContext } from 'features/network'
import React, { useEffect } from 'react'
import {
  Address,
  DeploymentSource,
  FilterTypes,
  ListOrderType,
  Memo,
  OwnerFilter,
  WebDeployInfo,
} from '@liftedinit/many-js'
import { useMutation, useQueryClient } from 'react-query'
import { v5 as uuidv5 } from 'uuid'
import { WebDeployInfoWithUuid } from './types'

const PAGE_SIZE = 11

export function useCreateDeployment() {
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
        queryClient.invalidateQueries(['web', 'list'])
      },
    },
  )
}

export function useUpdateDeployment() {
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
        queryClient.invalidateQueries(['web', 'list'])
      },
    },
  )
}

export function useRemoveDeployment() {
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
        queryClient.invalidateQueries(['web', 'list'])
      },
    },
  )
}

interface DeploymentsListArgs {
  address?: Address
  filter?: {}
}

export function useDeploymentList({ address }: DeploymentsListArgs) {
  const [data, setData] = React.useState<WebDeployInfoWithUuid[]>([])
  const [activeNetwork, ,] = useNetworkContext()
  const [loading, setLoading] = React.useState(true)
  const [visibleDeployments, setVisibleDeployments] = React.useState<
    WebDeployInfoWithUuid[]
  >([])
  const [deployments, setDeployments] = React.useState<WebDeployInfoWithUuid[]>(
    [],
  )
  const [error, setError] = React.useState(Error)
  const [currentPage, setCurrentPage] = React.useState<any>(1)

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        setLoading(true)

        const filters = []
        if (address) {
          const payload: OwnerFilter = [0, new Map().set(0, address)]
          filters.push({
            type: FilterTypes.Owner,
            payload,
          })
        }

        // TODO: revisit this approach, web.list returns a maximum of 100 websites
        const response: WebDeployInfo[] = await activeNetwork?.web?.list({
          order: ListOrderType.descending,
          filters,
        })

        const data: WebDeployInfoWithUuid[] = response?.map(
          (item: WebDeployInfo) => ({
            ...item,
            uuid: uuidv5(item.deploymentUrl, uuidv5.URL),
          }),
        )

        setData(data)
        setVisibleDeployments(data.slice(0, PAGE_SIZE))
        setCurrentPage(1)
        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
      }
    }
    fetchQuery()
  }, [activeNetwork, address, deployments])

  const total = data.length
  const numPages = Math.ceil(total / PAGE_SIZE)
  const hasNextPage = currentPage < numPages

  return {
    error: error?.message,
    isError: error,
    isLoading: loading,
    deployments: data,
    setDeployments,
    visibleDeployments,
    total,
    numPages,
    currentPage,
    prevBtnProps: {
      disabled: currentPage === 1,
      onClick: () => {
        const prevIndex = PAGE_SIZE * (currentPage - 2)
        setVisibleDeployments(data.slice(prevIndex, prevIndex + PAGE_SIZE))
        setCurrentPage(currentPage - 1)
      },
    },
    nextBtnProps: {
      disabled: !hasNextPage,
      onClick: () => {
        const nextIndex = PAGE_SIZE * currentPage
        setVisibleDeployments(data.slice(nextIndex, nextIndex + PAGE_SIZE))
        setCurrentPage(currentPage + 1)
      },
    },
  }
}
