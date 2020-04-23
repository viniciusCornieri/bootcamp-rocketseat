# Frontend with ReactJS

## adding React to the project

    yarn add react react-dom

- react-dom it's the react lib used for web development to manipulate the dom.

## Babel

To use the react functionalities we need the Babel which is responsible to transpile (convert) the react code to a code that the browser understand.

## Webpack

For each file type (.js, .css, .png) it will converter the code following the given loaders, e.g., babel-loader, css-loader, image-loader;

## Adding babel and webpack to the project

    yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli

### Configuring babel

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