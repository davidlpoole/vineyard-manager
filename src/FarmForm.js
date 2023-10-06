// FarmForm.js
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { saveToLocalStorage } from './utility'

const FarmForm = () => {
  const history = useHistory()
  const [farmName, setFarmName] = useState('')
  const [farms, setFarms] = useState(
    JSON.parse(localStorage.getItem('farmData')) || []
  )

  const handleFarmNameChange = (e) => {
    setFarmName(e.target.value)
  }

  const handleAddFarm = (e) => {
    e.preventDefault()
    const newFarm = { name: farmName, patches: [] }
    const updatedFarms = [...farms, newFarm]
    setFarms(updatedFarms)
    saveToLocalStorage('farmData', updatedFarms)
    history.push(`/view-farm/${updatedFarms.length - 1}`)
  }

  return (
    <div>
      <h2>Add a Farm</h2>
      <form onSubmit={handleAddFarm}>
        <label>Farm Name:</label>
        <input type="text" value={farmName} onChange={handleFarmNameChange} />
        <button type="submit">Add Farm</button>
      </form>

      <h2>Existing Farms</h2>
      <ul>
        {farms.map((farm, index) => (
          <li key={index}>
            <button onClick={() => history.push(`/view-farm/${index}`)}>
              {farm.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FarmForm
