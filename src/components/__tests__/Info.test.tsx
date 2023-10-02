import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Help, { tips } from '../Info'

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useTheme: () => ({
    colors: {
      white: '#FFFFFF',
      gray: {
        500: '#A0AEC0',
      },
    },
  }),
}))

describe('Help', () => {
  Object.keys(tips).forEach(key => {
    it('renders', async () => {
      render(<Help id={key as keyof typeof tips} />)
      const element = screen.getByTestId(`info-${key}`)
      expect(element).toBeInTheDocument()
      fireEvent.mouseOver(element)
      await waitFor(() => {
        expect(
          screen.getByText(tips[key as keyof typeof tips]),
        ).toBeInTheDocument()
      })
    })
  })
})
