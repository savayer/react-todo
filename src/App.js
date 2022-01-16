import React, {useState} from "react";
import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import Context from "./context";
import TodoItemsActions from "./components/TodoItemsActions";
import UpdateTodo from "./components/UpdateTodo";

function App() {
	const [isShowModal, setShowModal] = useState(false)
	const [todoItemForEditing, setTodoItemForEditing] = useState({})
	const [todos, setTodos] = useState([
		{ id: 1, completed: false, name: 'Buy a bread', description: 'Sliced for toast in Titan :)' },
		{ id: 2, completed: false, name: 'Wash the dishes' },
		{ id: 3, completed: false, name: 'Feed the cat', description: 'Sheba or Kitekat' }
	])

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

	function deleteTodoItem () {
		setTodos(todos.filter(todo => !todo.isChecked))
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

	function addTodo (newTodoItem) {
		setTodos(todos.concat([
			newTodoItem
		]))
	}

	function updateTodo (todoItem) {
		setTodos(todos.map(todo => {
			if (todo.id === todoItem.id) {
				todo = todoItem
			}
			todo.isChecked = false

			return todo
		}))
	}

	function showModalForEditing (todoItem) {
		setTodoItemForEditing(todoItem)
		setShowModal(true)
	}

	const selectedTasks = getCheckedTodoItems()

	return (
		<Context.Provider value={{ deleteTodoItem, completeTodoItem, onEdit: showModalForEditing }}>
			<div className="app bg-white rounded-lg drop-shadow-xl p-3 relative">
				{selectedTasks.length ? <TodoItemsActions selectedTasks={selectedTasks} /> : '' }
				<TodoList
					todos={todos}
					onSelectTodo={onSelectTodo}
				/>
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
