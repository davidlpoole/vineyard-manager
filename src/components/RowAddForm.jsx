import React, { useState, useEffect } from 'react'

export default function AddRowForm({
  farmData,
  selectedPatch,
  setHasUnsavedChanges,
  farmId,
  patchId,
  setFarmData,
}) {
  // state variables for 'add row' form
  const [startRow, setStartRow] = useState(1)
  const [endRow, setEndRow] = useState(1)
  const [defaultVineCount, setDefaultVineCount] = useState('')
  const [defaultPuller, setDefaultPuller] = useState('')
  const [defaultRoller, setDefaultRoller] = useState('')

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

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleAddMultipleRows()
    setHasUnsavedChanges(true)
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

  return (
    <div>
      <h3>Add Rows</h3>
      <form onSubmit={handleFormSubmit}>
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
  )
}
