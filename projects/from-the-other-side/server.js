import http from 'node:http'
import path from 'node:path'
import { readFile } from 'node:fs/promises';
import { sendResponse } from './utils/sendResponse.js';
import { getContentType } from './utils/getContentType.js'

const PORT = 8000;



const server = http.createServer(async (req,res) =>{
    try{
        
        const __dir = import.meta.dirname;
        //will give the absolute path of directory containing server.js
        const urlObject = new URL(req.url, `http://${req.headers.host}`);
        // Parse the request URL so we can access its pathname separately
        const publicPath = path.join(__dir,'public');
        const requestedFile = urlObject.pathname === '/'?'index.html':urlObject.pathname.slice(1);
        //if pathname is / we return the index.html, else we slice the leading / of the path name
        const filePath = path.join(publicPath, requestedFile);

        const payload = await readFile(filePath);
        const extension = path.extname(requestedFile);
        const contentType = getContentType(extension);
        sendResponse(req, res,200,contentType,payload);
    }catch (error){
        console.log(error);
        sendResponse(req, res,500,'text/plain','Unable to load page');
    }
})

server.listen(PORT, () =>{
    console.log(`listening on Port${PORT}`);
})