import { Category, Todo } from '../interfaceTodo';
import React, { useState, FC } from 'react';
import { nanoid } from 'nanoid';



type TasksProps = {
	categorys: Category[];
	setCategorys: (categorys: Category[]) => void;
	curentCategory: Category;
	setCurentCategory: (curentCategory: Category) => void;
	todo: Todo[];
	setTodo: (todo: Todo[]) => void

}

const colors: string[] = [
	'rgb(237, 53, 40)',
	'rgb(240, 114, 5)',
	'rgb(5, 240, 107)',
	'rgb(5, 197, 240)',
	'rgb(112, 83, 176)',
	'rgb(227, 27, 150)'];

const TasksCategory: FC<TasksProps> = ({
	categorys,
	setCategorys,
	// curentCategory,
	setCurentCategory,
	todo,
	setTodo,


}) => {

	const [newCategorys, setNewCategorys] = useState<string>('');
	const [colorChoose, setColorChoose] = useState("rgb(50 50 50 / 70%)")

	const colorTasksMap = colors.map((col, ind) => {
		return <button
			key={ind}
			onClick={() => setColorChoose(col)}
			style={{ backgroundColor: col }}
			className="collor" >
		</button>
	})

	const addCategory = (e: React.FormEvent) => {
		e.preventDefault();
		if (newCategorys) {
			const newCatObj = {
				name: newCategorys,
				id: nanoid(),
				color: colorChoose
			};

			const newCategory = [
				...categorys,
				newCatObj];

			setCategorys(newCategory);
			setNewCategorys('');
			setCurentCategory(newCatObj);
			setColorChoose("rgb(50 50 50 / 70%)");
			localStorage.setItem("category", JSON.stringify(newCategory))
		}
	}

	const chooseCategory = (cat: Category) => {
		setCurentCategory(cat)
	}

	const deleteCategory = (catId: string) => {
			const neededCategory = categorys.find((cat) => cat.id === catId);
		const newCategory = (categorys.filter((cat) => cat.id !== neededCategory?.id));
		setCategorys(newCategory)
		localStorage.setItem("category", JSON.stringify(newCategory))
		const newTodo = todo.filter((item) => item.category !== neededCategory?.name);
		setTodo(newTodo);
		localStorage.setItem("todo", JSON.stringify(newTodo))
		setCurentCategory({ name: '', id: nanoid() });
	}

	// ++++++++++++++++ Render category +++++++++++++++++++
	const categoryRender = categorys.map((cat) => {
		return (
			<div
				className="tasks-category"
				key={cat.id}>
				<h2	className="tasks-category__text"
					style={{ color: cat.color }}
					onClick={() => chooseCategory(cat)}>{cat.name}</h2>
				{cat.name
					? <button
						className="category-del"
						onClick={() => deleteCategory(cat.id)} >
					</button>
					: null}
			</div>
		)
	})

	return (
		<div className="tasks">

			<h2 className="tasks-title__but"
				onClick={() => setCurentCategory({ name: '', id: nanoid() })}>
				All Tasks
			</h2>
			{categoryRender}

			<form	className="tasks-form" onSubmit={addCategory}>

				<input
					type="text"
					className="tasks-but__inp"
					placeholder="Add category (max 30)"
					style={{ color: colorChoose }}
					value={newCategorys}
					onChange={(e) => setNewCategorys(e.target.value)}
				/>

				<input
					type="submit"
					value="+"
					className="tasks-text__input-but position-input" 
				/>
			</form>

			<div className="color-cont">
				{newCategorys
				? colorTasksMap
				: ""}
			</div>
			{/* <span className="bb"></span> */}
		</div>
	);
};
export default TasksCategory;
