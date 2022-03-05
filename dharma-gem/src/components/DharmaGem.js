import { useEffect } from "react";
import Jewel from "./Jewel";

const DharmaGem = ({ dharmaLists, justPaths, paliWords, thePath }) => {
	useEffect(() => {
		const margins = 100 * 2,
			baseDim = 480,
			breakPoint = margins + baseDim;
		window.screen.width < breakPoint &&
			window.scrollTo((breakPoint - window.screen.width) / 2, 0);
	}, []);

	return (
		<div id="dharma-gem">
			<Jewel {...{ dharmaLists, justPaths, paliWords, thePath }} />
		</div>
	);
};

export default DharmaGem;
