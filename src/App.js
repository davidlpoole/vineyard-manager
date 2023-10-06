// App.js
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RowStateProvider } from './RowStateContext'
import FarmForm from './FarmForm'
import NotFound from './NotFound'
import PatchForm from './PatchForm'
import RowForm from './RowForm'
import TaskAssignment from './TaskAssignment'
import DataSummarization from './DataSummarization'
import FarmView from './FarmView'
import PatchView from './PatchView'
import RowView from './RowView'

const App = () => {
  return (
    <RowStateProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={FarmForm} />
          <Route path="/add-patch/:farmId" component={PatchForm} />
          <Route path="/add-row/:farmId/:patchId" component={RowForm} />
          <Route
            path="/assign-task/:farmId/:patchId/:rowIndex"
            component={TaskAssignment}
          />
          <Route
            path="/summarize-data/:farmId/:patchId/:rowIndex"
            component={DataSummarization}
          />
          <Route path="/view-farm/:farmId" component={FarmView} />
          <Route path="/view-patch/:farmId/:patchId" component={PatchView} />
          <Route
            path="/view-row/:farmId/:patchId/:rowIndex"
            component={RowView}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </RowStateProvider>
  )
}

export default App
