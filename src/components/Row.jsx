import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AddRowForm from './RowAddForm'
import RowTable from './RowTable'

import { saveToLocalStorage } from '../utility'

export default function RowView() {
  const { farmId, patchId } = useParams()
  // const history = useHistory()

  const [farmData, setFarmData] = useState(
    JSON.parse(localStorage.getItem('farmData')) || []
  )
  const selectedFarm = farmData[farmId]
  const selectedPatch = selectedFarm?.patches[patchId]

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const handleSaveChanges = (e) => {
    e.preventDefault()
    saveToLocalStorage('farmData', farmData)
    setHasUnsavedChanges(false)
    // history.push(`/farms/${farmId}`)
  }

  const handleDeleteRow = (rowIndex) => {
    const updatedFarmData = [...farmData]
    if (
      farmId < updatedFarmData.length &&
      patchId < updatedFarmData[farmId].patches.length
    ) {
      const selectedPatchCopy = { ...updatedFarmData[farmId].patches[patchId] }
      selectedPatchCopy.rows.splice(rowIndex, 1)
      updatedFarmData[farmId].patches[patchId] = selectedPatchCopy
      setFarmData(updatedFarmData)
    }
    setHasUnsavedChanges(true)
  }

  const handleInputChange = (e, index, field) => {
    const updatedFarmData = [...farmData]
    const inputValue = e.target.value.toUpperCase() // Convert to uppercase
    updatedFarmData[farmId].patches[patchId].rows[index][field] = inputValue
    setFarmData(updatedFarmData)
    setHasUnsavedChanges(true)
  }

  if (!selectedPatch) {
    return <div>Invalid Patch ID</div>
  }

  return (
    <div>
      <h2>
        <Link to={`/farms/`}>Farms</Link>
        {' / '}
        <Link to={`/farms/${farmId}`}>{selectedFarm.name}</Link>
        {' / '}
        {selectedPatch.name}
      </h2>

      <RowTable
        handleDeleteRow={handleDeleteRow}
        handleInputChange={handleInputChange}
        handleSaveChanges={handleSaveChanges}
        selectedPatch={selectedPatch}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      <AddRowForm
        farmData={farmData}
        setFarmData={setFarmData}
        farmId={farmId}
        patchId={patchId}
        selectedPatch={selectedPatch}
        setHasUnsavedChanges={setHasUnsavedChanges}
      />
    </div>
  )
}
