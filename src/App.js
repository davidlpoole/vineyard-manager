import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Root from './root'
import Outlet from './Outlet'
import NotFound from './NotFound'
import DataSummary from './DataSummary'
import { FarmView } from './Farms'
import { PatchView } from './Patches'
import { RowView } from './Rows'
import { Dashboard } from './Dashboard'

const App = () => {
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
