import React, { useState } from 'react';
import { classNames } from '../utils/classNames';
import { Checkbox } from './UI/Checkbox';
import Button from './UI/Button';
import Trash from '../icons/Trash';
import Editing from '../icons/Editing';

export default function TodoItem({ todo, toggleComplete, onEdit, onDelete }) {
	const [isChecked, setChecked] = useState(todo.completed);

	function onChange() {
		setChecked(!isChecked);
		toggleComplete({
			id: todo.id,
			completed: !isChecked,
		});
	}

	return (
		<div
			className={classNames(
				'group flex items-center p-2',
				!todo.completed && 'hover:bg-slate-100',
				todo.completed && '',
			)}
		>
			<Checkbox
				checked={isChecked}
				onChange={onChange}
				labelClass={classNames(
					'flex items-center',
					isChecked && 'line-through opacity-50',
				)}
			>
				<div>
					<div className="text-xl font-medium">{todo.title}</div>

					{todo.description && (
						<div className="text-slate-400">{todo.description}</div>
					)}
				</div>
			</Checkbox>

			<Button
				title="Edit task"
				className="ml-auto mr-1 bg-blue-400 !p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
				onClick={() => onEdit(todo)}
			>
				<Editing className="h-4 w-4 fill-white" />
			</Button>

			<Button
				title="Delete task"
				className="bg-red-400 !p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
				onClick={() => onDelete(todo.id)}
			>
				<Trash className="h-4 w-4 fill-white" />
			</Button>
		</div>
	);
}
