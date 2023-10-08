import { NavLink } from 'react-router-dom'

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>Vineyard Manager</h1>
        <nav>
          <ul>
            <li>
              <NavLink to={`/`} exact>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={`/farms/`}>Data Entry</NavLink>
            </li>
            <li>
              <NavLink to={`/data-summary/`}>Data Summary</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
