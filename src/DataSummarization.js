// DataSummarization.js
import React from 'react'
import { useParams } from 'react-router-dom'

const DataSummarization = () => {
  const { farmId, patchId, rowIndex } = useParams()

  // Retrieve farm data from local storage or any other source
  const farmData = JSON.parse(localStorage.getItem('farmData'))
  const selectedFarm = farmData[farmId]
  const selectedPatch = selectedFarm?.patches[patchId]
  const selectedRow = selectedPatch?.rows[rowIndex]

  return (
    <div>
      <h2>Data Summary for Row</h2>
      <p>Farm ID: {farmId}</p>
      <p>Patch ID: {patchId}</p>
      <p>Row Index: {rowIndex}</p>
      <p>Row Number: {selectedRow?.number}</p>
      <p>Vine Count: {selectedRow?.vineCount}</p>

      {/* Display additional summary data here */}
    </div>
  )
}

export default DataSummarization
