// PatchView.js
import React from 'react'
import { useParams, Link } from 'react-router-dom'

const PatchView = () => {
  const { farmId, patchId } = useParams()
  const farmData = JSON.parse(localStorage.getItem('farmData'))
  const selectedFarm = farmData[farmId]

  if (!selectedFarm || !selectedFarm.patches[patchId]) {
    return (
      <div>
        <h2>404 - Patch not found</h2>
        <p>The patch you are looking for does not exist.</p>
      </div>
    )
  }

  const selectedPatch = selectedFarm.patches[patchId]

  return (
    <div>
      <h2>Patch Details</h2>
      <p>Patch Name: {selectedPatch.name}</p>

      <h3>Rows:</h3>
      {selectedPatch.rows.map((row, index) => (
        <div key={index}>
          <Link to={`/view-row/${farmId}/${patchId}/${index}`}>
            {row.number}: {row.vineCount} vines
          </Link>
        </div>
      ))}

      {/* Add link to add a new row */}
      <Link to={`/add-row/${farmId}/${patchId}`}>Add Row</Link>
    </div>
  )
}

export default PatchView
