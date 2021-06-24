import React, { useEffect, useState } from "react";
import "../css/jewel.css";
import dharmaLists, { justPaths } from "d2d-all-info";
import Paths from "./Paths";
import ListBox from "d2d-listbox-main";
import Face from "./Face";

const Jewel = () => {
	const [path, setPath] = useState("TITLE"),
		[list, setList] = useState("TITLE");

	useEffect(() => setList("TITLE"), [path]);

	useEffect(() => {}, []);

	const getPathText = (index) => (
		<Face {...justPaths[index - 1]} setList={setList} setPath={setPath} />
	);

	return (
		<>
			<Paths {...{ setPath, list, setList }} />
			<div id="scene-container">
				<div id="scene">
					<div id="jewel" className={`jewel side${path}`}>
						<div className="pyramid top">
							{getPathText(1)}
							{getPathText(2)}
							{getPathText(3)}
							{getPathText(4)}
						</div>
						<div className="pyramid bottom">
							{getPathText(5)}
							{getPathText(6)}
							{getPathText(7)}
							{getPathText(8)}
						</div>
					</div>
				</div>
				{Object.keys(dharmaLists).map((key) => (
					<ListBox
						{...{
							key: `jewel-list-box-${key}`,
							title: key,
							list,
							setList,
						}}
					/>
				))}
			</div>
		</>
	);
};

export default Jewel;
