import { Link } from 'react-router-dom'

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>Vineyard Manager</h1>
        {/* <div>
          <form id="search-form" role="search">
            <input
              id="q"
              className={''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={''}
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div> */}
        <nav>
          <ul>
            <li>
              <Link to={`/`}>Dashboard</Link>
            </li>
            <li>
              <Link to={`/farms/`}>Farms</Link>
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
