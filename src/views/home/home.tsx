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
import logo from '../../assets/logo192-white.png'
import hero from '../../assets/hero.png'
import { GoLock, GoShieldCheck, GoSmiley } from 'react-icons/go'
import React from 'react'

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

export function Home() {
  const theme = useTheme()

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
                Imagine hosting your content with ease, while harnessing the
                power of Web3's decentralization. GhostCloud empowers existing
                "2.0" hosting companies to provide the advantages of
                decentralized hosting to their users, without overwhelming them
                with tokens, wallets, or complex concepts.
              </Text>
              <Stack spacing={6} direction="row">
                <Button as={ReactRouterLink} to="/dashboard" variant="green">
                  Get started
                </Button>
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
              >
                Simplicity Meets Decentralization
              </Heading>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <Feature
                icon={<Icon as={GoSmiley} w={10} h={10} />}
                title="Easy to use"
                text={
                  "GhostCloud is a simple platform that anyone can use, even if they don't have any experience with Web3."
                }
              />
              <Feature
                icon={<Icon as={GoLock} w={10} h={10} />}
                title="Secure"
                text={
                  'GhostCloud uses a decentralized network of servers, making it more secure than traditional hosting solutions.'
                }
              />
              <Feature
                icon={<Icon as={GoShieldCheck} w={10} h={10} />}
                title="Uncompromising"
                text={
                  'GhostCloud is not subject to censorship, so your customers can be sure that their data is safe.'
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
              Web hosting is a stable market with steady growth, while Web3
              holds immense potential for the future. As Web3 continues to
              expand, the demand for streamlined content delivery solutions will
              soar. While competitors exist, GhostCloud stands out by focusing
              on seamlessly integrating with established hosting companies, not
              limiting itself to the smaller Web3 market.
            </Text>
          </Flex>
        </Box>
      </Container>
    </>
  )
}
