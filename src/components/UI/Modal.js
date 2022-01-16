import React from 'react';
import PropTypes from 'prop-types';

function Modal ({ children, onClose }) {
	return (
		<div className="overlay fixed z-10 inset-0 flex bg-black/75">
			<div className="modal m-auto w-11/12 sm:w-1/2 xl:w-1/4 p-5 bg-white rounded-md relative">
				<svg className="absolute top-3 right-3 cursor-pointer w-3 h-3" onClick={() => onClose()}><use xlinkHref="#close" /></svg>
				{children}
			</div>
		</div>
	)
}

Modal.propTypes = {
	onClose: PropTypes.func.isRequired
}

export default Modal;
