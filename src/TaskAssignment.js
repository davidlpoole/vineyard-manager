// TaskAssignment.js
import React, { useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { RowStateContext } from './RowStateContext'
import { saveToLocalStorage } from './utility'

const TaskAssignment = () => {
  const { farmId, patchId, rowIndex } = useParams()
  const { tasks, setTasks } = useContext(RowStateContext)
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
    const updatedTask = { puller, roller }
    const updatedTasks = [...tasks, updatedTask]
    setTasks(updatedTasks)

    const farmData = JSON.parse(localStorage.getItem('farmData'))
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
