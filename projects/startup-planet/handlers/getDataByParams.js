import {startups} from '../data/data.js';

export const getDataByParams = (req,res) =>{
    let filteredData = startups;

    const allowedCategories = ['country', 'continent' , 'industry']
    let {category, type} = req.params;

    if(!allowedCategories.includes(category)){
        return res.status(400).json({message: "Search field not allowed. Please use only country, continent, industry"});
    }
    else{
        filteredData = filteredData.filter(entry =>{
            return entry[category].toLowerCase() === type.toLowerCase()
        })
        res.json(filteredData);
    }
}

export default getDataByParams;