import React from 'react'
import { useQuery } from 'react-query'
import { NetworkAttributes } from '@liftedinit/many-js'
import { useNetworkContext } from './network-provider'

export function useNetworkStatus() {
  const [n] = useNetworkContext()
  const { data } = useQuery({
    queryKey: ['network', 'attributes', n?.url],
    queryFn: async () => {
      const res = await n!.base.status()
      return res.status
    },
    enabled: Boolean(n),
  })

  return React.useMemo(() => {
    function getAttribute(attribute: NetworkAttributes) {
      const found = data?.attributes?.find((attr: NetworkAttributes) => {
        if (Array.isArray(attr)) {
          return attr[0] === attribute
        }
        return attr === attribute
      })
      return found
    }

    function getFeatures(attribute: number[] = [], targets: number[] = []) {
      const result: { [k: number]: boolean } = {}
      if (Array.isArray(attribute)) {
        const onlyFeatures = attribute.slice(1)
        targets.forEach(feat => {
          const found = onlyFeatures.includes(feat)
          result[feat] = found
        })
      }
      return result
    }
    return {
      status: data?.status,
      getAttribute,
      getFeatures,
    }
  }, [data])
}
