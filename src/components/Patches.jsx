import React, { useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { saveToLocalStorage } from '../utility'

export const PatchView = () => {
  const { farmId } = useParams()
  const history = useHistory()

  const [patchName, setPatchName] = useState('')
  const [farms, setFarms] = useState(
    JSON.parse(localStorage.getItem('farmData')) || []
  )

  // const farmData = JSON.parse(localStorage.getItem('farmData'))
  const selectedFarm = farms[farmId]

  if (!selectedFarm) {
    return <div>Invalid Farm ID</div>
  }

  const handlePatchNameChange = (e) => {
    setPatchName(e.target.value)
  }

  const handleAddPatch = (e) => {
    e.preventDefault()

    const newPatch = { name: patchName, rows: [] }

    const updatedFarms = farms.map((farm, index) => {
      if (index === parseInt(farmId)) {
        const updatedPatches = [...farm.patches, newPatch]
        return { ...farm, patches: updatedPatches }
      }
      return farm
    })

    setFarms(updatedFarms)
    saveToLocalStorage('farmData', updatedFarms)
    setPatchName('')
    history.push(`/farms/${farmId}`)
  }

  return (
    <div>
      <h2>
        <Link to={`/farms/`}>Farms</Link>
        {' / '}
        {selectedFarm.name}
      </h2>

      <ul>
        {selectedFarm.patches.map((patch, index) => (
          <li key={index}>
            <Link to={`/farms/${farmId}/${index}`}>{patch.name}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddPatch}>
        <label>
          <input
            type="text"
            placeholder="Patch name"
            value={patchName}
            required
            onChange={handlePatchNameChange}
          />
        </label>{' '}
        <button type="submit">Add Patch</button>
      </form>
    </div>
  )
}
