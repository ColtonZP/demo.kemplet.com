// import React, { useState } from 'react';

// // import TodoList from './todos/TodoList';
// // import ProjectEdit from './ProjectEdit';
// // import Todo from './todos/Todo';

// export const OpenProject = () => {
//   const [list, changeList] = useState('');
//   const [editing, isEditing] = useState(false);

//   let openProject;
//   let projectTodoList = null;
//   let todoList = null;

//   projects.forEach(project => {
//     if (project.id === openProjectId) {
//       openProject = project;
//       projectTodoList = openProject.todoLists;
//     }
//   });
//   todoLists.forEach(project => {
//     if (project.id === openProjectId) {
//       openProject = project;
//       todoList = openProject.todoList;
//     }
//   });
//   const { id, title, due } = openProject;
//   const dueDate = new Date(due);

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (list.length > 0) {
//       addList(id, list);
//       changeList('');
//     }
//   };

//   function toggleEditing() {
//     isEditing(!editing);
//   }

//   function formatTime(hour, minute) {
//     return `${hour > 12 ? hour - 12 : hour}:${('0' + minute).slice(-2)} ${
//       hour >= 12 ? 'pm' : 'am'
//     }`;
//   }

//   return (
//     <div className="open-project">
//       {editing && (
//         <ProjectEdit project={openProject} id={id} toggle={toggleEditing} />
//       )}
//       <div>
//         <div className="project-info">
//           <div onClick={toggleEditing}>
//             <h1>{title}</h1>
//             {due && (
//               <span>
//                 {`Due: ${
//                   dueDate.getMonth() + 1
//                 }/${dueDate.getDate()} at ${formatTime(
//                   dueDate.getHours(),
//                   dueDate.getMinutes(),
//                 )}`}
//               </span>
//             )}
//           </div>

//           <AddForm onSubmit={handleSubmit}>
//             <TitleInput
//               type="text"
//               value={list}
//               onChange={e => changeList(e.target.value)}
//             />
//             <Submit type="submit" value="add list" />
//           </AddForm>
//         </div>

//         {projectTodoList &&
//           projectTodoList.map(list => {
//             return (
//               <TodoList
//                 list={list}
//                 key={list.id}
//                 listId={list.id}
//                 projectId={id}
//               />
//             );
//           })}
//         {todoList && (
//           <Card>
//             <ul>
//               {todoList.map(todo => (
//                 <Todo
//                   todo={todo}
//                   projectId={id}
//                   key={todo.title + Math.random()}
//                 />
//               ))}
//             </ul>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// const ProjectInfo = styled.div`
//   ${props => props.theme.card}
//   display: inline-block;
//   cursor: text;
//   width: 100%;
//   margin: 1rem 0;
//   @media screen and (min-width: 768px) {
//     margin: 0 0 1rem 0;
//   }
//   & h1 {
//     margin-bottom: 0.4rem;
//     font-size: 1.6em;
//   }
//   & span {
//     margin-bottom: 0.4rem;
//     display: block;
//   }
// `;

// const AddForm = styled.form`
//   width: 100%;
// `;

// const TitleInput = styled.input`
//   width: 70%;
//   background: var(--secondary-color);
//   border: 2px var(--theme-color) solid;
//   border-right: none;
//   border-radius: 10px 0 0 10px;
//   margin: 0;
//   outline: none;
//   padding: calc(0.2em - 2px) 0.4em;
// `;

// const Submit = styled.input`
//   ${props => props.theme.button}
//   width: 30%;
//   border-radius: 0 var(--rounded) var(--rounded) 0 !important;
// `;

// const Card = styled.div`
//   ${props => props.theme.card}
// `;
