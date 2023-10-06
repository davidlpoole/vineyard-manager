import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Root from './root'
import Outlet from './Outlet'
import FarmForm from './FarmForm'
import NotFound from './NotFound'
import DataSummary from './DataSummary'
import FarmView from './FarmView'
import PatchView from './PatchView'
import { Dashboard } from './Dashboard'

const App = () => {
  return (
    <Router>
      <Root />
      <Outlet>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/farms/" exact component={FarmForm} />
          <Route path="/view-farm/:farmId" component={FarmView} />
          <Route path="/view-patch/:farmId/:patchId" component={PatchView} />
          <Route path="/data-summary" component={DataSummary} />
          <Route component={NotFound} />
        </Switch>
      </Outlet>
    </Router>
  )
}

export default App
