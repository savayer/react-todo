import React from 'react';

function Button({children, ...rootDOMAttributes }) {
	const classNames = `hover:opacity-80 px-3 py-1.5 ${rootDOMAttributes.className}`
	delete rootDOMAttributes.className

	return (
		<button type="button" className={classNames} {...rootDOMAttributes}>
			{children}
		</button>
	)
}

export default Button;
