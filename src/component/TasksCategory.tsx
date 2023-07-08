
import { useState } from 'react';
type Tasks = {
    categorys: string;
    setCategorys: (category: string) => void;
		
  }
const TasksCategory = ({
	categorys,
	setCategorys,
	
}: Tasks) => {
	
	
	return (
		<div className="tasks">
			<h2 className="tasks-title__but">All Tasks</h2>
		<form className="tasks-form" >
		<input
				type="text"
				className="tasks-but__inp"
				placeholder="Add category"
			/>
			<input type="submit" value="+" className="tasks-text__input-but position-input" />
		</form>
			<div>
				<button className="tasks-category__text">{categorys}</button>
			</div>

	
			
			
		
	
		</div>
	);
};
export default TasksCategory;
