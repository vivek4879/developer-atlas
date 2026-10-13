# Wild Horizons API

Wild Horizons is a vanilla Node.js API containing information about unusual
and interesting destinations around the world. It is part of
[Developer Atlas](../../README.md), my collection of projects from the Scrimba
Fullstack Developer Path.

## Current features

- Built with Node.js and its native HTTP module
- Returns destination data as JSON
- Filters destinations using query parameters
- Filters destinations by country or continent using path parameters
- Validates query parameters and path values
- Returns JSON error responses with appropriate status codes
- Uses ES modules

## Getting started

### Prerequisite

- [Node.js](https://nodejs.org/) installed on your computer

### Run the API

From this project directory, run:

```bash
npm start
```

The server will start at `http://localhost:8000`.

## API endpoints

### Get all destinations

```http
GET /api
```

Example request:

```bash
curl http://localhost:8000/api
```

### Filter with query parameters

Filter destinations using the supported `country`, `continent`, and
`is_open_to_public` parameters:

```http
GET /api?continent=Asia
GET /api?country=New%20Zealand
GET /api?continent=Asia&is_open_to_public=true
```

Example request:

```bash
curl "http://localhost:8000/api?continent=Asia&is_open_to_public=true"
```

Multiple query parameters are combined, so a destination must match every
provided value. Matching is case-insensitive. The `is_open_to_public`
parameter accepts only `true` or `false`.

### Filter by country

```http
GET /api/country/Mauritius
```

Example request:

```bash
curl http://localhost:8000/api/country/Mauritius
```

### Filter by continent

```http
GET /api/continent/Africa
```

Example request:

```bash
curl http://localhost:8000/api/continent/Africa
```

Successful requests return a JSON array. The API returns `400 Bad Request` for
unsupported or empty parameters and invalid path values, `404 Not Found` when
no destinations match or a route does not exist, and `500 Internal Server
Error` for unexpected failures. Error responses are returned as JSON.

## Project structure

```text
wild-horizons/
├── data/
│   └── data.js
├── database/
│   └── db.js
├── utils/
│   ├── getFilteredData.js
│   ├── getQueryFilteredData.js
│   ├── sendJSONResponse.js
│   └── validateQueryParams.js
├── package.json
├── README.md
└── server.js
```

## Planned improvements

- Add automated API tests in a future update

## Author

Created by Vivek.
