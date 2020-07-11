# APP GoBarber

## 1. init

    npx react-native init --template react-native-template-typescript

- configured eslint, prettier and editorconfig.

- Added styled components to style the app

    yarn add styled-components
    yarn add -D @types/styled-components

## 2. React Navigation

To handle the routes of our app we will use the [react-navigation lib](https://reactnavigation.org/docs/getting-started), follow the instructions at their get started to configure correctly.

After install of the lib dependencies, it will be need to run `yarn android` again, and to [hello-react-navigation](https://reactnavigation.org/docs/hello-react-navigation).


## 3. handling typescript importing .png file

Create a `index.d.ts` at `@types` declaring `'*.png'` as a module of our application.

## 4. adding custom font family assets

Create `./assets/fonts/` folder inside the root directory, **not inside src**, and move the fonts inside it.

**For IOS and Android compatibility font filename and font post-script name must be equals**

Then create `react-native.config.js` exporting the assets configuration:
```JS
module.exports = {
  project: {
    ios: {},
    android: {}
  },
  assets: [
    './assets/fonts/'
  ]
}
```
To finish,

    npx react-native link

or

    yarn react-native link

Ater we can see the fonts inside `android/app/main/assets/fonts` or described at `ios/appgobarber/Info.plist`;


## 5. Icons

We will use the icons from react-native-vector-icons

    yarn add react-native-vector-icons

## 5.1 Configuring font icons at Android

For Android we need to edit the file `android/app/build.gradle` and add at end of file:

```Groovy
project.ext.vectoricons = [
  iconsFontName: ["Feather.ttf"]
]

apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

## 5.2 Configuring font icons at IOS

For IOS we need to edit the `ios/appgobarber/Info.plist` adding `Feather.ttf` to add the font from the lib that we installed.

```XML
	<key>UIAppFonts</key>
	<array>
		<string>RobotoSlab-Medium.ttf</string>
		<string>RobotoSlab-Regular.ttf</string>
		<string>Feather.ttf</string>
	</array>
```

## 6. Iphone X Helper

Iphone X has an icon below the screen to close the app, to handle that size we can use the lib `react-native-iphone-x-helper`;

    yarn add react-native-iphone-x-helper

## 7. Avoiding keyboard overlap the app

We can use a view that avoids the keyboard to hide it, `KeyboardAvoidingView`. Using `Platform` we will use the behavior only at `ios` because `android` already have this behavior as default.

