import React from 'react'
import { render } from '@testing-library/react'
import Header from '../Header'
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
        300: '#A0AEC0',
      },
      white: '#FFFFFF',
    },
  }),
}))

const queryClient = new QueryClient()

test('renders Header', () => {
  const { getByLabelText, getByRole } = render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </QueryClientProvider>,
  )

  expect(getByLabelText(/Account/)).toBeInTheDocument()

  const logoImg = getByRole('img')
  expect(logoImg).toBeInTheDocument()
  expect(logoImg).toHaveAttribute('src', 'logo-black.png')
})
