const async = require('async');
const _ = require('lodash');
// const JUMP_CONSTANTS = require('./constants/RouteConstants');
const BASE_URL = 'jumpbikes.com/opendata'
const GET_GBFS = '/gbfs.json';
const GET_SYS_INFO = '/system_information.json';
const GET_STATION_INFO = '/station_information.json';
const GET_STATION_STATUS = '/station_status.json';
const GET_AVAILABLE_BIKES = '/free_bike_status.json';
const GET_SYS_HOURS = '/system_hours.json';
const GET_SYS_CALENDAR = '/system_calendar.json';
const GET_SYS_REGIONS = '/system_regions.json';
const GET_SYS_PRICING = '/system_pricing_plans.json';
const GET_SYS_ALERTS = '/system_alerts.json';

var axios = require('axios')

/**
 * Helper function to construct a get request
 *
 * @param {String} cityCode city's short form city code e.g. sf, dc, etc
 * @param {String} dataTarget data to be retrieved 
 * @returns a promise
 */
function makeGetRequest(cityCode, dataTarget) {
    let url = `https://${cityCode}.${BASE_URL}${dataTarget}`;

    return axios(url,
        {
            method: 'GET'
        })
}

exports.getFreebikes = async function (cityCode) {
    try {
        return await makeGetRequest(cityCode, GET_AVAILABLE_BIKES).
            then((freeBikes) => {
                // console.log("freeBikes:\n",freeBikes.data.data)
                return Promise.resolve(freeBikes.data.data);
            }).
            catch((error) => {
                console.log("Error occured whilst retrieving free bikes!\n", error);
                return Promise.reject(err);
            })
    } catch (error) {
        console.log("Error occured whilst retrieving free bikes!\n", error);
        return await Promise.reject(err);
    }
}

exports.getStationData = async function (cityCode) {
    var result = new Promise((resolve, reject) => {
        async.parallel({
            status: (cb) => {
                makeGetRequest(cityCode, GET_STATION_STATUS).
                    then((resp) => {
                        // console.log("station status resp:\n",resp)
                        cb(null, resp.data.data.stations);
                    }).catch((err) => {
                        console.log("Error getting station status!")
                        cb(err, null);
                    })
            },
            info: (cb) => {
                makeGetRequest(cityCode, GET_STATION_INFO).
                    then((resp) => {
                        // console.log("station info resp:\n",resp)
                        cb(null, resp.data.data.stations)
                    }).
                    catch((err) => {
                        console.log("Error getting station data!")
                        cb(err, null);
                    })
            }
        }, (err, res) => {
            if (err) {
                console.log("Reject async! err:\n",err)
                reject(err);
            }
            else {
                // console.log("station status:\n", res.status);
                // console.log("station info:\n", res.info);
                var resArr =_.unionBy(res.status, res.info, 'station_id');
                console.log("unionedArray:\n",resArr)
                resolve(resArr);
            }
        })
    })
    return result;
}

exports.getSystemData = async function () {

}
