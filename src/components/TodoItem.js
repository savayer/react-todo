import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function TodoItem({ todo, onChecked }) {
	const [isChecked, setChecked] = useState(todo.isChecked);
	const todoItemClickHandler = (todoItemData) => {
		setChecked(!isChecked);
		onChecked(todoItemData);
	};

	useEffect(() => {
		setChecked(todo.isChecked);
	}, [todo.isChecked]);

	return (
		<div
			className={cx('todo-item mb-2 p-2 cursor-pointer', {
				'bg-orange-50': todo.completed,
				'bg-slate-100': isChecked,
				'hover:bg-slate-50': !isChecked,
			})}
			title="Select the task"
			onClick={() =>
				todoItemClickHandler({ todoItemId: todo.id, isChecked: !isChecked })
			}
		>
			<input type="checkbox" className="hidden" value={isChecked} />
			<div className="todo-item__title font-medium text-xl">{todo.title}</div>

			{todo.description && (
				<div className="todo-item__text text-slate-400">{todo.description}</div>
			)}
		</div>
	);
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	onChecked: PropTypes.func.isRequired,
};
