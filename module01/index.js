const express = require("express");

const server = express();
// tell to express to accept json body
server.use(express.json());
// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": Vinicius, "email": "vinicius.m.cornieri@gmail.com"}
server.get("/teste", (request, response) => {
  // Query param
  const name = request.query.name;
  return response.json({ message: `Hello ${name}` });
});

//middleware
server.use((request, response, next) => {
  console.time("Request");
  console.log(`Metodo ${request.method}; URL: ${request.url}`);

  next();

  console.timeEnd("Request");
});

function checkUserExists(request, response, next) {
  if (!request.body.name) {
    return response.status(400).json({
      error: "User name is required"
    });
  }
  return next();
}

function checkUserInArray(request, response, next) {
  const user = users[request.params.index];
  if (!user) {
    return response.status(400).json({ error: "User does not exists" });
  }
  request.user = user;
  return next();
}

const users = ["Frodo", "Sam", "Gimli", "Aragorn"];
server.get("/users/:index", checkUserInArray, (request, response) => {
  // Route param
  //const { index } = request.params; removed by request modification at checkUserInArray

  return response.json({ message: `Encontrei usuario ${request.user}` });
});

server.get("/users", (request, response) => {
  return response.json(users);
});

server.post("/users", checkUserExists, (request, response) => {
  // body param
  const { name } = request.body;

  users.push(name);

  return response.json(users);
});

server.put(
  "/users/:index",
  checkUserExists,
  checkUserInArray,
  (request, response) => {
    const { name } = request.body;
    users[index] = name;
    return response.json(users);
  }
);

server.delete("/users/:index", checkUserInArray, (request, response) => {
  const { index } = request.params;
  users.splice(index, 1);
  // return response.json(users); é comum somente retornar uma mensagem vazia no sucesso.
  return response.send();
});

server.listen(3333);
