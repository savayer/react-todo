import React from 'react';
import { classNames } from '../../utils/classNames';

export function Checkbox({
	name,
	checked,
	labelClass,
	className,
	onChange,
	children,
}) {
	return (
		<label
			className={classNames('relative select-none cursor-pointer', labelClass)}
			onClick={(e) => e.stopPropagation()}
		>
			<input
				type="checkbox"
				name={name}
				checked={checked}
				className={classNames(
					'relative mr-4 top-0 left-0 h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-neutral-300',
					'transition checked:border-blue-500 checked:bg-blue-500 checked:after:block',
					'after:absolute after:top-1/2 after:left-1/2 after:hidden after:h-2.5 after:w-1.5',
					'after:-translate-y-2/3 after:-translate-x-1/2 after:rotate-45 after:border-r-2 after:border-b-2 after:border-white',
					className,
				)}
				onChange={onChange}
				readOnly
			/>

			{children}
		</label>
	);
}
