import React, { useRef } from 'react'
import { observer } from 'mobx-react'

import { Todo } from '../lib/TodoState'

type Props = {
  TodoStore: {
    todos: Todo[]
    addTodo: (title: string) => {}
    toggleTodo: (id: string) => {}
  }
}

export const Todos = observer(({ TodoStore }: Props) => {
  const { todos, addTodo, toggleTodo } = TodoStore
  const ref = useRef<HTMLInputElement>(null!)

  const Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(ref?.current?.value)
    ref.current.value = ''
  }

  return (
    <ul>
      {todos.map((todo: Todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.title}
        </li>
      ))}
      <form onSubmit={Submit}>
        <input ref={ref} type="text" />
      </form>
    </ul>
  )
})
