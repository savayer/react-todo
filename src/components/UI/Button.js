import React from 'react';
import { classNames } from '../../utils/classNames';

export default function Button({ className, children, ...attributes }) {
	return (
		<button
			type="button"
			className={classNames(
				'hover:opacity-90 transition-opacity px-3 py-1.5 rounded',
				className,
			)}
			{...attributes}
		>
			{children}
		</button>
	);
}
