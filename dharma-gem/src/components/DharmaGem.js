import { useEffect } from "react";
import Jewel from "./Jewel";

const DharmaGem = () => {
	useEffect(() => {
		window.screen.width < 775 &&
			window.scrollTo((775 - window.screen.width) / 2, 0);
	}, []);

	return (
		<div id="dharma-gem">
			<Jewel />
		</div>
	);
};

export default DharmaGem;
