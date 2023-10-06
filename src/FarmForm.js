import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
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
    setFarmName(' ')
    // history.push(`/view-farm/${updatedFarms.length - 1}`)
  }

  return (
    <div>
      <h2>Farms</h2>
      <ul>
        {farms.map((farm, index) => (
          <li key={index}>
            <Link to={`/view-farm/${index}`}>{farm.name}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddFarm}>
        <label>
          <input
            type="text"
            placeholder="Farm name"
            value={farmName}
            required
            onChange={handleFarmNameChange}
          />
        </label>
        <button type="submit">Add Farm</button>
      </form>
      <h2>Data Summary</h2>
      <Link to={`/data-summary`}>View</Link>
    </div>
  )
}

export default FarmForm
