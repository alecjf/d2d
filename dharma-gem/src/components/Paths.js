import "../css/paths.css";
import { useState } from "react";
import dharmaLists, { paliWords, thePath, justPaths } from "d2d-all-info";
import fhLogo from "../images/fern-haus-site-logo.png";

const Paths = ({ setPath, list, setList }) => {
	const [isOpen, setIsOpen] = useState(false);

	function getPathGroups() {
		let result = {};
		thePath.forEach(
			(p) =>
				(result[`${p.pali} (${paliWords[p.pali]})`] = p.parts.map(
					(part) => `${paliWords[part.pali[0]]}`
				))
		);
		return result;
	}

	const pathNames = justPaths.map((path) => paliWords[path.pali]);

	function sidesHandler(path) {
		setPath(pathNames.indexOf(path) + 1);
		const sceneDOM = document.getElementById("scene");
		if (!(sceneDOM.className === "clicked")) {
			sceneDOM.className = "clicked";
		}
		setIsOpen(false);
	}

	const obj = getPathGroups();

	const processKey = (key) =>
		key
			.split(" (")
			.map((part, i) => (
				<div key={`processed-key-${key}-${part}`}>
					{i === 1 ? "(" + part : part}
				</div>
			));

	function listsDropdown() {
		let result = Object.keys(dharmaLists).map((key) => (
			<option value={key} key={key}>
				{key}
			</option>
		));
		return (
			<select
				onChange={(e) => {
					setList(e.target.value);
					setIsOpen(false);
				}}
				value={list}
			>
				<option value="TITLE" disabled>
					BUDDHIST LISTS
				</option>
				{result}
			</select>
		);
	}

	return (
		<div id="paths" className={isOpen ? "open" : "closed"}>
			<div id="main">
				<div id="header">
					The Noble Eightfold Path from the
					<br />
					<a href="">
						Saccavibhanga Sutta
						<br />
						(Majjhima Nikaya 141)
					</a>
				</div>
				<div id="path-groups">
					{Object.keys(obj).map((key) => (
						<div key={`path-group-${key}`} className="path-group">
							{processKey(key)}
							{obj[key].map((path) => (
								<button
									key={`path-button-${path}`}
									onClick={() => sidesHandler(path)}
								>
									{path}
								</button>
							))}
						</div>
					))}
				</div>
				<div id="dropdowns-container">{listsDropdown()}</div>
			</div>
			<div id="links">
				<a id="parent-link" href="https://fern.haus/projects/d2d">
					Door 2 Dharma
				</a>
				<div id="select-path" onClick={() => setIsOpen(!isOpen)}>
					SELECT A PATH
				</div>
				<a
					id="home-link"
					href="https://fern.haus/"
					target="_blank"
					rel="noreferrer"
				>
					Fern Haus&nbsp;
					<img
						id="logo-link"
						src={fhLogo}
						alt="Fern Haus Logo - House with Port Window and Fern Vines"
					/>
				</a>
			</div>
		</div>
	);
};

export default Paths;
