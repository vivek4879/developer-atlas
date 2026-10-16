# From the Other Side

A platform for sharing ghostly encounters. A plain Node.js server (no framework) that serves a static front end, stores sightings in a JSON file, and streams live news over Server-Sent Events.

## Run it

```
npm install
npm start
```

The server listens on `http://localhost:8000`.

## Routes

| Method | Path | What it does |
|---|---|---|
| GET | `/api` | Returns all sightings from `data/data.json` |
| POST | `/api` | Parses, sanitizes, and saves a new sighting, then emits `ghost-sighted` |
| GET | `/api/news` | Opens an SSE stream that pushes a random headline every 3 seconds |
| GET | anything else not under `/api` | Served as a static file from `public/` |

## How it's put together

- `server.js`: routing.
- `handlers/routeHandlers.js`: `handleGet`, `handlePost`, `handleNews`.
- `utils/`: `parseBody` (collects request chunks and parses JSON), `sanitizeBody`, `getData`, `addSighting`, `serveStatic`, `sendResponse`, `paths`.
- `utils/alerts/sightingAlert.js`: an `EventEmitter`. `handlePost` emits `ghost-sighted` after a successful save, and `utils/createSightingAlert.js` listens and logs an alert.
- `data/stories.js`: the headlines used by the news stream.

### Live news (SSE)

`public/news.js` opens `new EventSource("/api/news")`. `handleNews` sends the `text/event-stream` headers, then writes `data: {...}\n\n` every 3 seconds with `setInterval`. Each connection has its own timer, and `req.on('close', ...)` clears it when the client disconnects, so timers don't leak.

## Follow-ups

### Serialize writes in `addSighting` with a promise queue

**Problem:** `utils/addSighting.js` does a read-modify-write on `data/data.json`. Two simultaneous POSTs can both read the old file, so one sighting is lost:

```
A: read [1,2]
B: read [1,2]
A: write [1,2,A]
B: write [1,2,B]   // A is lost
```

**Fix:** Chain each call onto the previous one so only one read-modify-write runs at a time. This needs no dependencies and works for a single-process server.

```js
let queue = Promise.resolve()

export function addSighting(body) {
    const task = queue.then(() => doAdd(body))
    queue = task.catch(() => {})   // keep the chain alive after a failure
    return task                    // caller still sees the error
}

async function doAdd(body) {
    const existingData = await getData()
    existingData.push(body)
    await fs.writeFile(pathJSON, JSON.stringify(existingData, null, 2), 'utf8')
}
```

**Notes:**
- `queue = task.catch(() => {})` stops one failed write from blocking every later call.
- Returning `task`, not `queue`, lets `handlePost` still catch the error and respond with a 400 or 500.
- A promise queue only protects within one process. If the app ever runs as multiple processes, use a file lock (e.g. `proper-lockfile`) or a real store like SQLite.

### Skipped for now

- **Input validation in `sanitizeBody`:** check the body is a plain object, whitelist `location`, `timeStamp`, `title`, `text`, require non-empty strings, use `allowedTags: []`, and generate a `uuid` on the server with `crypto.randomUUID()`. Currently `<b>` is allowed and new sightings have no `uuid`.
- **XSS in `public/index.js`:** cards are rendered with `innerHTML`. Build them with `textContent`, or escape the strings.
- **`serveStatic` hardening:** add a path traversal check (`filePath.startsWith(publicPath + path.sep)`) and use a fixed base URL, `new URL(req.url, 'http://localhost')`, instead of the `Host` header.
- **Small cleanups:** the `${error.code}` vs `${e.code}` in the `serveStatic` 404 fallback, and a failing alert listener returning a 500 even though the sighting was saved.
