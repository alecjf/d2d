import { useEffect, useState } from "react";
import Jewel from "./Jewel";

const DharmaGem = () => {
	const [dharmaLists, setDharmaLists] = useState(undefined),
		[justPaths, setJustPaths] = useState(undefined),
		[paliWords, setPaliWords] = useState(undefined),
		[thePath, setThePath] = useState(undefined);

	useEffect(() => {
		const margins = 100 * 2,
			baseDim = 480,
			breakPoint = margins + baseDim;
		window.screen.width < breakPoint &&
			window.scrollTo((breakPoint - window.screen.width) / 2, 0);
		fetch("https://fern.haus/projects/d2d/data.js")
			.then((res) => res.text())
			// eslint-disable-next-line no-eval
			.then((res) => eval(res))
			.then((json) => {
				setDharmaLists(json.dharmaLists);
				setJustPaths(json.justPaths);
				setPaliWords(json.paliWords);
				setThePath(json.thePath);
			});
	}, []);

	return (
		<div id="dharma-gem">
			{dharmaLists && justPaths && paliWords && thePath && (
				<Jewel {...{ dharmaLists, justPaths, paliWords, thePath }} />
			)}
		</div>
	);
};

export default DharmaGem;
