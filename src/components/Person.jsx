import React, { useState } from 'react'
import { saveToLocalStorage } from '../utility'
import { TableComponent } from './TableComponent'

export default function PersonView() {
  const [person, setPerson] = useState({})
  const [people, setPeople] = useState(
    JSON.parse(localStorage.getItem('peopleData')) || {}
  )

  function handleAddFarm(e) {
    e.preventDefault()
    const shortName = person.shortName
    const fullName = person.fullName

    const updatedPeople = {
      ...people,
      [shortName]: fullName,
    }

    setPeople(updatedPeople)
    saveToLocalStorage('peopleData', updatedPeople)
    setPerson({})
    // history.push(`/view-farm/${updatedFarms.length - 1}`)
  }

  return (
    <div>
      <h2>People</h2>
      <TableComponent data={people} />
      <form onSubmit={handleAddFarm}>
        <label>
          <input
            type="text"
            placeholder="Short Name"
            defaultValue={person.shortName}
            required
            onChange={(e) => {
              setPerson({ ...person, shortName: e.target.value })
            }}
          />{' '}
          <input
            type="text"
            placeholder="Full Name"
            defaultValue={person.fullName}
            required
            onChange={(e) => {
              setPerson({ ...person, fullName: e.target.value })
            }}
          />
        </label>{' '}
        <button type="submit">Add Person</button>
      </form>
    </div>
  )
}
