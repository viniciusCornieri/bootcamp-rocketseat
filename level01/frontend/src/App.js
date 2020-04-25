import React from "react";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header title="Title 1"/>
      <Header title="some other titles">
        <ul>
          <li>HomePage</li>
          <li>Projects</li>
          <li>Login</li>
        </ul>
      </Header>
    </>
  );
}

export default App;
