import { render, screen } from '@testing-library/react'
import Pagination from '../Pagination'
import { QueryClient, QueryClientProvider } from 'react-query'

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useTheme: () => ({
    colors: {
      white: '#FFFFFF',
    },
  }),
}))

const mockProps = {
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  currentPage: 1,
  nextBtnProps: {
    onClick: jest.fn(),
  },
  prevBtnProps: {
    onClick: jest.fn(),
  },
  numPages: 1,
}

const queryClient = new QueryClient()

describe('Pagination', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('does not render if one page', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Pagination {...mockProps} />
      </QueryClientProvider>,
    )
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
  })

  it('renders if more than one page', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Pagination {...{ ...mockProps, numPages: 2 }} />
      </QueryClientProvider>,
    )
    expect(screen.getByTestId('pagination')).toBeInTheDocument()
    expect(screen.getByTestId('prev-btn')).toBeInTheDocument()
    expect(screen.getByTestId('page-1')).toBeInTheDocument()
    expect(screen.getByTestId('page-1')).toHaveClass('active')
    expect(screen.getByTestId('page-2')).toBeInTheDocument()
    expect(screen.getByTestId('next-btn')).toBeInTheDocument()
  })

  it('renders second page as active', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Pagination {...{ ...mockProps, numPages: 2, currentPage: 2 }} />
      </QueryClientProvider>,
    )
    expect(screen.getByTestId('page-2')).toHaveClass('active')
  })

  it('renders prev btn as disabled', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Pagination
          {...{ ...mockProps, numPages: 2, prevBtnProps: { disabled: true } }}
        />
      </QueryClientProvider>,
    )
    expect(screen.getByTestId('prev-btn')).toBeDisabled()
  })

  it('renders next btn as disabled', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Pagination
          {...{ ...mockProps, numPages: 2, nextBtnProps: { disabled: true } }}
        />
      </QueryClientProvider>,
    )
    expect(screen.getByTestId('next-btn')).toBeDisabled()
  })
})
