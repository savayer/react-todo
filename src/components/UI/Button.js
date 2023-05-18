import React from 'react';

export default function Button({ className, children, ...attributes }) {
	return (
		<button
			type="button"
			className={`hover:opacity-80 px-3 py-1.5 ${className}`}
			{...attributes}
		>
			{children}
		</button>
	);
}
