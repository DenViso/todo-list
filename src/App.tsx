import React, { useState, useEffect } from 'react';
import TasksCategory from './component/TasksCategory';
import { Todo, Category } from './interfaceTodo';
import { nanoid } from 'nanoid';





function App() {

  const [todo, setTodo] = useState<Todo[]>([]);
  const [tasks, setTasks] = useState<string>('');
  const [categorys, setCategorys] = useState<Category[]>([{ name: '', id: nanoid() }]);
  const [curentCategory, setCurentCategory] = useState<Category>(categorys[0]);
  const [isEdit, setIsEdit] = useState(false);


  // =========== localStoreg

  const getData = (): void => {
    const todos = localStorage.getItem('todo');
    const categorys = localStorage.getItem('category');
    if (todos) {
      setTodo(JSON.parse(todos))
    }
    if (categorys) {
      setCategorys(JSON.parse(categorys))
    }
  }
  useEffect(() => {
    getData();
  }, [])

  const onClicAddTodo = (event: React.FormEvent): void => {
    event.preventDefault();

    const newObject = curentCategory.name
      ? {
        id: nanoid(),
        task: tasks,
        isDone: false,
        category: curentCategory.name,
        color:curentCategory.color,
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
    localStorage.setItem("todo", JSON.stringify(newTodo))
    setTasks('');

  }

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
      const newTodo = (prevTodo: Todo[]) => prevTodo.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          task: event.target.value,
          isDone: false,
        };
      } else {
        return todo;
      }
    });
    setTodo(newTodo(todo));
    localStorage.setItem("todo", JSON.stringify(newTodo(todo)));
  };
  
  const editTask = () => {
    setIsEdit(prev => !prev)
  }

  const onClicDeleteTodo = (id: string) => {
    const newTodo = todo.filter((item) => item.id !== id);
    setTodo(newTodo);
    localStorage.setItem("todo", JSON.stringify(newTodo))
  }

  const isDone = (id: string) => {
    const newTodo = todo.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    })
    setTodo(newTodo);
    localStorage.setItem("todo", JSON.stringify(newTodo))
  }

  const findColor = (catName: string) => {
    const catObj = categorys.find((item) => item.name === catName);
    if (catObj?.color) {
      return catObj.color;
    } else {
      return "gray"
    }
  }

                       // ++++++++++++++++++++ RENDER ++++++++++++++++++++++
                // ============== render all task without category =========
  const allTasksMap = todo.map((item) => {
    return <div
      className="tasks-text__li"
      key={item.id}>

    <div className="cont">
    <input
        className={item.isDone
          ? "checkbox-false true"
          : "checkbox-false "}
        type="checkbox"
        // checked={item.isDone} 
        onClick={() => isDone(item.id)} />

      {!isEdit
        ? (
          <h2 style={{ color: curentCategory.color }}
            className={item.isDone
              ? "tasks-text__label line"
              : "tasks-text__label"}>{item.task}</h2>
        ) : (
          <input
          style={{ color: curentCategory.color }}
            type="text"
            className="tasks-text__label-inp"
            placeholder="Add a new task"
            value={item.task}
            onChange={(e) => handleTaskChange(e, item.id)}
          />
        )}
    </div>

      <button
        className={isEdit
          ? "category-del del-position"
          : "category-del el-position bg"}
        onClick={() => onClicDeleteTodo(item.id)}>
      </button>

      <button
        className={isEdit
          ? "todo-change done"
          : 'todo-change'}
        onClick={() => editTask()}>
      </button>

      {item.category
        && <span
          className="tasks-text__category"
          style={{ backgroundColor: findColor(item.category) }}>{item.category}</span>}

    </div>
  })


          //==================== render task with category ===========
  const catTasksMap = todo.filter((item) => item.category === curentCategory.name).map((item) => {
    return <div
      className="tasks-text__li"
      key={item.id}>

      <div className="cont">
      <input
        className={item.isDone ? "checkbox-false true" : "checkbox-false "}
        type="checkbox"
        // checked={item.isDone}
        onClick={() => isDone(item.id)} />

      {!isEdit

        ? (
          <h2 style={{ color: curentCategory.color }}
            className={item.isDone
              ? "tasks-text__label line "
              : "tasks-text__label"}>{item.task }</h2>
        ) : (
          <input
            type="text"
            style={{ color: curentCategory.color }}
            className="tasks-text__label-inp"
            placeholder="Add a new task"
            value={item.task}
            onChange={(e) => handleTaskChange(e, item.id)}
          />
        )}
      </div>

      <button className="category-del del-position"
        onClick={() => onClicDeleteTodo(item.id)}>
      </button>

      <button
        className={isEdit
          ? "todo-change done"
          : 'todo-change'}
        onClick={() => editTask()}>
      </button>

      {item.category
        && <span
          className="tasks-text__category"
          style={{ backgroundColor: findColor(item.category) }}>{item.category}</span>}

    </div>

  })

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

            <h2 style={{ color: curentCategory.color }}
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
          <div className="about">
            <a href="https://github.com/DenViso/todo-list">
              Created by DenViso
            </a>
          </div>        
        </div>
      </div>
    </div>
  );
}

export default App;