export async function parseBody(req){
    const chunks = [];
    //in node's http module, the request is a readable stream. The body
    //arrives in chunks, so you collect the chunks and parse them once the stream ends.

    for await (const chunk of req){
        chunks.push(chunk);
    }
    //each chunk is a buffer and to make sure it works correctly for multi byte chars like emoji
    // we first push it to an array, the nconvert to string then parse as JSON 
    //then return
    const raw = Buffer.concat(chunks).toString('utf8')

    try{
        return JSON.parse(raw)
    }catch{
        throw new Error('Invalid JSON');
    }
    
}