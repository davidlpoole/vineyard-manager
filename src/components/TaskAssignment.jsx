// TaskAssignment.js
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { saveToLocalStorage } from './utility' // Import the utility function

const TaskAssignment = () => {
  const [puller, setPuller] = useState('')
  const [roller, setRoller] = useState('')
  const history = useHistory()

  const handleTaskAssignment = (e) => {
    e.preventDefault()
    const taskData = { puller, roller }
    const existingFarmData = JSON.parse(localStorage.getItem('farmData'))
    const currentPatch =
      existingFarmData.patches[existingFarmData.patches.length - 1]
    const currentRow = currentPatch.rows[currentPatch.rows.length - 1]
    currentRow.tasks.push(taskData)
    saveToLocalStorage('farmData', existingFarmData)
    history.push('/summarize-data')
  }

  return (
    <div>
      <h2>Assign Tasks</h2>
      <form onSubmit={handleTaskAssignment}>
        <label>Puller:</label>
        <input
          type="text"
          value={puller}
          onChange={(e) => setPuller(e.target.value)}
        />
        <label>Roller:</label>
        <input
          type="text"
          value={roller}
          onChange={(e) => setRoller(e.target.value)}
        />
        <button type="submit">Assign Tasks</button>
      </form>
    </div>
  )
}

export default TaskAssignment
