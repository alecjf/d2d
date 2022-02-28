import "../css/pali-lookup.css";
import { useEffect, useState } from "react";
import { paliWords } from "d2d-all-info";
import fhLogo from "../images/fern-haus-site-logo.png";

const PaliLookup = (props) => {
	const sortedPali = Object.keys(paliWords).sort(),
		sortedEng = Object.values(paliWords).sort();

	function getEngWordFromPali(pali) {
		return { pali: pali, eng: paliWords[pali] };
	}

	function getPaliWordFromEng(eng) {
		function getKeyByValue(object, value) {
			return Object.keys(object).find((key) => object[key] === value);
		}
		return { pali: getKeyByValue(paliWords, eng), eng: eng };
	}

	const [wordPair, setWordPair] = useState(getEngWordFromPali(sortedPali[0]));

	useEffect(() => {
		//		scrollToSelected(wordPair.pali, wordPair.eng);
		const paliElem = document.getElementById("pali-words"),
			engElem = document.getElementById("eng-words"),
			headerElemBottom = document
				.getElementsByTagName("header")[0]
				.getBoundingClientRect().bottom,
			paliWordCoord =
				document.getElementById(wordPair.pali).offsetTop -
				headerElemBottom,
			engWordCoord =
				document.getElementById(wordPair.eng).offsetTop -
				paliElem.getBoundingClientRect().bottom;
		console.log(paliWordCoord, engWordCoord, headerElemBottom);
		paliElem.scrollTo({ top: paliWordCoord, left: 0, behavior: "smooth" });
		engElem.scrollTo({ top: engWordCoord, left: 0, behavior: "smooth" });
	});

	function makeWords(id, onChange, words) {
		let result = [];
		for (const word of words) {
			result.push(
				<div
					key={`word-${word}`}
					id={word}
					onClick={() => setWordPair(onChange(word))}
					className={
						wordPair.pali === word || wordPair.eng === word
							? "selected"
							: "normal"
					}
				>
					{word}
				</div>
			);
		}
		return (
			<div id={id} className={"words"}>
				{result}
			</div>
		);
	}

	const makePaliWords = () =>
			makeWords("pali-words", getEngWordFromPali, sortedPali),
		makeEngWords = () =>
			makeWords("eng-words", getPaliWordFromEng, sortedEng);

	return (
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
	);
};

export default PaliLookup;
