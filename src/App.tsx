import React, { useEffect, useState } from "react";
import axios from "axios";

import { NodeList } from "./Components";

import { CollaboratorType, CommitsType } from "./Types";

import "./App.css";

function App() {
  const host_root = "http://localhost:8080/";

  const [collaborators, setCollaborators] = useState<CollaboratorType[]>([]);
  const [commits, setCommits] = useState<CommitsType[]>([]);

  useEffect(() => {
    Promise.all([
      axios.get(host_root + "collaborators"),
      axios.get(host_root + "commits"),
    ])
      .then((results) => {
        setCollaborators(results[0]?.data);
        setCommits(results[1]?.data);
      })
      .catch((error) => console.log("Error fetching data...:" + error));
  }, []);

  collaborators.forEach((c) => (c.label = `${c.id} / ${c.name}`));
  commits.forEach(
    (c) =>
      (c.label = `${c.authorId} / ${new Date(c.date).toLocaleDateString(
        "el-GR",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`)
  );
  return (
    <div className="App">
      {
        //TODO: ADD VISUAL RELATIONSHIPS
      }
      <NodeList
        data={collaborators}
        wrapperClasses="bg-green-500"
        labelClasses="text-white"
      />
      <NodeList
        data={commits}
        wrapperClasses="bg-yellow-400"
        labelClasses="text-white"
      />
    </div>
  );
}

export default App;
