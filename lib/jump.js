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

/**
 * Retrieves all avaiable bikes within a given city
 *
 * @param {String} cityCode city code used by Jump APIs
 * @returns a promise
 */
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

/**
 * Retrieves all alerts within a given city
 *
 * @param {String} cityCode city code used by Jump APIs
 * @returns a promise
 */
exports.getSystemAlerts = async function (cityCode) {
    try {
        return await makeGetRequest(cityCode, GET_SYS_ALERTS).
            then((resp) => {
                return Promise.resolve(resp.data.data);
            }).
            catch((error) => {
                console.log("Error occured whilst retrieving Alerts!\n", error);
                return Promise.reject(err);
            })
    } catch (error) {
        console.log("Error occured whilst retrieving Alerts!\n", error);
        return await Promise.reject(err);
    }
}

/**
 * Retrieve stations data for a given city.
 * Combines results from stations status and station info
 * 
 * @param {String} cityCode city code used by Jump APIs
 * @returns a promise
 */
exports.getStationData = async function (cityCode) {
    var result = new Promise((resolve, reject) => {
        async.parallel({
            status: (cb) => {
                makeGetRequest(cityCode, GET_STATION_STATUS).
                    then((resp) => {
                        cb(null, resp.data.data.stations);
                    }).catch((err) => {
                        cb(err, null);
                    })
            },
            info: (cb) => {
                makeGetRequest(cityCode, GET_STATION_INFO).
                    then((resp) => {
                        cb(null, resp.data.data.stations)
                    }).
                    catch((err) => {
                        cb(err, null);
                    })
            }
        }, (err, res) => {
            if (err) {
                console.log("Error occured during getStationData():\n",err)
                reject(err);
            }
            else {
                const stationIDkey = 'station_id';
                var resArr = _.values(
                    _.merge(_.keyBy(res.status,stationIDkey),_.keyBy(res.info,stationIDkey))
                    )
                resolve(resArr);
            }
        })
    })
    return result;
}

/**
 * Retrieves system data for a given city.
 * Combines results from system information, system regions 
 * and system calender
 *
 * @param {String} cityCode city code used by Jump API
 * @returns a promise
 */
exports.getSystemData = async function (cityCode) {
    var result = new Promise((resolve, reject) => {
        async.parallel({
            info: (cb) => {
                makeGetRequest(cityCode, GET_SYS_INFO).
                    then((resp) => {
                        cb(null, resp.data.data);
                    }).catch((err) => {
                        cb(err, null);
                    })
            },
            regions: (cb) => {
                makeGetRequest(cityCode, GET_SYS_REGIONS).
                    then((resp) => {
                        cb(null, resp.data.data.regions);
                    }).
                    catch((err) => {
                        cb(err, null);
                    })
            },
            calenders: (cb) => {
                makeGetRequest(cityCode, GET_SYS_CALENDAR).
                then((resp) => {
                    cb(null, resp.data.data.calendars);
                }).
                catch((err) => {
                    cb(err, null);
                })
            }
        }, (err, res) => {
            if (err) {
                console.log("Error occured during getSystemData():\n",err)
                reject(err);
            }
            else {
                resolve({
                    Info: res.info,
                    Regions: res.regions,
                    Calenders: res.calenders
                });
            }
        })
    })
    return result;
}

/**
 * Retrieves payment plan and rental configuration
 * for a given city.
 * Combines results from system hours and payment plan
 *
 * @param {String} cityCode city code used by Jump API
 * @returns a promise
 */
exports.getPaymentPlan = async function (cityCode) {
    var result = new Promise((resolve, reject) => {
        async.parallel({
            pricing: (cb) => {
                makeGetRequest(cityCode, GET_SYS_PRICING).
                    then((resp) => {
                        cb(null, resp.data.data.plans);
                    }).catch((err) => {
                        cb(err, null);
                    })
            },
            hours: (cb) => {
                makeGetRequest(cityCode, GET_SYS_HOURS).
                    then((resp) => {
                        cb(null, resp.data.data.rental_hours)
                    }).
                    catch((err) => {
                        cb(err, null);
                    })
            }
        }, (err, res) => {
            if (err) {
                console.log("Error occured during getPaymentPlan():\n",err)
                reject(err);
            }
            else {
                resolve({
                    Pricing: res.pricing,
                    Hours: res.hours
                });
            }
        })
    })
    return result;
}
