import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from "./TodoItem";

function TodoList({ todos, onSelectTodo }) {
	const noTodos = !todos.length ? <div className="text-2xl p-3 text-center">No Todos...</div> : '';

	return (
		<>
			{noTodos}
			<div className="todo-list overflow-y-auto max-h-96">
				{todos.map(todo => {
					return <TodoItem
						title={todo.name}
						text={todo.description}
						todoItemId={todo.id}
						completed={todo.completed}
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
	onSelectTodo: PropTypes.func.isRequired
}

export default TodoList;
