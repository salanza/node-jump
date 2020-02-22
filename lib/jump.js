const async = require('async');
const _ = require('lodash');
const JUMP_CONSTANTS = require('./constants/RouteConstants');
const COMMON_CONSTANTS = require('./constants/CommonConstants');

var commonUtil = require('./util/common');
var scooterUtil = require('./util/scooter');
var bikeUtil = require('./util/bike');

/**
 * Retrieves a city's GBFS. By default, it will return 
 * data for scooters and bikes
 *
 * @param {String} cityCode city code used by Jump APIs
 * @param {String} rideType type of ride, either scooter or bike
 * @returns a promise
 */
exports.getFileDirectory = async function (rideType, cityCode) {
    
    //By default, we will request data for both ride types
    var reqObj = {
        bikes: (cb) => {
            bikeUtil.getBikeFileDirectory(cityCode).
                then((resp) => {
                    cb(null, resp.data.data);
                }).catch((err) => {
                    cb(err, null);
                })           
            },
        scooters: (cb) => {
            scooterUtil.getScooterFileDirectory(cityCode).
                then((resp) => {
                    cb(null, resp.data.data);
                }).catch((err) => {
                    cb(err, null);
                })  
            }
        };
    
    //if option specified, remove the unwanted
    //ride
    switch (rideType) {
        case COMMON_CONSTANTS.SCOOTER_OPT:
            delete reqObj.bikes;
            break;
        case COMMON_CONSTANTS.BIKE_OPT:
            delete reqObj.scooters;
            break;
        default:
            break;
    };

    //executes async function(s)
    return new Promise((resolve, reject) => {
        async.parallel(reqObj,
            (err, res) => {
                if(err) {
                    console.log("Error occured whilst retrieving GBFS!\n", err)
                    reject(err);
                }
                else {
                    resolve({
                        bikes: res.bikes,
                        scooters: res.scooters
                    })
                }
            });
    });
}

/**
 * Retrieves all avaiable bikes and scooters within a given city
 *
 * @param {String} cityCode city code used by Jump APIs
 * @param {String} rideType type of ride, either scooter or bike
 * @returns a promise
 */
exports.getFreeBikes = async function (rideType, cityCode) {

    //By default, we will request data for both ride types
    var reqObj = {
        bikes: (cb) => {
            bikeUtil.getFreeBikes(cityCode).
                then((resp) => {
                    cb(null, resp.data.data.bikes);
                }).catch((err) => {
                    cb(err, null);
                })           
            },
        scooters: (cb) => {
            scooterUtil.getFreeScooters(cityCode).
                then((resp) => {
                    cb(null, resp.data.data.bikes);
                }).catch((err) => {
                    cb(err, null);
                })  
            }
        };
    
    //if option specified, remove the unwanted
    //ride
    switch (rideType) {
        case COMMON_CONSTANTS.SCOOTER_OPT:
            delete reqObj.bikes;
            break;
        case COMMON_CONSTANTS.BIKE_OPT:
            delete reqObj.scooters;
            break;
        default:
            break;
    };

    //executes async function(s)
    return new Promise((resolve, reject) => {
        async.parallel(reqObj,
            (err, res) => {
                if(err) {
                    console.log("Error occured whilst retrieving free bikes!\n", err)
                    reject(err);
                }
                else {
                    resolve({
                        bikes: res.bikes,
                        scooters: res.scooters
                    })
                }
            });
    });
}

/**
 * Retrieves all alerts within a given city
 *
 * @param {String} cityCode city code used by Jump APIs
 * @param {String} rideType type of ride, either scooter or bike
 * @returns a promise
 */
exports.getSystemAlerts = async function (rideType, cityCode) {

    //By default, we will request data for both ride types
    var reqObj = {
        bikes: (cb) => {
            bikeUtil.getBikeSystemAlerts(cityCode).
                then((resp) => {
                    cb(null, resp.data.data);
                }).catch((err) => {
                    cb(err, null);
                })           
            },
        scooters: (cb) => {
            scooterUtil.getScooterSystemAlerts(cityCode).
                then((resp) => {
                    cb(null, resp.data.data);
                }).catch((err) => {
                    cb(err, null);
                })  
            }
        };
    
    //if option specified, remove the unwanted
    //ride
    switch (rideType) {
        case COMMON_CONSTANTS.SCOOTER_OPT:
            delete reqObj.bikes;
            break;
        case COMMON_CONSTANTS.BIKE_OPT:
            delete reqObj.scooters;
            break;
        default:
            break;
    };

    //executes async function(s)
    return new Promise((resolve, reject) => {
        async.parallel(reqObj,
            (err, res) => {
                if(err) {
                    console.log("Error occured whilst retrieving Alerts!\n", err)
                    reject(err);
                }
                else {
                    resolve({
                        bikes: res.bikes,
                        scooters: res.scooters
                    })
                }
            });
    });
}

/**
 * Retrieve stations data for a given city.
 * Combines results from stations status and station info
 * 
 * @param {String} cityCode city code used by Jump APIs
 * @param {String} rideType type of ride, either scooter or bike
 * @returns a promise
 */
exports.getStationData = async function (rideType, cityCode) {

    //By default, we will request data for both ride types
    var reqObj = {
        bikes: (cb) => {
            async.parallel({
                status: (cb) => {
                    bikeUtil.getBikeStationStatus(cityCode).
                        then((resp) => {
                            cb(null, resp.data.data.stations);
                        }).catch((err) => {
                            cb(err, null);
                        })
                },
                info: (cb) => {
                    bikeUtil.getBikeStationInfo(cityCode).
                        then((resp) => {
                            cb(null, resp.data.data.stations)
                        }).
                        catch((err) => {
                            cb(err, null);
                        })
                }
            }, cb)
        },
        scooters: (cb) => {
            async.parallel({
                status: (cb) => {
                    scooterUtil.getScooterStationStatus(cityCode).
                        then((resp) => {
                            cb(null, resp.data.data.stations);
                        }).catch((err) => {
                            cb(err, null);
                        })
                },
                info: (cb) => {
                    scooterUtil.getScooterStationInfo(cityCode).
                        then((resp) => {
                            cb(null, resp.data.data.stations)
                        }).
                        catch((err) => {
                            cb(err, null);
                        })
                }
            }, cb)
        }
    };
    
    //if option specified, remove the unwanted
    //ride
    switch (rideType) {
        case COMMON_CONSTANTS.SCOOTER_OPT:
            delete reqObj.bikes;
            break;
        case COMMON_CONSTANTS.BIKE_OPT:
            delete reqObj.scooters;
            break;
        default:
            break;
    };

    //executes async function(s)
    //!!Will need to figure out how to make the 
    //sort and merge modular!!
    return new Promise((resolve, reject) => {
        async.parallel(reqObj,
            (err, res) => {
                if(err) {
                    console.log("Error occured whilst retrieving station data!\n", err)
                    reject(err);
                }
                else {
                    //merge station info and status together
                    const stationIDkey = 'station_id';
                    var resObj = {};

                    _.forEach(res, function(value, key) {
                        resObj[key] = _.values(
                                _.merge(
                                    _.keyBy(value.status,stationIDkey),
                                    _.keyBy(value.info,stationIDkey)
                                    )
                                );
                    });
                    
                    resolve(resObj);
                }
            });
    });
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
                commonUtil.makeGetRequest(cityCode, JUMP_CONSTANTS.GET_SYS_INFO).
                    then((resp) => {
                        cb(null, resp.data.data);
                    }).catch((err) => {
                        cb(err, null);
                    })
            },
            regions: (cb) => {
                commonUtil.makeGetRequest(cityCode, JUMP_CONSTANTS.GET_SYS_REGIONS).
                    then((resp) => {
                        cb(null, resp.data.data.regions);
                    }).
                    catch((err) => {
                        cb(err, null);
                    })
            },
            calenders: (cb) => {
                commonUtil.makeGetRequest(cityCode, JUMP_CONSTANTS.GET_SYS_CALENDAR).
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
                commonUtil.makeGetRequest(cityCode, JUMP_CONSTANTS.GET_SYS_PRICING).
                    then((resp) => {
                        cb(null, resp.data.data.plans);
                    }).catch((err) => {
                        cb(err, null);
                    })
            },
            hours: (cb) => {
                commonUtil.makeGetRequest(cityCode, JUMP_CONSTANTS.GET_SYS_HOURS).
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