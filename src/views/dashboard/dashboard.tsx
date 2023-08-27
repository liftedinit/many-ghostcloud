import { Fragment, useState } from 'react'
import { Flex, PlusIcon } from '@liftedinit/ui'
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Text,
  Heading,
  useMediaQuery,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react'
import { useAccountsStore } from '../../features/accounts'
import { AnonymousIdentity } from '@liftedinit/many-js'
import { UseDisclosureProps } from '@chakra-ui/hooks/src/use-disclosure'
import CreateDeployment from '../../components/CreateDeployment'
import ConfirmDelete from '../../components/ConfirmDelete'

export function Dashboard(props: { modalDisclosure?: UseDisclosureProps }) {
  const onOpenAddAccount = props.modalDisclosure?.onOpen || (() => {})
  const account = useAccountsStore(s => s.byId.get(s.activeId))
  const isAnonymous = account?.identity instanceof AnonymousIdentity
  const {
    isOpen: createDeploymentIsOpen,
    onOpen: createDeploymentOnOpen,
    onClose: createDeploymentOnClose,
  } = useDisclosure()
  const {
    isOpen: confirmDeleteIsOpen,
    onOpen: confirmDeleteOnOpen,
    onClose: confirmDeleteOnClose,
  } = useDisclosure()
  const theme = useTheme()
  const [isMobile] = useMediaQuery('(max-width: 640px)')
  const [deployments, setDeployments] = useState([
    {
      uuid: 'de35cecd-4be7-4d7c-ae53-87da0dabdc80',
      domain: 'www.foobarbaz.com',
      status: 'Active',
    },
    {
      uuid: '2ed2cdd7-33a7-4dbe-a45d-8d456d84e178',
      domain: 'www.abcd.com',
      status: 'Active',
    },
  ])
  const [activeDeploymentUuid, setActiveDeploymentUuid] = useState('')

  const handleDeleteDeployment = (uuid: string) => {
    setActiveDeploymentUuid(uuid)
    confirmDeleteOnOpen()
  }

  const handleEditDeployment = (uuid: string) => {
    setActiveDeploymentUuid(uuid)
    createDeploymentOnOpen()
  }

  if (isAnonymous) {
    return (
      <Container maxW="4xl" minH="80vh">
        <Box
          width={{ base: '100%', md: '40vw' }}
          my={10}
          mx="auto"
          py={8}
          px={4}
          sx={{
            border: `1px solid ${theme.colors.gray[300]}`,
            borderRadius: 4,
          }}
          justifyContent="center"
        >
          <Flex justifyContent="center">
            <Heading as="h2" size="md" mb={5}>
              Log in to continue
            </Heading>
          </Flex>

          <Flex justifyContent="center">
            <Button onClick={onOpenAddAccount}>Add Account</Button>
          </Flex>
        </Box>
      </Container>
    )
  }

  return (
    <>
      <Container maxWidth="100%">
        <Container maxW="4xl" minH={'80vh'}>
          <Box mt={4}>Logged in as {account?.name}</Box>

          <Box py={8}>
            <Grid
              templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
              gap={0}
              mt={4}
            >
              <GridItem colSpan={1}>
                <Heading as="h2" size="md" my={5}>
                  Deployments
                </Heading>
              </GridItem>
              <GridItem
                colSpan={1}
                display="flex"
                justifyContent={isMobile ? 'flex-start' : 'flex-end'}
                alignItems="center"
              >
                <Button
                  onClick={() => {
                    createDeploymentOnOpen()
                    setActiveDeploymentUuid('')
                  }}
                  leftIcon={<PlusIcon />}
                >
                  Create Deployment
                </Button>
              </GridItem>
            </Grid>

            <Grid
              templateColumns={`repeat(${isMobile ? 1 : 4}, 1fr)`}
              gap={0}
              mt={4}
              mb={40}
            >
              <GridItem
                colSpan={2}
                borderBottom={`1px solid ${theme.colors.gray[200]}`}
                py={2}
                display={isMobile ? 'none' : 'flex'}
                alignItems="center"
              >
                <Text fontWeight="bold">Domain</Text>
              </GridItem>
              <GridItem
                colSpan={1}
                borderBottom={`1px solid ${theme.colors.gray[200]}`}
                py={2}
                display={isMobile ? 'none' : 'flex'}
                alignItems="center"
              >
                <Text fontWeight="bold">Status</Text>
              </GridItem>
              <GridItem
                colSpan={1}
                borderBottom={`1px solid ${theme.colors.gray[200]}`}
                display={isMobile ? 'none' : 'flex'}
              ></GridItem>
              {deployments.map(({ uuid, domain, status }) => {
                return (
                  <Fragment key={uuid}>
                    <GridItem
                      colSpan={2}
                      borderBottom={
                        isMobile
                          ? 'none'
                          : `1px solid ${theme.colors.gray[200]}`
                      }
                      py={2}
                      display="flex"
                      alignItems="center"
                      pt={isMobile ? 4 : 2}
                    >
                      {domain}
                    </GridItem>
                    <GridItem
                      colSpan={1}
                      borderBottom={
                        isMobile
                          ? 'none'
                          : `1px solid ${theme.colors.gray[200]}`
                      }
                      py={2}
                      display="flex"
                      alignItems="center"
                    >
                      {isMobile && 'Status: '}
                      {status}
                    </GridItem>
                    <GridItem
                      colSpan={1}
                      display={isMobile ? 'flex' : 'none'}
                    ></GridItem>
                    <GridItem
                      colSpan={1}
                      borderBottom={`1px solid ${theme.colors.gray[200]}`}
                      py={2}
                      display="flex"
                      alignItems="center"
                      justifyContent={isMobile ? 'flex-start' : 'flex-end'}
                    >
                      <Button
                        onClick={() => handleEditDeployment(uuid)}
                        size="sm"
                        fontWeight="normal"
                        mr={3}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteDeployment(uuid)}
                        size="sm"
                        fontWeight="normal"
                      >
                        Delete
                      </Button>
                    </GridItem>
                  </Fragment>
                )
              })}
            </Grid>
          </Box>

          <CreateDeployment
            isOpen={createDeploymentIsOpen}
            onClose={createDeploymentOnClose}
            deployments={deployments}
            activeDeploymentUuid={activeDeploymentUuid}
            setDeployments={setDeployments}
          />
          <ConfirmDelete
            isOpen={confirmDeleteIsOpen}
            onClose={confirmDeleteOnClose}
            deployments={deployments}
            activeDeploymentUuid={activeDeploymentUuid}
            setDeployments={setDeployments}
          />
        </Container>
      </Container>
    </>
  )
}
