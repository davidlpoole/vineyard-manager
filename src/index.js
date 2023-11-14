import React from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './styles/index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

const client = new QueryClient()

root.render(
  <QueryClientProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>
)
