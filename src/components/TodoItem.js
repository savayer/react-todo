import React, { useState } from 'react';
import PropTypes from 'prop-types'
import cx from 'classnames';

function TodoItem({ title, text, completed, todoItemId, onChecked }) {
	const [isChecked, setChecked] = useState(false)
	const todoItemClickHandler = (todoItemData) => {
		setChecked(!isChecked);
		onChecked(todoItemData);
	}

	const classNames = cx('todo-item mb-2 p-2 cursor-pointer', {
		'bg-orange-50': completed,
		'bg-slate-100': isChecked,
		'hover:bg-slate-50': !isChecked
	})

	let $textBlock = ''
	if (text) {
		$textBlock = <div className="todo-item__text text-slate-400">{text}</div>
	}

	return (
		<div className={classNames}
				 title="Select the task"
				 onClick={() => todoItemClickHandler({ todoItemId, isChecked: !isChecked })}>
			<input type="checkbox" className="hidden" value={isChecked} />
			<div className="todo-item__title font-medium text-xl">{title}</div>
			{$textBlock}
		</div>
	)
}

TodoItem.propTypes = {
	title: PropTypes.string.isRequired,
	todoItemId: PropTypes.number.isRequired,
	onChecked: PropTypes.func.isRequired,
	text: PropTypes.string,
	completed: PropTypes.bool
}

export default TodoItem;
