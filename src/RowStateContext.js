// RowStateContext.js
import React, { createContext, useState } from 'react'

const RowStateContext = createContext()

const RowStateProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  return (
    <RowStateContext.Provider value={{ tasks, setTasks }}>
      {children}
    </RowStateContext.Provider>
  )
}

export { RowStateContext, RowStateProvider }
