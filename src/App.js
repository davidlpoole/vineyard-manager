import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Root from './components/root'
import Outlet from './components/Outlet'
import NotFound from './components/NotFound'
import DataSummary from './components/DataSummary'
import FarmView from './components/Farm'
import PatchView from './components/Patch'
import RowView from './components/Row'
import Dashboard from './components/Dashboard'
import PersonView from './components/Person'

function App() {
  return (
    <Router basename="/vineyard-manager">
      <Root />
      <Outlet>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/farms/" exact component={FarmView} />
          <Route path="/farms/:farmId" exact component={PatchView} />
          <Route path="/farms/:farmId/:patchId" component={RowView} />
          <Route path="/export" component={DataSummary} />
          <Route path="/people" component={PersonView} />
          <Route component={NotFound} />
        </Switch>
      </Outlet>
    </Router>
  )
}

export default App
