import React, { useContext, useRef } from 'react'
import { GlobalContext } from '../StateProvider'

export function Todos() {
  const { todos, addTodo } = useContext(GlobalContext)
  const ref = useRef<HTMLInputElement>(null!)

  const Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(ref?.current?.value)
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.title}>
          <input type="checkbox" checked={todo.completed} />
          {todo.title}
        </li>
      ))}
      <form onSubmit={Submit}>
        <input ref={ref} type="text" />
      </form>
    </ul>
  )
}
