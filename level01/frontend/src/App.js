import React, { useState } from "react";
import Header from "./components/Header";
import './App.css';
import backgroundImage from './assets/background.jpeg';

function App() {
  const [projects, setProjects] = useState(['App development', 'Front-end Web']);
  //useState return an array with 2 values
  // 
  // 1. initial Value
  // 2. function to update this value

  function handleAddProject() {
    setProjects([...projects, `Novo projeto ${Date.now()}`]);
  }

  return (
    <>
      <Header title="Projects"/>
      <img width={300} src={backgroundImage}/>
      <ul>
        {projects.map(project => <li key={project} >{project}</li>)}
      </ul>

      <button type='button' onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  );
}

export default App;
