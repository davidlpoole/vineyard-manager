import { Prompt } from 'react-router-dom'

export default function RowTable({
  selectedPatch,
  handleSaveChanges,
  handleDeleteRow,
  handleInputChange,
  hasUnsavedChanges,
}) {
  const handleDiscardChanges = (e) => {
    window.location.reload()
  }

  // sort the rows by row number (increasing) TODO: Enable changing sort
  const sortedRows = selectedPatch.rows
    .slice()
    .sort((a, b) => parseInt(a.number) - parseInt(b.number))

  const renderRows = () => {
    return sortedRows.map((row, index) => (
      <tr key={index}>
        <td>
          <div>{row.number}</div>
        </td>
        <td>
          <input
            type="number"
            min={1}
            defaultValue={row.vineCount}
            onChange={(e) => handleInputChange(e, index, 'vineCount')}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={row.puller}
            onChange={(e) => handleInputChange(e, index, 'puller')}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={row.roller}
            onChange={(e) => handleInputChange(e, index, 'roller')}
          />
        </td>
        <td>
          <button className="destroy" onClick={() => handleDeleteRow(index)}>
            Delete
          </button>
        </td>
      </tr>
    ))
  }

  return (
    <form onSubmit={handleSaveChanges} onReset={handleDiscardChanges}>
      {selectedPatch.rows.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Row Number</th>
                <th>Vine Count</th>
                <th>Puller</th>
                <th>Roller</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </table>
        </>
      )}
      <p>
        <button type="submit" disabled={!hasUnsavedChanges}>
          Save changes
        </button>{' '}
        <button type="reset" className="destroy" disabled={!hasUnsavedChanges}>
          Discard changes
        </button>
        <Prompt
          when={hasUnsavedChanges}
          message="You have unsaved changes. Are you sure you want to leave?"
        />
      </p>
    </form>
  )
}
