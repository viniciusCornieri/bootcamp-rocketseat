# Mobile with React Native <!-- omit in TOC -->

- [1. React Native Architeture](#1-react-native-architeture)
  - [1.1. Architeture](#11-architeture)
  - [1.2. Syntax](#12-syntax)
  - [1.3. Expo](#13-expo)
- [2. Install](#2-install)
- [3. Init mobile project](#3-init-mobile-project)
- [3. ReactJS vs React-Native](#3-reactjs-vs-react-native)
- [4. Configuring AXIOS](#4-configuring-axios)

## 1. React Native Architeture

- React version for mobile development;
- Multiplataform;
- It's possible to manipulate each platform in a different way.
- Native Interface, it's not a webview;
- Code is not transpiled.
  
### 1.1. Architeture

    JS -> Metro Bundler -> Bundle -> Bridge |-> Android
            (packager)                      |
        (similar to webpack)                |-> IOS

### 1.2. Syntax

- Component declaration equals to the WEB;
- Use the react-native components, and not HTML tags;
- Apply Style without classes or ID's, using the property style;
- Every Text is a `<Text />` it not exist custom text style, like strong, h1, h2 ...;

### 1.3. Expo

- SDK with several features ready to use, like camera, video, integrations;
- No need to configure an emulator;

**We will not use Expo!**
- It limit native code usage;
- Several libs does not have support to Expo;
- It's possible to export Expo projects to a project that does not use Expo;

## 2. Install

Follow the steps at [react-native.rocketseat.dev](https://react-native.rocketseat.dev/)

## 3. Init mobile project

    react-native init <name>

## 3. ReactJS vs React-Native

- **View**: div, footer, header, main, aside, section;
- Components does not have semantic value;
- **Text**: p, span, strong, h1, h2, h3;
- Components does not have specific style;
- All Components have `display:flex` property as default.
- React Native does not have style inheritance, a child component will not have the style of it parent.
  
## 4. Configuring AXIOS

**baseUrl**
- IOS and emulator: `localhost`
- IOS and device: the host IP
- Android and emulator: `localhost`
  - Need to configure reverse proxy with adb
  - `adb reverse tcp:3333 tcp:3333`
- Android and emulator (Android Studio): `10.0.2.2`
- Android and emulator (Genymotion): `10.0.3.2`
- Android and device: the host IP