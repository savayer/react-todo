import React from 'react';
import Portal from '../Portal';

export default function Modal({ onClose, children }) {
	return (
		<Portal>
			<div className="fixed inset-0 z-10 flex">
				<div className="fixed inset-0 z-10 bg-black/50" onClick={onClose} />

				<div className="relative z-10 m-auto w-11/12 rounded-md bg-white p-5 sm:w-1/2 xl:w-1/4">
					<svg
						className="absolute right-3 top-3 h-3 w-3 cursor-pointer"
						onClick={onClose}
					>
						<use xlinkHref="#close" />
					</svg>

					{children}
				</div>
			</div>
		</Portal>
	);
}
