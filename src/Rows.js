import React, { useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { saveToLocalStorage } from './utility' // Assuming you have a utility file for saving to local storage

export const RowView = () => {
  const { farmId, patchId } = useParams()
  const history = useHistory()

  const [farmData, setFarmData] = useState(
    JSON.parse(localStorage.getItem('farmData')) || []
  )
  const selectedFarm = farmData[farmId]
  const selectedPatch = selectedFarm?.patches[patchId]

  const handleSave = () => {
    saveToLocalStorage('farmData', farmData)
    history.push(`/farms/${farmId}`)
  }

  const addRow = () => {
    const updatedFarmData = [...farmData]
    const selectedPatchCopy = { ...updatedFarmData[farmId].patches[patchId] }
    selectedPatchCopy.rows.push({ number: '', vineCount: '' })
    updatedFarmData[farmId].patches[patchId] = selectedPatchCopy
    setFarmData(updatedFarmData)
  }

  const handleDeleteRow = (farmId, patchId, rowIndex) => {
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
  }

  const handleInputChange = (e, index, field) => {
    const updatedFarmData = [...farmData]
    updatedFarmData[farmId].patches[patchId].rows[index][field] = e.target.value
    setFarmData(updatedFarmData)
  }

  const renderRows = () => {
    return selectedPatch.rows.map((row, index) => (
      <tr key={index}>
        <td>
          <input
            type="number"
            defaultValue={row.number}
            min={1}
            onChange={(e) => handleInputChange(e, index, 'number')}
          />
        </td>
        <td>
          <input
            type="number"
            min={1}
            defaultValue={row.vineCount}
            onChange={(e) => handleInputChange(e, index, 'vineCount')}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={row.puller}
            onChange={(e) => handleInputChange(e, index, 'vineCount')}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={row.roller}
            onChange={(e) => handleInputChange(e, index, 'vineCount')}
          />
        </td>
        <td>
          <button onClick={() => handleDeleteRow(farmId, patchId, index)}>
            Delete
          </button>
        </td>
      </tr>
    ))
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

      {selectedPatch.rows.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Row</th>
              <th>Vines</th>
              <th>Puller</th>
              <th>Roller</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      )}

      <p>
        <button type="button" onClick={addRow}>
          Add row
        </button>
      </p>

      <p>
        <button type="button" onClick={handleSave}>
          Save and go back
        </button>
      </p>
    </div>
  )
}
