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
          <Route path='/imprint' component={Imprint} />
          <Route path='/' component={LanguageRedirect} />
          <Route path='/:lang' nest>
            <LanguageRoute>
              <Switch>
                <Route path='/' component={Home} />
              </Switch>
            </LanguageRoute>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
