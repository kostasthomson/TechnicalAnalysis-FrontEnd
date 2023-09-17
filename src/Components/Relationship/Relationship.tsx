import { useRef } from "react";
import Draggable from "react-draggable";

function Relationship() {
  const ref = useRef(null);
  return (
    <Draggable nodeRef={ref} position={{ x: 0, y: 10 }}>
      <div ref={ref} className="w-full h-1 bg-black rounded-lg"></div>
    </Draggable>
  );
}

export default Relationship;
