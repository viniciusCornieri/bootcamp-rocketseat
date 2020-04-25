# Frontend with ReactJS  <!-- omit in toc -->
- [1. Adding React to the project](#1-adding-react-to-the-project)
- [2. Concepts](#2-concepts)
  - [2.1. Adding babel and webpack to the project](#21-adding-babel-and-webpack-to-the-project)
- [3. Configuring babel](#3-configuring-babel)
  - [3.1. Babel CLI](#31-babel-cli)
- [4. Configuring Webpack](#4-configuring-webpack)
  - [4.1 Webpack-dev-server (live Reload)](#41-webpack-dev-server-live-reload)
- [5. Componentization](#5-componentization)
- [6. React Properties](#6-react-properties)
- [7. State and Immutability](#7-state-and-immutability)
  - [7.1 State](#71-state)
  - [7.2 Immutability](#72-immutability)
- [8. Importing CSS and Images](#8-importing-css-and-images)
  - [8.1. File Loader](#81-file-loader)
  
## 1. Adding React to the project

    yarn add react react-dom

- react-dom it's the react lib used for web development to manipulate the dom.
## 2. Concepts

- **Babel**

To use the react functionalities we need the Babel which is responsible to transpile (convert) the react code to a code that the browser understand.

- **Webpack**

For each file type (.js, .css, .png) it will converter the code following the given loaders, e.g., babel-loader, css-loader, image-loader;

### 2.1. Adding babel and webpack to the project

    yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli

## 3. Configuring babel

In the `babel.config.js` add 
```JS
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
};
```

The presets are third-parties babel configurations that we can load,
- @babel/preset-env: will make the babel transpile our code accordingly with the environment that the code will be run.
- @babel/preset-react: will transpile the js code that use the react like JSX features to a JS that browsers understand.

### 3.1. Babel CLI
To transpile manually:

    yarn add @babel/cli

    yarn babel src/index.js --out-file public/bundle.js
  
## 4. Configuring Webpack

  Webpack will automate the transpile the code using the configured loaders. To begin, install the babel-loader, `yarn add babel-loader`, and then create the `webpack.config.js` file with the configs:

  ```JS
  const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
}
  ```
  We can run webpack with the following command

    yarn webpack --mode development
  
  ### 4.1 Webpack-dev-server (live Reload)

      yarn add webpack-dev-server -D

  To config the `webpack-dev-server` to continuously transpile our code when we are developing, we need to add one more config at the top level of our config `webpack.config.js`:

  ```JS
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  ```

  Now to run,

      yarn webpack-dev-server --mode development

## 5. Componentization

A fundamental concept around React is the componentization, all the frontend is build creating and assembling web components made in react.

- JSX: Javascript XML, javascript with HTML, need '@babel/preset-react' to be transpiled.
- All files that create a React component begin with capital letter like, `App.js`.
- Every time that we will use JSX at some file we need to `import React from 'react';` even it was not used.
- We cannot define two components at the same level without a parent, for this we can use the react fragment tag `<></>` this will group up elements for us:
```JS
// wrong:
return (<Header /><Header />);
// right:
return (<><Header /><Header /></>);
```
## 6. React Properties

We can use properties in our react components like: 
```HTML
  <Header title='some title'/>
```

To use JS variables or expressions inside JSX we need to but them inside brackets:
```HTML
    <header>
      <h1>{props.title}</h1>
    </header>
```
We have other property that it's called children we can pass to a component some other components like: 

```HTML
      <Header title="Title 1">
        <ul>
          <li>HomePage</li>
          <li>Projects</li>
        </ul>
      </Header>
```

We can access the internal definition with the property `children`:
```JS
export default function Header({ title, children }) {
  return (
    <header>
      <h1>{title}</h1>
      {children}
    </header>
  );
}
```
## 7. State and Immutability

### 7.1 State

To manipulate data and render again some component we will use the react concept of `state`,
for this we `import {useState} from 'react';` and then we can call this function to create a state.
The `useState` function will return an array with two values, the first one is the initial value that it's passed as parameter to the useState, the second is a function to set the value of this state and every time we call this function the react will render the state again.

### 7.2 Immutability

To call set state we need to pass a new object, we cannot alter the old one using not immutable functions like `Array.push()`. For one array we can create a new array using the spread operator like:
```JS
setProjects([...projects, newProject]);
```

## 8. Importing CSS and Images

To begin using CSS and images we need to more loaders:

    yarn add style-loader css-loader

then add other rule to `webpack.config.js`:
```JS
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" }, 
          { loader: "css-loader" }
          ],
      },
```

**After this, need to reload manually the webpack-server-dev to use the new loaders.**

### 8.1. File Loader

    yarn add file-loader

we will use the following config with the file-loader:
```JS
      //remember to do not put spaces after or before the pipes
      // the 'i' tells to be case insensitive
      {
        test: /.*\.(jpe?g|gif|png)$/i, 
        use: { loader: "file-loader" },
      },
```
