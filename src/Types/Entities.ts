export interface NodeEntity {
	name: string;
}
export interface AuthorEntity extends NodeEntity {
	email: string;
}
export interface FileEntity extends NodeEntity {
	node_id: string;
	path: string;
	java: boolean;
	complexity: number;
	loc: number;
	td: number;
	numFiles: number;
	commentLines: number;
	codeSmells: number;
	functions: number;
	tags: string[];
}
export interface CommitEntity {
	sha: string;
	message: string;
	date: string;
	author: AuthorEntity;
	complexity: number;
	loc: number;
	td: number;
	numFiles: number;
	commentLines: number;
	codeSmells: number;
	functions: number;
	tags: string[];
	files: FileEntity[];
	projectName: string;
}
