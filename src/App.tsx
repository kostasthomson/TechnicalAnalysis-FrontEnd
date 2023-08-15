import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
import axios, { AxiosResponse } from "axios";

import "./App.css";

import { CollaboratorType, CommitsType } from "./Types";

import CommitList from "./Components/Commit";
import CollaboratorList from "./Components/Collaborator";

function App() {
  const base_url = "http://localhost:8080/";

  const [collaborators, setCollaborators] = useState<CollaboratorType[]>([]);

  const [commits, setCommits] = useState<CommitsType[]>([]);

  const fetchData = async () => {
    await axios
      .get(base_url + "collaborators")
      .then((res: AxiosResponse<any, any>) =>
        setCollaborators(res.data._embedded.collaborators)
      )
      .catch(() => console.log("Error collaborators"));
    await axios
      .get(base_url + "commits")
      .then((res: AxiosResponse<any, any>) =>
        setCommits(res.data._embedded.commits)
      )
      .catch(() => console.log("Error commits"));
    return;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <CollaboratorList data={collaborators} />
      <CommitList
        data={commits.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))}
      />
    </div>
  );
}

export default App;
