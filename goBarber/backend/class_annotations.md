# First Node.JS project <!-- omit in toc -->
- [1. Configuring initial project Structure](#1-configuring-initial-project-structure)
- [2. Configuring eslint](#2-configuring-eslint)
- [2.1. Eslint resolving imports](#21-eslint-resolving-imports)
- [3. Adding prettier dependency](#3-adding-prettier-dependency)
- [4. Debugging](#4-debugging)
- [5. Date validation with date-fns](#5-date-validation-with-date-fns)
- [6. DTO and TypeScript Omit](#6-dto-and-typescript-omit)
- [7. Separation of Concerns and Services](#7-separation-of-concerns-and-services)
- [8. Configuring TypeORM](#8-configuring-typeorm)
  - [8.1. Creating Migrations](#81-creating-migrations)
  - [8.2. Creating the database Model(Entity)](#82-creating-the-database-modelentity)
  - [8.3 Repository](#83-repository)
- [9. Multer](#9-multer)
- [10. Error Handling](#10-error-handling)
- [11. Cors](#11-cors)
- [12. Tests](#12-tests)
- [13. NodeMailer](#13-nodemailer)
  - [13.1 E-mail Template](#131-e-mail-template)
- [14. Class Transformer](#14-class-transformer)
- [15. Email service for production](#15-email-service-for-production)

## 1. Configuring initial project Structure

    $ yarn add express

    $ yarn add typescript ts-node-dev @type/express  -D

    $ yarn tsc --init

    $ yarn

edit properties of `tsconfig.json`:
```Json
  ...
  "outDir": "./dist",
  "rootDir": "./src"
  ...
```

## 2. Configuring eslint

    yarn add eslint -D

    yarn eslint --init

? How would you like to use ESLint? **To check syntax, find problems, and enforce code style**

? What type of modules does your project use? **JavaScript modules (import/export)**
? Which framework does your project use? **None of these**

? Does your project use TypeScript? **Yes**

? Where does your code run? **Node**

? How would you like to define a style for your project? **Use a popular style guide**

? Which style guide do you want to follow? **Airbnb: https://github.com/airbnb/javascript**

? What format do you want your config file to be in? **JSON**

? Would you like to install them now with npm? **No**
______________

After that install the recommended dependencies expect by the eslint dependency.

## 2.1. Eslint resolving imports

For eslint recognize the import of `*.ts` files should add the following dependency:

    yarn add -D eslint-import-resolver-typescript

At `.eslintrc.json` add the rule for the eslint:
```JSON
  "rules": {
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          "ts": "never"
        }
      ]
    },
    "settings": {
      "import/resolver": {
        "typescript": {}
      }
    }
```

## 3. Adding prettier dependency

    yarn add -D prettier eslint-config-prettier eslint-plugin-prettier

Configure the `.eslintrc.json` adding:
```JSON
    ...
    "extends": [
        "airbnb-base",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],
    ...
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    ...
    "rules": {
      "prettier/prettier": "error",
      ...
    }
```

add file `.eslintignore`:
```
/*.js
node_modules
dist
```

and `prettier.config.js` to override:
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
};

## 4. Debugging

Go to the vscode debug tab tell to create a new debug config and edit the `launch.json` :
```JSON
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "protocol": "inspector",
      "restart": true,
      "name": "Debug",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "outFiles": [
        "${workspaceFolder}/**/*.js"
      ]
    }
  ]
}
```

add `--inspect` flag for `ts-node-dev`

## 5. Date validation with date-fns

    yarn add date-fns

We can use some utility methods of date-fns to validate the date, e.g.:
- `startOfHour`: gets converts the date to the first instant of some hour;
- `parseISO`: converts a string in date ISO format to a JS Date;
- `isEqual`: compare to dates;

## 6. DTO and TypeScript Omit

We can use DTO `Data Transfer Objects` to make a function receive named parameters, defining interface to model our parameters.

If we want use some type but ignoring some field, it's possible to use `Omit`:
```JS
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    ...
```
This will type the parameter object with like the Appointment expect by the `'id'` field.

## 7. Separation of Concerns and Services

Our Routes should only be concern to receive the request, call another file, and give some response. Everything else must be abstract into a service.

## 8. Configuring TypeORM

    yarn add typeorm pg

- We can config using the TypeORM instructions [TypeORM](https://typeorm.io/#/connection-options/postgres--cockroachdb-connection-options).

Create script at `package.json` to run typeorm using TypeScript:

    "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"

Now `yarn typeorm` will run the typeorm cli.

### 8.1. Creating Migrations

    yarn typeorm migration:create -n CreateAppointments

That will create a new migration at `ormconfig.json` specified migrations folder.

To run the migrations

    yarn typeorm migration:run

And to revert

    yarn typeorm migration:revert

### 8.2. Creating the database Model(Entity)

First to we need to enable two options at our `tsconfig.json`:


    "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */

These options will allow us to use decorators. Now we can use the `@Entity('appointments')` to define that the Appointment model it's an entity of appointments table, and `@Column` or `@PrimaryGeneratedColumn` to define the properties that are database columns.

We will need to disable a property of typescript that will check if class properties were initialized, because typeorm will initialize then for us:

    "strictPropertyInitialization": false,    /* Enable strict checking of property initialization in classes. */

### 8.3 Repository

TypeORM give us `@RepositoryEntity` and `Repository` to handle the Entity data. To use the repository we can import the `getCustomRepository` from typeorm and pass the repository class as parameter, this will return the a repository that we can use.

When testing we got one error "EntityMetadataNotFound: No metadata for "Appointment" was found.", because we missed two things the first one was a dependency for the typeorm annotations:

    yarn add reflect-metadata

And the second was configure the entity directory at `ormconfig.json`:

      "entities": [
        "./src/models/*.ts"
      ],

After that we got an error telling us that the 'id' column cannot be null, this happened because we missed the `default: uuid_generator_v4()` in our migration, we correct then revert and run again the migrations.


## 9. Multer

  To handle file upload we will use the multer middleware

      yarn add multer
      yarn add -D @types/multer

## 10. Error Handling

To handle async errors from express we will need import the express-async-errors lib,

      yarn add express-async-errors

## 11. Cors

To call the endpoint at our frontend with axios we need to enable cors at our backend.

    yarn add cors
    yarn add @types/cors -D

Cors will be only used by the Browser Requests.

## 12. Tests

We will use jest to test our app,

    yarn add jest ts-jest @types/jest -D
    yarn jest --init

At `jest.config.js` sets `presets` as `'ts-jest'` and `testMatch` as `"**/*.spec.ts"`;

At `.eslintrc.json` add `"jest": true` on `env`;

To jest resolve @paths configured at tsconfig should add at jest.config.js:
```JS
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions} = require('./tsconfig.json');

{
  ...
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/'}),
  ...
}

```

## 13. NodeMailer

The lib that we will use to send e-mail it's the nodemailer,

    yarn add nodemailer
    yarn add @types/nodemailer -D

And at development environment we will use EtherealMail to trap our e-mails sent.

### 13.1 E-mail Template

For handling E-mail templates we will use handlebars

    yarn add handlebars

## 14. Class Transformer

    yarn add class-transformer

Class transformer will help us to manipulate and transform the data from an entity, e.g., hiding the password or building the user avatar url.


## 15. Email service for production

There are several options, one of the recommendations is the Amazon SES. For use amazon ses we will need a domain, e.g. [google domains](https://domains.google.com/registrar), and an email account that can be provided on several places like, [zoho](https://www.zoho.com/pt-br/mail/?src=zoho-home&ireft=ohome), and Gmail.
