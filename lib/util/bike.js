const JUMP_CONSTANTS = require('../constants/RouteConstants');

var commonUtil = require('./common');

/**
 * Creates a Get request for retrieving a city's
 * bike GBFS
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getBikeFileDirectory = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `b${JUMP_CONSTANTS.GET_GBFS}`);
}

/**
 * Creates a Get request for retrieving a city's 
 * available bikes
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getFreeBikes = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `b${JUMP_CONSTANTS.GET_AVAILABLE_BIKES}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * System alerts for bikes
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getBikeSystemAlerts = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `b${JUMP_CONSTANTS.GET_SYS_ALERTS}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * Station status for bikes
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getBikeStationStatus = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `b${JUMP_CONSTANTS.GET_STATION_STATUS}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * Station info for bikes
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getBikeStationInfo = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `b${JUMP_CONSTANTS.GET_STATION_INFO}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * System info for bikes
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getBikeSystemInfo = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `b${JUMP_CONSTANTS.GET_SYS_INFO}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * System region info for bikes
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getBikeSystemRegions = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `b${JUMP_CONSTANTS.GET_SYS_REGIONS}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * System calendar info for bikes
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getBikeSystemInfo = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `b${JUMP_CONSTANTS.GET_SYS_CALENDAR}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * pricing info for bikes
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getBikePricing = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `b${JUMP_CONSTANTS.GET_SYS_PRICING}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * System hours for bikes
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getBikeSystemHours = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `b${JUMP_CONSTANTS.GET_SYS_HOURS}`
        )
}