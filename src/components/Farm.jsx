import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { saveToLocalStorage } from '../utility'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addFarm, getAllFarms } from '../apiClient.ts'

export default function FarmView() {
  const [farmName, setFarmName] = useState('')

  const {
    data: farms,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['farms'],
    queryFn: getAllFarms,
  })
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: addFarm,
    onSuccess: () => {
      queryClient.invalidateQueries(['farms'])
    },
  })

  // const [farms, setFarms] = useState(
  //   JSON.parse(localStorage.getItem('farmData')) || []
  // )

  function handleAddFarm(e) {
    e.preventDefault()
    mutation.mutate({ name: farmName })
    // const updatedFarms = [...farms, newFarm]
    // setFarms(updatedFarms)
    // saveToLocalStorage('farmData', updatedFarms)
    // setFarmName('')
    // history.push(`/view-farm/${updatedFarms.length - 1}`)
  }
  console.log(farms)

  return (
    farms && (
      <div>
        <h2>Farms</h2>
        <ul>
          {farms.map((farm) => (
            <li key={farm.id}>
              <Link to={`/farms/${farm.id}`}>{farm.name}</Link>
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddFarm}>
          <label>
            <input
              type="text"
              placeholder="Farm name"
              value={farmName}
              required
              onChange={(e) => {
                setFarmName(e.target.value)
              }}
            />
          </label>{' '}
          <button type="submit">Add Farm</button>
        </form>
      </div>
    )
  )
}
