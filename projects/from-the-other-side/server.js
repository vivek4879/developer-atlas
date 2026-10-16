import http from 'node:http'
import path from 'node:path'
import { serveStatic } from './utils/serveStatic.js';
import { handleGet, handlePost, handleNews } from './handlers/routeHandlers.js'
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
            return sendResponse(req,res,405,'Application/json',JSON.stringify({ error: 'Method not allowed' }))
        }
    }
    else if(!req.url.startsWith('/api')){
        return await serveStatic(req, res, publicPath)
    }
    else if(req.url === '/api/news') {
        return await handleNews(req,res);
    }
    else{
        sendResponse(req,res,404,'Application/json',JSON.stringify({ error: 'This route does not exist' }))
    }
})

server.listen(PORT, () =>{
    console.log(`listening on Port${PORT}`);
})