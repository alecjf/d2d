import dharmaLists, { paliWords } from "d2d-all-info";

const Face = ({ pali, parts, suttas, setList, setPath }) => {
	const Header = () => (
		<span className="header">
			<span>RIGHT</span> {paliWords[pali]}
			<br />
		</span>
	);

	const PaliWord = ({ pali }) => (
		<div className="pali-word">
			<b>
				<span>{`${pali}`}</span>
				<br />
				<i>({paliWords[pali]})</i>
			</b>
		</div>
	);

	const Suttas = () => {
		const Sutta = (props) => {
			return (
				<div className="sutta">
					<i>
						<a
							href={props.sutta.link}
							target="_blank"
							rel="noreferrer"
						>{`${props.sutta.title} (${props.sutta.section} ${props.sutta.verse})`}</a>
					</i>
				</div>
			);
		};
		function getAllEmbeddedSuttasRecursive(parts, result = []) {
			parts instanceof Array &&
				parts
					.filter((p) => p.suttas)
					.forEach((p) =>
						p.suttas.forEach((sut) => result.push(sut))
					);
			parts instanceof Array &&
				parts
					.filter((p) => p.parts)
					.forEach((p) => getAllEmbeddedSuttasRecursive(p.parts));
			return result;
		}
		return (
			<div className="suttas">
				{suttas &&
					suttas.map((sut) => <Sutta sutta={sut} key={sut.title} />)}
				{getAllEmbeddedSuttasRecursive(parts).map((sut) => (
					<Sutta sutta={sut} key={sut.title} />
				))}
			</div>
		);
	};

	const Parts = () => {
		const List = ({ items, isOrdered, concatenate }) => {
			const ListItems = ({ ordered }) =>
				items.map((item, i) => (
					<>
						<div
							className={`spacer${isOrdered ? " ordered" : ""}`}
						></div>
						{ordered ? (
							<div className="ordered-item">
								{`${i + 1}.`} {item}
							</div>
						) : (
							<>* {item}</>
						)}
					</>
				));
			return (
				<span
					className={`list${
						items.length === 1 || concatenate ? ` wide` : ` narrow`
					}`}
				>
					{items.length === 1 ? (
						items[0]
					) : concatenate ? (
						items.join(", ")
					) : (
						<ListItems ordered={isOrdered} />
					)}
					<br />
				</span>
			);
		};
		function partsHelperRecursive(
			obj,
			level,
			isOrdered,
			concatenate,
			result = []
		) {
			if (obj.constructor === {}.constructor) {
				if (
					obj.name !== "Four Meditative Absorptions" &&
					Object.keys(dharmaLists).includes(obj.name)
				) {
					result.push(
						<span
							className="more-info"
							onClick={() => setList(obj.name)}
							key={obj.name}
						>
							{obj.name}
							<br />
						</span>
					);
				} else {
					let holder = [];
					obj.name &&
						holder.push(
							<>
								<div className="spacer"></div>
								<span className="name" key={obj.name}>
									<b>
										<u>{obj.name}</u>
									</b>
									<br />
								</span>
							</>
						);
					obj.definition &&
						holder.push(
							<div className="spacer"></div>,
							<span className="definition" key={obj.definition}>
								<b>
									{obj.definition}
									{obj.pali && (
										<>
											{" "}
											({paliWords[obj.pali]}:{" "}
											<i>{obj.pali}</i>)
										</>
									)}
								</b>
								<br />
							</span>
						);
					//					obj.english && holder.push(<PaliWord {...obj} />);
					holder.length > 0 && result.push(holder);
					obj.parts &&
						result.push(
							partsHelperRecursive(
								obj.parts,
								level + 1,
								obj.isOrdered,
								obj.concatenate
							)
						);
				}
			} else if (obj instanceof Array) {
				const isString = (s) => typeof s === "string",
					strings = obj.filter((o) => isString(o)),
					objs = obj.filter((o) => !isString(o)),
					functions = obj.filter((o) => o instanceof Function);
				strings.length > 0 &&
					result.push(
						<List
							items={strings}
							isOrdered={isOrdered}
							concatenate={concatenate}
							key={strings[0]}
						/>
					);
				objs.forEach((o) =>
					result.push(partsHelperRecursive(o, level + 1))
				);
				functions.forEach((fx) => result.push(fx(setPath)));
			}
			return result;
		}
		return <span className="parts">{partsHelperRecursive(parts, 0)}</span>;
	};

	return (
		<div className="face">
			<div className="side-triangle left"></div>
			<div className="side-triangle right"></div>
			{
				/* <Header /> */
				document.getElementById("scene")?.className === "clicked" && (
					<>
						<PaliWord pali={pali} />
						<Suttas />
						<Parts />
					</>
				)
			}
		</div>
	);
};

export default Face;
