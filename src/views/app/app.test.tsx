import { render, screen, waitForElementToBeRemoved } from 'test/test-utils'
import { App } from 'views'

describe('App', () => {
  it('should render the header component', async () => {
    render(<App />)
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })
})
