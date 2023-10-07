import { Link } from 'react-router-dom'

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>Vineyard Manager</h1>
        <nav>
          <ul>
            <li>
              <Link to={`/`}>Dashboard</Link>
            </li>
            <li>
              <Link to={`/farms/`}>Data Entry</Link>
            </li>
            <li>
              <Link to={`/data-summary/`}>Data Summary</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
