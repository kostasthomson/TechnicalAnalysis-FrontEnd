import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
import axios, { AxiosResponse } from "axios";

import "./App.css";

import { CollaboratorType, CommitsType } from "./Types";

import CommitList from "./Components/Commit";
import CollaboratorList from "./Components/Collaborator";

function App() {
  const base_url = "http://localhost:8080/";

  const [collaborator, setCollaborator] = useState<CollaboratorType>();

  const [commits, setCommits] = useState<CommitsType[]>([]);

  const collaborators: CollaboratorType[] = [];

  // const [commitsMap, setCommitsMap] = useState<Map<string, CommitsType>>();

  const fetchData = async () => {
    // await axios
    //   .get(base_url + "collaborators")
    //   .then((res: AxiosResponse<any, any>) =>
    //     setCollaborators(res.data._embedded.collaborators)
    //   )
    //   .catch(() => console.log("Error collaborators"));
    await axios
      .get(base_url + "commits")
      .then((res: AxiosResponse<any, any>) =>
        setCommits(res.data._embedded.commits)
      )
      .catch(() => console.log("Error commits"));
    return;
  };

  const fetchCollaborator = async (link: string) => {
    await axios
      .get(link)
      .then((res: AxiosResponse<any, any>) =>
        collaborators.push(res.data)
      )
      .catch(() => console.log("Error collaborators"));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const map = new Map<string, CommitsType>();
  commits.forEach((commit) => map.set(commit.sha, commit));

  const linksMap = new Map<string, string>();
  map.forEach((value, key) => linksMap.set(key, value._links.author.href));

  linksMap.forEach((link) => fetchCollaborator(link));

  console.log(collaborators);

  return (
    <div className="App">
      {/* <CollaboratorList data={collaborators} />
      <CommitList
        data={commits.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))}
      /> */}
    </div>
  );
}

export default App;
