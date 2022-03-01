import "../css/list-box.css";

function ListBox({ title, list, setList, dharmaLists, paliWords }) {
	const WordPair = ({ left, right }) => {
		return (
			<div key={`pair-${left}`} className="pair">
				<div className="left">{left}</div>
				<div className="right">{right}</div>
			</div>
		);
	};

	const Suttas = ({ suttas }) => {
		const Sutta = ({ title, section, verse, link }) => {
			return (
				<div className="sutta-template">
					<a href={link} target="_blank" rel="noreferrer">
						{title} ({section} {verse})
					</a>
					<br />
					<br />
				</div>
			);
		};

		return (
			<div className="suttas-template">
				<h3>{`Sutta${suttas.length > 1 ? "s" : ""}`}</h3>
				{suttas.map((sutta) => (
					<Sutta {...sutta} key={sutta.title} />
				))}
			</div>
		);
	};

	function recursiveListing(obj, recursionLevel, parentKey) {
		const isParentKeyPali = parentKey === "pali",
			isTopLevelPali = isParentKeyPali && recursionLevel === 2;

		let holder;
		if (typeof obj === "string") {
			holder = isParentKeyPali ? (
				<WordPair
					left={obj}
					right={paliWords[obj]}
					key={`word-pair-${obj}`}
				/>
			) : (
				<div
					className={
						parentKey === "definition" ? "definition" : "word"
					}
					key={`word-${obj}`}
				>
					{obj}
				</div>
			);
			return parentKey === "definition" ? (
				holder
			) : (
				<div
					className={`sub${isTopLevelPali ? " top-level-pali" : ""}`}
					key={`holder-${obj}`}
				>
					{holder}
				</div>
			);
		} else if (obj instanceof Array) {
			return obj.map((item) =>
				recursiveListing(item, recursionLevel + 1, parentKey)
			);
		} else if (obj?.constructor === {}.constructor) {
			return [
				recursionLevel === 0 && (
					<div className="title" key={parentKey}>
						{capitalize(parentKey)}
					</div>
				),
				...Object.keys(obj)
					//				.sort()
					.map((key) => {
						if (
							key !== "definition" &&
							key !== "parts" &&
							key !== "bodyparts" &&
							key !== "pali"
						) {
							return key === "suttas" ? (
								<Suttas
									suttas={obj[key]}
									key={`sutta-${obj[key]}`}
								/>
							) : parentKey === "bodyparts" ? (
								<div className="sub" key={key}>
									<WordPair left={key} right={obj[key]} />
								</div>
							) : (
								key !== "isOrdered" &&
								key !== "concatenate" && (
									<div key={`array-${key}`} className="sub">
										{
											<div className="header">
												{capitalize(key)}
											</div>
										}
										{typeof obj[key] === "string"
											? obj[key]
											: key !== "suttas" &&
											  recursiveListing(
													obj[key],
													recursionLevel + 1,
													key
											  )}
									</div>
								)
							);
						} else {
							return recursiveListing(
								obj[key],
								recursionLevel + 1,
								key
							);
						}
					}),
			];
		}
	}

	return (
		<div
			className={`list-box ${list === title ? "shown" : "hidden"}`}
			id={`${title}${!list ? " lookup" : ""}`}
		>
			<div className="close-info" onClick={() => setList("TITLE")}>
				X
			</div>
			{recursiveListing(dharmaLists[title], 0, title)}
		</div>
	);
}

function capitalize(str) {
	const firstChar = str.charAt(0),
		rest = str.substr(1);
	return firstChar.toUpperCase() + rest;
}

export default ListBox;
export { capitalize };
