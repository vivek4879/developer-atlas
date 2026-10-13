export function getFilteredData(url,destinations){
    const urlSplit = url.split('/');
    const superLocation = urlSplit.at(-2);
    const location = decodeURIComponent(urlSplit.at(-1)).trim()

    return destinations.filter( current =>{
        const propertyValue = current[superLocation] 
        return  propertyValue != null && current[superLocation].toLowerCase() === location.toLowerCase()
    })

}