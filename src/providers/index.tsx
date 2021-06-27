// hooks
import { ReactNode } from 'react'

// providers
import { AuthProvider } from './Auth'

// --------------------------------------

interface ProvidersProps {
  children?: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>
}
