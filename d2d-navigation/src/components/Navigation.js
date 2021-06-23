import "./navigation.css";
import React, { useState } from "react";

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div id="navigation" className={isOpen ? "open" : "closed"}>
				<ul>
					<li>
						<a href="https://fern.haus/d2d">HOME</a>
					</li>
					<li>
						<a href="https://fern.haus/d2d/dharma-gem">
							DHARMA GEM
						</a>
					</li>
					<li>
						<a href="https://fern.haus/d2d/dharma-lookup">
							DHARMA LOOKUP
						</a>
					</li>
					<li>
						<a href="https://fern.haus/d2d/dharma-quiz">
							DHARMA QUIZ
						</a>
					</li>
					<li>
						<a href="https://fern.haus/d2d/pali-lookup">
							PALI LOOKUP
						</a>
					</li>
					<li>
						<a href="https://fern.haus/d2d/pali-quiz">PALI QUIZ</a>
					</li>
				</ul>
			</div>
			<div
				id="hamburger"
				className={isOpen ? "hamburger-open" : "hamburger-closed"}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div id="top-line"></div>
				<div id="mid-line"></div>
				<div id="btm-line"></div>
			</div>
		</>
	);
};

export default Navigation;
