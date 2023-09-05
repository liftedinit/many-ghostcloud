import { AnonymousIdentity } from '@liftedinit/many-js'

const mapDataType = 'Map'

const anonymousBackwardCompatibleDataType = 'r'

export function replacer(_: string, value: any) {
  if (value instanceof Map) {
    return {
      dataType: mapDataType,
      value: Array.from(value.entries()),
    }
  }
  return value
}

export function reviver(_: string, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === mapDataType) {
      return new Map(value.value)
    } else if (
      value instanceof Object &&
      value.type === 'Buffer' &&
      value.data
    ) {
      return Buffer.from(value.data)
    } else {
      switch (value.dataType) {
        case anonymousBackwardCompatibleDataType:
        case AnonymousIdentity.dataType:
          return new AnonymousIdentity()
      }
    }
  }
  console.warn('Unknown JSON found, not deserializing:', value)
  return value
}
