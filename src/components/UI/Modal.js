import React from 'react';
import Portal from '../Portal';

export default function Modal({ onClose, children }) {
	return (
		<Portal>
			<div className="fixed z-10 inset-0 flex">
				<div className="fixed bg-black/50 z-10 inset-0" onClick={onClose} />

				<div className="m-auto w-11/12 sm:w-1/2 xl:w-1/4 p-5 bg-white rounded-md relative z-10">
					<svg
						className="absolute top-3 right-3 cursor-pointer w-3 h-3"
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
