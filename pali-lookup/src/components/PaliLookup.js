import "../css/pali-lookup.css";
import { useEffect, useState } from "react";
import fhLogo from "../images/fern-haus-site-logo.png";

const PaliLookup = (props) => {
	const [paliWords, setPaliWords] = useState(undefined);

	useEffect(() => {
		fetch("https://fern.haus/projects/d2d/data.js")
			.then((res) => res.text())
			// eslint-disable-next-line no-eval
			.then((res) => eval(res))
			.then((json) => {
				setPaliWords(json.paliWords);
				const pali = Object.keys(json.paliWords).sort()[0],
					eng = getEngWordFromPali(pali, json.paliWords).eng;
				scrollHandler(eng, pali);
			});
	}, []);

	function getEngWordFromPali(pali, paliWords) {
		return { pali: pali, eng: paliWords[pali] };
	}

	function getPaliWordFromEng(eng, paliWords) {
		function getKeyByValue(object, value) {
			return Object.keys(object).find((key) => object[key] === value);
		}
		return { pali: getKeyByValue(paliWords, eng), eng: eng };
	}

	function scrollHandler(eng, pali) {
		[pali, eng].forEach((w) =>
			document.getElementById(w).classList.add("selected")
		);
		const paliElem = document.getElementById("pali-words"),
			engElem = document.getElementById("eng-words"),
			headerElemBottom = document
				.getElementsByTagName("header")[0]
				.getBoundingClientRect().bottom,
			paliWordCoord =
				document.getElementById(pali).offsetTop - headerElemBottom,
			engWordCoord =
				document.getElementById(eng).offsetTop -
				paliElem.getBoundingClientRect().bottom;
		// console.log(paliWordCoord, engWordCoord, headerElemBottom);
		paliElem.scrollTo({
			top: paliWordCoord,
			left: 0,
			behavior: "smooth",
		});
		engElem.scrollTo({
			top: engWordCoord,
			left: 0,
			behavior: "smooth",
		});
	}

	function makeWords(id, words) {
		let result = [];
		for (const word of words) {
			result.push(
				<div
					key={`word-${word}`}
					id={word}
					onClick={(e) => {
						// clear previously selected
						[
							...document.getElementsByClassName("selected"),
						].forEach((elem) => elem.classList.remove("selected"));

						const word = e.target.innerText,
							pali = paliWords[word]
								? word
								: getPaliWordFromEng(word, paliWords).pali,
							eng = paliWords[word]
								? getEngWordFromPali(word, paliWords).eng
								: word;
						scrollHandler(eng, pali);
					}}
				>
					{word}
				</div>
			);
		}
		return (
			<div id={id} className="words">
				{result}
			</div>
		);
	}

	const makePaliWords = () =>
			makeWords("pali-words", Object.keys(paliWords).sort()),
		makeEngWords = () =>
			makeWords("eng-words", Object.values(paliWords).sort());

	return paliWords ? (
		<div id="pali-lookup">
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
			<div id="all-words">
				{makePaliWords()}
				{makeEngWords()}
			</div>
		</div>
	) : (
		<></>
	);
};

export default PaliLookup;
