
export  function sendJSONResponse(res,statusCode,header,payload){
    res.statusCode = statusCode;
    res.setHeader('Content-type', header);
    res.end(JSON.stringify(payload))
}