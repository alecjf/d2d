import "../css/pali-lookup.css";
import { useEffect, useState } from "react";
import { paliWords } from "d2d-all-info";
import Navigation from "d2d-navigation";

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
			paliWordCoord = document.getElementById(wordPair.pali).offsetTop,
			engWordCoord =
				document.getElementById(wordPair.eng).offsetTop -
				paliElem.getBoundingClientRect().bottom;
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
		<>
			<Navigation />
			<div id="pali-lookup">
				{makePaliWords()}
				{makeEngWords()}
			</div>
		</>
	);
};

export default PaliLookup;
