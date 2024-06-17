import React from "react";

function AttributePanel({
	className,
	selectedNode,
}: {
	className?: string;
	selectedNode?: any;
}) {
	return (
		<div className={className}>
			<h4 className="font-bold uppercase text-l">Attribute Panel</h4>
			{selectedNode && (
				<>
					<p>Name: {selectedNode.name}</p>
					{selectedNode.group === "authors" ? (
						<p>Email: {selectedNode.email}</p>
					) : (
						<>
							<p className={selectedNode.td ? "" : "italic"}>
								TD (in minutes):{" "}
								{selectedNode.td ? selectedNode.td : "<No value>"}
							</p>
							<p className={selectedNode.complexity ? "" : "italic"}>
								Complexity:{" "}
								{selectedNode.complexity
									? selectedNode.complexity
									: "<No value>"}
							</p>
							<p className={selectedNode.codeSmells ? "" : "italic"}>
								Code smells:{" "}
								{selectedNode.codeSmells
									? selectedNode.codeSmells
									: "<No value>"}
							</p>
							<p className={selectedNode.functions ? "" : "italic"}>
								Functions:{" "}
								{selectedNode.functions ? selectedNode.functions : "<No value>"}
							</p>
							<p className={selectedNode.loc ? "" : "italic"}>
								LOC: {selectedNode.loc ? selectedNode.loc : "<No value>"}
							</p>
							<p className={selectedNode.commentLines ? "" : "italic"}>
								Commented lines:{" "}
								{selectedNode.commentLines
									? selectedNode.commentLines
									: "<No value>"}
							</p>
							<p className={selectedNode.numFiles ? "" : "italic"}>
								Number of files:{" "}
								{selectedNode.numFiles ? selectedNode.numFiles : "<No value>"}
							</p>
							<p className={selectedNode.tags ? "" : "italic"}>
								{" "}
								Tags:{" "}
								{selectedNode.tags ? selectedNode.tags.join(", ") : "<No tags>"}
							</p>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default AttributePanel;
