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
  const [deployments, setDeployments] = useState([
    {
      uuid: 'de35cecd-4be7-4d7c-ae53-87da0dabdc80',
      siteName: 'this site name is rather long and stuff',
      siteDescription:
        'Curabitur id leo eu erat pretium consequat. Nulla metus tortor, dignissim et massa vel, faucibus consectetur turpis.',
      siteUrl:
        'https://my_super_website.mae3b6s3erledkb752cxxf52o4mw6gipupeaqpd63wdpv5narj.ghostcloud.org',
      transactionMemo: '',
    },
    {
      uuid: '2ed2cdd7-33a7-4dbe-a45d-8d456d84e178',
      siteName: 'abcdef',
      siteDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      siteUrl:
        'https://my_super_website.mae3b6s3erledkb752cxxf52o4mw6gipupeaqpd63wdpv5narj.ghostcloud.org',
      transactionMemo: 'Duis auctor mauris eget sapien dignissim consectetur',
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
  const navigate = useNavigate()

  useEffect(() => {
    isAnonymous && navigate('/')
  }, [isAnonymous, navigate])

  if (isAnonymous) {
    return null
  }

  return (
    <>
      <Container maxWidth="100%">
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
              deployments={deployments}
              onDelete={handleDeleteDeployment}
              onEdit={handleEditDeployment}
            />
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
