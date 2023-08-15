function Node(props: {
  label: string;
  wrapper_classes?: string;
  label_classes?: string;
}) {
  return (
    <div
      className={`w-32 h-32 m-2 flex flex-col justify-center items-center border-2 rounded-full cursor-pointer ${props.wrapper_classes}`}
    >
      {props.label.split("/").map((section, index) => {
        return (
          <span key={index} className={`break-all ${props.label_classes}`}>
            {section}
          </span>
        );
      })}
    </div>
  );
}

export default Node;
