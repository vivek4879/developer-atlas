# Digital Business Card

Digital Business Card is a profile card for a fictional news reporter, built as
a small React app. It shows a photo, name, job title, website, contact buttons,
short About and Interests sections, and a footer with social icons. It is part
of [Developer Atlas](../../README.md), my collection of projects from the
Scrimba Fullstack Developer Path.

## Current features

- Built with React and Vite
- Splits the card into reusable components (`Info`, `ContactButton`,
  `InfoSection`, `Footer`)
- Imports the profile photo from `src/assets`
- Uses icons from [React Icons](https://react-icons.github.io/react-icons/)
- Styled with plain CSS, using Flexbox for the layout
- Fixed-width card that shrinks on very narrow screens
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
digital-business-card/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── tintin.png
│   ├── components/
│   │   ├── ContactButton.jsx
│   │   ├── Footer.jsx
│   │   ├── Info.jsx
│   │   └── InfoSection.jsx
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

- `main.jsx` renders the `App` component into the `#root` element.
- `App.jsx` renders the photo and composes the components inside the card.
- `Info.jsx` renders the name, job title, and website.
- `ContactButton.jsx` renders the Email and LinkedIn buttons with icons.
- `InfoSection.jsx` renders the About and Interests sections.
- `Footer.jsx` renders the row of social icons.
- `App.css` holds all of the card styles. The page is centered with Flexbox,
  and the card has rounded corners with `overflow: hidden` so the photo is
  clipped to them.
- Icons are imported from `react-icons/fa` and used as components, for example
  `<FaGithubSquare />`.

## Planned improvements

- Move the card content into data and pass it to the components as props
- Turn the contact buttons into real `mailto:` and profile links
- Link the footer icons to social profiles
- Compress the profile photo
- Make the layout more responsive

## Author

Created by Vivek.
