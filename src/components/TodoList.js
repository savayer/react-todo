import React, { useCallback, useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import * as request from '../api/rest/todos';
import AddButton from './AddButton';
import Loader from './UI/Loader';
import ModalTodoForm from './ModalTodoForm';

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
	const [isShowModal, setShowingModal] = useState(false);
	const [todoItemForEditing, setTodoItemForEditing] = useState({});
	const [todos, setTodos] = useState([]);

	const fetchTodos = useCallback(async () => {
		try {
			setLoading(true);
			const todos = await request.getTodos();
			setTodos(todos);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchTodos().then(() => {});
	}, []);

	useEffect(() => {
		if (!isShowModal) {
			setTheModalData(creatingModalData);
			setTodoItemForEditing({});
		}
	}, [isShowModal]);

	async function deleteTodoItem() {
		try {
			const filteredTodos = todos.filter((todo) => !todo.isChecked);
			const todosIds = filteredTodos.map((todo) => todo.id).flat();
			setLoading(true);
			await request.deleteTodos({ todosIds });
			setTodos(filteredTodos);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	}

	async function addTodo(newTodoItem) {
		try {
			setShowingModal(false);
			setLoading(true);
			const { data } = await request.createTodo(newTodoItem);
			setTodos(todos.concat([data]));
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	}

	async function updateTodo(todoItem) {
		try {
			setShowingModal(false);
			setLoading(true);
			const { data } = await request.updateTodo(todoItem.id, todoItem);

			setTodos(
				todos.map((todo) => {
					if (todo.id === data.id) {
						todo = data;
					}
					todo.isChecked = false;

					return todo;
				}),
			);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	}

	function showModalForEditing(todoItem) {
		setTodoItemForEditing(todoItem);
		setTheModalData(updatingModalData);
		setShowingModal(true);
	}

	function closeModal() {
		setTodos(
			todos.map((todo) => {
				todo.isChecked = false;
				return todo;
			}),
		);
		setShowingModal(false);
	}

	return (
		<>
			{isLoading && <Loader className="text-center" />}

			{!todos.length && !isLoading && (
				<div className="p-3 text-center text-2xl">No Todos...</div>
			)}

			{todos.length && !isLoading && (
				<div className="flex max-h-96 flex-col gap-2 overflow-y-auto">
					{todos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							onEdit={() => {}}
							onDelete={() => {}}
						/>
					))}
				</div>
			)}

			<AddButton onClick={() => setShowingModal(true)} />

			{isShowModal && (
				<ModalTodoForm
					isShowModal={isShowModal}
					todoItemForEditing={todoItemForEditing}
					formTitle={theModalData.title}
					submitButtonText={theModalData.button}
					onSubmit={theModalData.isUpdating ? updateTodo : addTodo}
					onClose={closeModal}
				/>
			)}
		</>
	);
}
