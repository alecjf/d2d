import { useEffect } from "react";
import Jewel from "./Jewel";
import Navigation from "d2d-navigation";

const DharmaGem = () => {
	useEffect(() => {
		window.screen.width < 775 &&
			window.scrollTo((775 - window.screen.width) / 2, 0);
	}, []);

	return (
		<>
			<Navigation />
			<div id="dharma-gem">
				<Jewel />
			</div>
		</>
	);
};

export default DharmaGem;
