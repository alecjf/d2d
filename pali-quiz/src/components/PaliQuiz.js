import "../css/pali-quiz.css";
import { useEffect, useState } from "react";
import { paliWords, getRandomPaliWords, shuffle } from "d2d-all-info";
import { Transition } from "react-transition-group";
import fhLogo from "../images/fern-haus-site-logo.png";

const PaliQuiz = (props) => {
	const [data, setData] = useState({}),
		[suffledData, setShuffledData] = useState([]),
		[selectedItem, setSelectedItem] = useState(undefined),
		[matchedWords, setMatchedWords] = useState([]),
		[timerOn, setTimerOn] = useState(false),
		[timerStart, setTimerStart] = useState(0),
		[timerTime, setTimerTime] = useState(-1),
		[incorrectGuesses, setIncorrectGuesses] = useState(0),
		[scores, setScores] = useState({
			"games played": 0,
			time: 0,
			"running time": 0,
			"avg time": 0,
			"fastest time": undefined,
			"slowest time": undefined,
			"incorrect guesses": 0,
			"total incorrect guesses": 0,
			"avg incorrect guesses": 0,
		}),
		[newQuizToggle, setNewQuizToggle] = useState(undefined);

	function dataIsEmpty() {
		return Object.keys(data).length === 0;
	}

	function newQuizHandler() {
		setTimerOn(!timerOn);
		setTimerStart(Date.now() + /* buffer for toggling new game */ 1000);
		setNewQuizToggle(true);
	}

	function checkCompleted() {
		const wordNumber = Object.keys(data).length * 2;
		return wordNumber ? matchedWords.length === wordNumber : false;
	}

	function updateScores() {
		scores["games played"]++;
		scores.time = timerTime;
		scores["running time"] += timerTime;
		scores["avg time"] = Math.floor(
			scores["running time"] / scores["games played"]
		);
		scores["fastest time"] =
			scores["fastest time"] && scores["fastest time"] < timerTime
				? scores["fastest time"]
				: timerTime;
		scores["slowest time"] =
			scores["slowest time"] && scores["slowest time"] > timerTime
				? scores["slowest time"]
				: timerTime;
		scores["incorrect guesses"] = incorrectGuesses;
		scores["total incorrect guesses"] += incorrectGuesses;
		scores["avg incorrect guesses"] = Math.floor(
			scores["total incorrect guesses"] / scores["games played"]
		);
		setScores({ ...scores });
	}

	useEffect(() => {
		let result = [...Object.keys(data), ...Object.values(data)];
		shuffle(result);
		setShuffledData(result);
	}, [data]);

	useEffect(() => {
		let interval;
		if (timerOn) {
			interval = setInterval(
				() =>
					setTimerTime(Math.floor((Date.now() - timerStart) / 1000)),
				100
			);
		}
		// returning function for cleanup/unmounting
		return () => clearInterval(interval);
	}, [timerOn, timerStart]);

	useEffect(
		() =>
			newQuizToggle &&
			setTimeout(() => {
				setData(
					getRandomPaliWords(Math.floor(props.size / 2), paliWords)
				);
				setMatchedWords([]);
				setIncorrectGuesses(0);
				setNewQuizToggle(false);
			}, 1000),
		[newQuizToggle, props.size]
	);

	useEffect(() => {
		if (checkCompleted()) {
			setTimerOn(false);
			updateScores();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchedWords]);

	function createTransition(inProp, contentMaker, defaultShown) {
		const duration = 1000,
			defaultStyle = {
				opacity: defaultShown ? 1 : 0,
				transition: `opacity ${duration}ms ease-in-out`,
				textAlign: "center",
			},
			transitionStyles = {
				entering: {
					opacity: defaultShown ? 0 : 1,
					zIndex: defaultShown ? -1 : 1,
				},
				entered: {
					opacity: defaultShown ? 0 : 1,
					zIndex: defaultShown ? -1 : 1,
				},
				exiting: {
					opacity: defaultShown ? 1 : 0,
					zIndex: defaultShown ? 1 : -1,
				},
				exited: {
					opacity: defaultShown ? 1 : 0,
					zIndex: defaultShown ? 1 : -1,
				},
			};
		return (
			<Transition in={inProp} timeout={duration}>
				{(state) =>
					contentMaker({
						...defaultStyle,
						...transitionStyles[state],
					})
				}
			</Transition>
		);
	}

	function displayBoard() {
		function updateMatchedWords(word) {
			setMatchedWords([...matchedWords, selectedItem, word]);
			setSelectedItem(undefined);
		}
		function makeBoard(style) {
			function makeGrid(array) {
				function checkMatch(word) {
					return (
						data[selectedItem] === word ||
						data[word] === selectedItem
					);
				}
				return array.map((word) => (
					<div
						key={`square-${word}`}
						className={
							"square" +
							(selectedItem === word ? " selected" : "") +
							(matchedWords.includes(word) ? " matched" : "")
						}
						onClick={() => {
							if (!matchedWords.includes(word)) {
								if (selectedItem) {
									checkMatch(word)
										? updateMatchedWords(word)
										: selectedItem !== word &&
										  setIncorrectGuesses(
												incorrectGuesses + 1
										  );
									setSelectedItem(undefined);
								} else {
									setSelectedItem(word);
								}
							}
						}}
					>
						{word}
					</div>
				));
			}
			const grid = makeGrid(suffledData);
			return (
				<div id="board" style={style}>
					<div id="grid">{grid}</div>
				</div>
			);
		}
		return createTransition(!newQuizToggle, makeBoard, false);
	}

	function displayScores() {
		function makeScores(style) {
			const scoreKeys = [
				"games played",
				"avg time",
				"fastest time",
				"slowest time",
				"incorrect guesses",
				"avg incorrect guesses",
			];
			return (
				<div id="scores" style={{ ...style, position: "absolute" }}>
					<h3>Scores</h3>
					{scoreKeys.map((key) => (
						<div key={`score-${key}`}>
							<span className="label">{key}:</span>{" "}
							<span className="score-num">{scores[key]}</span>
						</div>
					))}
					<button onClick={() => newQuizHandler()}>New Quiz</button>
				</div>
			);
		}
		return !dataIsEmpty() && createTransition(timerOn, makeScores, true);
	}

	return (
		<div id="pali-quiz">
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
			<div id="description">
				<h1>Pali Quiz</h1>
				<h2>
					A timed quiz where you match Pali words with their English
					counterparts.
				</h2>
				<button
					onClick={() => newQuizHandler()}
					disabled={!dataIsEmpty()}
				>
					{newQuizToggle
						? "LOADING"
						: dataIsEmpty()
						? "Take Quiz"
						: `Time: ${timerTime}`}
				</button>
			</div>
			<div id="board-and-scores">
				{displayBoard()}
				{displayScores()}
			</div>
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

export default PaliQuiz;
