import React from 'react'
import './App.scss'

import { StateProvider } from './StateProvider'
import { Todos } from './components/Todos'

function App() {
  return (
    <div className="App">
      <h1>Todos:</h1>
      <StateProvider>
        <Todos />
      </StateProvider>
    </div>
  )
}

export default App
