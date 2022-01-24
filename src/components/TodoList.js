import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TodoItem from "./TodoItem";
import Context from "../context";
import TodoItemsActions from "./TodoItemsActions";

function TodoList({ todos, onSelectTodo, selectedTodos }) {
	const { isLoading } = useContext(Context)
	const noTodos = !todos.length && !isLoading ? <div className="text-2xl p-3 text-center">No Todos...</div> : '';

	return (
		<>
			{noTodos}
			{selectedTodos.length ? <TodoItemsActions selectedTasks={selectedTodos} /> : '' }
			<div className="todo-list overflow-y-auto max-h-96">
				{todos.map(todo => {
					return <TodoItem
						todo={todo}
						key={todo.id}
						onChecked={onSelectTodo}
					/>
				})}
			</div>
		</>
	)
}

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
	selectedTodos: PropTypes.arrayOf(PropTypes.object),
	onSelectTodo: PropTypes.func.isRequired
}

export default TodoList;
