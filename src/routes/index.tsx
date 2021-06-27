//hooks
import { Switch, Route } from 'react-router-dom'

// pages
import { Home, NewRoom, Room, AdminRoom } from '../pages'

// ---------------------------------------------------

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/rooms/new' component={NewRoom} />
      <Route exact path='/rooms/:id' component={Room} />
      <Route exact path='/admin/rooms/:id' component={AdminRoom} />
    </Switch>
  )
}
