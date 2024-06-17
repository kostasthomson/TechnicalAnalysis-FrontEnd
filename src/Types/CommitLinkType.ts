import { LinkType } from "./LinkType";

export interface CommitLinkType extends LinkType {
  author: { href: string };
}
