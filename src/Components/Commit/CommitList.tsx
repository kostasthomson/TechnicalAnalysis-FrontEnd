import { CommitsType } from "../../Types";
import Commit from "./Commit";

function CommitList(props: { data: CommitsType[] }) {
  return (
    <div className="flex flex-wrap justify-evenly">
      {props.data.map((commit) => {
        return <Commit key={commit.sha} object={commit} />;
      })}
    </div>
  );
}

export default CommitList;
