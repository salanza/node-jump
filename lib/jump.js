const async = require('async');
const _ = require('lodash');
const COMMON_CONSTANTS = require('./constants/CommonConstants');

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
 * @param {String} rideType type of ride, either scooter or bike
 * @param {String} cityCode city code used by Jump APIs
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
 * @param {String} rideType type of ride, either scooter or bike
 * @param {String} cityCode city code used by Jump API
 * @returns a promise
 */
exports.getSystemData = async function (rideType, cityCode) {
        //By default, we will request data for both ride types
        var reqObj = {
            bikes: (cb) => {
                async.parallel({
                    info: (cb) => {
                        bikeUtil.getBikeSystemInfo(cityCode).
                            then((resp) => {
                                cb(null, resp.data.data);
                            }).catch((err) => {
                                cb(err, null);
                            })
                    },
                    regions: (cb) => {
                        bikeUtil.getBikeSystemRegions(cityCode).
                            then((resp) => {
                                cb(null, resp.data.data.regions)
                            }).
                            catch((err) => {
                                cb(err, null);
                            })
                    },
                    calendars: (cb) => {
                        bikeUtil.getBikeSystemCalendar(cityCode).
                            then((resp) => {
                                cb(null, resp.data.data.calendars)
                            }).
                            catch((err) => {
                                cb(err, null);
                            })
                    }
                }, cb)
            },
            scooters: (cb) => {
                async.parallel({
                    info: (cb) => {
                        scooterUtil.getScooterSystemInfo(cityCode).
                            then((resp) => {
                                cb(null, resp.data.data);
                            }).catch((err) => {
                                cb(err, null);
                            })
                    },
                    regions: (cb) => {
                        scooterUtil.getScooterSystemRegions(cityCode).
                            then((resp) => {
                                cb(null, resp.data.data.regions)
                            }).
                            catch((err) => {
                                cb(err, null);
                            })
                    },
                    calendars: (cb) => {
                        scooterUtil.getScooterSystemCalendar(cityCode).
                            then((resp) => {
                                cb(null, resp.data.data.calendars)
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
        return new Promise((resolve, reject) => {
            async.parallel(reqObj,
                (err, res) => {
                    if(err) {
                        console.log("Error occured whilst retrieving station data!\n", err)
                        reject(err);
                    }
                    else {
                        //create result object based on rideType keys from response
                        var resObj = {};
    
                        _.forEach(res, function(value, key) {
                            resObj[key] = value;
                        });
    
                        resolve(resObj);
                    }
                });
        });
}

/**
 * Retrieves payment plan and rental configuration
 * for a given city.
 * Combines results from system hours and payment plan
 *
 * @param {String} rideType type of ride, either scooter or bike
 * @param {String} cityCode city code used by Jump API
 * @returns a promise
 */
exports.getPaymentPlan = async function (rideType, cityCode) {
    //By default, we will request data for both ride types
    var reqObj = {
        bikes: (cb) => {
            async.parallel({
                pricing: (cb) => {
                    bikeUtil.getBikePricing(cityCode).
                        then((resp) => {
                            cb(null, resp.data.data.plans);
                        }).catch((err) => {
                            cb(err, null);
                        })
                },
                hours: (cb) => {
                    bikeUtil.getBikeSystemHours(cityCode).
                        then((resp) => {
                            cb(null, resp.data.data.rental_hours)
                        }).
                        catch((err) => {
                            cb(err, null);
                        })
                }
            }, cb)
        },
        scooters: (cb) => {
            async.parallel({
                pricing: (cb) => {
                    scooterUtil.getScooterPricing(cityCode).
                        then((resp) => {
                            cb(null, resp.data.data.plans);
                        }).catch((err) => {
                            cb(err, null);
                        })
                },
                hours: (cb) => {
                    scooterUtil.getScooterSystemHours(cityCode).
                        then((resp) => {
                            cb(null, resp.data.data.rental_hours)
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
    return new Promise((resolve, reject) => {
        async.parallel(reqObj,
            (err, res) => {
                if(err) {
                    console.log("Error occured whilst retrieving station data!\n", err)
                    reject(err);
                }
                else {
                    //create result object based on rideType keys from response
                    var resObj = {};

                    _.forEach(res, function(value, key) {
                        resObj[key] = value;
                    });

                    resolve(resObj);
                }
            });
    });

}