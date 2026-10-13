export function validateQueryParams(queries){
    const SUPPORTED_QUERY_PARAMS = new Set([
        'country',
        'continent',
        'is_open_to_public'
      ])
    const unsupportedParams = [];
    const emptyParams = [];
    const invalidValues = []

    for(const [key,value] of queries){
        if(!SUPPORTED_QUERY_PARAMS.has(key)){
            unsupportedParams.push(key)
        }
        if(value.trim() === ''){
            emptyParams.push(key)
        }
        else if(
            key == 'is_open_to_public' && 
            !['true', 'false'].includes(value.toLowerCase())
        ){
            invalidValues.push({
                key,
                value,
                expected: 'true or false'
            })
        }
    }
    return {
        isValid:
            unsupportedParams.length ===0 &&
            emptyParams.length === 0 &&
            invalidValues.length === 0,
        unsupportedParams,
        emptyParams,
        invalidValues
    }
}