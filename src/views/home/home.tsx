import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  useTheme,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import logo from 'assets/logo192-white.png'
import hero from 'assets/hero.png'
import { GoLock, GoShieldCheck, GoSmiley } from 'react-icons/go'
import React from 'react'
import { useAccountsStore } from '../../features/accounts'
import { AnonymousIdentity } from '@liftedinit/many-js'

interface FeatureProps {
  title: string
  text: string
  icon: React.ReactElement
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  const theme = useTheme()

  return (
    <Stack>
      <Flex align="center" justify="center">
        <Flex
          w={16}
          h={16}
          align="center"
          justify="center"
          color={theme.colors.white}
          rounded="full"
          bg={theme.colors.gc.blueBlack}
          mb={1}
        >
          {icon}
        </Flex>
      </Flex>

      <Flex align="center" justify="center">
        <Heading
          fontSize={{ base: '1xl', sm: '1xl', md: '2xl' }}
          sx={{ textAlign: 'center' }}
        >
          {title}
        </Heading>
      </Flex>
      <Flex align="center" justify="center">
        <Text align="center">{text}</Text>
      </Flex>
    </Stack>
  )
}

export function Home({ onAddModalOpen }: any) {
  const theme = useTheme()
  const account = useAccountsStore(s => s.byId.get(s.activeId))
  const isAnonymous = account?.identity instanceof AnonymousIdentity

  return (
    <>
      <Container
        maxWidth="100%"
        p={0}
        sx={{
          background: `no-repeat center url(${hero})`,
          backgroundSize: 'cover',
          color: theme.colors.white,
        }}
      >
        <Container maxW="4xl">
          <Box py={8} px={4}>
            <Stack
              textAlign="center"
              align="center"
              spacing={{ base: 8, md: 10 }}
              py={10}
            >
              <Image h="50px" src={logo} />
              <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
                lineHeight="110%"
              >
                Decentralized Web Hosting for Humans
              </Heading>
              <Text maxW="3xl">
                Discover the seamless convergence of simplicity and Web3’s
                robust decentralization with GhostCloud. This platform is a
                gateway for "2.0" hosting entities to offer the groundbreaking
                benefits of decentralized hosting without the complexities of
                tokens or wallets. With GhostCloud, experience innovation and
                user-friendly accessibility, embracing the next era of web
                technology effortlessly.
              </Text>
              <Stack spacing={6} direction="row">
                {isAnonymous ? (
                  <Button onClick={() => onAddModalOpen()} variant="green">
                    Get started
                  </Button>
                ) : (
                  <Button as={ReactRouterLink} to="/dashboard" variant="green">
                    Get started
                  </Button>
                )}
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Container>

      <Container maxW="100%" sx={{ background: theme.colors.gray[100] }}>
        <Container maxW="4xl">
          <Box py="80px" px={4}>
            <Flex align="center" justify="center" sx={{ mb: 12 }}>
              <Heading
                fontWeight={600}
                fontSize={{ base: '1xl', sm: '2xl', md: '3xl' }}
                lineHeight="110%"
                textAlign="center"
              >
                Simplicity Meets Decentralization
              </Heading>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <Feature
                icon={<Icon as={GoSmiley} w={10} h={10} />}
                title="Easy to use"
                text={
                  'GhostCloud provides a user-friendly interface, making Web3 accessible to everyone, regardless of their experience.'
                }
              />
              <Feature
                icon={<Icon as={GoLock} w={10} h={10} />}
                title="Secure"
                text={
                  'GhostCloud leverages a decentralized server network, offering enhanced security compared to conventional hosting solutions.'
                }
              />
              <Feature
                icon={<Icon as={GoShieldCheck} w={10} h={10} />}
                title="Uncompromising"
                text={
                  "GhostCloud stands resistant to censorship, ensuring your customers' data remains secure and unaltered."
                }
              />
            </SimpleGrid>
          </Box>
        </Container>
      </Container>
      <Container maxW="4xl">
        <Box mt={8} py={8} px={4}>
          <Flex align="center" justify="center">
            <Heading
              fontWeight={600}
              fontSize={{ base: '1xl', sm: '2xl', md: '3xl' }}
              lineHeight="110%"
            >
              Why GhostCloud?
            </Heading>
          </Flex>

          <Flex align="center" justify="center" p={6}>
            <Text maxW="3xl" align="center">
              Explore the fusion of the stable, steadily growing market of web
              hosting with the boundless potential of Web3 through GhostCloud.
              As the horizons of Web3 broaden, the quest for streamlined,
              efficient content delivery solutions is intensifying. GhostCloud
              distinguishes itself in this competitive landscape by specializing
              in seamless integrations with established hosting providers,
              transcending the confines of the nascent Web3 market. Opt for
              GhostCloud and be where innovation meets established market
              stability!
            </Text>
          </Flex>
        </Box>
      </Container>
    </>
  )
}
