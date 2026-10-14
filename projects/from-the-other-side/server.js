import http from 'node:http'
import path from 'node:path'
import { readFile } from 'node:fs/promises';
import { sendResponse } from './utils/sendResponse.js';
import { getContentType } from './utils/getContentType.js'

const PORT = 8000;

const __dir = import.meta.dirname;
//will give the absolute path of directory containing server.js

const publicPath = path.join(__dir,'public');

const server = http.createServer(async (req,res) =>{
    try{
        const urlObject = new URL(req.url, `http://${req.headers.host}`);
        // Parse the request URL so we can access its pathname separately
        const requestedFile = urlObject.pathname === '/'?'index.html':urlObject.pathname.slice(1);
        //if pathname is / we return the index.html, else we slice the leading / of the path name
        const filePath = path.join(publicPath, requestedFile);
        const payload = await readFile(filePath);
        const extension = path.extname(requestedFile);
        const contentType = getContentType(extension);
        sendResponse(req, res,200,contentType,payload);
    }catch (error){
        if(error.code === 'ENOENT'){
            const payload = await readFile(path.join(publicPath,'404.html'));
            return sendResponse(req, res,404,'text/html',payload);
        }
        return sendResponse(req, res,500,'text/html',`<html><h1>Server Error: ${error.code}</h1></html>`);
    }
})

server.listen(PORT, () =>{
    console.log(`listening on Port${PORT}`);
})