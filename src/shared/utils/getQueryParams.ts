import * as querystring from 'querystring'


const url = window.location.href

const queryParams = querystring.parse(url.split('?')[1])

console.log(queryParams) // {param1: "value1", param2: "value2"}
