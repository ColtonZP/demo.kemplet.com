import React from 'react'
import './App.scss'

import { TodoManager } from './lib/TodoState'
import { Todos } from './components/Todos'

function App() {
  return (
    <div className="App">
      <h1>Todos:</h1>
      <Todos TodoStore={TodoManager} />
    </div>
  )
}

export default App
