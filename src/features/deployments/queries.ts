import { useNetworkContext } from 'features/network'
import React, { useEffect } from 'react'
import { ListOrderType } from '@liftedinit/many-js'

const PAGE_SIZE = 11

interface DeploymentsListArgs {
  address?: string
  filter?: {}
}

export function useDeploymentList({
  address,
  filter = {},
}: DeploymentsListArgs) {
  const [activeNetwork, ,] = useNetworkContext()
  console.log('activeNetwork: ', activeNetwork)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(Error)

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        setLoading(true)

        const response = await activeNetwork?.web?.list({
          order: ListOrderType.descending,
        })

        console.log('RESPONSE: ', response)

        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
      }
    }
    fetchQuery()
  }, [activeNetwork])

  return {}
}
