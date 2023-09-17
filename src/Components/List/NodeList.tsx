import { EntityType } from "../../Types";
import { Node } from "../";

function NodeList(props: {
  data: EntityType[];
  wrapperClasses?: string;
  labelClasses?: string;
}) {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {props.data.map((node, index) => {
        return (
          <Node
            key={index}
            label={node.label}
            wrapper_classes={props.wrapperClasses}
            label_classes={props.labelClasses}
          />
        );
      })}
    </div>
  );
}

export default NodeList;
