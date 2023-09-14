import React from 'react'
import { useNetworkContext } from '../../features/network/network-provider'
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Icon,
  useTheme,
} from '@chakra-ui/react'
import { BiCheck } from 'react-icons/bi'
import { GoAlertFill } from 'react-icons/go'

export function Status() {
  const theme = useTheme()
  const [error, setError] = React.useState(false)
  const [updated, setUpdated] = React.useState('')
  const [activeNetwork, ,] = useNetworkContext()

  React.useEffect(() => {
    const getHeartbeat = async () => {
      try {
        await activeNetwork?.base?.heartbeat()
        setError(false)
      } catch (error) {
        setError(true)
      }
      setUpdated(new Date().toLocaleString())
    }
    getHeartbeat()

    const heartbeatInterval = setInterval(() => {
      getHeartbeat()
    }, 30000)

    return () => {
      clearInterval(heartbeatInterval)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container maxW="4xl" minH={'80vh'}>
      <Box py={8}>
        <Heading as="h2" size="md" my={5}>
          Status
        </Heading>
        <Flex
          align="center"
          bg={error ? theme.colors.yellow[500] : theme.colors.green[400]}
          borderRadius="md"
          py={2}
          px={4}
          w="fit-content"
        >
          <Icon
            as={error ? GoAlertFill : BiCheck}
            w={8}
            h={8}
            color="white"
            mr={2}
          />

          <Heading as="h4" size="sm" my={2} color="white">
            {error ? 'Systems Degraded' : 'All Systems Operational'}
          </Heading>
        </Flex>
        <Box mt={5}>
          <Text color={theme.colors.gray[500]} fontStyle={'italic'}>
            {updated}
          </Text>
        </Box>
      </Box>
    </Container>
  )
}
