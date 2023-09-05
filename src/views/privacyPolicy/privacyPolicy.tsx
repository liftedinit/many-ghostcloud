import { Box, Container, Heading, Link, Text } from '@chakra-ui/react'

export function PrivacyPolicy() {
  return (
    <Container maxW="4xl">
      <Box py={10} px={6}>
        <Heading as="h1" size="xl" mt={6} mb={5}>
          Privacy Policy
        </Heading>
        <Text>
          This Privacy Policy describes how GhostCloud ("we", "us", or "our")
          collects, uses, and shares information when you use our website or
          application (collectively, the "Service").
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Information We Collect
        </Heading>
        <Text>
          We may collect certain personal information from you when you use the
          Service, such as name, email address
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          How We Use Your Information
        </Heading>
        <Text>
          We use the information we collect for various purposes, including but
          not limited to providing and improving the Service and sending
          notifications.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Information Sharing and Disclosure
        </Heading>
        <Text>
          We may share your information with third parties if required by law.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Cookies and Similar Technologies
        </Heading>
        <Text>
          We may use cookies and similar technologies to collect information and
          enhance your experience on the Service.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Your Choices
        </Heading>
        <Text>
          You may have certain rights and choices regarding the information we
          collect about you. You have access to your data.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Security
        </Heading>
        <Text>
          We take appropriate security measures to protect your information from
          unauthorized access or disclosure.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Updates to this Privacy Policy
        </Heading>
        <Text>
          We may update this Privacy Policy from time to time, and any changes
          will be effective when posted on this page.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Contact Us
        </Heading>
        <Text>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at" "
          <Link href="mailto:info@ghostcloud.com">info@ghostcloud.com</Link>
        </Text>
      </Box>
    </Container>
  )
}
