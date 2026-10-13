import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { getFilteredData } from './utils/getFilteredData.js'
import { getQueryFilteredData } from './utils/getQueryFilteredData.js'
import { validateQueryParams } from './utils/validateQueryParams.js'

const PORT = 8000

const server = http.createServer(async (req,res) => {
    try{
        const destinations = await getDataFromDB()
        console.log({
            method: req.method,
            url: req.url,
            headers: req.headers
          })
        const urlObject = new URL(req.url,`http://${req.headers.host}`);
        const queries = urlObject.searchParams;
        
        if(req.method === 'GET' && urlObject.pathname === '/api' && queries.size !== 0){
            const validations = validateQueryParams(queries)
            if(!validations.isValid){
                const error = {
                    error: 'invalid query parameters',
                    unsupportedParams: validations.unsupportedParams,
                    emptyParams: validations.emptyParams,
                    invalidValues: validations.invalidValues
                }
                return sendJSONResponse(res,400,'application/json',error);
            }
            const filteredData = getQueryFilteredData(destinations,queries) 
    
            if (filteredData.length === 0) {
                return sendJSONResponse(res, 404, 'application/json', {
                  error: 'not found',
                  message: 'No destinations matched those filters'
                })
              }
            return sendJSONResponse(res,200,'application/json',filteredData);
        }
        else if(req.method === 'GET' && req.url === '/api'){
            sendJSONResponse(res,200,'application/json',destinations);
        }
        else if(req.method === 'GET' &&( req.url.startsWith('/api/country/') || req.url.startsWith('/api/continent/'))){
            const pathParts = urlObject.pathname.split('/')
            const pathValue = decodeURIComponent(pathParts[3] ?? '').trim()
            if (pathParts.length !== 4 || pathValue === '') {
              return sendJSONResponse(res, 400, 'application/json', {
                error: 'invalid path',
                message: 'A country or continent value is required'
              })
            }        
            const filteredData = getFilteredData(urlObject.pathname,destinations)
            if (filteredData.length === 0) {
                return sendJSONResponse(res, 404, 'application/json', {
                  error: 'not found',
                  message: 'No destinations matched that country or continent'
                })
              }
            return sendJSONResponse(res,200,'application/json',filteredData);
        }
        else{
            const error = {
                error: "not found",
                message: "the requested route does not exist"
            }
            sendJSONResponse(res,404,'application/json',error);
        }
    }catch (error){
        console.log('Request failed:', error);

        if(res.headersSent){
            res.destroy()
            return;
        }
        return sendJSONResponse(res, 500, 'application/json',{
            error: 'internal server  error',
            message:'Something went wrong'
        })
    }
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));