# Bootcamp Rocketseat - Module 01 - Concepts and Environment

## 1 Environment configurations

#### 1.1 Install Node.js

Install the latest stable LTS version from [Node.js](https://nodejs.org/en/).
For Unix users it's recommended to install via [NVM](https://github.com/nvm-sh/nvm).

#### 1.2 Install Yarn

Yarn it's better and faster than NPM so, install from [yarnpkg](https://yarnpkg.com/lang/en/docs/install/).

#### 1.3 Install Imsomnia

Install Imsomnia from [link](https://insomnia.rest/download/), this app we will user
to do requests to test our rest APIs.

#### 1.4 Install Nodemon

    yarn add -D nodemon

Nodemon it's a daemon that will help us to restart the server on every change we
made, so we won't need to kill the node and start again. To run the nodemon just:

    yarn nodemon index.js

## 2 Creating an application

First at a new directory

    yarn init -y

This will create the package.json, that it's like the pom.xml from maven or build.gradle from gradle. At package.json will be described the dependencies of our project.

#### 2.1 Add express dependency

    yarn add express

Express will handle our server requests.

## 3 Query & Route Params

#### 3.1 Query params

    http://localhost:3333/api?name=1

name is the query param and can be accessed by request.query.name.

#### 3.2 Route params

    http://localhost:3333/api/1

1 it's the route param and can be accessed by request.params, see index.js for
more detailed examples.

#### 3.3 Body params

the body params are received at the request body and accessed by request.body,
see index.js for more information.

## 4 Middlewares

Middlewares it's a function that receive a request, response and a next and can
manipulate the users requests before some endpoint. See check methods at index.js
for more information.
