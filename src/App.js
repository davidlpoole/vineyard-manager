// src/App.js

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import FarmForm from './components/FarmForm'
import PatchForm from './components/PatchForm'
import RowForm from './components/RowForm'
import TaskAssignment from './components/TaskAssignment'
import DataSummarization from './components/DataSummarization'
import FarmView from './components/FarmView'
import PatchView from './components/PatchView'
import RowView from './components/RowView'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={FarmForm} />
        <Route path="/add-patch/:farmId" component={PatchForm} />
        <Route path="/add-row/:farmId/:patchId" component={RowForm} />
        <Route
          path="/assign-task/:farmId/:patchId/:rowIndex"
          component={RowView}
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
  )
}

export default App
