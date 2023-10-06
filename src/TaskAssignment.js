// TaskAssignment.js
import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { saveToLocalStorage } from './utility'

const TaskAssignment = () => {
  const { farmId, patchId, rowIndex } = useParams()
  const history = useHistory()

  const [puller, setPuller] = useState('')
  const [roller, setRoller] = useState('')

  const handlePullerChange = (e) => {
    setPuller(e.target.value)
  }

  const handleRollerChange = (e) => {
    setRoller(e.target.value)
  }

  const handleAssignTask = (e) => {
    e.preventDefault()

    const farmData = JSON.parse(localStorage.getItem('farmData')) || []
    farmData[farmId].patches[patchId].rows[rowIndex].tasks = [
      { puller, roller },
    ]
    saveToLocalStorage('farmData', farmData)

    history.push(`/view-row/${farmId}/${patchId}/${rowIndex}`)
  }

  return (
    <div>
      <h2>Assign Task for Row</h2>
      <form onSubmit={handleAssignTask}>
        <label>Puller:</label>
        <input type="text" value={puller} onChange={handlePullerChange} />
        <label>Roller:</label>
        <input type="text" value={roller} onChange={handleRollerChange} />
        <button type="submit">Assign Task</button>
      </form>
    </div>
  )
}

export default TaskAssignment
