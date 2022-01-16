import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TodoItem from "./TodoItem";
import Context from "../context";

function TodoList({ todos, onSelectTodo }) {
	const { isLoading } = useContext(Context)
	const noTodos = !todos.length && !isLoading ? <div className="text-2xl p-3 text-center">No Todos...</div> : '';

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
