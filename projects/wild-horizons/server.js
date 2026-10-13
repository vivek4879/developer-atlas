import http from 'node:http'
import { getDataFromDB } from './database/db.js'

const PORT = 8000
const server = http.createServer(async (req,res) => {
    const destinations = await getDataFromDB()
    if(req.method === 'GET' && req.url == '/api'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(destinations))
    }
    else{
        res.statusCode = 404
        res.setHeader('Content-type', 'application/json')
        const error = {
            error: "not found",
            message: "the requested route does not exist"
        }
        res.end(JSON.stringify(error))
    }
    
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));