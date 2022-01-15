import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from "./TodoItem";

function TodoList({ todos, onSelectTodo }) {
	return (
		<div className="todo-list">
			{todos.map(todo => {
				return <TodoItem
					title={todo.name}
					text={todo.description}
					todoItemId={todo.id}
					key={todo.id}
					onChecked={onSelectTodo}
				/>
			})}
		</div>
	)
}

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
	onSelectTodo: PropTypes.func.isRequired
}

export default TodoList;
