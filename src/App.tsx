import { Router, Route, Switch } from 'wouter'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Home } from './pages/home'
import { Imprint } from './pages/imprint'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/imprint' component={Imprint} />
        </Switch>
      </Router>
    </>
  )
}

export default App
