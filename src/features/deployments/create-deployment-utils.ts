import { Deployment, WebDeployInfoWithUuid } from './types'
import { WebDeployInfo } from '@liftedinit/many-js'
import { v5 as uuidv5 } from 'uuid'

type HandleMutationProps = {
  returnedData: WebDeployInfo
  deployments: Deployment[]
  activeDeploymentUuid: string
  setDeployments: (deployments: Deployment[]) => void
  setIsSubmitting: (value: boolean) => void
  setIsComplete: (value: boolean) => void
  setIsRedeploying: (value: boolean) => void
}

export const handleDeploymentCreationSuccess = ({
  returnedData,
  deployments,
  activeDeploymentUuid,
  setDeployments,
  setIsSubmitting,
  setIsComplete,
  setIsRedeploying,
}: HandleMutationProps) => {
  handleDeploymentCreationMutationSuccess({
    returnedData,
    deployments,
    activeDeploymentUuid,
    setDeployments,
    setIsSubmitting,
    setIsComplete,
    setIsRedeploying,
  })
}

const handleDeploymentCreationMutationSuccess = ({
  returnedData,
  deployments,
  activeDeploymentUuid,
  setDeployments,
  setIsSubmitting,
  setIsComplete,
  setIsRedeploying,
}: HandleMutationProps) => {
  if (!returnedData?.deploymentUrl) {
    // Handle the error, perhaps set some state or throw an error
    throw new Error('Deployment URL is missing')
  }

  const returnedDataWithUuid: WebDeployInfoWithUuid = {
    uuid: uuidv5(returnedData.deploymentUrl, uuidv5.URL),
    ...returnedData,
  }

  const newDeployments = deployments.filter(
    (deployment: any) => deployment.uuid !== activeDeploymentUuid,
  )

  setDeployments([...newDeployments, returnedDataWithUuid])

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
