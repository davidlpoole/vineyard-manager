// PatchForm.js
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { saveToLocalStorage } from './utility'

const PatchForm = () => {
  const { farmId } = useParams()
  const history = useHistory()

  const [patchName, setPatchName] = useState('')
  const [existingFarms, setExistingFarms] = useState([])

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem('farmData'))
    if (existingData && existingData.length) {
      setExistingFarms(existingData)
    }
  }, [])

  const handlePatchSubmit = (e) => {
    e.preventDefault()
    const updatedFarms = existingFarms.map((farm, index) => {
      if (index === parseInt(farmId)) {
        const newPatch = { name: patchName, rows: [] }
        return { ...farm, patches: [...farm.patches, newPatch] }
      }
      return farm
    })

    saveToLocalStorage('farmData', updatedFarms)
    history.push(`/view-farm/${farmId}`)
  }

  return (
    <div>
      <h2>Add Patch</h2>
      <form onSubmit={handlePatchSubmit}>
        <label>Patch Name:</label>
        <input
          type="text"
          value={patchName}
          onChange={(e) => setPatchName(e.target.value)}
        />
        <button type="submit">Add Patch</button>
      </form>
    </div>
  )
}

export default PatchForm
