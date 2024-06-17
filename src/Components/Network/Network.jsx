import React, { useMemo, useState } from "react";
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

function Network({ className, data, maxTd, setSelectedNode }) {
	const options = {
		autoResize: true,
		groups: {
			authors: { color: { background: "cyan" } },
			commits: { color: { background: "orange" } },
			files: { color: { background: "yellow" } },
		},
		layout: {
			improvedLayout: true,
			hierarchical: {
				enabled: true,
				levelSeparation: 200,
				treeSpacing: 250,
				nodeSpacing: 350,
				blockShifting: true,
				edgeMinimization: true,
				direction: "LR",
				sortMethod: "directed",
				shakeTowards: "roots",
			},
		},
		physics: {
			enabled: true,
			maxVelocity: 20,
			solver: "hierarchicalRepulsion",
			hierarchicalRepulsion: {
				nodeDistance: 70,
				springLength: 100,
				springConstant: 0.06,
				damping: 0.17,
			},
			stabilization: {
				enabled: true,
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
			nodes.push({
				id: author.email,
				label: author.name,
				group: "authors",
				...author,
			});
			// create file node
			commit.files.forEach((file, id) => {
				const bg = td !== 0 ? 255 - (file.td * 255 / td) : 0;
				nodes.push({
					id: file.node_id,
					label: file.name,
					group: "files",
					color: { background: `rgb(255,${bg},${bg})` },
					...file,
				});
				edges.push({ from: author.email, to: file.node_id });
			});
		});
		return { nodes, edges };
	};
	const { nodes, edges } = useMemo(createGraph, [data, maxTd]);
	const [network, setNetwork] = useState(null);
	if (network) {
		network.fit();
	}
	return (
		<div className={className}>
			<Graph
				graph={{ nodes: nodes, edges: edges }}
				options={options}
				events={events}
				getNetwork={(network) => {
					setNetwork(network); // todo: index change -> zomm reset
				}}
			/>
		</div>
	);
}

export default Network;
