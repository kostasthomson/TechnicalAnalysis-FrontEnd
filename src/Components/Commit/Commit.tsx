import { CommitsType } from "../../Types";
import Node from "../Utils/Node";

function Commit(props: { object: CommitsType }) {
  return (
    <Node
      label={props.object.sha}
      wrapper_classes="bg-yellow-400 text-white border-black"
    />
  );
}

export default Commit;
