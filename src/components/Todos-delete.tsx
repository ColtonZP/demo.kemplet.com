import React, { useRef } from 'react';

import { Task } from '../State';

export const Todos = () => {
  const ref = useRef<HTMLInputElement>(null!);

  const Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // addTodo(ref?.current?.value);
    ref.current.value = '';
  };

  return (
    <>
      <ul>
        {/* {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.title}
          </li>
        ))} */}
      </ul>
      <form onSubmit={Submit}>
        <input ref={ref} type="text" placeholder="add todo" />
      </form>
    </>
  );
};
