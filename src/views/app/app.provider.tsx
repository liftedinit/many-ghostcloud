import { QueryClientProvider, ThemeProvider, queryClient } from '@liftedinit/ui'
import { BrowserRouter } from 'react-router-dom'
import { NetworkProvider } from '../../features/network'
import { Web3authProvider } from '../../features/accounts'
import theme from './theme'

type AppProviderProps = {
  children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Web3authProvider>
            <NetworkProvider>{children}</NetworkProvider>
          </Web3authProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
