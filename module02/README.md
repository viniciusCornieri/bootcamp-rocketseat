# Bootcamp Rocketseat - Module 02

Starting the GoBarber project

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

## 3 - Sucrase and nodemon

#### 3.1 - Adding sucrase and nodemon

Adding sucrase to handle es6 imports and nodemon to automatic restart our server
when something changed. Both dependencies are imported as Dev because we won't need them in production.

    yarn add sucrase nodemon -D

To use:
yarn sucrase-node src/server.js

or configure `nodemon.json` to use sucrase, see `nodemon.json`.

#### 3.2 - Changing all require for import

Change in all files the `const imp = require('something');` to `import imp from 'something';`, but after that the node command at our server.js will not work anymore because it will complain tha doesn't know import. For now we will use sucrase to run our server, and works fine.

#### 3.3 - Configuring nodemon to run js files with sucrase

At package.json `add` dev script with `nodemon src/server.js`, then create nodemon.json to specify for the nodemon to run js files with sucrase.

    {
      "execMap": {
        "js": "sucrase-node"
      }
    }

now to run our server and restart on any change just run `yarn dev`

## 4 Docker

#### 4.1 Installing Docker CE

Installing docker CE from [Docker CE - Install](https://docs.docker.com/install/). I followed the steps for install and post-install for Linux, and worked without
problems.

#### 4.2 Installing Postgres docker

Follow the [Docker HUB - Postgres](https://hub.docker.com/_/postgres) to add
the postgres image at your docker. I run the following command:

    docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

The difference from the link it's the -p that its a port redirect which the first
port indicates the user port that will be used and the second port it's the container port to be mapped. We can run ´docker ps´ to see if the command worked and the
postgres container is online.

##### 4.2.1 Postbird install

We will use [Postbird](https://electronjs.org/apps/postbird) as GUI client for our postgres database.

##### 4.2.2 Configuring Postbird

To connect at postbird at the docker we created, the host it's `localhost`,
port it's `5432`, the username it's the default `postgres` and the password `docker` that we specified at section [4.2]

##### 4.2.3 Creating App Database

Create gobarber database. All tables and database structures will be created by our app.

#### 4.3 Docker commands

- `"docker ps"` - list all active containers.
- `"docker ps -a"` - list all containers that was activated.
- `"docker start <container_name/id>"` - start the specified container.
- `"docker stop <container_name/id>"` - stop the specified container.
- `"docker logs <container_name/id>"` - show the logs of the container to see any error.

## 5 Sequelize

Sequelize it's a ORM for Node, it's a relational database abstraction.
No direct use of SQL, all data manipulation happens with Javascript.

#### 5.1 Migrations

- Database version control.
- Each file has instructions for creation, update, delete of table and columns.
- Each file it's a migration and its ordered by date.

Migration have an `up` that it's the instruction that will be executed if everything it's ok, and a `down` that it's the rollback instructions if something goes wrong.

Migration can only be edited at his development phase. After the migrations was commited and used by other devs or put in production, **it can NEVER EVER be edited anymore**. After that should create a new migration to do the changes.

Each migration should only change one table.

#### 5.2 Seeds

Files that populate our database for tests or develop environment.

- They are executed by code.
- It will never be used in production, for production use a Migration.

## 6 MVC

Model - Is only responsible to manipulate the database data. It will not contain
any business logic.

Controller - It's the entry point of our application requests, a route usually is associated with a controller function. Most of business logic will be here.

View - It's the client return, at non REST projects will be the HTML. At our
API REST server project it's just our a JSON response.

#### 6.1 Controller

- Class
- Always return a JSON
- Never calls another controller.

Have only 5 method:

- index() - Lists the objects
- show() - show only one object
- store() - create one object
- update() - update one object
- delete() - delete one object
