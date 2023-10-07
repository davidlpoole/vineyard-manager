import React from 'react'
import { Link } from 'react-router-dom'

const DataSummarization = () => {
  const farmData = JSON.parse(localStorage.getItem('farmData')) || []

  return (
    <div>
      <h2>Data Summary for All Farms, Patches, and Rows</h2>
      <table>
        <thead>
          <tr>
            {/* <th>Farm ID</th> */}
            <th>Farm Name</th>
            {/* <th>Patch ID</th> */}
            <th>Patch Name</th>
            {/* <th>Row Index</th> */}
            <th>Row Number</th>
            <th>Vine Count</th>
            <th>Puller</th>
            <th>Roller</th>
          </tr>
        </thead>
        <tbody>
          {farmData.map((farm, farmIndex) =>
            farm.patches.map((patch, patchIndex) =>
              patch.rows.map((row, rowIndex) => (
                <tr key={`${farmIndex}-${patchIndex}-${rowIndex}`}>
                  {/* <td>{farmIndex}</td> */}
                  <td>{farm.name}</td>
                  {/* <td>{patchIndex}</td> */}
                  <td>{patch.name}</td>
                  {/* <td>{rowIndex}</td> */}
                  <td>{row.number}</td>
                  <td>{row.vineCount}</td>
                  <td>{row.puller}</td>
                  <td>{row.roller}</td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DataSummarization
