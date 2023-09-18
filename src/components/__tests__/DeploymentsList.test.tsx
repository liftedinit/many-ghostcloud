import React from 'react'
import { render } from '@testing-library/react'
import DeploymentsList from '../DeploymentsList'
import { QueryClient, QueryClientProvider } from 'react-query'

beforeEach(() => {
  jest.resetAllMocks()
})

afterEach(() => {
  jest.clearAllMocks()
})

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useTheme: () => ({
    colors: {
      gray: {
        500: '#A0AEC0',
      },
    },
  }),
}))

const mockProps = {
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  deployments: [
    {
      uuid: '123',
      siteName: 'test name',
      siteDescription: 'test description',
      deploymentUrl: 'test url',
    },
  ],
}

const queryClient = new QueryClient()

test('renders DeploymentsList', () => {
  const { getByText } = render(
    <QueryClientProvider client={queryClient}>
      <DeploymentsList {...mockProps} />
    </QueryClientProvider>,
  )

  expect(getByText('test name')).toBeInTheDocument()
  expect(getByText('test description')).toBeInTheDocument()
  expect(getByText('test url')).toBeInTheDocument()
  expect(getByText('Name')).toBeInTheDocument()
  expect(getByText('Description')).toBeInTheDocument()
  expect(getByText('URL')).toBeInTheDocument()
  expect(getByText('Redeploy')).toBeInTheDocument()
  expect(getByText('Delete')).toBeInTheDocument()
})
