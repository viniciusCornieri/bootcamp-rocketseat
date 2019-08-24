# Bootcamp Rocketseat - Module 02

Initiating the GoBarber project

## Initial configs

#### Initial commands

    yarn init -y
    yarn add express
    code .

#### Create .gitignore

add node_modules, to avoid all dependencies to be commit.

#### Create initial file structure

Create `src` directory with:

- app.js

  Will contain the server application logic and configuration.

- routes.js

  Will contain our routes config

- server.js

## Creating App class

Adding app class with middlewares and routes methods responsible to the ours server logic. At middleware added json usage, to allow server to communicate with JSON, and at routes just pass the reference to our routes.js file that will be coded.
