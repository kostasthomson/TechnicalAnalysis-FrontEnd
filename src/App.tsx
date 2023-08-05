import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
import axios from "axios";

import "./App.css";

import { CollaboratorType, CommitsType } from "./Types";

import CommitList from "./Components/Commit";
import CollaboratorList from "./Components/Collaborator";

function App() {
  const base_url = "http://localhost:8080/";

  const [collaborators, setCollaborators] = useState<CollaboratorType[]>([]);

  const [commits, setCommits] = useState<CommitsType[]>([]);

  const fetchData = async () => {
    const col_res = await axios.get(base_url + "collaborators");
    const com_res = await axios.get(base_url + "commits");

    setCollaborators(col_res.data._embedded.collaborators);
    setCommits(com_res.data._embedded.commits);
    return;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <CollaboratorList data={collaborators} />
      <CommitList data={commits} />
    </div>
  );
}

export default App;
