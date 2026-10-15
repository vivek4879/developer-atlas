import fs from 'node:fs/promises'
import path from 'node:path'
export async function getData(){
    try{
        const pathJSON = path.join('data', 'data.json')
        const rawData = await fs.readFile(pathJSON, 'utf-8');
        const parsedData = JSON.parse(rawData);
        return parsedData;
    }catch(error){
        console.log(error);
        return [];
    }
}