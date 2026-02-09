import { Router, Route, Switch } from 'wouter'
import { Home } from './pages/home'
import { Imprint } from './pages/imprint'
import { LanguageRedirect } from './components/LanguageRedirect'
import { LanguageRoute } from './components/LanguageRoute'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' component={LanguageRedirect} />
          <Route path='/:lang' nest>
            <LanguageRoute>
              <Switch>
                <Route path='/' component={Home} />
                <Route path='/imprint' component={Imprint} />
              </Switch>
            </LanguageRoute>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
