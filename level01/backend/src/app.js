const express = require("express");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());

const projects = [];

app.get("/projects", (request, response) => {
  const { title } = request.query;
  const result = title
    ? projects.find((project) => project.title.includes(title))
    : projects;
  return response.json(result);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);
  return response.json(project);
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response
      .status(400)
      .json({ error: `Could not found project ${id}` });
  }

  const { title, owner } = request.body;

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response
      .status(400)
      .json({ error: `Could not found project ${id}` });
  }

  projects.splice(projectIndex, 1);
  return response.status(204).send();
});

module.exports = app;
