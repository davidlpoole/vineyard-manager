import { useQuery } from '@tanstack/react-query'

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
    queryFn: () =>
      fetch('http://localhost:3000/api/v1/counts').then((res) => res.json()),
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
