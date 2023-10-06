// PatchView.js
import React from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { saveToLocalStorage } from './utility'

const PatchView = () => {
  const { farmId, patchId } = useParams()
  const history = useHistory()

  // Retrieve farm data from local storage or any other source
  const farmData = JSON.parse(localStorage.getItem('farmData'))
  const selectedFarm = farmData[farmId]
  const selectedPatch = selectedFarm?.patches[patchId]

  const handleSave = (e) => {
    e.preventDefault()
    saveToLocalStorage('farmData', farmData)
    history.push(`/view-farm/${farmId}`)
  }

  if (!selectedPatch) {
    return <div>Invalid Patch ID</div>
  }

  return (
    <div>
      <h2>Patch Details</h2>
      <p>Patch Name: {selectedPatch.name}</p>
      <Link to={`/add-row/${farmId}/${patchId}`}>Add Row</Link>

      <h3>Rows</h3>
      <table>
        <thead>
          <tr>
            <th>Row</th>
            <th>Vines</th>
            <th>Puller</th>
            <th>Roller</th>
          </tr>
        </thead>
        <tbody>
          {selectedPatch.rows.map((row, index) => (
            <tr key={index}>
              <td>{row.number}</td>
              <td>
                <input
                  type="text"
                  defaultValue={row.vineCount}
                  onChange={(e) => {
                    farmData[farmId].patches[patchId].rows[index].vineCount =
                      e.target.value
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={row.tasks?.puller}
                  onChange={(e) => {
                    farmData[farmId].patches[patchId].rows[index].tasks = {
                      ...farmData[farmId].patches[patchId].rows[index].tasks,
                      puller: e.target.value,
                    }
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={row.tasks?.roller}
                  onChange={(e) => {
                    farmData[farmId].patches[patchId].rows[index].tasks = {
                      ...farmData[farmId].patches[patchId].rows[index].tasks,
                      roller: e.target.value,
                    }
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <button type="button" onClick={handleSave}>
          Submit
        </button>
      </p>

      <p>
        <Link to={`/view-farm/${farmId}`}>Back</Link>
      </p>
    </div>
  )
}

export default PatchView
