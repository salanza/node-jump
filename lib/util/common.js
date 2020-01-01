const { BASE_URL } = require('../constants/RouteConstants');

var axios = require('axios')

/**
 * Helper function to construct a get request
 *
 * @param {String} cityCode city's short form city code e.g. sf, dc, etc
 * @param {String} dataTarget data to be retrieved 
 * @returns a promise
 */
exports.makeGetRequest = function(cityCode, dataTarget) {
    let url = `https://${BASE_URL}/v1/${cityCode}${dataTarget}`;

    return axios(url,
        {
            method: 'GET'
        })
}