// FarmForm.js
import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { saveToLocalStorage } from './utility' // Import the utility function

const FarmForm = () => {
  const [farmName, setFarmName] = useState('')
  const [existingFarms, setExistingFarms] = useState([])
  const history = useHistory()

  useEffect(() => {
    // Fetch existing farm data from local storage
    const existingData = JSON.parse(localStorage.getItem('farmData'))
    if (existingData && existingData.length) {
      setExistingFarms(existingData)
    }
  }, [])

  const handleFarmSubmit = (e) => {
    e.preventDefault()
    const farmData = { name: farmName, patches: [] }
    const updatedFarms = [...existingFarms, farmData]
    saveToLocalStorage('farmData', updatedFarms)
    setExistingFarms(updatedFarms)
    setFarmName('') // Clear the farm name input after submission
  }

  return (
    <div>
      <h2>Add Farm</h2>
      <form onSubmit={handleFarmSubmit}>
        <label>Farm Name:</label>
        <input
          type="text"
          value={farmName}
          onChange={(e) => setFarmName(e.target.value)}
        />
        <button type="submit">Next</button>
      </form>

      <h3>Existing Farms:</h3>
      <ul>
        {existingFarms.map((farm, index) => (
          <li key={index}>
            <Link to={`/view-farm/${index}`}>{farm.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FarmForm
