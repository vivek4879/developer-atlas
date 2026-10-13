export function getQueryFilteredData(destinations, queries){

    let filteredDestinations = destinations

    queries.forEach((value,key) =>{
        filteredDestinations = filteredDestinations.filter((current) =>{
            return String(current[key]).toLowerCase() == String(value).toLowerCase()
        })
    })
    return filteredDestinations;

}