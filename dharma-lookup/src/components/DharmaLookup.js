import "../css/dharma-lookup.css";
import { useState, useEffect } from "react";
import dharmaLists from "d2d-all-info";
import ListBox, { capitalize } from "d2d-listbox-main";
import Navigation from "d2d-navigation";

const DharmaLookup = (props) => {
	const [fromTop, setFromTop] = useState(0);
	// set fromTop after rendering.
	useEffect(() => setFromTop(window.innerHeight - 30), []);

	window.addEventListener("resize", () =>
		setFromTop(window.innerHeight - 30)
	);

	const dom = document.getElementById("dharma-lookup");

	function scrollSectionHandler(event) {
		dom.scrollTo({
			top: document
				.getElementById(`${event.target.value} lookup`)
				.getBoundingClientRect().top,
			left: 0,
			behavior: "smooth",
		});
	}

	function backToTopHandler(event) {
		dom.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	return (
		<>
			<Navigation />
			<div id="dharma-lookup">
				<div
					id="back-to-top"
					style={{ top: fromTop }}
					onClick={(event) => backToTopHandler(event)}
				>
					▲
				</div>
				<h1>Dharma Lookup</h1>
				<h2>Study Buddhist lists and concepts.</h2>
				<select onChange={(event) => scrollSectionHandler(event)}>
					{Object.keys(dharmaLists).map((option) => (
						<option value={option} key={`lookup-option-${option}`}>
							{capitalize(option)}
						</option>
					))}
				</select>
				{Object.keys(dharmaLists).map((key) => (
					<ListBox title={key} key={`lookup-list-box-${key}`} />
				))}
			</div>
		</>
	);
};

export default DharmaLookup;
