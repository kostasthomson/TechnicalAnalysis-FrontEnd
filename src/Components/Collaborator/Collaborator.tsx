// import { useState } from "react";
import { CollaboratorType } from "../../Types";
import Node from "../Utils/Node";

function Collaborator(props: { object: CollaboratorType }) {
  // const [bold, setBold] = useState(false);
  return (
    <Node
      //hover:font-bold ${bold ? " font-bold" : ""}`}
      // onClick={() => setBold(!bold)}
      label={props.object.name}
    />
  );
}

export default Collaborator;
