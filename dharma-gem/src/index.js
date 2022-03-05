import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import DharmaGem from "./components/DharmaGem";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<DharmaGem
			{...{
				// dharmaLists, justPaths, paliWords, and thePath
				// in external js loaded in public/index.html <head> section:
				// eslint-disable-next-line no-undef
				dharmaLists,
				// eslint-disable-next-line no-undef
				justPaths,
				// eslint-disable-next-line no-undef
				paliWords,
				// eslint-disable-next-line no-undef
				thePath,
			}}
		/>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
