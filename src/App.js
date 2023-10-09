import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Root from './components/root'
import Outlet from './components/Outlet'
import NotFound from './components/NotFound'
import DataSummary from './components/DataSummary'
import FarmView from './components/Farms'
import PatchView from './components/Patches'
import RowView from './components/Rows'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Router>
      <Root />
      <Outlet>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/farms/" exact component={FarmView} />
          <Route path="/farms/:farmId" exact component={PatchView} />
          <Route path="/farms/:farmId/:patchId" component={RowView} />
          <Route path="/data-summary" component={DataSummary} />
          <Route component={NotFound} />
        </Switch>
      </Outlet>
    </Router>
  )
}

export default App
