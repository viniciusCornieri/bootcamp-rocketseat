# First Node.JS project <!-- omit in toc -->
- [1. Configuring initial project Structure](#1-configuring-initial-project-structure)
- [2. Configuring eslint](#2-configuring-eslint)
- [2.1. Eslint resolving imports](#21-eslint-resolving-imports)
- [3. Adding prettier dependency](#3-adding-prettier-dependency)
- [4. Debugging](#4-debugging)
- [5. Date validation with date-fns](#5-date-validation-with-date-fns)
- [6. DTO and TypeScript Omit](#6-dto-and-typescript-omit)

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
