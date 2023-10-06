import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import FarmForm from './FarmForm'
import NotFound from './NotFound'
import PatchForm from './PatchForm'
import DataSummary from './DataSummary'
import FarmView from './FarmView'
import PatchView from './PatchView'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={FarmForm} />
        <Route path="/add-patch/:farmId" component={PatchForm} />
        <Route path="/data-summary" component={DataSummary} />
        <Route path="/view-farm/:farmId" component={FarmView} />
        <Route path="/view-patch/:farmId/:patchId" component={PatchView} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
