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

const mockProps = {
  onClose: jest.fn(),
  isOpen: true,
  deployments: [],
  activeDeploymentUuid: '',
  setDeployments: jest.fn(),
  isRedeploying: false,
  setIsRedeploying: jest.fn(),
}

const queryClient = new QueryClient()

test('renders CreateDeployment', () => {
  const { getByLabelText, getByText } = render(
    <QueryClientProvider client={queryClient}>
      <CreateDeployment {...mockProps} />
    </QueryClientProvider>,
  )

  expect(getByLabelText(/Site Name/)).toBeInTheDocument()
  expect(getByLabelText(/Site Description/)).toBeInTheDocument()
  expect(getByLabelText(/Transaction Memo/)).toBeInTheDocument()
  expect(getByText('Save')).toBeInTheDocument()
  expect(
    getByText('Drag a zip file here, or click to select a file'),
  ).toBeInTheDocument()
})
