import { Category, Todo } from '../interfaceTodo';
import React, { useState, useEffect,FC } from 'react';
import { ReadonlyCollection } from 'typescript';
import { nanoid } from 'nanoid';



type TasksProps = {
	categorys: Category[];
	setCategorys: (categorys:Category[]) => void;
	curentCategory: Category;
	setCurentCategory: (curentCategory: Category) => void;
	// onClicDeleteTodo: (id: string) => void
	todo: Todo[];
	setTodo: (todo: Todo[]) => void
	
}

const colors:string[] = ['red', 'green', 'blue', 'orange', 'yellow'];

const TasksCategory:FC<TasksProps> = ({
	categorys,
	setCategorys,
	curentCategory,
	setCurentCategory,
	todo,
	setTodo,


}) => {

const [newCategorys, setNewCategorys] = useState<string>('');
const [colorChoose, setColorChoose] = useState("gray")




const colorTasksMap =  colors.map((col,ind)=>{
  return <button key={ind} 
 
	onClick = {() => setColorChoose(col)}
    style={{backgroundColor: col}}
     className = "collor" ></button>
})

	const addCategory = (e:React.FormEvent) => {
		e.preventDefault();
		if(newCategorys) {
			
		
		const newCatObj = {
			name:newCategorys, 
			id: nanoid(),
			color:colorChoose
		};
		const newCategory = [...categorys,newCatObj];
		setCategorys(newCategory);
		setNewCategorys('');
		setCurentCategory(newCatObj);
		setColorChoose("gray");
		} 
	
	}

	const chooseCategory = (cat:Category) =>{
		setCurentCategory(cat)
	}

	const deleteCategory = () =>{
		setCategorys(categorys.filter((item) => item.name !== curentCategory.name));
		const newTodo = todo.filter((item) => item.category !== curentCategory.name);
		setTodo(newTodo);	
		setCurentCategory({name:'', id:nanoid()});		
	}


	
	const categoryRender = 	categorys.map((cat) => {return (
		<div className="tasks-category" key={cat.id}>
		<h2 className="tasks-category__text" onClick={() => chooseCategory(cat)}>{cat.name}</h2>
		{cat.name
		?<button className= "category-del" onClick={() => deleteCategory()} ></button>
		:null}
		</div>
		)})

	return (
		<div className="tasks">
			<h2 className="tasks-title__but" onClick={()=>setCurentCategory({name:'', id:nanoid()})}>All Tasks</h2>
					{categoryRender}	
			<form className="tasks-form"  onSubmit={addCategory}>
				<input
					type="text"
					className="tasks-but__inp"
					placeholder="Add category"
					value={newCategorys}
					onChange={(e) => setNewCategorys(e.target.value)}
				/>
				<input type="submit" value="+" className="tasks-text__input-but position-input" />
			</form>
		<div className="color-cont">
			{newCategorys
			?colorTasksMap
		  :""}
		</div>
		</div>
	);
};
export default TasksCategory;
