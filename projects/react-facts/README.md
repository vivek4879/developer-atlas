# React Facts

React Facts is a small single-page app with fun facts about React. It is my
first React project, built to practice the fundamentals: setting up a project
with Vite, writing JSX, creating custom components, and styling them. It is part
of [Developer Atlas](../../README.md), my collection of projects from the
Scrimba Fullstack Developer Path.

## What I learned

1. Why you should care about React
2. Setting up a new React project
3. JSX
4. Custom components
5. Styling

## Current features

- Built with React and Vite
- Uses JSX to describe the page
- Splits the page into custom components (`Navbar`, `Main`, `UnorderedList`)
- Composes the components together in `App`
- Styled with plain CSS to match a Figma design
- Uses ES modules

## Getting started

### Prerequisite

- [Node.js](https://nodejs.org/) installed on your computer

### Run the app

From this project directory, install the dependencies and start the dev
server:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other scripts

```bash
npm run build     # create a production build in dist/
npm run preview   # preview the production build locally
npm run lint      # check the code with ESLint
```

## Project structure

```text
react-facts/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Main.jsx
│   │   ├── Navbar.jsx
│   │   └── UnorderedList.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## How it works

- `index.html` contains the `#root` element and loads `src/main.jsx`.
- `main.jsx` renders the `App` component into `#root`.
- `App.jsx` composes the `Navbar` and `Main` components.
- `Navbar.jsx` renders the header with the React logo and the site name.
- `Main.jsx` renders the heading and the list of facts.
- `UnorderedList.jsx` renders the list itself.
- `index.css` holds the global base styles, such as the font and the reset.
- `App.css` holds the styles for the header, navbar, and main section.
- Components are written as functions and exported by name, then imported with
  curly braces, for example `import { Navbar } from './components/Navbar.jsx'`.

## Planned improvements

- Render the list from an array of facts with `map()`
- Pass the facts to the components as props
- Make the layout responsive

## Author

Created by Vivek.
