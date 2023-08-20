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
  authorId: number;
  _links: CommitLinkType;
}

interface LinkType {
  self: { href: string };
}

interface CommitLinkType extends LinkType {
  author: { href: string };
}
