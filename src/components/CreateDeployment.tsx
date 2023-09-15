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
import { useToast } from '@liftedinit/ui'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BiCheck, BiSolidCloudUpload } from 'react-icons/bi'
import { IoWarning } from 'react-icons/io5'
import { FaExclamation } from 'react-icons/fa'
import {
  Deployment,
  fileToArrayBuffer,
  handleDeploymentCreationSuccess,
  useCreateDeployment,
  useUpdateDeployment,
} from '../features/deployments'
import {
  DeploymentTypes,
  DeploymentSource,
  Archive,
  WebDeployInfo,
  WebDeployParams,
} from '@liftedinit/many-js'
import { useAccountsStore } from '../features/accounts'

const MAX_FILE_SIZE_BYTES = 5242546 // This is the limit supported by the backend, including the envelope and header overhead

interface FormState {
  siteName: string
  siteDescription?: string
  zipFile: File | undefined
  transactionMemo?: string[]
}

const initialFormState = {
  siteName: '',
  siteDescription: '',
  zipFile: undefined,
  transactionMemo: undefined,
}

type CreateDeploymentProps = {
  onClose: () => void
  isOpen: boolean
  deployments: Deployment[]
  activeDeploymentUuid: string
  setDeployments: (deployments: Deployment[]) => void
  isRedeploying: boolean
  setIsRedeploying: (value: boolean) => void
}

export default function CreateDeployment(props: CreateDeploymentProps) {
  const theme = useTheme()
  const toast = useToast()
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        'application/zip': [],
      },
      maxFiles: 1,
      maxSize: MAX_FILE_SIZE_BYTES,
      onDrop: files => {
        setError(null)
        setFormState({
          ...formState,
          zipFile: files[0],
        })
      },
    })
  const [formState, setFormState] = useState<FormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [siteNameLength, setSiteNameLength] = useState(0)
  const [siteDescriptionLength, setSiteDescriptionLength] = useState(0)
  const [transactionMemoLength, setTransactionMemoLength] = useState(0)
  const isValid = !formState.zipFile || !formState.siteName.length

  const account = useAccountsStore(s => s.byId.get(s.activeId))

  const remainingChars = (currentLength: number, maxLength: number) =>
    `${currentLength}/${maxLength}`

  const createDeploymentMutation = useCreateDeployment()
  const updateDeploymentMutation = useUpdateDeployment()

  const handleInputChange = (event: React.FormEvent) => {
    const { name, value } = event.target as HTMLInputElement
    if (name === 'siteName') setSiteNameLength(value.length)
    if (name === 'siteDescription') setSiteDescriptionLength(value.length)
    if (name === 'transactionMemo') setTransactionMemoLength(value.length)

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  useEffect(() => {
    if (!props.isOpen) return

    const foundDeployment = props.deployments.find(
      (deployment: any) => deployment.uuid === props.activeDeploymentUuid,
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
  }, [props.isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleMutation = async (
    data: WebDeployParams,
    isRedeploying: boolean,
    mutations: { create: any; update: any },
    callbacks: { onSuccess: any; onError: any },
  ) => {
    const mutation = isRedeploying ? mutations.update : mutations.create

    mutation.mutate(data, {
      onSuccess: callbacks.onSuccess,
      onError: callbacks.onError,
    })
  }

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
      const memo = formState.transactionMemo
        ? [formState.transactionMemo.toString()]
        : ['']
      const deploymentData = {
        owner: account?.address,
        siteName: formState.siteName,
        siteDescription: formState.siteDescription,
        deploymentSource: {
          type: DeploymentTypes.Archive,
          payload,
        } as DeploymentSource,
        memo,
      }

      await handleMutation(
        deploymentData,
        props.isRedeploying,
        { create: createDeploymentMutation, update: updateDeploymentMutation },
        {
          onSuccess: (returnedData: WebDeployInfo) =>
            handleDeploymentCreationSuccess(setError, {
              returnedData,
              deployments: props.deployments,
              activeDeploymentUuid: props.activeDeploymentUuid,
              setDeployments: props.setDeployments,
              setIsSubmitting,
              setIsComplete,
              setIsRedeploying: props.setIsRedeploying,
            }),
          onError: (error: Error) => {
            setIsSubmitting(false)
            setError(error as Error)
            toast({
              title: 'Error',
              description: (error as Error).message,
              status: 'error',
            })
            props.setIsRedeploying(false)
          },
        },
      )
    }
  }

  const acceptedFileItems = acceptedFiles.map(file => {
    return `${(file as any).path} - ${(file.size / 1024 / 1024).toFixed(1)} MB`
  })

  const handleClose = () => {
    props.onClose()
    setIsComplete(false)
    setError(null)
    setFormState(initialFormState)
  }

  return (
    <Modal isOpen={props.isOpen} onClose={handleClose}>
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
                    maxLength={50}
                  />
                  <Text fontSize="sm" color="gray.500">
                    {remainingChars(siteNameLength, 50)}
                  </Text>
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
                    maxLength={500}
                  />
                  <Text fontSize="sm" color="gray.500">
                    {remainingChars(siteDescriptionLength, 500)}
                  </Text>
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
                    maxLength={500}
                  />
                  <Text fontSize="sm" color="gray.500">
                    {remainingChars(transactionMemoLength, 500)}
                  </Text>
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
                {fileRejections.length > 0 && (
                  <Box mt={4}>
                    {fileRejections.map(rejection => (
                      <Box
                        key={rejection.file.name}
                        color={theme.colors.red[600]}
                        display="flex"
                        alignItems="center"
                      >
                        <Icon as={IoWarning} w={6} h={6} mr={2} />
                        {rejection.errors.map(error => (
                          <Text key={error.code}>{error.message} </Text>
                        ))}
                      </Box>
                    ))}
                  </Box>
                )}
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
