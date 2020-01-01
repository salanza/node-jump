const JUMP_CONSTANTS = require('../constants/RouteConstants');

var commonUtil = require('./common');

/**
 * Creates a Get request for retrieving a city's
 * scooter GBFS
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getScooterFileDirectory = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `s/${JUMP_CONSTANTS.GET_GBFS}`);
}

/**
 * Creates a Get request for retrieving a city's 
 * available scooters
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getFreeScooters = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `s/${JUMP_CONSTANTS.GET_AVAILABLE_BIKES}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * System alerts for scooters
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getScooterSystemAlerts = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `s/${JUMP_CONSTANTS.GET_SYS_ALERTS}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * Station status for scooters
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getScooterStationStatus = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `s/${JUMP_CONSTANTS.GET_STATION_STATUS}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * Station info for scooters
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getScooterStationInfo = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `s/${JUMP_CONSTANTS.GET_STATION_INFO}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * System info for scooters
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getScooterSystemInfo = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `s/${JUMP_CONSTANTS.GET_SYS_INFO}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * System region info for scooters
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getScooterSystemRegions = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `s/${JUMP_CONSTANTS.GET_SYS_REGIONS}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * System calendar info for scooters
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getScooterSystemInfo = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `s/${JUMP_CONSTANTS.GET_SYS_CALENDAR}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * pricing info for scooters
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getScooterPricing = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `s/${JUMP_CONSTANTS.GET_SYS_PRICING}`
        )
}

/**
 * Creates a Get request for retrieving a city's 
 * System hours for scooters
 * 
 * @param {String} cityCode city code used by Jump API's
 * @returns a promise
 */
exports.getScooterSystemHours = function(cityCode)
{
    return commonUtil.makeGetRequest(
        cityCode, 
        `s/${JUMP_CONSTANTS.GET_SYS_HOURS}`
        )
}