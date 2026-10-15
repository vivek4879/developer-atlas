import fs from 'node:fs/promises'
import { pathJSON } from './paths.js'
export async function getData(){
    try{
        const rawData = await fs.readFile(pathJSON, 'utf-8');
        const parsedData = JSON.parse(rawData);
        return parsedData;
    }catch(error){
        if(error.code === 'ENOENT')return [];
        throw error
    }
}