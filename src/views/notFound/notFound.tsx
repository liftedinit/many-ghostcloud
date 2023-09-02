import { Box, Flex, Heading } from '@chakra-ui/react'
import { GoAlertFill } from 'react-icons/go'

export function NotFound() {
  return (
    <Box textAlign="center" py="200px" px={6}>
      <Flex justifyContent="center">
        <GoAlertFill size="50px" />
      </Flex>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Page Not Found
      </Heading>
    </Box>
  )
}
