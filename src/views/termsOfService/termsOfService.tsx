import { Box, Container, Heading, Link, Text } from '@chakra-ui/react'

export function TermsOfService() {
  return (
    <Container maxW="4xl">
      <Box py={10} px={6}>
        <Heading as="h1" size="xl" mt={6} mb={5}>
          Terms Of Service
        </Heading>
        <Text>
          Welcome to GhostCloud ("we", "us", or "our"). By accessing or using
          our website or application (the "Service"), you agree to be bound by
          these Terms of Service ("Terms"). If you do not agree to these Terms,
          please do not use the Service.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Use of the Service
        </Heading>
        <Text>
          The Service is provided solely for informational and personal use
          purposes. You may not use the Service for any illegal, unauthorized,
          or prohibited activities.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          User Accounts
        </Heading>
        <Text>
          To access certain features or areas of the Service, you may need to
          create a user account. You are responsible for maintaining the
          confidentiality of your account credentials and are fully responsible
          for all activities that occur under your account.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Intellectual Property
        </Heading>
        <Text>
          The Service and its content, including but not limited to text,
          graphics, images, logos, trademarks, and software, are the property of
          GhostCloud and its licensors and are protected by copyright,
          trademark, and other intellectual property laws. You may not use,
          reproduce, modify, distribute, or display any portion of the Service
          without our prior written consent.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Disclaimer of Warranties
        </Heading>
        <Text>
          The Service is provided "as is" and "as available" without warranties
          of any kind, whether express or implied. We do not warrant that the
          Service will be uninterrupted, error-free, or secure. Your use of the
          Service is at your own risk.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Limitation of Liability
        </Heading>
        <Text>
          In no event shall GhostCloud be liable for any indirect, incidental,
          special, consequential, or punitive damages arising out of or in
          connection with your use of the Service or these Terms.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Governing Law
        </Heading>
        <Text>
          These Terms shall be governed by and construed in accordance with the
          law.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Changes to these Terms
        </Heading>
        <Text>
          We reserve the right to update or modify these Terms at any time
          without prior notice. Your continued use of the Service after such
          changes will constitute your acceptance of the revised Terms.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Contact Us
        </Heading>
        <Text>
          If you have any questions or concerns about these Terms, please
          contact us at" "
          <Link href="mailto:ghostcloud@liftedinit.org">
            ghostcloud@liftedinit.org
          </Link>
        </Text>
      </Box>
    </Container>
  )
}
