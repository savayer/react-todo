import React, {useState} from 'react';
import TodoList from "./assets/components/TodoList";
import CreateTodo from "./assets/components/CreateTodo";

function App() {
	const [todos] = useState([
		{ id: 1, name: 'Купить хлеб', description: 'Нарезанный для тостов в Титане :)' },
		{ id: 2, name: 'Помыть посуду' },
		{ id: 3, name: 'Покормить кота', description: 'Sheba либо Kitekat' }
	])

	/**
	 * @param todoData - object
	 * @param todoData.id - changed todoItemId
	 * @param todoData.isChecked - current state of checkbox
	 */
	function onSelectTodo (todoData) {
		todos.some(todo => {
			if (todo.id === todoData.id) {
				todo.isChecked = todoData.isChecked
				return true
			}
		})
	}

	function getCountCheckedTodoItems () {
		return todos.filter(todo => todo.isChecked).length
	}

	return (
		<>
			<div className="app bg-white rounded-lg drop-shadow-xl p-3 relative">
				{/*<span>Selected {getCountCheckedTodoItems()} items</span>*/}
				<TodoList
					todos={todos}
					onSelectTodo={onSelectTodo}
				/>
			</div>
			<CreateTodo />
		</>
	);
}

export default App;
