// FarmView.js
import React from 'react'
import { useParams, Link } from 'react-router-dom'

const FarmView = () => {
  const { farmId } = useParams()
  const farmData = JSON.parse(localStorage.getItem('farmData'))
  const selectedFarm = farmData[farmId]

  return (
    <div>
      <h2>Farm Details</h2>
      <p>Farm Name: {selectedFarm.name}</p>

      <h3>Patches:</h3>
      {selectedFarm.patches.map((patch, index) => (
        <div key={index}>
          <Link to={`/view-patch/${farmId}/${index}`}>{patch.name}</Link>{' '}
          {/* Add links to navigate to patch view or add rows */}
        </div>
      ))}

      {/* Add link to add a new patch */}
      <Link to={`/add-patch/${farmId}`}>Add Patch</Link>
    </div>
  )
}

export default FarmView
