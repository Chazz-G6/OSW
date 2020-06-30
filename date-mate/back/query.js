const axios = require('axios');

const API_ID = 'zvFOGHqu78kpDVWcKCtD';
const API_KEY = 'efCy5ruDbi';

getQueryResult = async (query) => {
    try {
        let search = await getSearchQuery(query);

        return search;
    } catch (e) {
        return e;
    }    
}

const getSearchQuery = (query) => {
    return new Promise((resolve, reject) => {        
        const api_url = 'https://openapi.naver.com/v1/search/local.json?query=' + encodeURI(query) + '&display=4';

        var request = require('request');
        var options = {
            url: api_url,
            headers: {'X-Naver-Client-Id':API_ID, 'X-Naver-Client-Secret': API_KEY}
         };
    
        request.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {            
                return resolve(body);
            }
            else {            
                return reject('Error: ' + body);
            }
        });
    });
}

module.exports = {
    getQueryResult    
}