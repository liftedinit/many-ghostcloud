import {
  Box,
  Image,
  Container,
  Stack,
  Text,
  Link as ChakraLink,
  useTheme,
} from '@chakra-ui/react'
import logo from '../assets/logo-white.png'
import manifest from '../assets/manifest-powered.webp'
import { Link as ReactRouterLink } from 'react-router-dom'

export default function Footer() {
  const theme = useTheme()

  return (
    <Box
      sx={{ background: theme.colors.gc.blueBlack, color: theme.colors.white }}
    >
      <Container
        as={Stack}
        maxW="4xl"
        pt={20}
        spacing={4}
        justify="center"
        align="center"
      >
        <Image h={4} src={logo} />
        <Stack
          direction="row"
          spacing={6}
          wrap="wrap"
          justify="center"
          lineHeight={2.5}
        >
          <ChakraLink as={ReactRouterLink} to="/">
            Home
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/dashboard">
            Dashboard
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to="/terms"
            sx={{ whiteSpace: 'nowrap' }}
          >
            Terms Of Service
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to="/privacy"
            sx={{ whiteSpace: 'nowrap' }}
          >
            Privacy Policy
          </ChakraLink>
        </Stack>
      </Container>

      <Container
        as={Stack}
        maxW="4xl"
        pt={10}
        pb={10}
        spacing={4}
        justify="center"
        align="center"
      >
        <Text>
          &copy; {new Date().getUTCFullYear()} GhostCloud. All rights reserved
        </Text>
      </Container>

      <Container
        as={Stack}
        maxW="4xl"
        pb={20}
        spacing={4}
        justify="center"
        align="center"
      >
        <ChakraLink href="https://www.liftedinit.org/hosting" isExternal>
          <Image h="59px" src={manifest} />
        </ChakraLink>
      </Container>
    </Box>
  )
}
