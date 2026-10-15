import sanitizeHtml from 'sanitize-html';
export function sanitizeBody(parsedBody){
    const sanitizeOptions = {
        allowedTags: [ 'b'],
        allowedAttributes: {}
    }
    
    const cleanedData = {}

    for(const [key,value] of Object.entries(parsedBody)){
        if(typeof value === 'string'){
            cleanedData[key] = sanitizeHtml(value,sanitizeOptions);
        }
        else{
            cleanedData[key] = value; 
        }
    }
    return cleanedData;
}





