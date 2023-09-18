import React from 'react'
import { render } from '@testing-library/react'
import CreateDeployment from '../CreateDeployment'
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
  useToast: () => jest.fn(),
}))

jest.mock('react-dropzone', () => ({
  ...jest.requireActual('react-dropzone'),
  useDropzone: () => ({
    getRootProps: jest.fn(),
    getInputProps: jest.fn(),
    acceptedFiles: [],
    fileRejections: [],
  }),
}))

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQueryClient: jest.fn(),
}))

// Mock the CreateDeployment form components
const mockProps = {
  onClose: jest.fn(),
  isOpen: true,
  onSuccess: jest.fn(),
  onFailure: jest.fn(),
  deployments: [],
  activeDeploymentUuid: '',
  setDeployments: jest.fn(),
  setActiveDeploymentUuid: jest.fn(),
  isRedeploying: false,
  setIsRedeploying: jest.fn(),
}

const queryClient = new QueryClient()

test('renders CreateDeployment', async () => {
  // const { getByLabelText } = render(
  const { findByLabelText } = render(
    <QueryClientProvider client={queryClient}>
      <CreateDeployment {...mockProps} />
    </QueryClientProvider>,
  )
  const siteNameInput = await findByLabelText(/Site Name/)
  const siteDescriptionInput = await findByLabelText(/Site Description/)
  const transactionMemoInput = await findByLabelText(/Transaction Memo/)

  expect(siteNameInput).toBeInTheDocument()
  expect(siteDescriptionInput).toBeInTheDocument()
  expect(transactionMemoInput).toBeInTheDocument()
})
