# Environment config and recommendations

## 1. VSCODE recommendations

### 1.1 Dracula Theme

Install using Command Palette
1. Go to `View -> Command Palette` or press `Ctrl+Shift+P`
2. Then enter Install Extension
3. Write Dracula Official
4. Select it or press Enter to install

### 1.2 Font Ligatures

To use font ligature, we have two great options:

#### 1.2.1 Fira code

Download and install it from [Fira code - GITHUB](https://github.com/tonsky/FiraCode)

#### 1.2.2 Cascadia code

Download and install it from [Cascadia code - GITHUB](https://github.com/microsoft/cascadia-code)

#### 1.2.3 Installing at VSCODE

At Vscode open the Command Pallet and search for `Preferences: Open Settings (JSON)`. Choose the font you want, `cascadia code` or `fira code` then at the settings JSON set:

    "editor.fontFamily": "Fira Code",
    "editor.fontLigatures": true

This will enable the font ligatures at vscode.

### 1.3 Recommended extensions

#### 1.3.1 Install Icon Themes

Here we have two options the

`Material Icon Theme` or  `VSCode Icons`, both are installed from Install Extension Tab, like the Dracula theme.

### 1.3.2 Color Highlight Extension

Install `Color Highlight` extension, this extension show the color that represented by the HexDecimal in the code.

### 1.3.3 RocketSeat Snippets

Install the `Rocketseat ReactJS` extension and `Rocketseat React Native` extension, both will provide snippets to react.

### 1.3.4 Code Spell Check

Install the `Code Spell Checker` and `Brazilian Portuguese - Code Spell Checker`, to show wrong spelled words.

### 1.3.5 Eslint, Prettier and EditorConfig Extensions

These extensions are a must have, search for `eslint`, `prettier - code formatter` and `editorConfig for VsCode`, they are used to enforce code patterns and good practices.

### 1.4 Some Other VSCode Settings

At `Preferences: Open Settings (JSON)` add the following configs or just copy from `vscode.setting.json` of this repository.

#### 1.4.1 Configuring the code rulers 

    "editor.rulers": [80, 120]

This vscode config will add vertical lines to be used as reference to align our code, and not exceed the soft limit of 80 characters and never ever exceed the hard limit of 120 characters. 

#### 1.4.2 Change the line Highlight

    "editor.renderLineHighlight": "gutter"

To change the line highlight to be only around the line number.

#### 1.4.3 Change Tab Size and spaces

    "editor.tabSize": 2,
    "editor.insertSpaces": true,
    "editor.detectIndentation": false,

To use 2 spaces as default tab size, the second one enforces to use spaces instead tab, the last will use always the default tabsize instead of looking at file indentation.

#### 1.4.4 Integrated terminal Font Size

    "terminal.integrated.fontSize": 14

Change the Font Size of the integrated terminal (`ctrl+shift+´` or `ctrl+'`)

#### 1.4.5 Emmet Config

Config emmet to work with javascript and javascriptreact too.

        //emmet html autocomplete configurations
        "emmet.syntaxProfiles": {
            "javascript": "jsx"
        },
        "emmet.includeLanguages": {
            "javascript": "javascriptreact"
        },

#### 1.4.6 Disable update imports on file move

Leave to us to update the imports when we move a file;

        "javascript.updateImportsOnFileMove.enabled": "never",

#### 1.4.7 Enable breadcrumbs

Enable breadcrumbs to show the file path

          "breadcrumbs.enabled": true,

#### 1.4.8 Update the max tokenization Line Length

Increments this property to be able to open some long json files.

          "editor.maxTokenizationLineLength": 3000000,

#### 1.4.9 Eslint configs

Two eslint config to integrate with vscode.

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

#### 1.4.10 Defining Prettier as default formatter

        //Javascript configurations
        "[javascript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        //Javascript configurations
        "[typescript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[json]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[jsonc]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },

#### 1.4.11 ignoring some files at vscode

This props tells to not show the following files at vscode.

        "files.exclude": {
            "**/.classpath": true,
            "**/.project": true,
            "**/.settings": true,
            "**/.factorypath": true
        },

#### 1.4.12 Disabling ignoring whitespace on diff

        "diffEditor.ignoreTrimWhitespace": false,

## 2. Unix Terminal

For Unix users here are some terminal recommended configs.

### 2.1 Font

Go to terminal preferences and set Fira Code as the terminal font.

### 2.2 Hyper Terminal

We can use [Hyper](https://hyper.is/) as a alternative terminal, he as some great features like tabs and clean layout.

### 2.3 Dracula Theme

Go to [Dracula Theme](https://draculatheme.com/) and search for terminal and hyper*(if you are using), to apply the Dracula theme for them too.

### 2.4 Oh My ZSH

Follow the Instructions [Rocketseat OhMyZsh](https://blog.rocketseat.com.br/terminal-com-oh-my-zsh-spaceship-dracula-e-mais/).

## 3. Chrome Configs

### 3.1 React Dev Tools

Go to `Options -> More Tools -> Extensions` then select `Extensions -> Open Chrome Web Store`, search for `React developer Tools` and install it.

### 3.1 Json Viewer

Go to `Options -> More Tools -> Extensions` then select `Extensions -> Open Chrome Web Store`, search for `Json Viewer` and install it. This helps format json files when we receive from request at chrome.


