import { Fragment } from 'react'
import {
  Box,
  Grid,
  GridItem,
  Button,
  Text,
  Link,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@chakra-ui/react'

const Td = (props: any) => {
  const { label, value } = props
  const theme = useTheme()
  const [isMobile] = useMediaQuery('(max-width: 640px)')

  return (
    <GridItem
      colSpan={1}
      borderBottom={isMobile ? 'none' : `1px solid ${theme.colors.gray[200]}`}
      py={2}
      display="flex"
      alignItems="center"
      minW={0}
      pr={3}
    >
      {isMobile ? (
        <Box>
          <Text fontWeight="bold">{label}</Text>
          <Text>
            {label === 'URL' ? (
              <Link
                href={value}
                sx={{
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '270px',
                }}
              >
                {value.replace('https://', '')}
              </Link>
            ) : (
              <>{value}</>
            )}
          </Text>
        </Box>
      ) : (
        <Tooltip
          label={label === 'URL' ? value.replace('https://', '') : value}
          aria-label="A tooltip"
          openDelay={500}
        >
          <Text
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {label === 'URL' ? (
              <Link href={value}>{value.replace('https://', '')}</Link>
            ) : (
              <>{value}</>
            )}
          </Text>
        </Tooltip>
      )}
    </GridItem>
  )
}

export default function DeploymentsList(props: any) {
  const { deployments, onDelete, onEdit } = props
  const theme = useTheme()
  const [isMobile] = useMediaQuery('(max-width: 640px)')

  return (
    <Grid
      templateColumns={`repeat(${isMobile ? 1 : 4}, 1fr)`}
      gap={0}
      mt={4}
      mb={40}
    >
      <GridItem
        colSpan={1}
        borderBottom={`1px solid ${theme.colors.gray[200]}`}
        py={2}
        display={isMobile ? 'none' : 'flex'}
        alignItems="center"
      >
        <Text fontWeight="bold">Name</Text>
      </GridItem>
      <GridItem
        colSpan={1}
        borderBottom={`1px solid ${theme.colors.gray[200]}`}
        py={2}
        display={isMobile ? 'none' : 'flex'}
        alignItems="center"
      >
        <Text fontWeight="bold">Description</Text>
      </GridItem>
      <GridItem
        colSpan={1}
        borderBottom={`1px solid ${theme.colors.gray[200]}`}
        py={2}
        display={isMobile ? 'none' : 'flex'}
        alignItems="center"
      >
        <Text fontWeight="bold">URL</Text>
      </GridItem>
      <GridItem
        colSpan={1}
        borderBottom={`1px solid ${theme.colors.gray[200]}`}
        display={isMobile ? 'none' : 'flex'}
      ></GridItem>
      {deployments.map((deployment: any) => {
        const { uuid, siteName, siteDescription, deploymentUrl } = deployment
        return (
          <Fragment key={uuid}>
            <Td label="Name" value={siteName} />
            <Td label="Description" value={siteDescription} />
            <Td label="URL" value={deploymentUrl} />

            <GridItem
              colSpan={1}
              borderBottom={`1px solid ${theme.colors.gray[200]}`}
              py={2}
              display="flex"
              alignItems="center"
              justifyContent={isMobile ? 'flex-start' : 'flex-end'}
            >
              <Button
                onClick={() => onEdit(uuid)}
                size="sm"
                fontWeight="normal"
                mr={3}
              >
                Redeploy
              </Button>
              <Button
                onClick={() => onDelete(uuid)}
                size="sm"
                fontWeight="normal"
              >
                Delete
              </Button>
            </GridItem>
          </Fragment>
        )
      })}
    </Grid>
  )
}
