import React from 'react';
import Button from './UI/Button';

export default function AddButton(attributes) {
	return (
		<Button
			className="fixed flex bottom-3 right-3 rounded-full bg-blue-500 hover:opacity-80 transition-opacity w-10 h-10 text-white text-2xl"
			title="Create a task"
			{...attributes}
		>
			<span className="m-auto leading-none h-10">+</span>
		</Button>
	);
}
