import React, { useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { saveToLocalStorage } from './utility'

export const RowView = () => {
  const { farmId, patchId } = useParams()
  const history = useHistory()

  const [farmData, setFarmData] = useState(
    JSON.parse(localStorage.getItem('farmData')) || []
  )
  const selectedFarm = farmData[farmId]
  const selectedPatch = selectedFarm?.patches[patchId]

  const [startRow, setStartRow] = useState(1)
  const [endRow, setEndRow] = useState(10)
  const [defaultVineCount, setDefaultVineCount] = useState('')

  const handleSave = () => {
    saveToLocalStorage('farmData', farmData)
    history.push(`/farms/${farmId}`)
  }

  const addRow = () => {
    const updatedFarmData = [...farmData]
    const selectedPatchCopy = { ...updatedFarmData[farmId].patches[patchId] }
    selectedPatchCopy.rows.push({
      number: '',
      vineCount: '',
      puller: '',
      roller: '',
    })
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

  const handleAddMultipleRows = () => {
    if (!startRow || !endRow) {
      alert('Please enter a start row and end row.')
      return
    }

    const start = parseInt(startRow, 10)
    const end = parseInt(endRow, 10)
    const increment = start <= end ? 1 : -1 // Determine the increment direction

    const updatedFarmData = [...farmData]
    const selectedPatchCopy = { ...updatedFarmData[farmId].patches[patchId] }

    for (let i = start; start <= end ? i <= end : i >= end; i += increment) {
      selectedPatchCopy.rows.push({
        number: i.toString(),
        vineCount: defaultVineCount || '',
        puller: '',
        roller: '',
      })
    }

    updatedFarmData[farmId].patches[patchId] = selectedPatchCopy
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
            onChange={(e) => handleInputChange(e, index, 'puller')}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={row.roller}
            onChange={(e) => handleInputChange(e, index, 'roller')}
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
              <th>Row Number</th>
              <th>Vine Count</th>
              <th>Puller</th>
              <th>Roller</th>
              <th>Actions</th>
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

      <div>
        <h3>Add Multiple Rows</h3>
        <table>
          <thead>
            <tr>
              <th>Start Row</th>
              <th>End Row</th>
              <th>Default Vine Count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="number"
                  min={1}
                  value={startRow}
                  onChange={(e) => setStartRow(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  min={1}
                  value={endRow}
                  onChange={(e) => setEndRow(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={defaultVineCount}
                  onChange={(e) => setDefaultVineCount(e.target.value)}
                />
              </td>
              <td>
                <button onClick={handleAddMultipleRows}>Add Rows</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <button type="button" onClick={handleSave}>
          Save and go back
        </button>
      </p>
    </div>
  )
}
