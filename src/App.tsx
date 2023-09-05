import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const base_url = "http://localhost:8080/";

  const [collaboratorList, setCollaboratorList] = useState([]);
  const [commitList, setCommitList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collaboratorsResponse, commitsResponse] = await Promise.all([
          axios.get(base_url + "collaborators"),
          axios.get(base_url + "commits"),
        ]);

        setCollaboratorList(collaboratorsResponse.data._embedded.collaborators);
        setCommitList(commitsResponse.data._embedded.commits);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (collaboratorList.length > 0 && commitList.length > 0) {
      const mapper: Map<String, never[]> = new Map();
      collaboratorList.forEach((collaborator: any) => {
        mapper.set(
          collaborator.stringId,
          commitList.filter((commit: any) => {
            return commit.authorId === collaborator.stringId;
          })
        );
      });
      console.log(mapper);
    }
  }, [collaboratorList, commitList]);

  return <div className="App"></div>;
}

export default App;
