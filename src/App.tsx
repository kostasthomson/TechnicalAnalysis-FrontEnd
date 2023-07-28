import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  const url = "http://localhost:8080/people";
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(url);
    console.log(res.data._embedded.people);
    return setData(res.data._embedded.people);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
