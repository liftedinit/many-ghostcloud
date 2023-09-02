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
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BiCheck, BiSolidCloudUpload } from 'react-icons/bi'
import { IoWarning } from 'react-icons/io5'
import { FaExclamation } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'

interface FormState {
  siteName: string
  siteDescription: string
  zipFile: File | undefined
  transactionMemo: string
}

const defaultState = {
  siteName: '',
  siteDescription: '',
  zipFile: undefined,
  transactionMemo: '',
}

export default function CreateDeployment({
  onClose,
  isOpen,
  deployments,
  activeDeploymentUuid,
  setDeployments,
}: {
  onClose: () => void
  isOpen: boolean
  deployments: any
  activeDeploymentUuid: any
  setDeployments: any
}) {
  const theme = useTheme()
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        'application/zip': [],
      },
      maxFiles: 1,
      maxSize: 5242880,
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
  const [isRedeploying, setIsRedeploying] = useState(false)
  const [error, setError] = useState(false)
  const isValid = !formState.zipFile || !formState.siteName.length

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
      setIsRedeploying(true)
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)

      let deploymentsClone = structuredClone(deployments)

      let deployment = {
        uuid: uuidv4(),
        siteName: formState.siteName,
        siteDescription: formState.siteDescription,
        siteUrl:
          'https://my_super_website.mae3b6s3erledkb752cxxf52o4mw6gipupeaqpd63wdpv5narj.ghostcloud.org',
        transactionMemo: formState.transactionMemo,
      }

      if (isRedeploying) {
        deploymentsClone = deploymentsClone.filter(
          (deployment: any) => deployment.uuid !== activeDeploymentUuid,
        )
        deployment.uuid = activeDeploymentUuid
      }

      setDeployments([...deploymentsClone, deployment])
    }, 1000)

    // const formData = new FormData()
    // formData.append('siteName', formState.siteName)
    // formData.append('siteDescription', formState.siteDescription)
    // formData.append('transactionMemo', formState.transactionMemo)
    // if (formState.zipFile) {
    //   formData.append('file', formState.zipFile, formState.zipFile.name)
    // }
    // fetch('http://server.com/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then(response => response.json())
    //   .then(json => {
    //     setDeployments([
    //       ...deployments,
    //       {
    //         uuid: json.uuid,
    //         siteName: formState.siteName,
    //         siteUrl: json.url,
    //         siteDescription: formState.siteDescription,
    //         transactionMemo: formState.transactionMemo,
    //       },
    //     ])
    //     setIsSubmitting(false)
    //     setIsComplete(true)
    //   })
    //   .catch(() => {
    //     setIsSubmitting(false)
    //     setIsComplete(true)
    //     setError(true)
    //   })
  }

  const acceptedFileItems = acceptedFiles.map(file => {
    return `${(file as any).path} - ${(file.size / 1024 / 1024).toFixed(1)} MB`
  })

  const handleClose = () => {
    onClose()
    setIsComplete(false)
    setError(false)
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
