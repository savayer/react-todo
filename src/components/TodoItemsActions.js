import React, {useContext} from "react";
import PropTypes from 'prop-types';
import Button from "./UI/Button";
import Context from "../context";

function TodoItemsActions ({ selectedTasks }) {
	const { deleteTodoItem, completeTodoItem, onEdit } = useContext(Context);

	const selectedTasksAmount = selectedTasks.length
	const deleteButtonTitle = `Delete all ${selectedTasksAmount} tasks`;
	const completeButtonTitle = `Complete all ${selectedTasksAmount} tasks`;
	let $editButton = ''
	let $completeButton = ''

	if (selectedTasksAmount === 1) {
		$editButton = <Button className="bg-cyan-400 mr-2 rounded-sm" onClick={() => onEdit(selectedTasks[0])}>Edit</Button>
		$completeButton = <Button
			className="bg-orange-500 rounded-sm mr-2"
			title={completeButtonTitle}
			onClick={completeTodoItem.bind()}>
			{selectedTasks[0].completed ? 'Incomplete' : 'Complete'}
		</Button>
	}

	return (
		<div className="p-2 border-b border-slate-100 mb-2 flex">
			<span>Selected {selectedTasksAmount} {selectedTasksAmount > 1 ? 'tasks' : 'task'}</span>

			<div className="ml-auto text-white">
				{$editButton}
				{$completeButton}
				<Button
					className="bg-red-500 rounded-sm"
					title={deleteButtonTitle}
					onClick={deleteTodoItem.bind()}>
					Delete
				</Button>
			</div>
		</div>
	)
}

TodoItemsActions.propTypes = {
	selectedTasks: PropTypes.arrayOf(PropTypes.object)
}

export default TodoItemsActions;
