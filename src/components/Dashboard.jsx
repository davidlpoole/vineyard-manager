function TableComponent({ data }) {
  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <li key={key}>
          <span>{key}</span>: <span>{value}</span>
        </li>
      ))}
    </div>
  )
}

function getVineCount(farmData, key) {
  const aggregatedTotals = {}

  farmData.forEach((farm) => {
    farm.patches.forEach((patch) => {
      patch.rows.forEach((row) => {
        const puller = row[key]
        const vineCount = parseInt(row.vineCount)

        if (aggregatedTotals[puller]) {
          aggregatedTotals[puller] += vineCount
        } else {
          aggregatedTotals[puller] = vineCount
        }
      })
    })
  })

  return aggregatedTotals
}

export default function Dashboard() {
  const farmData = JSON.parse(localStorage.getItem('farmData')) || []

  return (
    <div id="zero-state">
      <h1>Welcome to Vineyard Manager</h1>

      {farmData.length > 0 ? (
        <div>
          <h2>Puller Vine Count</h2>
          <TableComponent data={getVineCount(farmData, 'puller')} />
          <h2>Roller Vine Count</h2>
          <TableComponent data={getVineCount(farmData, 'roller')} />
        </div>
      ) : null}
    </div>
  )
}
