export interface CollaboratorType {
  id: number;
  name: string;
  _links: object[];
}

export interface CommitsType {
  nodeId: string;
  sha: string;
  date: string;
  files: object[];
  authorName: string;
  authorId: number;
  _links: object[];
}