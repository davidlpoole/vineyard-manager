// RowForm.js
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { saveToLocalStorage } from './utility'

const RowForm = () => {
  const { farmId, patchId } = useParams()
  const history = useHistory()

  const [rowNumber, setRowNumber] = useState('')
  const [vineCount, setVineCount] = useState('')
  const [existingFarms, setExistingFarms] = useState([])

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem('farmData'))
    if (existingData && existingData.length) {
      setExistingFarms(existingData)
    }
  }, [])

  const handleRowSubmit = (e) => {
    e.preventDefault()
    const updatedFarms = existingFarms.map((farm, farmIndex) => {
      if (farmIndex === parseInt(farmId)) {
        const updatedPatches = farm.patches.map((patch, patchIndex) => {
          if (patchIndex === parseInt(patchId)) {
            const newRow = {
              number: rowNumber,
              vineCount: vineCount,
              tasks: [],
            }
            return { ...patch, rows: [...patch.rows, newRow] }
          }
          return patch
        })
        return { ...farm, patches: updatedPatches }
      }
      return farm
    })

    saveToLocalStorage('farmData', updatedFarms)
    history.push(`/view-patch/${farmId}/${patchId}`)
  }

  return (
    <div>
      <h2>Add Row</h2>
      <form onSubmit={handleRowSubmit}>
        <label>Row Number:</label>
        <input
          type="text"
          value={rowNumber}
          onChange={(e) => setRowNumber(e.target.value)}
        />
        <label>Vine Count:</label>
        <input
          type="number"
          value={vineCount}
          onChange={(e) => setVineCount(e.target.value)}
        />
        <button type="submit">Add Row</button>
      </form>
    </div>
  )
}

export default RowForm
