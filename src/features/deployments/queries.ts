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

// TODO: Pagination
// const PAGE_SIZE = 11

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
  address?: string
  filter?: {}
}

export function useDeploymentList({ address }: DeploymentsListArgs) {
  const [data, setData] = React.useState<WebDeployInfoWithUuid[]>([])
  const [activeNetwork, ,] = useNetworkContext()
  const [loading, setLoading] = React.useState(true)
  // TODO: Pagination
  // const [deployments, setDeployments] = React.useState<ArrayBuffer[]>([])
  const [error, setError] = React.useState(Error)

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
        const response: WebDeployInfo[] = await activeNetwork?.web?.list({
          // TODO: Pagination
          // count: PAGE_SIZE,
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
        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
      }
    }
    fetchQuery()
  }, [activeNetwork, address])

  // TODO: Pagination
  // const hasNextPage = data.length === PAGE_SIZE
  // const visibleDeployments = hasNextPage ? data.slice(0, PAGE_SIZE - 1) : data

  return {
    error: error?.message,
    isError: error,
    isLoading: loading,
    data,
    // TODO: Pagination
    // hasNextPage,
    // currPageCount: deployments.length,
    //   prevBtnProps: {
    //     disabled: deployments.length === 0,
    //     onClick: () => {
    //       setDeployments(s => s.slice(1))
    //     },
    //   },
    //   nextBtnProps: {
    //     disabled: !hasNextPage,
    //     onClick: () => {
    //       const lastDeployment = data[PAGE_SIZE - 1]
    //       setDeployments(s => [lastDeployment, ...s])
    //     },
    //   },
    //   data: {
    //     count: data.length,
    //     transactions: visibleDeployments ?? [],
    //   },
  }
}
