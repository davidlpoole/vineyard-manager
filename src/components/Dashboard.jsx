import { TableComponent } from './TableComponent'

function getVineCount(farmData, key, peopleData) {
  const aggregatedTotals = {}

  farmData.forEach((farm) => {
    farm.patches.forEach((patch) => {
      patch.rows.forEach((row) => {
        const puller = peopleData[row[key]] || row[key]
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
  const peopleData = JSON.parse(localStorage.getItem('peopleData')) || []

  return (
    <div id="zero-state">
      <h1>Welcome to Vineyard Manager</h1>

      {farmData.length > 0 ? (
        <div>
          <h2>Puller Vine Count</h2>
          <TableComponent data={getVineCount(farmData, 'puller', peopleData)} />
          <h2>Roller Vine Count</h2>
          <TableComponent data={getVineCount(farmData, 'roller', peopleData)} />
        </div>
      ) : null}
    </div>
  )
}
