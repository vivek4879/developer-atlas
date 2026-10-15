import { getData } from "./getData.js";
import fs from 'node:fs/promises'
import { pathJSON } from './paths.js'


export async function addSighting(body){

    try{
        const existingData = await getData();
        existingData.push(body);
        const dataToWrite = JSON.stringify(existingData,null,2);
        await fs.writeFile(pathJSON,dataToWrite, 'utf8');
    }catch(e){
        throw new Error(`Error writing file:${e}`);
    }
}