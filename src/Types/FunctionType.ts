import TableRecordType from "./TableRecordType";
import { GraphDataType, GraphNode } from "./GraphTypes";

export interface DashboardType {
	className: string;
	rows: TableRecordType[] | null;
	setRows: React.Dispatch<React.SetStateAction<TableRecordType[] | null>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ModalType {
	className?: string;
	open: boolean;
	rows: TableRecordType[] | null;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setRows: React.Dispatch<React.SetStateAction<TableRecordType[] | null>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NetworkType {
	className?: string;
	data: GraphDataType;
	maxTd: number | null;
	setSelectedNode: React.Dispatch<React.SetStateAction<GraphNode | undefined>>;
}

export interface PanelType {
	className?: string;
	selectedNode?: GraphNode;
}
