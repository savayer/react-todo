import React from 'react';
import PropTypes from 'prop-types';

function Button({className, disabled, size, title, children}) {
	const sizes = {
		sm: 'p-1',
		md: 'py-1.5 px-2',
		lg: 'py-2 px-3'
	}

	const classNames = `${sizes[size] ?? ''} ${className}`

	return (
		<button type="button" disabled={disabled} title={title} className={classNames}>
			{children}
		</button>
	)
}

Button.propTypes = {
	className: PropTypes.string,
	size: PropTypes.string,
	disabled: PropTypes.bool,
	title: PropTypes.string
}

Button.defaultProps = {
	size: 'sm'
}

export default Button;
