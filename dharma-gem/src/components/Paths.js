import "../css/paths.css";
import { useState } from "react";
import dharmaLists, { paliWords, thePath, justPaths } from "d2d-all-info";

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
			<div id="select-path" onClick={() => setIsOpen(!isOpen)}>
				SELECT A PATH
			</div>
		</div>
	);
};

export default Paths;
