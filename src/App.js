import {Redirect, Route, Switch} from 'react-router-dom'
import Chat from './app/components/chat'
import Login from './app/components/login'
import AuthProvider from './app/components/useAuth'

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route path={'/chat'} component={Chat}/>
        <Route path={'/'} exact component={Login}/>
        <Redirect to={'/'}/>
      </Switch>
    </AuthProvider>
  )
}

export default App