import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { saveToLocalStorage } from '../utility'

export default function PersonView() {
  const [person, setPerson] = useState({})
  const [people, setPeople] = useState(
    JSON.parse(localStorage.getItem('peopleData')) || []
  )

  function handleAddFarm(e) {
    e.preventDefault()
    const updatedPeople = [...people, person]
    setPeople(updatedPeople)
    saveToLocalStorage('peopleData', updatedPeople)
    setPerson({})
    // history.push(`/view-farm/${updatedFarms.length - 1}`)
  }

  return (
    <div>
      <h2>People</h2>
      <ul>
        {people
          .sort((a, b) => a.code.toUpperCase() > b.code.toUpperCase())
          .map((person, index) => (
            <li key={index}>
              <Link to={`/people/${index}`}>
                {person.code}: {person.name}
              </Link>
            </li>
          ))}
      </ul>
      <form onSubmit={handleAddFarm}>
        <label>
          <input
            type="text"
            placeholder="Code"
            defaultValue={person.code}
            required
            onChange={(e) => {
              setPerson({ ...person, code: e.target.value })
            }}
          />{' '}
          <input
            type="text"
            placeholder="Name"
            defaultValue={person.name}
            required
            onChange={(e) => {
              setPerson({ ...person, name: e.target.value })
            }}
          />
        </label>{' '}
        <button type="submit">Add Person</button>
      </form>
    </div>
  )
}
