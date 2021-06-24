import dharmaLists, { paliWords } from "./dharma-info";

// Durstenfeld Shuffle:
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function getRandomPaliWords(number, paliWords) {
	const allPaliWords = Object.keys(paliWords);
	shuffle(allPaliWords);
	let result = {};
	allPaliWords
		.slice(0, number)
		.forEach((paliWord) => (result[paliWord] = paliWords[paliWord]));
	return result;
}

function getCategoryWords(lists) {
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
	Object.keys(lists)
		.filter((key) => key !== "pali")
		.forEach(
			(key) =>
				(result[key] = [
					lists[key].definition,
					...formatParts(lists[key].parts),
				])
		);
	return result;
}

const categoryWords = getCategoryWords(dharmaLists);

function getCategoriesForDharmaQuiz(categoryNames) {
	const result = {};
	categoryNames.forEach(
		(categoryName) => (result[categoryName] = categoryWords[categoryName])
	);
	return result;
}

function getRandomCategoryNames(numOfCategories) {
	const categoryNames = Object.keys(categoryWords);
	shuffle(categoryNames);
	return categoryNames.slice(0, numOfCategories);
}

function getRandomDharmaQuiz(numOfCategories) {
	return getCategoriesForDharmaQuiz(getRandomCategoryNames(numOfCategories));
}

const noDefault = null;

export default noDefault;
export {
	categoryWords,
	getRandomPaliWords,
	getCategoriesForDharmaQuiz,
	getRandomDharmaQuiz,
	shuffle,
};
