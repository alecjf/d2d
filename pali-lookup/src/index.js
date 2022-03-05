import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import PaliLookup from "./components/PaliLookup";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<PaliLookup
			{...{
				// paliWords in external js loaded in
				// public/index.html <head> section:
				// eslint-disable-next-line no-undef
				paliWords,
			}}
		/>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
