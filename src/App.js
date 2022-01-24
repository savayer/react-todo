import React, {useState, useEffect, useCallback} from "react";
import TodoList from "./components/TodoList";
import CreatingTodoButton from "./components/CreatingTodoButton";
import Context from "./context";
import * as request from "./api/rest/todos";
import Loader from "./components/UI/Loader";
import ModalTodoForm from "./components/ModalTodoForm";

const creatingModalData = {
	title: 'Creating todo',
	button: 'Create Todo',
	isUpdating: false
}

const updatingModalData = {
	title: 'Updating todo',
	button: 'Update Todo',
	isUpdating: true
}

function App() {
	const [theModalData, setTheModalData] = useState(creatingModalData)
	const [isLoading, setLoading] = useState(false)
	const [isShowModal, setShowingModal] = useState(false)
	const [todoItemForEditing, setTodoItemForEditing] = useState({})
	const [todos, setTodos] = useState([])

	const fetchTodos = useCallback(async () => {
		try {
			setLoading(true)
			const { data } = await request.getTodos()
			setTodos(data)
		} catch (e) {
			console.error(e)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchTodos().then(()=>{})
	}, [fetchTodos])

	useEffect(() => {
		if (!isShowModal) {
			setTheModalData(creatingModalData)
			setTodoItemForEditing({})
			setTodos(todos.map(todo => {
				todo.isChecked = false
				return todo
			}))
		}
	}, [isShowModal])

	/**
	 * @param todoData - object
	 * @param todoData.todoItemId - changed todoItemId
	 * @param todoData.isChecked - current state of checkbox
	 */
	function onSelectTodo (todoData) {
		setTodos(todos.map(todo => {
			if (todo.id === todoData.todoItemId) {
				todo.isChecked = todoData.isChecked
			}

			return todo
		}))
	}

	function getCheckedTodoItems () {
		return todos.filter(todo => todo.isChecked)
	}

	async function deleteTodoItem () {
		try {
			const filteredTodos = todos.filter(todo => !todo.isChecked)
			const todosIds = filteredTodos.map(todo => todo.id).flat()
			setLoading(true)
			await request.deleteTodos({ todosIds })
			setTodos(filteredTodos)
		} catch (e) {
			console.error(e)
		} finally {
			setLoading(false)
		}
	}

	function completeTodoItem () {
		setTodos(todos.map(todo => {
			if (todo.isChecked) {
				todo.completed = !todo.completed
				todo.isChecked = false
			}
			return todo
		}))
	}

	async function addTodo (newTodoItem) {
		try {
			setShowingModal(false)
			setLoading(true)
			const { data } = await request.createTodo(newTodoItem)
			setTodos(todos.concat([
				data
			]))
		} catch (e) {
			console.error(e)
		} finally {
			setLoading(false)
		}
	}

	async function updateTodo (todoItem) {
		try {
			setShowingModal(false)
			setLoading(true)
			const { data } = await request.updateTodo(todoItem.id, todoItem)

			setTodos(todos.map(todo => {
				if (todo.id === data.id) {
					todo = data
				}
				todo.isChecked = false

				return todo
			}))
		} catch (e) {
			console.error(e)
		} finally {
			setLoading(false)
		}
	}

	function showModalForEditing (todoItem) {
		setTodoItemForEditing(todoItem)
		setTheModalData(updatingModalData)
		setShowingModal(true)
	}

	return (
		<Context.Provider value={{ deleteTodoItem, completeTodoItem, onEdit: showModalForEditing, isLoading }}>
			<div className="app bg-white rounded-lg drop-shadow-xl p-3 relative">
				{isLoading
					? <Loader className="text-center" />
					: <TodoList
							todos={todos}
							selectedTodos={getCheckedTodoItems()}
							onSelectTodo={onSelectTodo}
						/>
				}
			</div>

			<CreatingTodoButton onClick={() => setShowingModal(true)} />

			{isShowModal
				? <ModalTodoForm
						isShowModal={isShowModal}
						todoItemForEditing={todoItemForEditing}
						formTitle={theModalData.title}
						submitButtonText={theModalData.button}
						onSubmit={theModalData.isUpdating ? updateTodo : addTodo}
						onClose={() => setShowingModal(false)}
					/>
				: ''
			}

		</Context.Provider>
	);
}

export default App;
