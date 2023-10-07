import React, { useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { saveToLocalStorage } from './utility'

export const RowView = () => {
  const { farmId, patchId } = useParams()
  const history = useHistory()

  const farmData = JSON.parse(localStorage.getItem('farmData'))
  const selectedFarm = farmData[farmId]
  const selectedPatch = selectedFarm?.patches[patchId]
  const [fakeCount, setFakeCount] = useState(0)

  const handleSave = (e) => {
    e.preventDefault()
    saveToLocalStorage('farmData', farmData)
    history.push(`/farms/${farmId}`)
  }

  const addRow = (e) => {
    selectedPatch.rows.push({ number: '', vineCount: '' })
    setFakeCount(fakeCount + 1) // just makes sure react re-renders
    saveToLocalStorage('farmData', farmData)
  }

  if (!selectedPatch) {
    return <div>Invalid Patch ID</div>
  }

  return (
    <div>
      <h2>
        <Link to={`/farms/`}>Farms</Link>
        {' / '}
        <Link to={`/farms/${farmId}`}>{selectedFarm.name}</Link>
        {' / '}
        {selectedPatch.name}
      </h2>

      {selectedPatch.rows.length > 0 && (
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
                <td>
                  <input
                    type="text"
                    defaultValue={row.number}
                    onChange={(e) => {
                      row.number = e.target.value
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={row.vineCount}
                    onChange={(e) => {
                      row.vineCount = e.target.value
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={row.puller}
                    onChange={(e) => {
                      row.puller = e.target.value
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={row.roller}
                    onChange={(e) => {
                      row.roller = e.target.value
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p>
        <button type="button" onClick={addRow}>
          Add row
        </button>
      </p>

      <p>
        <button type="button" onClick={handleSave}>
          Save and go back
        </button>
      </p>
    </div>
  )
}
