const express = require("express");

const server = express();
// allow json at body requests
server.use(express.json());

let projects = [];
let requestsCount = 0;
server.use((request, response, next) => {
  console.log(++requestsCount + " requests done");
  next();
});

// middleware to check if the given project id exists
function checkIfIdExists(request, response, next) {
  const { id } = request.params;
  if (!projects.find(p => p.id === id)) {
    return response.status(400).json({ error: "id not found!" });
  }
  return next();
}
// get all projects
server.get("/projects", (request, response) => {
  return response.json(projects);
});

// create a project
server.post("/projects", (request, response) => {
  const { id, title } = request.body;
  if (projects.find(p => p.id === id)) {
    return response.status(400).json({ error: "id already exists!" });
  }
  projects.push({ id: id, title: title, tasks: [] });
  return response.json(projects);
});

// update a project title
server.put("/projects/:id", checkIfIdExists, (request, response) => {
  const { id } = request.params;
  const { title } = request.query;
  // update all projects titles with the given id
  projects.filter(p => p.id === id).forEach(p => (p.title = title));
  return response.json(projects);
});

// delete projects by id
server.delete("/projects/:id", checkIfIdExists, (request, response) => {
  const { id } = request.params;
  const { title } = request.query;
  // update all projects titles with the given id
  projects = projects.filter(p => p.id !== id);
  return response.send();
});

// add a task at a project
server.post("/projects/:id/tasks", checkIfIdExists, (request, response) => {
  const { id } = request.params;
  const { title } = request.body;
  // add a task at all projects with the id
  projects.filter(p => p.id === id).forEach(p => p.tasks.push(title));
  return response.send(projects);
});

server.listen(3333);
