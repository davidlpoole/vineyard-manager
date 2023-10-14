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
              <NavLink to={`/farms/`}>Farms</NavLink>
            </li>
            <li>
              <NavLink to={`/export/`}>Data Export</NavLink>
            </li>
            <li>
              <NavLink to={`/people/`}>People</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
