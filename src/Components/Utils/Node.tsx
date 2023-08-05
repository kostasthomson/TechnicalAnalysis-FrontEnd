function Node(props: {
  label: string;
  wrapper_classes?: string;
  label_classes?: string;
}) {
  return (
    <div
      className={`w-32 h-32 m-2 flex justify-center items-center border-4 rounded-full cursor-pointer ${props.wrapper_classes}`}
    >
      <span className={`break-all ${props.label_classes}`}>{props.label}</span>
    </div>
  );
}

export default Node;
