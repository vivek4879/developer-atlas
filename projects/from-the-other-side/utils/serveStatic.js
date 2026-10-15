import path from 'node:path'
import fs from 'node:fs/promises'
import { getContentType } from './getContentType.js'
import { sendResponse } from './sendResponse.js'

export async function serveStatic(req,res,publicPath){
    const urlObject = new URL(req.url, `http://${req.headers.host}`);
    // Parse the request URL so we can access its pathname separately
    const requestedFile = urlObject.pathname === '/'?'index.html':urlObject.pathname.slice(1);
    //if pathname is / we return the index.html, else we slice the leading / of the path name
    const filePath = path.join(publicPath, requestedFile);
    const extension = path.extname(requestedFile);
    const contentType = getContentType(extension);
    try{
        const payload = await fs.readFile(filePath);
        return sendResponse(req, res,200,contentType,payload);
    }catch (error){
        if(error.code === 'ENOENT'){
            try{
                const payload = await fs.readFile(path.join(publicPath,'404.html'));
                return sendResponse(req, res,404,'text/html',payload);
            }catch(e){
                return sendResponse(req, res,500,'text/html',`<html><h1>Server Error: ${e.code}</h1></html>`);
            }
        }
        return sendResponse(req, res,500,'text/html',`<html><h1>Server Error: ${error.code}</h1></html>`);
    }    
}