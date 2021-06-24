import "../css/paths.css";
import { paliWords, thePath, justPaths } from "d2d-all-info";

const Paths = ({ setPath }) => {
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

	return (
		<div id="paths">
			<div id="header">
				The Noble Eightfold Path as summarized in the{" "}
				<a href="">Saccavibhanga Sutta (Majjhima Nikaya 141)</a>
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
		</div>
	);
};

export default Paths;
