import { CollaboratorType } from "../../Types";
import Collaborator from "./Collaborator";

function CollaboratorList(props: { data: CollaboratorType[] }) {
  return (
    <div className="flex">
      {props.data.map((collaborator) => {
        return <Collaborator key={collaborator.id} object={collaborator} />;
      })}
    </div>
  );
}

export default CollaboratorList;
