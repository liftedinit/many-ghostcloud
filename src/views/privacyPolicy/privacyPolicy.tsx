import { Box, Container, Heading, Link, Text } from '@chakra-ui/react'

export function PrivacyPolicy() {
  return (
    <Container maxW="4xl">
      <Box py={10} px={6}>
        <Heading as="h1" size="xl" mt={6} mb={5}>
          Privacy Policy
        </Heading>
        <Text>
          This Privacy Policy outlines the procedures and practices of
          GhostCloud ("we", "us", or "our") regarding the collection, use, and
          sharing of your information when you interact with our website or
          application (collectively, the "Service").
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Information We Collect
        </Heading>
        <Text>
          When you utilize our Service, we may gather personal information
          including, but not limited to, your name and email address. This data
          enables us to facilitate enhanced interaction within our Service and
          understand our user base better.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          How We Use Your Information
        </Heading>
        <Text>
          The information we acquire is pivotal for various purposes. It allows
          us to provide, maintain, and improve our Service, ensuring an
          optimized and tailored user experience. Additionally, we utilize this
          information to send you notifications and to communicate with you, if
          necessary, about the Service.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Information Sharing and Disclosure
        </Heading>
        <Text>
          While we value your privacy, we may disclose your information to third
          parties if mandated by law or if it is essential for the execution of
          our Service. We will endeavor to inform you whenever your information
          is shared, wherever possible, unless prohibited by law.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Cookies and Similar Technologies
        </Heading>
        <Text>
          To augment your experience and collect information about your
          interactions with the Service, we employ cookies and analogous
          technologies. This allows us to understand user preferences and adjust
          our Service accordingly, ensuring a smoother and more intuitive user
          experience.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Your Choices
        </Heading>
        <Text>
          We acknowledge your rights and choices regarding your personal
          information. You have the right to access, modify, or delete your data
          and to opt out of certain practices. Please review your account
          settings or contact us directly to exercise these rights.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Security
        </Heading>
        <Text>
          Protecting your information is our priority. We implement suitable
          security measures to safeguard your information from unauthorized
          access, alteration, disclosure, or destruction. However, please be
          aware that no security measures are perfect or impenetrable.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Updates to this Privacy Policy
        </Heading>
        <Text>
          This Privacy Policy may undergo modifications periodically. We advise
          you to review it regularly. The revised policy will be effective
          immediately upon being posted on this page, and your continued use of
          the Service signifies your acceptance of such changes.
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Contact Us
        </Heading>
        <Text>
          If you have questions, concerns, or suggestions regarding this Privacy
          Policy, we welcome you to contact us at{' '}
          <Link href="mailto:ghostcloud@liftedinit.org">
            ghostcloud@liftedinit.org
          </Link>
          . We are committed to addressing your concerns to the best of our
          ability.
        </Text>
      </Box>
    </Container>
  )
}
