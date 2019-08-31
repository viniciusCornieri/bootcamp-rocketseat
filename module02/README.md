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
```JSON
    {
      "execMap": {
        "js": "sucrase-node"
      }
    }
```
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

Create goBarber database. All tables and database structures will be created by our app.

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

## 7 Eslint, Prettier and Editor Config

Enforce code patterns at our project

### 7.1 Eslint

Verify if our code it's following the defined patterns. To install add eslint as
Dev dependency:

    yarn add -D eslint

after that run:

    yarn eslint --init

Select:
```
How would u like to use ESLint?
- To check syntax, find problems, and enforce code style.
What type of modules does your project use?
- Javascript modules (import/export)
Which framework does your project use?
- None of these
Where does your code run?
- Select only Node
How would you like to define a style for your project?
- Use a popular style guide
Which style guide do you want to follow?
- Airbnb (http://github...)
What format do you want your config file to be in?
- Not matters / but he picked Javascript
Would you like to install them now with npm?
- Y
```
After that because the dependencies were installed by npm, will create a package-lock.json file, so because we use `yarn` just delete the `package-lock.json` and run a clean:

    yarn

This will rebuild our project correctly with yarn.

At our `.eslintrc.js(on)` we will override some airbnb rules, at rules:
```JS
rules: {
    // Overriding some airbnb rules
    // forces a class always use this to access methods
    "class-methods-use-this": "off",
    "no-param-reassign": "off", // not allow reassign a param
    "camelcase": "off", // force all variables to follow camelcase
    // ignore unused declared var if the var name is next,
    // we will need to at following classes
    "no-unused-vars": ["error", { "argsIgnorePattern": "next"}],

  },
```

#### 7.1.1 Vscode Eslint

At VsCode we need the ESLint extension. Add at preferences settings JSON the following

```JSON
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        {
            "language": "javascript",
            "autoFix": true
        },
        {
            "language": "javascriptreact",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        },
    ],
```

### 7.2 Prettier

Install the following as Dev dependencies:

    yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

adjust code styles, and eslint integration.

At `.eslintrc.js(on)`:
- adds prettier at extends

```JS
extends: [
    'airbnb-base',
    'prettier'
  ]
```
- add prettier at plugins
```JS
plugins: [
    'prettier'
  ]
```
- add a rule for prettier problems be error:
```JS
rules: [
    // prettier rules are considered errors
    'prettier/prettier': 'error',
    ...
  ]
```

Some prettier rules will conflict with airbnb rules, to resolve just create a
`.prettierrc` file with:
```JS
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

Now we can fix all js files at a directory with the command

                  <directory>  <files extension>
    yarn eslint --fix src --ext js

#### Editor config

Install EditorConfig vscode extension. EditorConfig it's a multi editor configuration that it's very helpful if our devs use different editors. It helps everyone to keep the same styles between editors. After installing it go to explore (`ctrl + shift + e`) and right click -> `generate .editorconfig`, at the generated file change the last two rules to true:

```JS
trim_trailing_whitespace = true
insert_final_newline = true
```
## 8 Structuring our project to use Sequelize

First create at `src` directory  the following directories structure tree:

        src
        |__app
        |   |__controllers
        |   |__models
        |
        |__config
        |
        |__database
             |__migrations

Install Sequelize at our project:

    yarn add sequelize

After that install as dev dependency the CLI for sequelize:

    yarn add sequelize-cli -D

Create a file `.sequelizerc` responsible to exports our config, migrations and database files.

**OBS** Both database.js and .sequelizerc need to use commonJS pattern, because the sequelize-cli will not understand import/export pattern.

See at [Sequelize.org/dialects](https://sequelize.org/master/manual/dialects.html) some configs for our `database.js`. For postgres we need to install:

    yarn add pg pg-hstore

## 9 Dotenv

Dotenv it's used to avoid share secret information, see more at https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/

## 10 Creating our First Migration

We can use the sequelize-cli as scaffolding for our migrations:

    yarn sequelize migration:create --name=create-users

After editing the created migration run the following command to apply the migration:

    yarn sequelize db:migrate

After that we can go to `postbird` and update our table list to see the table we created.

If at development stage we need to edit/undo something at the recent migration we can run

    yarn sequelize db:migrate:undo

That will undo the last applied migration, or

    yarn sequelize db:migrate:undo:all

This command will undo all migrations.

## 11 Creating the Model

Create `src/app/models/User.js`, at the super.init() we pass the columns defined at the migration as parameters, but we can skip the primaryKey and the created_at/updated_at that is auto-filled. Only the columns that interact with the user.

## 12 Creating Loader for our model

The file responsible to load our model and connect with our database will be our `src/database/index.js`.

## 13 Encrypting the password with bcryptjs

Install bcryptjs with;

    yarn add bcryptjs

Import bcrypt at our user model, now we can create a new field at users with the `Sequelize.VIRTUAL` type which indicates that field does not exists at our database.

At our model we can create hooks to manipulate the data before or after something, with this we can encrypt the given user password like this:

```JS
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
```

## 14 JWT - Authentication

`J`SON `W`eb `T`oken or just `JWT` it's the pattern that we will use to authentic the users of our application APIs.

We will create some endpoint responsible to authenticate the user like:

```JS
POST http://api.com/sessions
{
  "email": "exemple@test.com",
  "password": "123456"
}
```

The request will respond with the `JWT Token`, the token it's divided in three encrypted parts separated by DOT:
- 'Headers' -> with some information about the token, like token type and encrypt algorithm.
- 'Payload' -> additional data that we can pass with the token, like user email, user id and other `non-sensitive` data.
- 'Signature' -> the token signature like checksum, used to verify if the token haven't been modified.

We will use `jsonwebtoken` module to authenticate at our application:

    yarn add jsonwebtoken

At second parameter of `jwt.sign` we should pass some string that it's unique and `SECRET`, i will use `dotenv` for that, for our application. To get this string we can use the [md5Online](https://www.md5online.org/).

#### 14.1 Creating the authorization middleware

We will create the auth middleware to handle request which need the valid token, that will be passes as `Authorization` at request header, its a pattern to put `Bearer` followed by a space before our token value at the header.

#### 14.2 Promisify

To handle asynchronous function that have use the old callback pattern.

## 15 Yup for schema validation

We will use Yup for validate our define schema with the request information we received,

    yarn add yup



