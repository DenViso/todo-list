import React, { useState, useEffect } from 'react';
import TasksCategory from './component/TasksCategory';
import { Todo } from './interfaceTodo';
import { nanoid } from 'nanoid';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';


function App() {

  const [todo, setTodo] = useState<Todo[]>([]);
  const [tasks, setTasks] = useState<string>('');
  const [categorys, setCategorys] = useState<string>('');

  const onClicAddTodo = (event:React.FormEvent): void => {
    event.preventDefault();
    const newObject = categorys ? {
      id: nanoid(),
      task: tasks,
      isDone: false,
      category: categorys,
    } : {
      id: nanoid(),
      task: tasks,
      isDone: false,
    }
    const newTodo = [
      ...todo,
      newObject
    ]

    setTodo(newTodo);
  }
  console.log(todo);

  const onClicDeleteTodo = (id: string) => {
    const newTodo = todo.filter((item) => item.id !== id);
    setTodo(newTodo);
  }

  const isDone  = (id: string) => {
    const newTodo = todo.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    })
    setTodo(newTodo);
  }
  



  return (
    <div className="App">
      <div className="wrapper">

        {/* categpoty scrin */}
            <TasksCategory
            categorys={categorys}
            setCategorys={setCategorys}
            />
        {/* main scrin */}

        <div className="tasks-text">

          <h2 className="task-text__category">All Tasks</h2>

        <div className="form">
        <form className="tasks-text__form">
            <input type="text" className="tasks-text__input" placeholder='Add a new task' onChange={(e) => setTasks(e.target.value)} />

            <input className="tasks-text__input-but pos-but" type="submit" value="+" onClick={onClicAddTodo} />
          </form>
        </div>
          <div className="tasks-text__ul">
            {todo.map((item) => {
              return <div className="tasks-text__li" key={item.id}>
                <input type="checkbox" checked={item.isDone} onClick={() => isDone(item.id)}/>
                <h2 className="tasks-text__label">{item.task}</h2>
                <button onClick={() => onClicDeleteTodo(item.id)}>Delete</button>
                {item.category && <span className="tasks-text__category">{item.category}</span>}
              </div>

            })}
          </div>
          {/* <ul className="tasks-text__ul">
        
          <li className="tasks-text__li">
           
            <input className="tasks-text__chek" type="checkbox" name="isDone"  />
             <label className="tasks-text__label" htmlFor="isDone">Lorem ipsum dolor, sit amet consectetur adipisicing elit. </label>
            <button className="tasks-text__but">Delete</button>
            <p className="tasks-text__category">
              Category
            </p>
          </li>
        
         
         
        </ul> */}
        </div>

      </div>
    </div>
  );
}

export default App;
