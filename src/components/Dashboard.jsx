import { useQuery } from '@tanstack/react-query'
import { getAllEmployeeVineCounts } from '../apiClient.ts'

function DataSummary({ data }) {
  return data.map((employee) => (
    <div key={employee.id}>
      {employee.fullName} ({employee.code}): {employee.vineCount} vines
    </div>
  ))
}

export default function Dashboard() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['data'],
    queryFn: getAllEmployeeVineCounts,
  })

  return (
    <div id="zero-state">
      <h1>Welcome to Vineyard Manager</h1>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      {data && <DataSummary data={data} />}
    </div>
  )
}
