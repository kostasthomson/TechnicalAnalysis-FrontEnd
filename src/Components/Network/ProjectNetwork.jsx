import React, { useMemo, useState } from "react";
import Graph from "react-vis-network-graph";
import { Options } from "../../Utils";
import * as GraphTypes from "../../Types/GraphTypes";
import { CommitEntity, AuthorEntity, FileEntity } from "../../Types/Entities";

function ProjectNetwork({
	className,
	data,
	maxTd,
	setSelectedNode,
}: {
	className?: string;
	data: GraphTypes.GraphDataType;
	maxTd: number | null;
	setSelectedNode: React.Dispatch<
		React.SetStateAction<GraphTypes.GraphNode | undefined>
	>;
}) {
	const events = {
		click: (event: { nodes: string[] }) => {
			const nodeId = event.nodes[0];
			const selectedNode = nodes.find(
				(node: GraphTypes.GraphNode) => node.id === nodeId
			);
			setSelectedNode(selectedNode);
		},
	};

	const createGraph = () => {
		let nodes: GraphTypes.GraphNode[] = [];
		let edges: GraphTypes.GraphEdge[] = [];
		const td: number = maxTd ? maxTd : data.maxTd;
		const indexedData: CommitEntity[] = data.value;
		indexedData.forEach((commit: CommitEntity) => {
			// create author node
			const author: AuthorEntity = commit.author;
			if (!nodes.find((value) => value.id === author.email)) {
				nodes.push({
					id: author.email,
					label: author.name,
					group: "authors",
					entity: author,
				});
			}
			// create file node
			commit.files.forEach((file: FileEntity, id: number) => {
				const bg: number = td !== 0 ? 255 - (file.td * 255) / td : 0;
				let fileNode = nodes.find((value) => value.id === file.path);
				if (!fileNode) {
					nodes.push({
						id: file.path,
						label: file.name,
						group: "files",
						color: { background: `rgb(255,${bg},${bg})` },
						entity: file,
					});
				} else {
					fileNode = {
						...fileNode,
						color: { background: `rgb(255,${bg},${bg})` },
						entity: { ...file },
					};
				}
				edges.push({ from: author.email, to: file.path });
			});
		});
		return { nodes, edges };
	};
	const { nodes, edges }: GraphTypes.GraphType = useMemo(createGraph, [
		data,
		maxTd,
	]);
	const [, setNetwork] = useState(null);
	return (
		<div className={className}>
			<Graph
				graph={{ nodes, edges }}
				options={Options.NetworkOptions}
				events={events}
				getNetwork={(network: any) => {
					setNetwork(network);
				}}
			/>
		</div>
	);
}

export default ProjectNetwork;
