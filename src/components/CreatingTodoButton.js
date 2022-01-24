import React from "react";
import PropTypes from "prop-types";
import Button from "./UI/Button";

function CreatingTodoButton ({ onClick }) {
	return (
		<Button
			className="fixed bottom-3 right-3 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors w-10 h-10 text-white text-2xl"
			title="Create a task"
			onClick={onClick}>
			<span className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">+</span>
		</Button>
	);
}

CreatingTodoButton.propTypes = {
	onClick: PropTypes.func.isRequired
}

export default CreatingTodoButton;
