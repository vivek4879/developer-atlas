import http from 'node:http'
import path from 'node:path'
import { serveStatic } from './utils/serveStatic.js';
import { handleGet, handlePost } from './handlers/routeHandlers.js'
import { sendResponse } from './utils/sendResponse.js';

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
        else{
            return sendResponse(req,res,405,'Applicatin/json',JSON.stringify({ error: 'This route does not exist' }))
        }
    }
    else if(!req.url.startsWith('/api')){
        return await serveStatic(req, res, publicPath)
    }
    else{
        sendResponse(req,res,404,'Application/json',JSON.stringify({ error: 'This route does not exist' }))
    }
})

server.listen(PORT, () =>{
    console.log(`listening on Port${PORT}`);
})