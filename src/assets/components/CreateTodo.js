import React from 'react';
import Button from "./UI/Button";

function CreateTodo() {
	const createButtonClasses = 'fixed bottom-3 right-3 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors w-10 h-10 text-white text-2xl'

	return (
		<Button size="md" className={createButtonClasses} title="Create a task">
			<span className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">+</span>
		</Button>
	)
}

export default CreateTodo;
