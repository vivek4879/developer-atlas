# From the Other Side

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
