import "../css/dharma-quiz.css";
import { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import { getRandomDharmaQuiz, shuffle } from "d2d-all-info";

const DharmaQuiz = (props) => {
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

	const [data, setData] = useState(
			getRandomDharmaQuiz(props.size)
			/*
			getCategoriesForDharmaQuiz([
				"Five Precepts",
				"Ten Wholesome Conducts",
            ])
            */
		),
		[shuffledItems, setShuffledItems] = useState(shuffleItems(data)),
		[board, setBoard] = useState(makeStartingBoard(data)),
		[selectedItems, setSelectedItems] = useState({}),
		[showCorrectStatus, setShowCorrectStatus] = useState(false),
		[showIncorrectStatus, setShowIncorrectStatus] = useState(false),
		[newQuiz, setNewQuiz] = useState(false); // for Transition-ing in a new quiz

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

	useEffect(() => {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [board]);

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

	function getCategoryNamesForQuizHeader() {
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
					const data = getRandomDharmaQuiz(props.size);
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
						<div id="header">
							Sort the terms by the following categories:
							<br />
							<h2>{getCategoryNamesForQuizHeader()}</h2>
							Select one or more terms and then a category header
							below.
						</div>
						{makeItemBoxes()}
						{makeCategoryBoxes()}
					</div>
				)}
			</Transition>
		);
	}

	return newQuizTransition();
};

export default DharmaQuiz;
