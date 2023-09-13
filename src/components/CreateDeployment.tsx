import {
  Box,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Icon,
  Stack,
  useTheme,
  FormControl,
  FormLabel,
  Heading,
  Textarea,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BiCheck, BiSolidCloudUpload } from 'react-icons/bi'
import { IoWarning } from 'react-icons/io5'
import { FaExclamation } from 'react-icons/fa'
import {
  useCreateDeployment,
  useRemoveDeployment,
  WebDeployInfoWithUuid,
} from '../features/deployments'
import { DeploymentTypes, DeploymentSource, Archive } from '@liftedinit/many-js'
import { useAccountsStore } from '../features/accounts'
import { v5 as uuidv5 } from 'uuid'

interface FormState {
  siteName: string
  siteDescription: string
  zipFile: File | undefined
  transactionMemo: string[]
}

const defaultState = {
  siteName: '',
  siteDescription: '',
  zipFile: undefined,
  transactionMemo: [''],
}

export default function CreateDeployment({
  onClose,
  isOpen,
  deployments,
  activeDeploymentUuid,
  setDeployments,
  isRedeploying,
  setIsRedeploying,
}: {
  onClose: () => void
  isOpen: boolean
  deployments: any
  activeDeploymentUuid: any
  setDeployments: any
  isRedeploying: boolean
  setIsRedeploying: any
}) {
  const theme = useTheme()
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        'application/zip': [],
      },
      maxFiles: 1,
      maxSize: 5242546, // This is the limit supported by the backend, including the envelope and header overhead
      onDrop: files => {
        setFormState({
          ...formState,
          zipFile: files[0],
        })
      },
    })
  const [formState, setFormState] = useState<FormState>(defaultState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const isValid = !formState.zipFile || !formState.siteName.length

  const account = useAccountsStore(s => s.byId.get(s.activeId))

  const createDeploymentMutation = useCreateDeployment()
  const removeDeploymentMutation = useRemoveDeployment()

  const handleInputChange = (event: React.FormEvent) => {
    const { name, value } = event.target as HTMLInputElement
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  useEffect(() => {
    if (!isOpen) return

    const foundDeployment = deployments.find(
      (deployment: any) => deployment.uuid === activeDeploymentUuid,
    )

    if (foundDeployment) {
      setFormState({
        ...formState,
        siteName: foundDeployment.siteName,
        siteDescription: foundDeployment.siteDescription,
        transactionMemo: foundDeployment.transactionMemo,
        zipFile: undefined,
      })
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    if (formState.zipFile) {
      let arrayBuffer: ArrayBuffer
      try {
        arrayBuffer = await fileToArrayBuffer(formState.zipFile)
      } catch (error) {
        setIsSubmitting(false)
        setError(error as Error)
        return
      }
      const payload: Archive = [0, new Map().set(0, arrayBuffer)]
      const deploymentData = {
        owner: account?.address,
        siteName: formState.siteName,
        siteDescription: formState.siteDescription,
        deploymentSource: {
          type: DeploymentTypes.Archive,
          payload,
        } as DeploymentSource,
        memo: [formState.transactionMemo.toString()],
      }

      // TODO: There could be an error between the website removal and the new deployment creation. Handle this.
      //       This operation should be atomic.
      if (isRedeploying) {
        const removeData = {
          owner: account?.address,
          siteName: formState.siteName,
          memo: ['Redeploying'],
        }
        removeDeploymentMutation.mutate(removeData)
        const newDeployments = deployments.filter(
          (deployment: any) => deployment.uuid !== activeDeploymentUuid,
        )
        setDeployments(newDeployments)
      }

      createDeploymentMutation.mutate(deploymentData, {
        onSuccess: returnedData => {
          if (!returnedData?.deploymentUrl) {
            // Handle the error, perhaps set some state or throw an error
            throw new Error('Deployment URL is missing')
          }

          const returnedDataWithUuid: WebDeployInfoWithUuid = {
            uuid: uuidv5(returnedData.deploymentUrl, uuidv5.URL),
            ...returnedData,
          }

          setDeployments([...deployments, returnedDataWithUuid])

          setIsSubmitting(false)
          setIsComplete(true)
          setIsRedeploying(false)
        },
        onError: error => {
          setIsSubmitting(false)
          setError(error as Error)
          setIsRedeploying(false)
        },
      })
    } else {
      setIsSubmitting(false)
      setError(new Error('No zip file selected'))
      setIsRedeploying(false)
    }
  }

  const acceptedFileItems = acceptedFiles.map(file => {
    return `${(file as any).path} - ${(file.size / 1024 / 1024).toFixed(1)} MB`
  })

  const fileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
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

  const handleClose = () => {
    onClose()
    setIsComplete(false)
    setError(null)
    setFormState(defaultState)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Deployment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isComplete ? (
            <Stack spacing={5}>
              <Box display="flex" justifyContent="center" justifyItems="center">
                <Box
                  as="span"
                  w={35}
                  h={35}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color={theme.colors.white}
                  rounded="full"
                  bg={error ? theme.colors.red[400] : theme.colors.green[400]}
                  mr={2}
                >
                  {error ? (
                    <Icon as={FaExclamation} w={25} h={25} />
                  ) : (
                    <Icon as={BiCheck} w={35} h={35} />
                  )}
                </Box>
              </Box>
              <Box display="flex" justifyContent="center" justifyItems="center">
                <Heading>{error ? 'Error' : 'Success!'}</Heading>
              </Box>
              <Text align="center">
                {error
                  ? 'Something went wrong. Please try again.'
                  : 'Your upload is complete.'}
              </Text>
              <Box
                display="flex"
                justifyContent="center"
                justifyItems="center"
                mt={10}
              >
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  onClick={handleClose}
                  px={10}
                >
                  Close
                </Button>
              </Box>
            </Stack>
          ) : (
            <form onSubmit={handleSubmit}>
              <Stack spacing={5}>
                <FormControl isRequired>
                  <FormLabel>Site Name</FormLabel>
                  <Input
                    name="siteName"
                    placeholder=""
                    size="lg"
                    value={formState.siteName}
                    onChange={handleInputChange}
                    borderColor={theme.colors.gray[400]}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Site Description</FormLabel>
                  <Textarea
                    name="siteDescription"
                    placeholder=""
                    size="lg"
                    value={formState.siteDescription}
                    onChange={handleInputChange}
                    borderColor={theme.colors.gray[400]}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Transaction Memo</FormLabel>
                  <Input
                    name="transactionMemo"
                    placeholder=""
                    size="lg"
                    value={formState.transactionMemo}
                    onChange={handleInputChange}
                    borderColor={theme.colors.gray[400]}
                  />
                </FormControl>

                <Box
                  {...getRootProps()}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100px',
                    padding: 4,
                    borderWidth: 1,
                    borderRadius: 2,
                    borderColor: theme.colors.gray[100],
                    backgroundColor: theme.colors.gray[50],
                    color: theme.colors.gray[500],
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <input {...getInputProps()} name="zipFile" />
                  <Icon
                    as={BiSolidCloudUpload}
                    w={30}
                    h={30}
                    color={theme.colors.gray[500]}
                    mb={3}
                  />
                  <Text align="center">
                    Drag a zip file here, or click to select a file
                  </Text>
                </Box>
                {formState.zipFile ? (
                  <Text
                    display="flex"
                    mt={4}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      as="span"
                      w={5}
                      h={5}
                      display="flex"
                      justifyContent="center"
                      color={theme.colors.white}
                      rounded="full"
                      bg={theme.colors.green[400]}
                      mr={2}
                    >
                      <Icon as={BiCheck} w={5} h={5} />
                    </Box>
                    {acceptedFileItems}
                  </Text>
                ) : null}
                {fileRejections.length ? (
                  <Text
                    display="flex"
                    mt={4}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      as={IoWarning}
                      w={6}
                      h={6}
                      mr={2}
                      color={theme.colors.red[600]}
                    />
                    Please only select one zip file that is less than 5MB in
                    size.
                  </Text>
                ) : null}
              </Stack>
              <Box
                display="flex"
                justifyContent="center"
                justifyItems="center"
                mt={10}
              >
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isValid}
                  px={10}
                >
                  Save
                </Button>
              </Box>
            </form>
          )}
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
