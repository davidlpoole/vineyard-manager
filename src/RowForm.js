// RowForm.js
import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { saveToLocalStorage } from './utility'

const RowForm = () => {
  const { farmId, patchId } = useParams()
  const history = useHistory()
  const [rowNumber, setRowNumber] = useState('')
  const [vineCount, setVineCount] = useState('')
  const [farms, setFarms] = useState(
    JSON.parse(localStorage.getItem('farmData')) || []
  )

  const handleRowNumberChange = (e) => {
    setRowNumber(e.target.value)
  }

  const handleVineCountChange = (e) => {
    setVineCount(e.target.value)
  }

  const handleAddRow = (e) => {
    e.preventDefault()
    const newRow = { number: rowNumber, vineCount: vineCount, tasks: [] }

    const updatedFarms = farms.map((farm, index) => {
      if (index === parseInt(farmId)) {
        const updatedPatches = farm.patches.map((patch, pIndex) => {
          if (pIndex === parseInt(patchId)) {
            const updatedRows = [...patch.rows, newRow]
            return { ...patch, rows: updatedRows }
          }
          return patch
        })
        return { ...farm, patches: updatedPatches }
      }
      return farm
    })

    setFarms(updatedFarms)
    saveToLocalStorage('farmData', updatedFarms)
    history.push(`/view-patch/${farmId}/${patchId}`)
  }

  return (
    <div>
      <h2>Add a Row</h2>
      <form onSubmit={handleAddRow}>
        <label>Row Number:</label>
        <input
          autoFocus
          type="text"
          value={rowNumber}
          onChange={handleRowNumberChange}
        />
        <label>Vine Count:</label>
        <input type="text" value={vineCount} onChange={handleVineCountChange} />
        <button type="submit">Add Row</button>
      </form>
    </div>
  )
}

export default RowForm
