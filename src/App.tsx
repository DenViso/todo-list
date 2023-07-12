import React, { useState, useEffect } from 'react';
import TasksCategory from './component/TasksCategory';
import { Todo, Category } from './interfaceTodo';
import { nanoid } from 'nanoid';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';




function App() {

  const [todo, setTodo] = useState<Todo[]>([]);
  const [tasks, setTasks] = useState<string>('');
  const [categorys, setCategorys] = useState<Category[]>([{ name: '', id: nanoid() }]);
  const [curentCategory, setCurentCategory] = useState<Category>(categorys[0]);


  const onClicAddTodo = (event: React.FormEvent): void => {
    event.preventDefault();
    const newObject = curentCategory.name ? {
      id: nanoid(),
      task: tasks,
      isDone: false,
      category: curentCategory.name,
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
    setTasks('');
  }
  
  const [newTask, setNewTask] = useState("");
  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };


  const changeTask = (id: string) => {
    const newTodo = todo.map((item) => {
      if (item.id === id) {
        return { ...item, task: newTask };
      }
      return item;
    });

    setTodo(newTodo);
    setNewTask(""); 
  };
  const onClicDeleteTodo = (id: string) => {
    const newTodo = todo.filter((item) => item.id !== id);
    setTodo(newTodo);
  }

  const isDone = (id: string) => {
    const newTodo = todo.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    })
    setTodo(newTodo);
  }

  const findColor = (catName: string) => {
    const catObj = categorys.find((item) => item.name === catName);
      if (catObj?.color) {
        return catObj.color;
      } else {
        return "gray"
      }
  }

  const todoIsTrue = todo.map((i)=>i.isDone);

console.log(todoIsTrue);


  // ==============================render
  const allTasksMap = todo.map((item) => {
    return <div
      className="tasks-text__li"
      key={item.id}>

      <input 
      className={ item.isDone ? "checkbox-false true":"checkbox-false "} 
      type="checkbox"
        // checked={item.isDone} 
      onClick={() => isDone(item.id)} />

      {item.task
        ? (
          <h2
           className={item.isDone
            ?"tasks-text__label line"
            :"tasks-text__label"}>{item.task}</h2>
        ) : (
          <input
            type="text"
            className="tasks-text__label-inp"
            placeholder="Add a new task"
            value={newTask}
            onChange={handleTaskChange}
          />
        )}

      <button
        className="category-del del-position"
        onClick={() => onClicDeleteTodo(item.id)}>
      </button>

      <button
        className='todo-change'
        onClick={() => changeTask(item.id)}>
      </button>

      {item.category
        && <span
          className="tasks-text__category"
          style={{ backgroundColor: findColor(item.category) }}>{item.category}</span>}

    </div>
  })
  
  
  const catTasksMap = todo.filter((item) => item.category === curentCategory.name).map((item) => {
    return <div
        className="tasks-text__li"
        key={item.id}>

        <input
        className={ item.isDone ? "checkbox-false true":"checkbox-false "} 
        type="checkbox"
        // checked={item.isDone}
        onClick={() => isDone(item.id)} />

        {item.task

        ? (
          <h2 
          className={item.isDone
            ?"tasks-text__label line"
            :"tasks-text__label"}>{item.task}</h2>
        ) : (
          <input
            type="text"
            className="tasks-text__label-inp"
            placeholder="Add a new task"
            value={newTask}
            onChange={handleTaskChange}
          />
        )}

      <button className="category-del del-position"
        onClick={() => onClicDeleteTodo(item.id)}>
      </button>

      <button
        className='todo-change'
        onClick={() => changeTask(item.id)}>
      </button>

      {item.category
        && <span
        className="tasks-text__category"
        style={{ backgroundColor: findColor(item.category) }}>{item.category}</span>}

    </div>

  })
      console.log(newTask);
      console.log(todo.map((i)=>i.isDone));



      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  return (
    <div className="App">
      <div className="wrapper">

        {/* categpoty scrin */}
        <TasksCategory
          curentCategory={curentCategory}
          setCurentCategory={setCurentCategory}
          categorys={categorys}
          setCategorys={setCategorys}
          todo={todo}
          setTodo={setTodo}
        />

        {/* main scrin */}

        <div className="tasks-text">

          <div className="title-tasks">

            <h2
              className="task-text__category">{curentCategory.name
                ? curentCategory.name
                : "All tasks"}</h2>

            <div
              className="color"
              style={{ backgroundColor: curentCategory.color }}>
            </div>

          </div>


          <div className="form">

            <form className="tasks-text__form">

              <input type="text"
                className="tasks-text__input"
                placeholder='Add a new task'
                value={tasks}
                onChange={(e) => setTasks(e.target.value)} />

              <input
                className="tasks-text__input-but pos-but" type="submit"
                value="+"
                onClick={onClicAddTodo} />
            </form>
          </div>

          <div
            className="tasks-text__ul">
            {curentCategory.name
              ? catTasksMap
              : allTasksMap}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;