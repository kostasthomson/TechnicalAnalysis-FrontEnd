import { CommitsType } from "../../Types";
import Node from "../Utils/Node";

function Commit(props: { object: CommitsType }) {
  // console.log(props.object);
  return (
    <Node
      label={`${new Date(props.object.date).toLocaleDateString("el-GR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })} / ${props.object.authorId}`}
      wrapper_classes="bg-yellow-400 text-white border-black"
    />
  );
}

export default Commit;
