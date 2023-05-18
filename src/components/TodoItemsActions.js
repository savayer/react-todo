import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from './UI/Button';
import Context from '../context';

export default function TodoItemsActions({ selectedTasks }) {
	const { deleteTodoItem, completeTodoItem, onEdit } = useContext(Context);

	if (!selectedTasks?.length) return null;

	return (
		<div className="p-2 border-b border-slate-100 mb-2 flex">
			<span>Selected {selectedTasks.length}</span>
			<span className="ml-1">
				{selectedTasks.length > 1 ? 'tasks' : 'task'}
			</span>

			<div className="ml-auto text-white">
				<Button
					className="bg-cyan-400 mr-2 rounded-sm"
					onClick={() => onEdit(selectedTasks[0])}
				>
					Edit
				</Button>

				{selectedTasks.length === 1 && (
					<>
						<Button
							className="bg-orange-500 rounded-sm mr-2"
							title={`Complete all ${selectedTasks.length} tasks`}
							onClick={completeTodoItem.bind()}
						>
							{selectedTasks[0].completed ? 'Incomplete' : 'Complete'}
						</Button>
						<Button
							className="bg-red-500 rounded-sm"
							title={`Delete all ${selectedTasks.length} tasks`}
							onClick={deleteTodoItem.bind()}
						>
							Delete
						</Button>
					</>
				)}
			</div>
		</div>
	);
}

TodoItemsActions.propTypes = {
	selectedTasks: PropTypes.arrayOf(PropTypes.object),
};
