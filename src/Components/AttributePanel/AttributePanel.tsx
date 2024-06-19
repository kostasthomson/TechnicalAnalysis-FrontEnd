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
							<p>Path: {selectedNode.path}</p>
							<p>
								TD (in minutes):
								<span className={selectedNode.td ? "" : "italic"}>
									{selectedNode.td ? " " + selectedNode.td : " <No value>"}
								</span>
							</p>
							<p>
								Complexity:
								<span className={selectedNode.complexity ? "" : "italic"}>
									{selectedNode.complexity
										? " " + selectedNode.complexity
										: " <No value>"}
								</span>
							</p>
							<p>
								Code smells:
								<span className={selectedNode.codeSmells ? "" : "italic"}>
									{selectedNode.codeSmells
										? " " + selectedNode.codeSmells
										: " <No value>"}
								</span>
							</p>
							<p>
								Functions:
								<span className={selectedNode.functions ? "" : "italic"}>
									{selectedNode.functions
										? " " + selectedNode.functions
										: " <No value>"}
								</span>
							</p>
							<p>
								LOC:
								<span className={selectedNode.loc ? "" : "italic"}>
									{selectedNode.loc ? " " + selectedNode.loc : " <No value>"}
								</span>
							</p>
							<p>
								Commented lines:
								<span className={selectedNode.commentLines ? "" : "italic"}>
									{selectedNode.commentLines
										? " " + selectedNode.commentLines
										: " <No value>"}
								</span>
							</p>
							<p>
								Number of files:
								<span className={selectedNode.numFiles ? "" : "italic"}>
									{selectedNode.numFiles
										? " " + selectedNode.numFiles
										: " <No value>"}
								</span>
							</p>
							<p>
								Tags:
								<span className={selectedNode.tags ? "" : "italic"}>
									{selectedNode.tags
										? " " + selectedNode.tags.join(", ")
										: " <No tags>"}
								</span>
							</p>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default AttributePanel;
