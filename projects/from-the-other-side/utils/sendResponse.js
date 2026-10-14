export function sendResponse(req,res,statusCode, contentType,payload){
    res.statusCode = statusCode;
    res.setHeader('content-type', contentType);
    res.end(payload);
}