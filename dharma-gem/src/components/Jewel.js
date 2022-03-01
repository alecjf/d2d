import React, { useEffect, useState } from "react";
import "../css/jewel.css";
import Paths from "./Paths";
import ListBox from "./ListBox";
import Face from "./Face";

const Jewel = ({ dharmaLists, justPaths, paliWords, thePath }) => {
	const [path, setPath] = useState(undefined),
		// set to undefined, not "CLOSED"
		// so that the clicked className will be removed
		// on first load:
		[list, setList] = useState(undefined);

	useEffect(() => {
		const cn = document.getElementById("scene").className;
		document.getElementById("scene").className =
			list !== "CLOSED" ? cn.replaceAll("clicked", "") : cn + " clicked";
	}, [list]);

	const getPathText = (index) => (
		<Face
			{...{
				...justPaths[index - 1],
				setList,
				setPath,
				dharmaLists,
				paliWords,
			}}
			setList={setList}
			setPath={setPath}
		/>
	);

	return (
		<>
			<Paths
				{...{
					setPath,
					list,
					setList,
					dharmaLists,
					justPaths,
					paliWords,
					thePath,
				}}
			/>
			<div id="scene-container">
				<div id="scene" className="">
					<div id="jewel" className={`jewel side${path || 1}`}>
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
			</div>
			<div id="list-boxes">
				{Object.keys(dharmaLists).map((key) => (
					<ListBox
						{...{
							key: `jewel-list-box-${key}`,
							title: key,
							list,
							setList,
							dharmaLists,
							paliWords,
						}}
					/>
				))}
			</div>
		</>
	);
};

export default Jewel;
