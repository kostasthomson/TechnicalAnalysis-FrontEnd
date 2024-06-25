import React, { useEffect, useMemo, useRef } from "react";
import { Network, DataSet } from "vis-network/standalone";
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
	const networkRef = useRef(null);
	const createGraph = () => {
		let nodes: DataSet<GraphTypes.GraphNode> = new DataSet([]);
		let edges: DataSet<GraphTypes.GraphEdge> = new DataSet([]);
		const td: number = maxTd ? maxTd : data.maxTd;
		const indexedData: CommitEntity[] = data.value;
		indexedData.forEach((commit: CommitEntity) => {
			// create author node
			const author: AuthorEntity = commit.author;
			if (!nodes.get(author.email)) {
				nodes.add({
					id: author.email,
					label: author.name,
					group: "authors",
					entity: author,
					color: {
						background: "cyan",
						border: "blue",
					},
				});
			}
			// create file node
			commit.files.forEach((file: FileEntity, id: number) => {
				const opacity: number = td !== 0 ? 255 - (file.td * 255) / td : 0;
				let fileNode = nodes.get(file.path);
				if (!fileNode) {
					nodes.add({
						id: file.path,
						label: file.name,
						group: "files",
						color: {
							background: `rgb(255,${opacity},${opacity})`,
							border: `rgb(${opacity}, 0,0)`,
						},
						entity: file,
					});
				} else {
					fileNode = {
						...fileNode,
						color: {
							background: `rgb(255,${opacity},${opacity})`,
							border: `rgb(${opacity}, 0,0)`,
						},
						entity: { ...file },
					};
					nodes.update(fileNode);
				}
				edges.add({ from: author.email, to: file.path });
			});
		});
		return { nodes, edges };
	};
	const { nodes, edges } = useMemo(createGraph, [data, maxTd]);
	useEffect(() => {
		if (networkRef.current) {
			const net = new Network(
				networkRef.current,
				{ nodes: nodes, edges: edges },
				Options.NetworkOptions
			);
			net.on("click", (event: { nodes: string[] }) => {
				const nodeId = event.nodes[0];
				const selectedNode = nodeId ? nodes.get(nodeId) : undefined;
				setSelectedNode(selectedNode ? selectedNode : undefined);
			});
			net.stabilize();
			net.fit();
		}
	}, [nodes, edges, setSelectedNode]);
	return <div id="network" ref={networkRef} className={className}></div>;
}

export default ProjectNetwork;
