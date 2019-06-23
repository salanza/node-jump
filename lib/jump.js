var JUMP_CONSTANTS = require('./constants/RouteConstants');

/**
 * Helper function to construct a get request
 *
 * @param {String} cityCode city's short form city code e.g. sf, dc, etc
 * @param {String} dataTarget data to be retrieved 
 * @returns a promise
 */
function makeGetRequest(cityCode, dataTarget) {
    let url = `https://${cityCode}.${JUMP_CONSTANTS.BASE_URL}${dataTarget}`;

    return fetch(url,
        {
            method: 'GET'
        })
}

exports.getFreebikes = async function (cityCode) {
    try {
        makeGetRequest(cityCode, JUMP_CONSTANTS.GET_AVAILABLE_BIKES).
            then((freeBikes) => {
                return await Promise.resolve(freeBikes);
            }).
            catch((err) => {
                console.log("Error occured whilst retrieving free bikes!\n", err);
                return await Promise.reject(err);
            })
    } catch (error) {
        console.log("Error occured whilst retrieving free bikes!\n", err);
        return await Promise.reject(err);
    }
}

exports.getStationData = async function () {

}

exports.getSystemDAta = async function () {

}
