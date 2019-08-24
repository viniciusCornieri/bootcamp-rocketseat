# Bootcamp Rocketseat - Module 02

Initiating the GoBarber project

## 1 - Initial configs

#### 1.1 - Initial commands

    yarn init -y
    yarn add express
    code .

#### 1.2 - Create .gitignore

add node_modules, to avoid all dependencies to be commit.

#### 1.3 - Create initial file structure

Create `src` directory with:

- app.js

  Will contain the server application logic and configuration.

- routes.js

  Will contain our routes config.

- server.js

  It's the main file responsible to run our server.

## 2 - Hello World of our server with this structure

#### 2.1 - Creating App class

Adding app class with middlewares and routes methods responsible to the ours server logic. At middleware added json usage, to allow server to communicate with JSON, and at routes just pass the reference to our routes.js file that will be coded. Att App constructor initialize server express, and call the middleware and routes functions to build our middlewares and routes.

#### 2.2 - Making server listen our app

The server and app class are separated to be easier to test on the following lessons. The server class will get a App instance that exports the server and listen the 3333 port.

#### 2.3 - Adding the hello world message route

At our routes.js, import the Router from express that it's responsible to create and specify our app routes. To test create a get for root route, that return a json with message hello world.
