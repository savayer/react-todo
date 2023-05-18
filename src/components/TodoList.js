import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import Context from '../context';
import TodoItemsActions from './TodoItemsActions';

export default function TodoList({ todos, onSelectTodo, selectedTodos }) {
	const { isLoading } = useContext(Context);

	return (
		<>
			{!todos.length && !isLoading && (
				<div className="text-2xl p-3 text-center">No Todos...</div>
			)}

			<TodoItemsActions selectedTasks={selectedTodos} />

			<div className="todo-list overflow-y-auto max-h-96">
				{todos.map((todo) => (
					<TodoItem todo={todo} key={todo.id} onChecked={onSelectTodo} />
				))}
			</div>
		</>
	);
}

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
	selectedTodos: PropTypes.arrayOf(PropTypes.object),
	onSelectTodo: PropTypes.func.isRequired,
};
