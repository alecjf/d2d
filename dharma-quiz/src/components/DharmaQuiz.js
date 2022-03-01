import "../css/dharma-quiz.css";
import { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import fhLogo from "../images/fern-haus-site-logo.png";

const DharmaQuiz = ({ size }) => {
	const [categoryWords, setCategoryWords] = useState(undefined),
		[data, setData] = useState(undefined),
		[shuffledItems, setShuffledItems] = useState(undefined),
		[board, setBoard] = useState(undefined),
		[selectedItems, setSelectedItems] = useState({}),
		[showCorrectStatus, setShowCorrectStatus] = useState(false),
		[showIncorrectStatus, setShowIncorrectStatus] = useState(false),
		[newQuiz, setNewQuiz] = useState(false); // for Transition-ing in a new quiz

	useEffect(() => {
		fetch("https://fern.haus/projects/d2d/data.js")
			.then((res) => res.text())
			// eslint-disable-next-line no-eval
			.then((res) => eval(res))
			.then((json) => {
				const { dharmaLists, paliWords } = json,
					cw = getCategoryWords(dharmaLists, paliWords),
					d = getRandomDharmaQuiz(size, cw);
				setCategoryWords(cw);
				setData(d);
				setShuffledItems(shuffleItems(d));
				setBoard(makeStartingBoard(d));
			});
	}, []);

	useEffect(() => {
		if (board) {
			const isCorrect = getIsCorrect();
			if (allIsChosen()) {
				const funcA = () => setShowIncorrectStatus(!isCorrect),
					funcB = () => setShowCorrectStatus(isCorrect),
					func1 = isCorrect ? funcA : funcB,
					func2 = !isCorrect ? funcA : funcB;
				func1();
				showIncorrectStatus || showCorrectStatus
					? setTimeout(func2, 1000)
					: func2();
			}
		}
	}, [board]);

	function getCategoryWords(dharmaLists, paliWords) {
		function formatParts(parts) {
			function formatPaliParentheses(array) {
				const paliWordsKeys = Object.keys(paliWords);
				return array.map((item) =>
					paliWordsKeys.includes(item)
						? `${paliWords[item]} (${item})`
						: item
				);
			}
			if (parts.constructor === {}.constructor) {
				let result = [];
				Object.keys(parts).forEach((key) =>
					parts[key].constructor === {}.constructor
						? Object.keys(parts[key]).forEach((k) =>
								result.push(`${parts[key][k]} (${k})`)
						  )
						: parts[key] instanceof Array &&
						  result.push(...formatPaliParentheses(parts[key]))
				);
				return result;
			} else if (parts instanceof Array) {
				return parts;
			}
		}
		let result = {};
		Object.keys(dharmaLists)
			.filter((key) => key !== "pali")
			.forEach(
				(key) =>
					(result[key] = [
						dharmaLists[key].definition,
						...formatParts(dharmaLists[key].parts),
					])
			);
		return result;
	}

	function getCategoriesForDharmaQuiz(categoryNames, categoryWords) {
		const result = {};
		categoryNames.forEach(
			(categoryName) =>
				(result[categoryName] = categoryWords[categoryName])
		);
		return result;
	}

	function getRandomCategoryNames(numOfCategories, categoryWords) {
		const categoryNames = Object.keys(categoryWords);
		shuffle(categoryNames);
		return categoryNames.slice(0, numOfCategories);
	}

	function getRandomDharmaQuiz(numOfCategories, categoryWords) {
		return getCategoriesForDharmaQuiz(
			getRandomCategoryNames(numOfCategories, categoryWords),
			categoryWords
		);
	}

	// Durstenfeld Shuffle:
	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	function shuffleItems(data) {
		let result = [];
		for (const category of Object.keys(data)) {
			for (const item of Object.values(data[category])) {
				result.push({ category: category, item: item });
			}
		}
		shuffle(result);
		return result;
	}

	function makeStartingBoard(data) {
		let result = {};
		Object.keys(data).forEach((datum) => (result[datum] = {}));
		return result;
	}

	function allIsChosen() {
		const reducer = (acc, val) => acc + val,
			dataSize = Object.keys(data)
				.map((key) => data[key].length)
				.reduce(reducer),
			boardSize = Object.keys(board)
				.map((key) => Object.keys(board[key]).length)
				.reduce(reducer);
		return dataSize === boardSize;
	}

	function getIsCorrect() {
		for (const category of Object.keys(data)) {
			const boardItems = Object.values(board[category]);
			for (const item of data[category]) {
				if (!boardItems.includes(item)) {
					return false;
				}
			}
		}
		return true;
	}

	function makeItemBox(itemId, item) {
		function updateSelected(event, item) {
			const itemId = event.target.id,
				isAlreadySelected =
					event.target.className.includes(" selected-item");
			event.target.className =
				"item-box" + (isAlreadySelected ? "" : " selected-item");
			isAlreadySelected
				? delete selectedItems[itemId]
				: (selectedItems[itemId] = item);
			setSelectedItems({ ...selectedItems });
		}
		return (
			<div
				key={itemId}
				id={itemId}
				className={"item-box"}
				onClick={(event) => updateSelected(event, item)}
			>
				{item}
			</div>
		);
	}

	function makeItemBoxes() {
		function makeItemId(item, category) {
			return `${category}-${item}`;
		}
		function boardHasItem(itemId) {
			for (const value of Object.values(board)) {
				if (Object.keys(value).includes(itemId)) {
					return true;
				}
			}
			return false;
		}
		let itemId,
			result = [];
		shuffledItems.forEach((obj) => {
			itemId = makeItemId(obj.item, obj.category);
			if (!boardHasItem(itemId)) {
				result.push(makeItemBox(itemId, obj.item));
			}
		});
		function getStatus(isCorrect) {
			const duration = 1000,
				defaultStyle = {
					position: "absolute",
					zIndex: 1,
					opacity: 0,
					transition: `opacity ${duration}ms ease-in-out`,
					textAlign: "center",
				},
				transitionStyles = {
					entering: { opacity: 1 },
					entered: { opacity: 1 },
					exiting: { opacity: 0 },
					exited: { opacity: 0 },
				};
			return (
				<Transition
					in={isCorrect ? showCorrectStatus : showIncorrectStatus}
					timeout={duration}
				>
					{(state) => (
						<div
							style={{
								...defaultStyle,
								...transitionStyles[state],
							}}
							className="status"
						>
							<h2>{!isCorrect && "IN"}CORRECT</h2>
							<button
								id="new-quiz-button"
								onClick={() => setNewQuiz(true)}
							>
								New Quiz
							</button>
						</div>
					)}
				</Transition>
			);
		}
		return (
			<div id="item-boxes">
				{getStatus(true)}
				{getStatus(false)}
				{result}
			</div>
		);
	}

	function makeCategoryBoxes() {
		function updateBoard(category) {
			// add the selected items to the category
			board[category] = { ...selectedItems, ...board[category] };
			// then remove selected items from other categories, if applicable
			Object.keys(board)
				.filter((cat) => cat !== category)
				.forEach((cat) =>
					Object.keys(selectedItems).forEach(
						(itemId) => delete board[cat][itemId]
					)
				);
			setBoard(JSON.parse(JSON.stringify(board)));
			setSelectedItems({});
			// clear all selected-item classNames from item-box's
			const itemBoxCN = "item-box";
			Array.from(document.getElementsByClassName(itemBoxCN)).forEach(
				(elem) => (elem.className = itemBoxCN)
			);
		}
		const result = Object.keys(data).map((category) => (
			<div
				key={`category-box-${category}`}
				id={`category-box-${category}`}
				className="category-box"
			>
				<h2 onClick={() => selectedItems && updateBoard(category)}>
					{category}
				</h2>
				<div className="items-in-category">
					{Object.keys(board[category]).map((itemId) =>
						makeItemBox(itemId, board[category][itemId])
					)}
				</div>
				<div
					className="click-here-to-add"
					onClick={() => selectedItems && updateBoard(category)}
				>
					<span>+</span>
				</div>
			</div>
		));
		return <div id="category-boxes">{result}</div>;
	}

	function getCategoryNamesForQuizHeader(data) {
		return Object.keys(data).join(", ");
	}

	function newQuizTransition() {
		const duration = 1000,
			defaultStyle = {
				opacity: 1,
				transition: `opacity ${duration}ms ease-in-out`,
			},
			transitionStyles = {
				entering: { opacity: 0 },
				entered: { opacity: 0 },
				exiting: { opacity: 1 },
				exited: { opacity: 1 },
			};
		return (
			<Transition
				in={newQuiz}
				onEnter={() => {
					setShowCorrectStatus(false);
					setShowIncorrectStatus(false);
				}}
				onEntered={() => setNewQuiz(false)}
				onExit={() => {
					const data = getRandomDharmaQuiz(size, categoryWords);
					setData(data);
					setShuffledItems(shuffleItems(data));
					setBoard(makeStartingBoard(data));
					setSelectedItems({});
					document.getElementById("dq")?.scrollTo(0, 0);
				}}
				timeout={duration}
			>
				{(state) => (
					<div
						id="dharma-quiz"
						style={{
							...defaultStyle,
							...transitionStyles[state],
						}}
					>
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
						<div id="header">
							Sort the terms by the following categories:
							<br />
							<h2>
								{data && getCategoryNamesForQuizHeader(data)}
							</h2>
							Select one or more terms and then a category header
							below.
						</div>
						{makeItemBoxes()}
						{makeCategoryBoxes()}
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
				)}
			</Transition>
		);
	}

	return board ? (
		newQuizTransition()
	) : (
		<div id="error-message">{console.log("Fetching data...")}</div>
	);
};

export default DharmaQuiz;
