import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'

export async function handleGet(req, res){
    const data = await getData();
    const payload = JSON.stringify(data);
    sendResponse(req , res,200,'application/json', payload);
}