import { Category, Todo } from '../interfaceTodo';
import React, { useState, useEffect } from 'react';
import { ReadonlyCollection } from 'typescript';
import { nanoid } from 'nanoid';
type TasksProps = {
	categorys: Category[];
	setCategorys: (categorys:Category[]) => void;
	curentCategory: Category;
	setCurentCategory: (curentCategory: Category) => void;
	// onClicDeleteTodo: (id: string) => void
	// todo: Todo[];
	// setTodo: (todo: Todo[]) => void
}
const TasksCategory = ({
	categorys,
	setCategorys,
	curentCategory,
	setCurentCategory,
	// onClicDeleteTodo,
	// todo,
	// setTodo,

}: TasksProps) => {
const [newCategorys, setNewCategorys] = useState<string>('');

	const addCategory = (e:React.FormEvent) => {
		e.preventDefault();
		if(!newCategorys) {
		return
		} 

		const newCatObj = {name:newCategorys, id: nanoid()};
		const newCategory = [...categorys,newCatObj];
		setCategorys(newCategory);
		setNewCategorys('');
		setCurentCategory(newCatObj);
	}

	const chooseCategory = (cat:Category) =>{
		setCurentCategory(cat)
	}

	const delitCategory = () =>{
		setCategorys(categorys.filter((item) => item.name !== curentCategory.name));
		setCurentCategory({name:'', id:nanoid()});

		//<<<<<<<<<<<<<< deleted todo not work-----don`t delete todo text>>>>>>>>>>>
		// _________________________________________________________________________
		 	// useEffect(()=>{
			// onClicDeleteTodo

			// 	// 			const newTodo = todo.filter((item) => item.category === curentCategory.name);
			// 	// setTodo(newTodo);
			// },[]);
		}
	

	return (
		<div className="tasks">
			<h2 className="tasks-title__but" onClick={()=>setCurentCategory({name:'', id:nanoid()})}>All Tasks</h2>
			{categorys.map((cat) => {return (
			<div className="tasks-category">
			<h2 className="tasks-category__text" onClick={() => chooseCategory(cat)} key={cat.id}>{cat.name}</h2>
			<button className= "category-del" onClick={() => delitCategory()} >Delete</button>
			</div>
			)})}	
					
					
			
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
		
		</div>
	);
};
export default TasksCategory;
