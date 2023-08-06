import {useRef} from 'react';
import Draggable from "react-draggable";

function Node(props: {
  label: string;
  wrapper_classes?: string;
  label_classes?: string;
}) {
  const node_ref = useRef(null);
  return (
    <Draggable>
      <div
        className={`w-32 h-32 m-2 flex justify-center items-center border-2 rounded-full cursor-pointer ${props.wrapper_classes}`}
        ref={node_ref}
      >
        <span className={`break-all ${props.label_classes}`}>
          {props.label}
        </span>
      </div>
    </Draggable>
  );
}

export default Node;
