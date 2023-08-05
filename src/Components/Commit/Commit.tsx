import { CommitsType } from "../../Types";
import Node from "../Utils/Node";

function Commit(props: { object: CommitsType }) {
  return <Node label={props.object.sha} />;
}

export default Commit;
