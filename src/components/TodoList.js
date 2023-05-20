import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import AddButton from './AddButton';
import Loader from './UI/Loader';
import ModalTodoForm from './ModalTodoForm';
import { useRequest } from '../hooks/useRequest';
import {
	completeTodo,
	createTodo,
	deleteTodo,
	getTodos,
	updateTodo,
} from '../api/rest/todos';

const creatingModalData = {
	title: 'New task',
	button: 'Create task',
	isUpdating: false,
};

const updatingModalData = {
	title: 'Updating task',
	button: 'Update task',
	isUpdating: true,
};

export default function TodoList() {
	const [theModalData, setTheModalData] = useState(creatingModalData);
	const [isShowModal, setShowModal] = useState(false);
	const [todoItemForEditing, setTodoItemForEditing] = useState({});

	let {
		isLoading,
		result: todos,
		handleResponse: loadTodos,
	} = useRequest(getTodos);

	useEffect(() => {
		loadTodos().catch((e) => {
			console.log(e, 'Failure load todos');
		});
	}, []);

	useEffect(() => {
		if (!isShowModal) {
			setTheModalData(creatingModalData);
			setTodoItemForEditing({});
		}
	}, [isShowModal]);

	function showModalForEditing(todo) {
		setTodoItemForEditing(todo);
		setTheModalData(updatingModalData);
		setShowModal(true);
	}

	async function onDelete(id) {
		try {
			await deleteTodo(id);
			await loadTodos();
		} catch (e) {
			console.error(e);
		}
	}

	async function toggleComplete(todo) {
		try {
			await completeTodo(todo.id, {
				completed: todo.completed,
			});
			todos = await getTodos();
		} catch (e) {
			console.error(e);
		}
	}

	async function modalFormHandler(todo) {
		setShowModal(false);

		if (todo.id) {
			try {
				await updateTodo(todo.id, todo);
				await loadTodos();
			} catch (e) {
				console.error(e);
			}
		} else {
			try {
				await createTodo(todo);
				await loadTodos();
			} catch (e) {
				console.error(e);
			}
		}
	}

	return (
		<>
			{isLoading && <Loader className="text-center" />}

			{!todos?.length && !isLoading && (
				<div className="p-3 text-center text-2xl">No Todos...</div>
			)}

			{todos?.length && !isLoading && (
				<div className="flex max-h-96 flex-col gap-2 overflow-y-auto rounded-xl p-4 shadow">
					{todos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							toggleComplete={toggleComplete}
							onEdit={showModalForEditing}
							onDelete={onDelete}
						/>
					))}
				</div>
			)}

			<AddButton onClick={() => setShowModal(true)} />

			{isShowModal && (
				<ModalTodoForm
					isShowModal={isShowModal}
					todoItemForEditing={todoItemForEditing}
					formTitle={theModalData.title}
					submitButtonText={theModalData.button}
					onSubmit={modalFormHandler}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
}
