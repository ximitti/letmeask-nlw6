import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import NewRoom from './pages/NewRoom'
import Providers from './providers'

// -----------------------------------

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/rooms/new' component={NewRoom} />
        </Switch>
      </Providers>
    </BrowserRouter>
  )
}

export default App
