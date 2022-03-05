import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import DharmaLookup from "./components/DharmaLookup";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<DharmaLookup
			{...{
				// dharmaLists, justPaths, and paliWords in external js
                // loaded in public/index.html <head> section:
				// eslint-disable-next-line no-undef
				dharmaLists,
				// eslint-disable-next-line no-undef
				justPaths,
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
