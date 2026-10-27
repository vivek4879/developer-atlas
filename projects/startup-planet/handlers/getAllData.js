
import {startups} from '../data/data.js';

export  const getAllDataHandler = (req,res) =>{
    console.log('server received', req.method, req.url);
    let filteredData  = startups;

    let {industry, country, continent,is_seeking_funding,has_mvp } = req.query;

    if(industry){
        filteredData = filteredData.filter(entry =>{
            return entry.industry.toLowerCase() === industry.toLowerCase();
        })
    }
    if(country){
        filteredData = filteredData.filter(entry =>{
            return entry.country.toLowerCase() === country.toLowerCase();
        })
    }
    if(continent){
        filteredData = filteredData.filter(entry =>{
            return entry.continent.toLowerCase() === continent.toLowerCase();
        })
    }
    if(is_seeking_funding){
        const fundingStatus = is_seeking_funding.toLowerCase() === 'true';
        filteredData = filteredData.filter(entry =>{
            return entry.is_seeking_funding === fundingStatus;
        })
    }
    if(has_mvp){
        const mvpStatus = has_mvp.toLowerCase() === 'true';
        filteredData = filteredData.filter(entry =>{
            return entry.has_mvp === mvpStatus;
        })
    }
    return res.json(filteredData)
}

export default getAllDataHandler;