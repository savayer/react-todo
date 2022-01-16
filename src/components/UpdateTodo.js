import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import ModalTodoForm from "./ModalTodoForm";

function UpdateTodo ({ onSubmit, todoData, showModal, onCloseModal }) {
	const [isShowModal, setShowingModal] = useState(showModal)

	useEffect(setShowingModal.bind(null, showModal), [showModal])

	useEffect(() => {
		if (!isShowModal) {
			onCloseModal()
		}
	}, [isShowModal])

	function submitTodo (updatingTodoItem) {
		const { todoName: name, todoDescription: description } = updatingTodoItem

		onSubmit({
			...todoData,
			name,
			description
		})
		setShowingModal(false)
	}

	return (
		<>
			{isShowModal ?
				<ModalTodoForm
					onClose={() => setShowingModal(false)}
					todoItemForEditing={todoData}
					onSubmit={submitTodo}
					formTitle="Updating todo"
					submitButtonText="Update todo"
				/> : ''}
		</>
	)
}

UpdateTodo.defaultProps = {
	todoData: {
		name: '',
		description: ''
	}
}

UpdateTodo.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	todoData: PropTypes.object,
	showModal: PropTypes.bool,
	onCloseModal: PropTypes.func
}

export default UpdateTodo;
