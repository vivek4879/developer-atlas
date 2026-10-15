import http from 'node:http'
import path from 'node:path'
import { serveStatic } from './utils/serveStatic.js';
import { handleGet } from './handlers/routeHandlers.js'

const PORT = 8000;

const __dir = import.meta.dirname;
//will give the absolute path of directory containing server.js

const publicPath = path.join(__dir,'public');

const server = http.createServer(async (req,res) =>{
    if(req.url === '/api'){
        if(req.method ==='GET'){
            return await handleGet(req, res);
        }
        else if(req.method ==='POST'){
            return await handlePost(req, res);
        }
    }
    else if(!req.url.startsWith('/api')){
        console.log(req.url)
        return await serveStatic(req, res, publicPath)
    }
})

server.listen(PORT, () =>{
    console.log(`listening on Port${PORT}`);
})