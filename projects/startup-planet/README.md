# Startup Planet API

Startup Planet is an Express API containing information about promising
startups from around the world. It is part of
[Developer Atlas](../../README.md), my collection of projects from the Scrimba
Fullstack Developer Path.

## Current features

- Built with Node.js and Express
- Returns startup data as JSON
- Filters startups using query parameters
- Filters startups by country, continent, or industry using path parameters
- Supports filtering by funding status and MVP availability
- Returns JSON error responses
- Uses ES modules

## Getting started

### Prerequisite

- [Node.js](https://nodejs.org/) installed on your computer

### Run the API

From this project directory, install the dependencies and start the server:

```bash
npm install
npm start
```

The server will start at `http://localhost:8000`.

## API endpoints

### Get all startups

```http
GET /api
```

Example request:

```bash
curl http://localhost:8000/api
```

### Filter with query parameters

Filter startups using `industry`, `country`, `continent`,
`is_seeking_funding`, and `has_mvp`:

```http
GET /api?industry=FinTech
GET /api?country=India
GET /api?continent=Europe&has_mvp=true
GET /api?is_seeking_funding=true
```

Example request:

```bash
curl "http://localhost:8000/api?continent=Europe&has_mvp=true"
```

Multiple query parameters are combined, so a startup must match every
provided value. Text matching is case-insensitive. The
`is_seeking_funding` and `has_mvp` parameters use `true` or `false`.

### Filter by category

Use `country`, `continent`, or `industry` as the category:

```http
GET /api/country/India
GET /api/continent/Africa
GET /api/industry/Healthcare
```

Values containing spaces must be URL encoded:

```bash
curl http://localhost:8000/api/industry/Renewable%20Energy
```

Successful requests return a JSON array. An unsupported path category returns
`400 Bad Request`, an unknown route returns `404 Not Found`, and unexpected
failures return `500 Internal Server Error`.

## Project structure

```text
startup_planet/
├── data/
│   └── data.js
├── handlers/
│   ├── getAllData.js
│   └── getDataByParams.js
├── routes/
│   └── apiRouter.js
├── package.json
├── README.md
└── server.js
```

## Planned improvements

- Validate Boolean query parameter values
- Add automated API tests

## Author

Created by Vivek.
