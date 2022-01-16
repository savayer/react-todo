import React from "react";
import "./../../assets/styles/loader.css";

export default function Loader ({ ...rootDOMAttributes }) {
	return (
		<div {...rootDOMAttributes}>
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		</div>
	)
}
