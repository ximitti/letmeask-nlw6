import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Providers from './providers'

import { Home, NewRoom, Room } from './pages'

// -----------------------------------

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/rooms/new' component={NewRoom} />
          <Route exact path='/rooms/:id' component={Room} />
        </Switch>
      </Providers>
    </BrowserRouter>
  )
}

export default App
