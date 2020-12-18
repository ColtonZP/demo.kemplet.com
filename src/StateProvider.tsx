import React, { useState, createContext } from 'react'

type Todo = {
  title: string
  completed: boolean
}

const initialState = {
  todos: [
    { title: 'learn context', completed: false },
    { title: 'learn typescript', completed: false },
  ],
  addTodo: (todo: string) => {},
}

export const GlobalContext = createContext(initialState)

export const StateProvider: React.FC = ({ children }) => {
  const [todos, updateTodos] = useState<Todo[]>(initialState.todos)

  return (
    <GlobalContext.Provider
      value={{
        todos: todos,

        addTodo: (todo: string) => {
          const addedTodo = { title: todo, completed: false }
          const updatedTodos = [...todos, addedTodo]
          updateTodos(updatedTodos)
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
