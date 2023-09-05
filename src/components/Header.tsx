import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  IconButton,
  useDisclosure,
  Stack,
  Link as ChakraLink,
  useTheme,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { IoMdMenu, IoMdClose } from 'react-icons/io'

import logo from '../assets/logo-black.png'

interface Props {
  children: React.ReactNode
  href: string
  onClose: () => void
}

const Links = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
]

const NavLink = (props: Props) => {
  const { children, href, onClose } = props

  return (
    <Box
      as={ReactRouterLink}
      px={2}
      py={1}
      rounded="md"
      to={href}
      onClick={() => onClose()}
    >
      {children}
    </Box>
  )
}

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const theme = useTheme()

  return (
    <Container
      maxWidth="100%"
      sx={{ borderBottom: `1px solid ${theme.colors.gray[300]}` }}
      data-testid="header"
    >
      <Container maxW="4xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="lg"
            icon={isOpen ? <IoMdClose /> : <IoMdMenu />}
            aria-label="Open Menu"
            onClick={isOpen ? onClose : onOpen}
            bg={theme.colors.white}
            sx={{
              display: { base: 'flex', md: 'none' },
              justifyContent: 'center',
            }}
          />
          <HStack alignItems="center" sx={{ 'a:focus': { boxShadow: 'none' } }}>
            <ChakraLink as={ReactRouterLink} to="/">
              <Image h={4} src={logo} sx={{ minWidth: '200px' }} />
            </ChakraLink>
          </HStack>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Box
              as={ReactRouterLink}
              to="/dashboard"
              sx={{ fontWeight: 'bold' }}
            >
              Dashboard
            </Box>
          </HStack>
          <Flex
            alignItems="center"
            sx={{
              display: { base: 'flex', md: 'none' },
              width: 14,
            }}
          ></Flex>
        </Flex>

        {isOpen ? (
          <Box
            display={{ md: 'none' }}
            sx={{
              position: 'relative',
            }}
          >
            <Box
              display={{ md: 'none' }}
              sx={{
                py: 4,
                width: '200px',
                borderRadius: 2,
                background: theme.colors.gray[50],
                position: 'absolute',
                boxShadow: '0 2px 3px 1px rgba(0, 0, 0, 0.06)',
              }}
            >
              <Stack as="nav" spacing={4}>
                {Links.map(({ label, href }) => (
                  <NavLink key={`nav-${label}`} href={href} onClose={onClose}>
                    {label}
                  </NavLink>
                ))}
              </Stack>
            </Box>
          </Box>
        ) : null}
      </Container>
    </Container>
  )
}
