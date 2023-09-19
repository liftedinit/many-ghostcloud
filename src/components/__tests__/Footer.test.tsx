import React from 'react'
import { render } from '@testing-library/react'
import Footer from '../Footer'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

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
      gc: {
        blueBlack: '#15181B',
      },
      white: '#FFFFFF',
    },
  }),
}))

const queryClient = new QueryClient()

test('renders Footer', () => {
  const { getByText } = render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>,
  )

  expect(getByText('Home')).toBeInTheDocument()
  expect(getByText('Dashboard')).toBeInTheDocument()
  expect(getByText('Terms Of Service')).toBeInTheDocument()
  expect(getByText('Privacy Policy')).toBeInTheDocument()
  expect(getByText('Status')).toBeInTheDocument()
})
