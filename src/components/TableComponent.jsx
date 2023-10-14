export function TableComponent({ data }) {
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
