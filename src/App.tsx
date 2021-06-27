//hooks
import { BrowserRouter } from 'react-router-dom'

// providers
import Providers from './providers'

// routes
import Routes from './routes'

// -----------------------------------

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes />
      </Providers>
    </BrowserRouter>
  )
}

export default App
