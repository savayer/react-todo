import React, { useCallback, useState } from 'react';
import Button from './UI/Button';
import Modal from './UI/Modal';
import { classNames } from '../utils/classNames';

export default function ModalTodoForm({
	formTitle = 'New task',
	onClose,
	onSubmit,
	submitButtonText = 'Create todo',
	todoItemForEditing,
}) {
	const [todoName, setTodoName] = useState(todoItemForEditing.name || '');
	const [hasTodoNameError, setTodoNameError] = useState(false);
	const [todoDescription, setTodoDescription] = useState(
		todoItemForEditing.description || '',
	);

	const submit = useCallback(() => {
		if (!todoName) {
			setTodoNameError(true);
			return;
		}

		const todo = {
			title: todoName,
			description: todoDescription,
			completed: false,
		};

		if (todoItemForEditing.id) {
			todo.id = todoItemForEditing.id;
		}
		onSubmit(todo);
		setTodoName('');
		setTodoDescription('');
	}, [todoName, todoDescription]);

	return (
		<Modal onClose={onClose}>
			<div className="p-3 text-right text-black">
				<h3 className="text-3xl text-left mb-3">{formTitle}</h3>

				<input
					type="text"
					value={todoName}
					placeholder="Todo name"
					onChange={(e) => setTodoName(e.target.value)}
					className={classNames(
						'border border-slate-300 w-full h-8 focus:outline-none p-2',
						hasTodoNameError && 'border-red-500',
					)}
				/>

				<textarea
					placeholder="Todo description"
					onChange={(e) => setTodoDescription(e.target.value)}
					value={todoDescription}
					className="border border-slate-300 w-full mt-2 min-h-[45px] max-h-24 focus:outline-none p-2"
				/>

				<Button
					className="bg-blue-600 text-white ml-auto rounded-sm"
					onClick={submit}
				>
					{submitButtonText}
				</Button>
			</div>
		</Modal>
	);
}
