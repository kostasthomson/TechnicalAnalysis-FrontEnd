import React, { useEffect, useMemo, useState } from "react";
import Graph from "react-vis-network-graph";
import { Commit, Author, File } from "../../App";

export interface GraphNode extends Commit, Author, File {
	id: number;
	label: string;
	group: string;
}
export type GraphEdge = {
	from: number,
	to: number,
};
export type GraphType = {
	nodes: GraphNode[],
	edges: GraphEdge[],
};

function ProjectNetwork({ className, data, maxTd, setSelectedNode }) {
	console.log(data);
	const options = {
		width: "100%",
		height: "100%",
		autoResize: true,
		groups: {
			authors: { color: { background: "cyan" } },
			commits: { color: { background: "orange" } },
			files: { color: { background: "yellow" } },
		},
		layout: {
			randomSeed: "0.4921169730930408:1718737341350",
			hierarchical: {
				enabled: true,
				levelSeparation: 100,
				treeSpacing: 150,
				nodeSpacing: 150,
				blockShifting: true,
				edgeMinimization: true,
				sortMethod: "directed",
				shakeTowards: "roots",
			},
		},
		physics: {
			enabled: true,
			maxVelocity: 20,
			solver: "hierarchicalRepulsion",
			hierarchicalRepulsion: {
				nodeDistance: 150,
				springLength: 100,
				springConstant: 0.06,
				damping: 0.17,
			},
			stabilization: {
				enabled: true,
				fit: true,
			},
		},
	};
	const events = {
		click: (event) => {
			let nodeId = event.nodes[0];
			let selectedNode = nodes.find((node) => node.id === nodeId);
			setSelectedNode(selectedNode);
		},
	};

	const createGraph = () => {
		let nodes: GraphNode[] = [];
		let edges: GraphEdge[] = [];
		const td = maxTd ? maxTd : data.maxTd;
		const indexedData = data.value;
		indexedData.forEach((commit) => {
			// create author node
			const author = commit.author;
			if (!nodes.find((value) => value.id === author.email)) {
				nodes.push({
					id: author.email,
					label: author.name,
					group: "authors",
					...author,
				});
			}
			// create file node
			commit.files.forEach((file, id) => {
				const bg = td !== 0 ? 255 - (file.td * 255) / td : 0;
				let fileNode = nodes.find((value) => value.id === file.path);
				if (!fileNode) {
					nodes.push({
						id: file.path,
						label: file.name,
						group: "files",
						color: { background: `rgb(255,${bg},${bg})` },
						...file,
					});
				} else {
					fileNode = {
						...fileNode,
						...file,
						color: { background: `rgb(255,${bg},${bg})` },
					};
				}
				edges.push({ from: author.email, to: file.path });
			});
		});
		return { nodes, edges };
	};
	const { nodes, edges } = useMemo(createGraph, [data, maxTd]);
	const [network, setNetwork] = useState(null);
	return (
		<div className={className}>
			<Graph
				graph={{ nodes, edges }}
				options={options}
				events={events}
				getNetwork={(network) => {
					setNetwork(network);
				}}
			/>
		</div>
	);
}

export default ProjectNetwork;
