import React from 'react';
import PropTypes from 'prop-types';

function Button({className, size, children, ...rootDOMAttributes }) {
	const sizes = {
		sm: 'py-1 px-2',
		md: 'py-1.5 px-3',
		lg: 'py-2 px-4'
	}

	const classNames = `${sizes[size] ?? ''} hover:opacity-80 ${className}`

	return (
		<button type="button" className={classNames} {...rootDOMAttributes}>
			{children}
		</button>
	)
}

Button.propTypes = {
	className: PropTypes.string,
	size: PropTypes.string
}

Button.defaultProps = {
	size: 'sm'
}

export default Button;
