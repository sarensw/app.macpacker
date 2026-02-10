import { Router, Route, Switch } from 'wouter'
import { Home } from './pages/home'
import { Imprint } from './pages/imprint'
import { DocsIndex } from './pages/docs'
import { DocPage } from './pages/docs/DocPage'
import { BlogIndex } from './pages/blog/BlogIndex'
import { BlogDetail } from './pages/blog/BlogDetail'
import { LanguageRedirect } from './components/LanguageRedirect'
import { LanguageRoute } from './components/LanguageRoute'

function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* Chinese routes under /zh prefix */}
          <Route path='/zh' nest>
            <LanguageRoute lang='zh'>
              <Switch>
                <Route path='/imprint' component={Imprint} />
                <Route path='/blog/:slug' component={BlogDetail} />
                <Route path='/blog' component={BlogIndex} />
                <Route path='/docs/:slug' component={DocPage} />
                <Route path='/docs' component={DocsIndex} />
                <Route path='/' component={Home} />
              </Switch>
            </LanguageRoute>
          </Route>

          {/* English routes at root level (default language) */}
          <Route path='/imprint' component={Imprint} />
          <Route path='/blog/:slug' component={BlogDetail} />
          <Route path='/blog' component={BlogIndex} />
          <Route path='/docs/:slug' component={DocPage} />
          <Route path='/docs' component={DocsIndex} />

          {/* Root: detect language and redirect or show English home */}
          <Route path='/' component={LanguageRedirect} />
        </Switch>
      </Router>
    </>
  )
}

export default App
