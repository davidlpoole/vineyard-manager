// FarmView.js
import React from 'react'
import { useParams, Link } from 'react-router-dom'

const FarmView = () => {
  const { farmId } = useParams()

  // Retrieve farm data from local storage or any other source
  const farmData = JSON.parse(localStorage.getItem('farmData'))
  const selectedFarm = farmData[farmId]

  if (!selectedFarm) {
    return <div>Invalid Farm ID</div>
  }

  return (
    <div>
      <h2>Farm Details</h2>
      <p>Farm Name: {selectedFarm.name}</p>
      {/* path="/add-patch/:farmId" */}
      <Link to={`/add-patch/${farmId}`}>Add Patch</Link>
      <h3>Patches</h3>
      <ul>
        {selectedFarm.patches.map((patch, index) => (
          <li key={index}>
            <Link to={`/view-patch/${farmId}/${index}`}>{patch.name}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link to={`/`}>Back</Link>
      </p>
    </div>
  )
}

export default FarmView
