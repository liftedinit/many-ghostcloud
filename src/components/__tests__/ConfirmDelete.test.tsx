import React from 'react'
import { render } from '@testing-library/react'
import ConfirmDelete from '../ConfirmDelete'
import { QueryClient, QueryClientProvider } from 'react-query'

beforeEach(() => {
  jest.resetAllMocks()
})

afterEach(() => {
  jest.clearAllMocks()
})

const mockProps = {
  onClose: jest.fn(),
  isOpen: true,
  deployments: [],
  activeDeploymentUuid: '',
  setDeployments: jest.fn(),
}

const queryClient = new QueryClient()

test('renders ConfirmDelete', () => {
  const { getByText } = render(
    <QueryClientProvider client={queryClient}>
      <ConfirmDelete {...mockProps} />
    </QueryClientProvider>,
  )

  expect(getByText('Confirm Delete')).toBeInTheDocument()
  expect(getByText('Are you sure?')).toBeInTheDocument()
  expect(getByText('Yes')).toBeInTheDocument()
  expect(getByText('No')).toBeInTheDocument()
})
