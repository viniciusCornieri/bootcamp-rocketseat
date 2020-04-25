# Frontend with ReactJS

## adding React to the project

    yarn add react react-dom

- react-dom it's the react lib used for web development to manipulate the dom.
## Concepts

- **Babel**

To use the react functionalities we need the Babel which is responsible to transpile (convert) the react code to a code that the browser understand.

- **Webpack**

For each file type (.js, .css, .png) it will converter the code following the given loaders, e.g., babel-loader, css-loader, image-loader;

### Adding babel and webpack to the project

    yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli

## Configuring babel

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

### Babel CLI
To transpile manually:

    yarn add @babel/cli

    yarn babel src/index.js --out-file public/bundle.js
  
## Configuring Webpack

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
  
  ### Webpack-dev-server (live Reload)

      yarn add webpack-dev-server -D

  To config the `webpack-dev-server` to continuously transpile our code when we are developing, we need to add one more config at the top level of our config `webpack.config.js`:

  ```JS
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  ```

  Now to run,

      yarn webpack-dev-server --mode development

## Componentization

A fundamental concept around React is the componentization, all the frontend is build creating and assembling web components made in react.

- JSX: Javascript XML, javascript with HTML, need '@babel/preset-react' to be transpiled.
- All files that create a React component begin with capital letter like, `App.js`.
- Every time that we will use JSX at some file we need to `import React from 'react';` even it was not used.
- We cannot define two components at the same level without a parent, for this we can use the react fragment tag `<></>` this will group up elements for us:
```JS
// wrong:
return (<Header /><Header />)
// right:
return (<><Header /><Header /></>)
```
