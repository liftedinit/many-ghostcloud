import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusIcon } from '@liftedinit/ui'
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  useMediaQuery,
  useDisclosure,
} from '@chakra-ui/react'
import { useAccountsStore } from '../../features/accounts'
import { AnonymousIdentity } from '@liftedinit/many-js'
import CreateDeployment from '../../components/CreateDeployment'
import ConfirmDelete from '../../components/ConfirmDelete'
import DeploymentsList from '../../components/DeploymentsList'
import { useDeploymentList } from '../../features/deployments'

export function Dashboard() {
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

  const [isMobile] = useMediaQuery('(max-width: 640px)')
  const [activeDeploymentUuid, setActiveDeploymentUuid] = useState('')
  const [isRedeploying, setIsRedeploying] = useState(false)

  // TODO: Handle error
  const {
    deployments,
    setDeployments,
    visibleDeployments,
    nextBtnProps,
    prevBtnProps,
    numPages,
    total,
    currentPage,
  } = useDeploymentList({
    address: account?.address,
  })

  const handleDeleteDeployment = (uuid: string) => {
    setActiveDeploymentUuid(uuid)
    confirmDeleteOnOpen()
  }

  const handleEditDeployment = (uuid: string) => {
    setActiveDeploymentUuid(uuid)
    setIsRedeploying(true)
    createDeploymentOnOpen()
  }
  const navigate = useNavigate()

  useEffect(() => {
    isAnonymous && navigate('/')
  }, [isAnonymous, navigate])

  if (isAnonymous) {
    return null
  }

  return (
    <Container maxW="4xl" minH={'80vh'}>
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

        <DeploymentsList
          deployments={visibleDeployments}
          onDelete={handleDeleteDeployment}
          onEdit={handleEditDeployment}
          nextBtnProps={nextBtnProps}
          prevBtnProps={prevBtnProps}
          numPages={numPages}
          total={total}
          currentPage={currentPage}
        />
      </Box>

      <CreateDeployment
        isOpen={createDeploymentIsOpen}
        onClose={createDeploymentOnClose}
        deployments={deployments}
        activeDeploymentUuid={activeDeploymentUuid}
        setDeployments={setDeployments}
        isRedeploying={isRedeploying}
        setIsRedeploying={setIsRedeploying}
      />
      <ConfirmDelete
        isOpen={confirmDeleteIsOpen}
        onClose={confirmDeleteOnClose}
        deployments={deployments}
        activeDeploymentUuid={activeDeploymentUuid}
        setDeployments={setDeployments}
      />
    </Container>
  )
}
