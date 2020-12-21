import { makeObservable, observable, computed, action } from 'mobx'

import { quickId } from '../functions/quickId'

export type Todo = {
  title: string
  completed: boolean
  id: string
}

class TodoState {
  todos: Todo[] = [
    { title: 'learn more TypeScript', completed: false, id: '1' },
  ]

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
    })
  }

  addTodo = (title: string) => {
    const newTodo: Todo = {
      title,
      completed: false,
      id: quickId(),
    }
    this.todos.push(newTodo)
  }

  toggleTodo = (id: string) => {
    this.todos.find(
      todo => todo.id === id && (todo.completed = !todo.completed),
    )
  }
}

export const TodoManager = new TodoState()
