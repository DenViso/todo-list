import React, { useState, useEffect } from 'react';
import TasksCategory from './component/TasksCategory';
import { Todo, Category } from './interfaceTodo';
import { nanoid } from 'nanoid';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';

const colors:string[] = ['red', 'green', 'blue', 'orange', 'yellow'];


function App() {

  const [todo, setTodo] = useState<Todo[]>([]);
  const [tasks, setTasks] = useState<string>('');
  const [categorys, setCategorys] = useState<Category[]>([{name:'', id:nanoid()}]);
  const [curentCategory, setCurentCategory] = useState<Category>(categorys[0]);
  const [colorChoose, setColorChoose] = useState("gray")

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
  console.log(todo);

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
  
  const findColor = (catName:string) => {
  const catObj = categorys.find((item) => item.name === catName);
  if(catObj?.color) {
    return catObj.color;
  }else{
    return "gray"
  }
}


const colorTasksMap =  colors.map((col)=>{
  return <button key={col} 
  // onClick={() => categorys.map((item) => item.color = col)}
  onClick = {() => findColor(curentCategory.name)}
    style={{backgroundColor: col}}
     className = "collor" ></button>
})



 const allTasksMap =  todo.map((item) => {
  return <div className="tasks-text__li" key={item.id}>
    
    <input type="checkbox" checked={item.isDone} onClick={() => isDone(item.id)} />
    
    <h2 className="tasks-text__label">{item.task}</h2>
    
    <button className="category-del del-position" onClick={() => onClicDeleteTodo(item.id)}></button>
    
    {item.category && <span className="tasks-text__category" style={{backgroundColor: findColor(item.category)}}>{item.category}</span>}
    
  </div>
})


const catTasksMap = todo.filter((item) => item.category === curentCategory.name).map((item) => {
  return   <div className="tasks-text__li" key={item.id}>
  
  <input type="checkbox" checked={item.isDone} onClick={() => isDone(item.id)} />

  <div className="tasks-text__label ">{item.task}</div>

  <button className="category-del del-position" onClick={() => onClicDeleteTodo(item.id)}></button>

  {item.category && <span className="tasks-text__category" style={{backgroundColor: findColor(item.category)}}>{item.category}</span>}
  
</div>

})




  return (
    <div className="App">
      <div className="wrapper">

        {/* categpoty scrin */}
        <TasksCategory 
          curentCategory={curentCategory}
          setCurentCategory={setCurentCategory}
          categorys={categorys}
          setCategorys={setCategorys}
          // onClicDeleteTodo = {onClicDeleteTodo}
          todo = {todo}
          setTodo = {setTodo}
          colorTasksMap={colorTasksMap}
        />
        {/* main scrin */}

        <div className="tasks-text">

          <h2 className="task-text__category">{curentCategory.name
          ?curentCategory.name
          :"All tasks"}</h2>

          <div className="form">
            <form className="tasks-text__form">
              <input type="text" 
              className="tasks-text__input"
               placeholder='Add a new task'
               value={tasks}
                onChange={(e) => setTasks(e.target.value)} />

              <input className="tasks-text__input-but pos-but" type="submit" value="+" onClick={onClicAddTodo} />
            </form>
          </div>
          
          <div className="tasks-text__ul">
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
