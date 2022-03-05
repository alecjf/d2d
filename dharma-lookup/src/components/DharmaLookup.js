import "../css/dharma-lookup.css";
import { useState, useEffect } from "react";
import ListBox, { capitalize } from "./ListBox";
import fhLogo from "../images/fern-haus-site-logo.png";

const DharmaLookup = ({ dharmaLists, paliWords }) => {
	const [fromTop, setFromTop] = useState(0);

	// set fromTop after rendering.
	useEffect(() => setFromTop(window.innerHeight - 30), []);

	window.addEventListener("resize", () =>
		setFromTop(window.innerHeight - 30)
	);

	function scrollSectionHandler(event) {
		document.getElementById("dharma-lookup").scrollTo({
			top: document
				.getElementById(`${event.target.value} lookup`)
				.getBoundingClientRect().top,
			left: 0,
			behavior: "smooth",
		});
	}

	function backToTopHandler(event) {
		document.getElementById("dharma-lookup").scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	return (
		<div id="dharma-lookup">
			<header>
				<a
					href="https://fern.haus/"
					className="fern-haus-link"
					target="_blank"
					rel="noreferrer"
				>
					<section className="fern-haus-info">
						<img
							src={fhLogo}
							alt="Fern Haus Logo - House with Port Window and Fern Vines"
						/>
						<h4>fern.haus</h4>
					</section>
				</a>
				<section id="d2d-header">
					<p>more web apps like this at</p>
					<h2>
						<a href="https://fern.haus/projects/d2d">
							Door 2 Dharma
						</a>
					</h2>
				</section>
			</header>
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
				<ListBox
					{...{ dharmaLists, paliWords }}
					title={key}
					key={`lookup-list-box-${key}`}
				/>
			))}
			<footer>
				<a
					href="https://fern.haus/"
					className="fern-haus-link"
					target="_blank"
					rel="noreferrer"
				>
					<section className="fern-haus-info">
						<img
							src={fhLogo}
							alt="Fern Haus Logo - House with Port Window and Fern Vines"
						/>
						<h4>fern.haus</h4>
					</section>
				</a>
			</footer>
		</div>
	);
};

export default DharmaLookup;
