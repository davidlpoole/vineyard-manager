// RowView.js
import React, { useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { saveToLocalStorage } from './utility'

const RowView = () => {
  const { farmId, patchId, rowIndex } = useParams()
  const history = useHistory()

  const farmData = JSON.parse(localStorage.getItem('farmData')) || []
  const selectedRow = farmData[farmId]?.patches[patchId]?.rows[rowIndex]

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

    // Update the task assignment for the selected row
    if (
      farmData[farmId] &&
      farmData[farmId].patches &&
      farmData[farmId].patches[patchId] &&
      farmData[farmId].patches[patchId].rows &&
      farmData[farmId].patches[patchId].rows[rowIndex]
    ) {
      farmData[farmId].patches[patchId].rows[rowIndex].tasks = [
        { puller, roller },
      ]
      saveToLocalStorage('farmData', farmData)
    }

    history.push(`/view-row/${farmId}/${patchId}/${rowIndex}`)
  }

  if (!selectedRow) {
    return <div>Invalid Row Index</div>
  }

  return (
    <div>
      <h2>Row Details</h2>
      <p>Farm ID: {farmId}</p>
      <p>Patch ID: {patchId}</p>
      <p>Row Index: {rowIndex}</p>
      <p>Row Number: {selectedRow.number}</p>
      <p>Vine Count: {selectedRow.vineCount}</p>
      <p>Puller: {selectedRow.tasks[0]?.puller}</p>
      <p>Roller: {selectedRow.tasks[0]?.roller}</p>

      <h3>Assign Task</h3>
      <form onSubmit={handleAssignTask}>
        <label>Puller:</label>
        <input type="text" value={puller} onChange={handlePullerChange} />
        <label>Roller:</label>
        <input type="text" value={roller} onChange={handleRollerChange} />
        <button type="submit">Assign Task</button>
      </form>
      <p>
        <Link to={`/view-patch/${farmId}/${patchId}/`}>Back</Link>
      </p>
    </div>
  )
}

export default RowView
