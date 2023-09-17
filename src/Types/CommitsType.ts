import { CommitLinkType } from "./CommitLinkType";
import { EntityType } from "./EntityType";

export interface CommitsType extends EntityType{
  nodeId: string;
  sha: string;
  date: string;
  files: object[];
  authorId: number;
  _links: CommitLinkType;
}
