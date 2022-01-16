import React, {useState} from 'react';
import PropTypes from "prop-types";
import Button from "./UI/Button";
import ModalTodoForm from "./ModalTodoForm";

function CreateTodo ({ onSubmit }) {
	const [isShowModal, setShowingModal] = useState(false)
	const createButtonClasses = 'fixed bottom-3 right-3 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors w-10 h-10 text-white text-2xl'

	function submitTodo (newTodoItem) {
		const { todoName: name, todoDescription: description } = newTodoItem
		onSubmit({ id: Date.now(), name, description, completed: false })
		setShowingModal(false)
	}

	return (
		<>
			<Button
				size="lg"
				className={createButtonClasses}
				title="Create a task"
				onClick={() => setShowingModal(!isShowModal)}>
				<span className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">+</span>
			</Button>

			{isShowModal ?
				<ModalTodoForm
					onClose={() => setShowingModal(false)}
					onSubmit={submitTodo}
				/>
				: ''}
		</>
	)
}

CreateTodo.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onCloseModal: PropTypes.func
}

export default CreateTodo;
