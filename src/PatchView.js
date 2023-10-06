// PatchView.js
import React from 'react'
import { useParams, Link } from 'react-router-dom'

const PatchView = () => {
  const { farmId, patchId } = useParams()

  // Retrieve farm data from local storage or any other source
  const farmData = JSON.parse(localStorage.getItem('farmData'))
  const selectedFarm = farmData[farmId]
  const selectedPatch = selectedFarm?.patches[patchId]

  if (!selectedPatch) {
    return <div>Invalid Patch ID</div>
  }

  return (
    <div>
      <h2>Patch Details</h2>
      <p>Patch Name: {selectedPatch.name}</p>
      {/* "/add-row/:farmId/:patchId" */}
      <Link to={`/add-row/${farmId}/${patchId}`}>Add Row</Link>

      <h3>Rows</h3>
      <ul>
        {selectedPatch.rows.map((row, index) => (
          <li key={index}>
            <Link to={`/view-row/${farmId}/${patchId}/${index}`}>
              Row {row.number}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <Link to={`/view-farm/${farmId}`}>Back</Link>
      </p>
    </div>
  )
}

export default PatchView
