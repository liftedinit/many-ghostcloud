import { Deployment } from './types'
import { WebDeployInfo } from '@liftedinit/many-js'

type HandleMutationProps = {
  returnedData: WebDeployInfo
  deployments: Deployment[]
  activeDeploymentUuid: string
  setIsSubmitting: (value: boolean) => void
  setIsComplete: (value: boolean) => void
  setIsRedeploying: (value: boolean) => void
}

export const handleDeploymentCreationSuccess = (
  setError: (value: Error | null) => void,
  {
    returnedData,
    deployments,
    activeDeploymentUuid,
    setIsSubmitting,
    setIsComplete,
    setIsRedeploying,
  }: HandleMutationProps,
) => {
  setError(null)
  handleDeploymentCreationMutationSuccess({
    returnedData,
    deployments,
    activeDeploymentUuid,
    setIsSubmitting,
    setIsComplete,
    setIsRedeploying,
  })
}

const handleDeploymentCreationMutationSuccess = ({
  returnedData,
  setIsSubmitting,
  setIsComplete,
  setIsRedeploying,
}: HandleMutationProps) => {
  if (!returnedData?.deploymentUrl) {
    // Handle the error, perhaps set some state or throw an error
    throw new Error('Deployment URL is missing')
  }

  setIsSubmitting(false)
  setIsComplete(true)
  setIsRedeploying(false)
}

export const fileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = event => {
      resolve((event.target?.result as ArrayBuffer) || new ArrayBuffer(0))
    }

    reader.onerror = error => {
      reject(error)
    }

    reader.readAsArrayBuffer(file)
  })
}
