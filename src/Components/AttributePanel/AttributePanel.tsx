import React from "react";
// import { GraphNode } from "../Network/Network";

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
					<p>
						Element:{" "}
						{selectedNode.group.slice(0, selectedNode.group.length - 1)}
					</p>
					{selectedNode.group !== "commits" ? (
						<p>Name: {selectedNode.name}</p>
					) : (
						<p>Message: {selectedNode.message}</p>
					)}
					{selectedNode.group === "authors" && (
						<p>Email: {selectedNode.email}</p>
					)}
					{selectedNode.group !== "authors" && (
						<>
							<p>Complexity: {selectedNode.complexity}</p>
							<p>LOC: {selectedNode.loc}</p>
							<p>TD: {selectedNode.td}</p>
						</>
					)}
					{selectedNode.group === "files" && selectedNode.tags && (
						<p>Tags: {selectedNode.tags.join(", ")}</p>
					)}
				</>
			)}
		</div>
	);
}

export default AttributePanel;
