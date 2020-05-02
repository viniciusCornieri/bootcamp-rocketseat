import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import api from './services/api';

import './App.css';

function App() {
  //useState return an array with 2 values
  // 
  // 1. initial Value
  // 2. function to update this value

  const [projects, setProjects] = useState([]);
  
  useEffect(() => { // cannot use async await here
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);
  
  async function handleAddProject() {
    //setProjects([...projects, `Novo projeto ${Date.now()}`]);
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Vinicius Cornieri'
    });
    
    setProjects([...projects, response.data]);
  }

  return (
    <>
      <Header title="Projects"/>
      <ul>
        {projects.map(project => <li key={project.id} >{project.title}</li>)}
      </ul>

      <button type='button' onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  );
}

export default App;
