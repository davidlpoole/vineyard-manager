// PatchForm.js
import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { saveToLocalStorage } from './utility'

const PatchForm = () => {
  const { farmId } = useParams()
  const history = useHistory()
  const [patchName, setPatchName] = useState('')
  const [farms, setFarms] = useState(
    JSON.parse(localStorage.getItem('farmData')) || []
  )

  const handlePatchNameChange = (e) => {
    setPatchName(e.target.value)
  }

  const handleAddPatch = (e) => {
    e.preventDefault()
    const newPatch = { name: patchName, rows: [] }

    const updatedFarms = farms.map((farm, index) => {
      if (index === parseInt(farmId)) {
        const updatedPatches = [...farm.patches, newPatch]
        return { ...farm, patches: updatedPatches }
      }
      return farm
    })

    setFarms(updatedFarms)
    saveToLocalStorage('farmData', updatedFarms)
    history.push(`/view-farm/${farmId}`)
  }

  return (
    <div>
      <h2>Add a Patch</h2>
      <form onSubmit={handleAddPatch}>
        <label>Patch Name:</label>
        <input type="text" value={patchName} onChange={handlePatchNameChange} />
        <button type="submit">Add Patch</button>
      </form>
    </div>
  )
}

export default PatchForm
