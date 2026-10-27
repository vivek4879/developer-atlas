# Vinyl Store

Vinyl Store is an online store for classic vinyl records. It pairs an Express
API backed by SQLite with a static front end that lists albums and lets you
search them or filter by genre. It is part of
[Developer Atlas](../../README.md), my collection of projects from the Scrimba
Fullstack Developer Path.

## Current features

- Built with Node.js, Express, and SQLite
- Serves the front end from the `public/` folder
- Returns products and genres as JSON
- Filters products by genre
- Searches products by title, artist, or genre
- Uses parameterized SQL queries
- Seeds the database inside a transaction, with rollback on failure
- Uses ES modules

## Getting started

### Prerequisite

- [Node.js](https://nodejs.org/) installed on your computer

### Run the app

From this project directory, install the dependencies, create the database
table, seed it with the sample records, and start the server:

```bash
npm install
node createTable.js
node seedDb.js
npm start
```

The app will be available at `http://localhost:8000`.

`createTable.js` and `seedDb.js` only need to be run once. Running
`seedDb.js` again is safe, because it skips seeding when products already
exist. The `database.db` file is created in this folder and is ignored by Git.

## API endpoints

### Get all products

```http
GET /api/products
```

Example request:

```bash
curl http://localhost:8000/api/products
```

### Filter by genre

```http
GET /api/products?genre=rock
```

### Search products

Search matches part of the title, artist, or genre:

```http
GET /api/products?search=dogma
```

If both `genre` and `search` are provided, `genre` takes priority.

### Get all genres

```http
GET /api/products/genres
```

Returns an array of distinct genre names, for example
`["rock", "indie", "ambient", "folk", "punk"]`.

Successful requests return JSON. Unexpected failures return
`500 Internal Server Error` with a JSON error message.

## Project structure

```text
vinyl-store/
├── controllers/
│   └── productsControllers.js
├── db/
│   └── db.js
├── public/
│   ├── images/
│   ├── index.css
│   ├── index.html
│   └── index.js
├── routes/
│   └── products.js
├── createTable.js
├── data.js
├── package.json
├── README.md
├── seedDb.js
└── server.js
```

## How it works

- `db/db.js` exports `getDbConnection`, which opens `database.db` in the
  project folder, whatever directory the command is run from.
- `createTable.js` creates the `products` table.
- `seedDb.js` inserts the records from `data.js` in a single transaction and
  rolls back if any insert fails.
- `routes/products.js` maps the endpoints to the handlers in
  `controllers/productsControllers.js`.
- User input is only ever passed as query parameters, never joined into the
  SQL text, which protects against SQL injection.

## Planned improvements

- Combine the genre filter and search
- Handle failed API requests in the front end
- Escape product data before rendering it
- Add a cart
- Add automated API tests

## Author

Created by Vivek.
