import React, { useCallback, useEffect, useRef, useState } from 'react';
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
	const [todoName, setTodoName] = useState(todoItemForEditing.title || '');
	const [hasTodoNameError, setTodoNameError] = useState(false);
	const [todoDescription, setTodoDescription] = useState(
		todoItemForEditing.description || '',
	);
	const input = useRef();

	useEffect(() => {
		input.current.focus();
	}, []);

	const onKeyDown = useCallback(
		(e) => {
			if (e.key === 'Enter') {
				submit();
			}
		},
		[todoName],
	);

	const submit = useCallback(() => {
		if (todoName.trim() === '') {
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
				<h3 className="mb-3 text-left text-3xl">{formTitle}</h3>

				<input
					ref={input}
					type="text"
					value={todoName}
					placeholder="Todo name"
					onInput={(e) => setTodoName(e.target.value)}
					onKeyDown={onKeyDown}
					className={classNames(
						'h-8 w-full border p-2 focus:outline-none',
						hasTodoNameError ? 'border-red-500' : 'border-slate-300',
					)}
				/>

				<textarea
					placeholder="Todo description"
					onChange={(e) => setTodoDescription(e.target.value)}
					value={todoDescription}
					className="mt-2 max-h-24 min-h-[45px] w-full border border-slate-300 p-2 focus:outline-none"
				/>

				<Button className="ml-auto bg-blue-600 text-white" onClick={submit}>
					{submitButtonText}
				</Button>
			</div>
		</Modal>
	);
}
