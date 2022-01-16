import React, {useEffect, useState} from "react";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import PropTypes from 'prop-types';

function ModalTodoForm ({ formTitle, onClose, onSubmit, submitButtonText, todoItemForEditing }) {
	const [todoName, setTodoName] = useState(todoItemForEditing.name)
	const [todoDescription, setTodoDescription] = useState(todoItemForEditing.description)

	useEffect(() => {
		setTodoName(todoItemForEditing.name)
		setTodoDescription(todoItemForEditing.description)
	}, [todoItemForEditing])

	function submit () {
		onSubmit({ todoName, todoDescription })
		setTodoName('')
		setTodoDescription('')
	}

	return (
		<Modal onClose={onClose}>
			<div className="p-3 text-right text-black">
				<div className="text-3xl text-left mb-3">{formTitle}</div>
				<input
					type="text"
					value={todoName}
					onChange={e => setTodoName(e.target.value)}
					className="border border-slate-300 w-full h-8 focus:outline-none p-2"
				/>
				<textarea
					onChange={e => setTodoDescription(e.target.value)}
					value={todoDescription}
					className="border border-slate-300 w-full mt-2 min-h-10 max-h-24 focus:outline-none p-2"
				/>

				<Button className="bg-blue-600 text-white ml-auto rounded-sm" size="md" onClick={submit}>
					{submitButtonText}
				</Button>
			</div>
		</Modal>
	)
}

ModalTodoForm.defaultProps = {
	submitButtonText: 'Create todo',
	formTitle: 'Creating todo',
	todoItemForEditing: {
		name: '',
		description: ''
	}
}

ModalTodoForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	submitButtonText: PropTypes.string,
	formTitle: PropTypes.string,
	todoItemForEditing: PropTypes.object
}

export default ModalTodoForm;
