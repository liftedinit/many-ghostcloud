import { Box, Icon, Tooltip, useTheme } from '@chakra-ui/react'
import { BiInfoCircle } from 'react-icons/bi'

export const tips = {
  manyAddress:
    'A unique address associated with your account that identifies you within the many network.',
  siteName: 'The randomly generated identifier for your deployment.',
  siteDescription:
    'A description for your deployment. This must be between 0-500 characters in length.',
  transactionMemo: 'A string associated with a transaction in Web3',
  deploymentFile:
    'Select a zip file less that 5MB in size which contains your site build. This archive must contain an index.html file in the root.',
  domain:
    'The custom domain name you would like to use for your deployment. This must be between 0-253 characters in length.',
}

type TipKeys = keyof typeof tips

type InfoProps = {
  id: TipKeys
}

export default function Info({ id }: InfoProps) {
  const theme = useTheme()

  return (
    <Tooltip label={tips[id]}>
      <Box as="span">
        <Icon
          data-testid={`info-${id}`}
          as={BiInfoCircle}
          boxSize={4}
          color={theme.colors.gray[500]}
        />
      </Box>
    </Tooltip>
  )
}
