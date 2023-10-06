// RowView.js
import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { RowStateContext } from './RowStateContext'
import { saveToLocalStorage } from './utility'

const RowView = () => {
  const { farmId, patchId, rowIndex } = useParams()
  const { tasks, setTasks } = useContext(RowStateContext)

  const farmData = JSON.parse(localStorage.getItem('farmData'))
  const selectedFarm = farmData[farmId]
  const selectedPatch = selectedFarm?.patches[patchId]
  const selectedRow = selectedPatch?.rows[rowIndex]

  const [puller, setPuller] = useState('')
  const [roller, setRoller] = useState('')

  useEffect(() => {
    setTasks(selectedRow?.tasks || [])
  }, [selectedRow, setTasks])

  const handleAssignTask = (e) => {
    e.preventDefault()
    const updatedTask = { puller, roller }
    const updatedTasks = [...tasks, updatedTask]
    setTasks(updatedTasks)

    const updatedFarms = farmData.map((farm, farmIndex) => {
      if (farmIndex === parseInt(farmId)) {
        const updatedPatches = farm.patches.map((patch, patchIndex) => {
          if (patchIndex === parseInt(patchId)) {
            const updatedRows = patch.rows.map((row, rIndex) => {
              if (rIndex === parseInt(rowIndex)) {
                return { ...row, tasks: updatedTasks }
              }
              return row
            })
            return { ...patch, rows: updatedRows }
          }
          return patch
        })
        return { ...farm, patches: updatedPatches }
      }
      return farm
    })

    saveToLocalStorage('farmData', updatedFarms)
  }

  return (
    <div>
      <h2>Row Details</h2>
      <p>Row Number: {selectedRow?.number}</p>
      <p>Vine Count: {selectedRow?.vineCount}</p>

      <h3>Assign Task</h3>
      <form onSubmit={handleAssignTask}>
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
        <button type="submit">Assign Task</button>
      </form>

      {/* Display task details if available */}
      {tasks.length > 0 && (
        <div>
          <h3>Tasks:</h3>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                Puller: {task.puller}, Roller: {task.roller}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default RowView
