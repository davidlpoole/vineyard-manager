import React, { useState, useEffect } from 'react'
import { useParams, Link, Prompt } from 'react-router-dom'
import { saveToLocalStorage } from '../utility'

export const RowView = () => {
  const { farmId, patchId } = useParams()
  // const history = useHistory()

  const [farmData, setFarmData] = useState(
    JSON.parse(localStorage.getItem('farmData')) || []
  )
  const selectedFarm = farmData[farmId]
  const selectedPatch = selectedFarm?.patches[patchId]

  // state variables for 'add row' form
  const [startRow, setStartRow] = useState(1)
  const [endRow, setEndRow] = useState(1)
  const [defaultVineCount, setDefaultVineCount] = useState('')
  const [defaultPuller, setDefaultPuller] = useState('')
  const [defaultRoller, setDefaultRoller] = useState('')

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  useEffect(() => {
    // Calculate the highest existing row number
    const highestRowNumber = Math.max(
      ...selectedPatch.rows.map((row) => row.number),
      0
    )

    // Set startRow and endRow based on the highest row number
    setStartRow(highestRowNumber + 1)
    setEndRow(highestRowNumber + 1)
  }, [selectedPatch.rows]) // Run this effect whenever selectedPatch.rows changes

  const handleSaveChanges = (e) => {
    e.preventDefault()
    saveToLocalStorage('farmData', farmData)
    setHasUnsavedChanges(false)
    // history.push(`/farms/${farmId}`)
  }

  const handleDiscardChanges = (e) => {
    window.location.reload()
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
    setHasUnsavedChanges(true)
  }

  const handleInputChange = (e, index, field) => {
    const updatedFarmData = [...farmData]
    const inputValue = e.target.value.toUpperCase() // Convert to uppercase
    updatedFarmData[farmId].patches[patchId].rows[index][field] = inputValue
    setFarmData(updatedFarmData)
    setHasUnsavedChanges(true)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleAddMultipleRows()
    setHasUnsavedChanges(true) // Updated to indicate unsaved changes
  }

  const handleAddMultipleRows = () => {
    if (!startRow || !endRow) {
      alert('Please enter a start row and end row.')
      return
    }

    const start = parseInt(startRow, 10)
    const end = parseInt(endRow, 10)

    // increase the values by same amount before next render
    const diff = end - start
    setStartRow(end + 1)
    setEndRow(end + diff + 1)

    // Determine the increment direction
    const increment = start <= end ? 1 : -1

    // copy the data to edit
    const updatedFarmData = [...farmData]
    const selectedPatchCopy = { ...updatedFarmData[farmId].patches[patchId] }

    // loop and add rows
    for (let i = start; start <= end ? i <= end : i >= end; i += increment) {
      selectedPatchCopy.rows.push({
        number: i,
        vineCount: defaultVineCount || '',
        puller: defaultPuller || '',
        roller: defaultRoller || '',
      })
    }

    // update the state
    updatedFarmData[farmId].patches[patchId] = selectedPatchCopy
    setFarmData(updatedFarmData)
  }

  // sort the rows by row number (increasing) TODO: Enable changing sort
  const sortedRows = selectedPatch.rows
    .slice()
    .sort((a, b) => parseInt(a.number) - parseInt(b.number))

  const renderRows = () => {
    return sortedRows.map((row, index) => (
      <tr key={index}>
        <td>
          <div>{row.number}</div>
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
          <button
            className="destroy"
            onClick={() => handleDeleteRow(farmId, patchId, index)}
          >
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
      <form onSubmit={handleSaveChanges} onReset={handleDiscardChanges}>
        {selectedPatch.rows.length > 0 && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Row Number</th>
                  <th>Vine Count</th>
                  <th>Puller</th>
                  <th>Roller</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{renderRows()}</tbody>
            </table>
          </>
        )}
        <p>
          <button type="submit" disabled={!hasUnsavedChanges}>
            Save changes
          </button>{' '}
          <button
            type="reset"
            className="destroy"
            disabled={!hasUnsavedChanges}
          >
            Discard changes
          </button>
          <Prompt
            when={hasUnsavedChanges}
            message="You have unsaved changes. Are you sure you want to leave?"
          />
        </p>
      </form>

      {/* <p>
        <button type="button" onClick={addRow}>
          Add row
        </button>
      </p> */}

      <div>
        <h3>Add Rows</h3>
        <form onSubmit={handleFormSubmit}>
          {' '}
          {/* 1. Add form element and onSubmit handler */}
          <table>
            <thead>
              <tr>
                <th>Start Row</th>
                <th>End Row</th>
                <th>
                  Vine Count
                  <br />
                  (Optional)
                </th>
                <th>
                  Puller
                  <br />
                  (Optional)
                </th>
                <th>
                  Roller
                  <br />
                  (Optional)
                </th>
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
                  <input
                    type="text"
                    value={defaultPuller}
                    onChange={(e) => setDefaultPuller(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={defaultRoller}
                    onChange={(e) => setDefaultRoller(e.target.value)}
                  />
                </td>
                <td>
                  <button type="submit">Add</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  )
}
