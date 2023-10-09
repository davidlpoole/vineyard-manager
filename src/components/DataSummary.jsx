import React from 'react'

export default function DataSummary() {
  const farmData = JSON.parse(localStorage.getItem('farmData')) || []

  return (
    <div>
      <h2>Data Summary for All Farms, Patches, and Rows</h2>

      {farmData.length > 0 ? (
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
              farm.patches.map((patch, patchIndex) => {
                let totalVineCount = 0 // Initialize total vine count for this patch

                const rowsContent = patch.rows.map((row, rowIndex) => {
                  totalVineCount += Number(row.vineCount) // Accumulate the vine count

                  return (
                    <tr key={`${farmIndex}-${patchIndex}-${rowIndex}`}>
                      <td>{farm.name}</td>
                      <td>{patch.name}</td>
                      <td>{row.number}</td>
                      <td>{row.vineCount}</td>
                      <td>{row.puller}</td>
                      <td>{row.roller}</td>
                    </tr>
                  )
                })

                // Display the rows content and the total vine count for this patch
                return (
                  <React.Fragment key={`${farmIndex}-${patchIndex}`}>
                    {rowsContent}
                    <tr key={`total-${farmIndex}-${patchIndex}`}>
                      <td colSpan="6">
                        {farm.name} {patch.name} Vine Count: {totalVineCount}
                      </td>
                    </tr>
                  </React.Fragment>
                )
              })
            )}
          </tbody>
        </table>
      ) : (
        <div>No Data available.</div>
      )}
    </div>
  )
}
