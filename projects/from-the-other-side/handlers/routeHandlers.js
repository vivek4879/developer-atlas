import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseBody } from '../utils/parseBody.js'
import { addSighting } from '../utils/addSighting.js'
import { sanitizeBody } from '../utils/sanitizeBody.js'
import { eventEmitter } from '../utils/alerts/sightingAlert.js'
import { stories } from '../data/stories.js'

export async function handleGet(req, res){
    try{
        const data = await getData();
        const payload = JSON.stringify(data);
        sendResponse(req , res,200,'application/json', payload);
    }catch(e){
        sendResponse(req,res,500,'application/json',JSON.stringify({ error: e.message }))
    }
}

export async function handlePost(req,res){
    let cleanedData;
    try{
        const parsedData = await parseBody(req);
        cleanedData = sanitizeBody(parsedData);
    }catch(e){
        return sendResponse(req,res,400,'application/json',JSON.stringify({error: e.message}))
    }
    try{
        await addSighting(cleanedData);
        eventEmitter.emit('ghost-sighted',cleanedData);
        sendResponse(req,res, 201, 'application/json', JSON.stringify(cleanedData))
    }catch(e){
        return sendResponse(req,res,500,'application/json',JSON.stringify({error:e.message}))
    }
}

export async function handleNews(req, res){
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })

    const timer = setInterval(() => {
        let randomIndex = Math.floor(Math.random() * stories.length)
        const payload = {event: 'news-update', story:stories[randomIndex]}
        res.write(`data: ${JSON.stringify(payload)}\n\n`);
    },3000)
    req.on('close', () => clearInterval(timer))
}