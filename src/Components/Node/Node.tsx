import { useRef } from "react";
import Draggable from "react-draggable";

function Node(props: {
  label: string;
  wrapper_classes?: string;
  label_classes?: string;
}) {
  const ref = useRef(null);
  return (
    <Draggable nodeRef={ref}>
      <div
        ref={ref}
        className={`w-32 h-32 m-2 flex flex-col justify-center items-center border-2 border-black rounded-full cursor-pointer ${props.wrapper_classes}`}
      >
        {props.label.split("/").map((section, index) => {
          return (
            <span
              key={index}
              className={`select-none text-[1em] font-medium break-all ${props.label_classes}`}
            >
              {section}
            </span>
          );
        })}
      </div>
    </Draggable>
  );
}

export default Node;
