import React, {useState, useEffect, useCallback} from "react";
import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import Context from "./context";
import TodoItemsActions from "./components/TodoItemsActions";
import UpdateTodo from "./components/UpdateTodo";
import * as request from "./api/rest/todos";
import Loader from "./components/UI/Loader";

function App() {
	const [isLoading, setLoading] = useState(false)
	const [isShowModal, setShowModal] = useState(false)
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
				todo.completed = true
				todo.isChecked = false
			}
			return todo
		}))
	}

	async function addTodo (newTodoItem) {
		try {
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
		setShowModal(true)
	}

	const selectedTasks = getCheckedTodoItems()

	return (
		<Context.Provider value={{ deleteTodoItem, completeTodoItem, onEdit: showModalForEditing, isLoading }}>
			<div className="app bg-white rounded-lg drop-shadow-xl p-3 relative">
				{isLoading
					? <Loader className="text-center" />
					: <div>
						{selectedTasks.length ? <TodoItemsActions selectedTasks={selectedTasks} /> : '' }
						<TodoList
							todos={todos}
							onSelectTodo={onSelectTodo}
						/>
					</div>
				}

			</div>
			<CreateTodo	onSubmit={addTodo} />
			<UpdateTodo
				onSubmit={updateTodo}
				showModal={isShowModal}
				todoData={todoItemForEditing}
				onCloseModal={() => setShowModal(false)}
			/>
		</Context.Provider>
	);
}

export default App;
