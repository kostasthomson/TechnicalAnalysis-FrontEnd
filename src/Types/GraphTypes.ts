import * as Entities from "./Entities";

export interface GraphDataType {
	key: string;
	maxTd: number;
	value: Entities.CommitEntity[];
}

export interface GraphNode {
	id: string;
	label: string;
	group: string;
	color?: object;
	entity: Entities.NodeEntity;
}

export interface GraphEdge {
	from: string;
	to: string;
}

export interface GraphType {
	nodes: GraphNode[];
	edges: GraphEdge[];
}
