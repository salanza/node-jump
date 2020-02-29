# node-jump

A node-module that wraps Jump's open data APIs into several easy to use functions. 

### Prerequisites

The following is required to install node-jump:

```
Latest version of npm
```

### Dependencies 

The following is a list of dependencies used by node-jump:

```
async: ^3.1.0,
axios: ^0.19.0,
lodash: ^4.17.15
```


### Installing

In your project directory, run the following command:

```
npm install node-jump
```

## Functionality Overview

node-jump provides several functions for accessing Jump's GBFS api. Each function takes **two** parameters, ***cityCode*** (required) and ***rideType*** (optional), and returns a ***promise***. A ***cityCode*** refers to the abbreviated city name used by Jump as part of their GBFS url. For example, the URL to get Jump GBFS data for San Francisco, California:

```
https://sf.jumpbikes.com/opendata/gbfs.json
```

Notice the abbreviation ***sf*** that is a part of the URL. 
Similarly, for Austin, Texas:

```
https://atx.jumpbikes.com/opendata/gbfs.json
```
A ***rideType*** refers to the two available modes of transportation Jump provides, scooters or bikes. By default, node-jump will return data for both type of rides. To request data for a specific mode, pass in the string **"bike"** or **"scooter"** for bikes and scooters respectively.

### getFileDirectory(rideType, cityCode)
An async function that retrieves a city's GBFS directory. 

Example 1: Request GBFS directory for all ride types in Austin, Texas
```
Request:
http://localhost:3000/Jump/gbfs/?cityCode=atx

Response:
{
  "bikes": {
    "en": {
      "feeds": [
        {
          "name": "gbfs",
          "url": "https://gbfs.uber.com/v1/atxb/gbfs.json"
        },
        {
          "name": "system_information",
          "url": "https://gbfs.uber.com/v1/atxb/system_information.json"
        },
        {
          "name": "station_information",
          "url": "https://gbfs.uber.com/v1/atxb/station_information.json"
        },
        {
          "name": "station_status",
          "url": "https://gbfs.uber.com/v1/atxb/station_status.json"
        },
        {
          "name": "free_bike_status",
          "url": "https://gbfs.uber.com/v1/atxb/free_bike_status.json"
        },
        {
          "name": "system_hours",
          "url": "https://gbfs.uber.com/v1/atxb/system_hours.json"
        },
        {
          "name": "system_calendar",
          "url": "https://gbfs.uber.com/v1/atxb/system_calendar.json"
        },
        {
          "name": "system_regions",
          "url": "https://gbfs.uber.com/v1/atxb/system_regions.json"
        },
        {
          "name": "system_pricing_plans",
          "url": "https://gbfs.uber.com/v1/atxb/system_pricing_plans.json"
        },
        {
          "name": "system_alerts",
          "url": "https://gbfs.uber.com/v1/atxb/system_alerts.json"
        }
      ]
    }
  },
  "scooters": {
    "en": {
      "feeds": [
        {
          "name": "gbfs",
          "url": "https://gbfs.uber.com/v1/atxs/gbfs.json"
        },
        {
          "name": "system_information",
          "url": "https://gbfs.uber.com/v1/atxs/system_information.json"
        },
        {
          "name": "station_information",
          "url": "https://gbfs.uber.com/v1/atxs/station_information.json"
        },
        {
          "name": "station_status",
          "url": "https://gbfs.uber.com/v1/atxs/station_status.json"
        },
        {
          "name": "free_bike_status",
          "url": "https://gbfs.uber.com/v1/atxs/free_bike_status.json"
        },
        {
          "name": "system_hours",
          "url": "https://gbfs.uber.com/v1/atxs/system_hours.json"
        },
        {
          "name": "system_calendar",
          "url": "https://gbfs.uber.com/v1/atxs/system_calendar.json"
        },
        {
          "name": "system_regions",
          "url": "https://gbfs.uber.com/v1/atxs/system_regions.json"
        },
        {
          "name": "system_pricing_plans",
          "url": "https://gbfs.uber.com/v1/atxs/system_pricing_plans.json"
        },
        {
          "name": "system_alerts",
          "url": "https://gbfs.uber.com/v1/atxs/system_alerts.json"
        }
      ]
    }
  }
}
```

Example 2: Request GBFS directory for **bikes** in Austin, Texas
```
Request:
http://localhost:3000/Jump/gbfs/?rideType=bike&cityCode=atx

Response:
{
  "bikes": {
    "en": {
      "feeds": [
        {
          "name": "gbfs",
          "url": "https://gbfs.uber.com/v1/atxb/gbfs.json"
        },
        {
          "name": "system_information",
          "url": "https://gbfs.uber.com/v1/atxb/system_information.json"
        },
        ...
        {
          "name": "system_alerts",
          "url": "https://gbfs.uber.com/v1/atxb/system_alerts.json"
        }
      ]
    }
  }
}
```

### getFreeBikes(rideType, cityCode)
Retrieves all available rides within a given city.

Example 1: Request all available rides in Autin, Texas
```
Request:
http://localhost:3000/Jump/bikes/?cityCode=atx

Response:
  "bikes": {
    "bikes": [
      {
        "bike_id": "007f6be0-a3e3-46d5-981e-7aa51b3d01c5",
        "lat": 30.290793333333333,
        "lon": -97.75064333333333,
        "is_reserved": 0,
        "is_disabled": 0,
        "jump_vehicle_type": "bike",
        "jump_ebike_battery_level": "83%",
        "jump_vehicle_name": "15020"
      },
      {
        "bike_id": "00c80078-b6a0-4cf7-ab48-84322bbe20ef",
        "lat": 30.259125,
        "lon": -97.73953,
        "is_reserved": 0,
        "is_disabled": 0,
        "jump_vehicle_type": "bike",
        "jump_ebike_battery_level": "51%",
        "jump_vehicle_name": "11895"
      },
      ...
      {
        "bike_id": "00d7d14e-5db8-402a-ad1b-947340f49147",
        "lat": 30.269046666666668,
        "lon": -97.74637666666666,
        "is_reserved": 0,
        "is_disabled": 0,
        "jump_vehicle_type": "bike",
        "jump_ebike_battery_level": "65%",
        "jump_vehicle_name": "16889"
      }
     ],
     "scooters": [
      {
        "bike_id": "001613f1-7554-40f7-8507-f15d56617eae",
        "lat": 30.260003,
        "lon": -97.749305,
        "is_reserved": 0,
        "is_disabled": 0,
        "jump_vehicle_type": "scooter",
        "jump_ebike_battery_level": "67%",
        "jump_vehicle_name": "OOD948"
      },
      ...
      {
        "bike_id": "00374cae-9921-4444-aa9b-11d62d04dec7",
        "lat": 30.254461,
        "lon": -97.748026,
        "is_reserved": 0,
        "is_disabled": 0,
        "jump_vehicle_type": "scooter",
        "jump_ebike_battery_level": "23%",
        "jump_vehicle_name": "TLS804"
      }
    ]
  }
}
```

Example 2: Request all available **scooters** in Autin, Texas
```
Request:
http://localhost:3000/Jump/bikes/?rideType=scooter&cityCode=atx

Response:
{
  "bikes": {
    "scooters": [
      {
        "bike_id": "001613f1-7554-40f7-8507-f15d56617eae",
        "lat": 30.268008,
        "lon": -97.742341,
        "is_reserved": 0,
        "is_disabled": 0,
        "jump_vehicle_type": "scooter",
        "jump_ebike_battery_level": "97%",
        "jump_vehicle_name": "OOD948"
      },
      {
        "bike_id": "00374cae-9921-4444-aa9b-11d62d04dec7",
        "lat": 30.257188,
        "lon": -97.721431,
        "is_reserved": 0,
        "is_disabled": 0,
        "jump_vehicle_type": "scooter",
        "jump_ebike_battery_level": "59%",
        "jump_vehicle_name": "TLS804"
      },
	  ...
      {
        "bike_id": "fff97e1a-8625-42f4-8451-b3dbca8ec56e",
        "lat": 30.274853,
        "lon": -97.751991,
        "is_reserved": 0,
        "is_disabled": 0,
        "jump_vehicle_type": "scooter",
        "jump_ebike_battery_level": "55%",
        "jump_vehicle_name": "OWD835"
      }
    ]
  }
```

### getPaymentPlan(rideType, cityCode)
Retrieves payment plan and rental configuration for a given city.
Combines results from Jump's **system hours** and **payment plan** APIs.

Example 1: Request payment plan of all ride types for Autin, Texas
```
Request:
http://localhost:3000/Jump/payment/?cityCode=atx

Response:
{
  "station": {
    "scooters": {
      "hours": [
        {
          "days": [
            "mon",
            "tue",
            "wed",
            "thu",
            "fri",
            "sat",
            "sun"
          ],
          "end_time": "23:59:59",
          "start_time": "00:00:00",
          "user_types": [
            "member",
            "nonmember"
          ]
        }
      ],
      "pricing": []
    },
    "bikes": {
      "hours": [
        {
          "days": [
            "mon",
            "tue",
            "wed",
            "thu",
            "fri",
            "sat",
            "sun"
          ],
          "end_time": "23:59:59",
          "start_time": "00:00:00",
          "user_types": [
            "member",
            "nonmember"
          ]
        }
      ],
      "pricing": []
    }
  }
}
```

Example 2: Request payment plan of all **bikes** types for Autin, Texas
```
Request:
http://localhost:3000/Jump/payment/?rideType=bike&cityCode=atx

Response:
{
  "station": {
    "bikes": {
      "hours": [
        {
          "days": [
            "mon",
            "tue",
            "wed",
            "thu",
            "fri",
            "sat",
            "sun"
          ],
          "end_time": "23:59:59",
          "start_time": "00:00:00",
          "user_types": [
            "member",
            "nonmember"
          ]
        }
      ],
      "pricing": []
    }
  }
}
```

### getStationData(rideType, cityCode)
Retrieve stations data for a given city.
Combines results from Jump's **stations status** and **station info** APIs.

Example 1: Get Station data of all ride types for Austin, Texas
```
Request:
http://localhost:3000/Jump/stations/?cityCode=atx

Response:
{
  "station": {
    "bikes": [
      {
        "station_id": "eb3cdb10-ba2e-5194-b55a-f2caa4110633",
        "num_bikes_available": 0,
        "num_bikes_disabled": 0,
        "num_docks_available": 15,
        "is_installed": 1,
        "is_renting": 1,
        "is_returning": 1,
        "last_reported": 1583017062,
        "name": " ACC - The Castilian",
        "region_id": "e175a9ac-09aa-452d-97c9-342fda3455e9",
        "lat": 30.287705,
        "lon": -97.742422,
        "address": "2323 San Antonio St, Austin, TX 78705, USA",
        "rental_methods": [
          "KEY",
          "APPLEPAY",
          "ANDROIDPAY",
          "TRANSITCARD",
          "ACCOUNTNUMBER",
          "PHONE"
        ]
      }
    ],
    "scooters": [
      {
        "station_id": "e3bda07a-433d-50d2-9447-5e303faa10a8",
        "num_bikes_available": 0,
        "num_bikes_disabled": 0,
        "num_docks_available": 7,
        "is_installed": 1,
        "is_renting": 1,
        "is_returning": 1,
        "last_reported": 1583017062,
        "name": "26th and San Gabriel",
        "region_id": "72491f42-5f24-4855-a096-58c07123c9d3",
        "lat": 30.290797,
        "lon": -97.747088,
        "address": "2515 San Gabriel St, Austin, TX 78705, USA",
        "rental_methods": [
          "KEY",
          "APPLEPAY",
          "ANDROIDPAY",
          "TRANSITCARD",
          "ACCOUNTNUMBER",
          "PHONE",
          "CREDITCARD"
        ]
      },
      {
        "station_id": "5ea7ad61-d644-57d6-afea-3a372004331f",
        "num_bikes_available": 0,
        "num_bikes_disabled": 0,
        "num_docks_available": 7,
        "is_installed": 1,
        "is_renting": 1,
        "is_returning": 1,
        "last_reported": 1583017062,
        "name": "26th and Rio Grande",
        "region_id": "dacd621f-45bc-449a-b1d4-91a977cbeedb",
        "lat": 30.290682,
        "lon": -97.745219,
        "address": "100 W 26th St, Austin, TX 78705, USA",
        "rental_methods": [
          "KEY",
          "APPLEPAY",
          "ANDROIDPAY",
          "TRANSITCARD",
          "ACCOUNTNUMBER",
          "PHONE",
          "CREDITCARD"
        ]
      },
      ...
      {
        "station_id": "972eaa3c-eda0-5982-967b-8b7d81711fce",
        "num_bikes_available": 0,
        "num_bikes_disabled": 0,
        "num_docks_available": 7,
        "is_installed": 1,
        "is_renting": 1,
        "is_returning": 1,
        "last_reported": 1583017062,
        "name": "5th & Chicon",
        "region_id": "b3fbe143-55ce-478d-8585-b78cec931266",
        "lat": 30.260281,
        "lon": -97.723247,
        "address": "1800 E 4th St, Austin, TX 78702, USA",
        "rental_methods": [
          "KEY",
          "APPLEPAY",
          "ANDROIDPAY",
          "TRANSITCARD",
          "ACCOUNTNUMBER",
          "PHONE",
          "CREDITCARD"
        ]
      },
      {
        "station_id": "a0a0af36-7ade-5768-a977-c4ec3edc82d5",
        "num_bikes_available": 0,
        "num_bikes_disabled": 0,
        "num_docks_available": 7,
        "is_installed": 1,
        "is_renting": 1,
        "is_returning": 1,
        "last_reported": 1583017062,
        "name": "3rd and Brazos",
        "region_id": "2bfdd7a7-57a2-404b-8ee2-8f83eced1c8a",
        "lat": 30.264771,
        "lon": -97.742258,
        "address": "265 Brazos St, Austin, TX 78701, USA",
        "rental_methods": [
          "KEY",
          "APPLEPAY",
          "ANDROIDPAY",
          "TRANSITCARD",
          "ACCOUNTNUMBER",
          "PHONE",
          "CREDITCARD"
        ]
      }
    ]
  }
}
```

Example 2: Get station data for **bikes** in Austin, Texas.
```
Request:
http://localhost:3000/Jump/stations/?rideType=bike&cityCode=atx

Response:
{
  "station": {
    "bikes": [
      {
        "station_id": "eb3cdb10-ba2e-5194-b55a-f2caa4110633",
        "num_bikes_available": 0,
        "num_bikes_disabled": 0,
        "num_docks_available": 15,
        "is_installed": 1,
        "is_renting": 1,
        "is_returning": 1,
        "last_reported": 1583017475,
        "name": " ACC - The Castilian",
        "region_id": "1d436053-2cbd-4ba5-9249-25b17da568df",
        "lat": 30.287705,
        "lon": -97.742422,
        "address": "2323 San Antonio St, Austin, TX 78705, USA",
        "rental_methods": [
          "KEY",
          "APPLEPAY",
          "ANDROIDPAY",
          "TRANSITCARD",
          "ACCOUNTNUMBER",
          "PHONE"
        ]
      }
    ]
  }
}
```
### getSystemAlerts(rideType, cityCode)
Retrieves all alerts within a given city.

Example 1: Request alerts for all ride types in Austin, Texas
```
Request:
http://localhost:3000/Jump/alerts/?cityCode=atx

Response:
{
  "bikes": {
    "alerts": []
  },
  "scooters": {
    "alerts": []
  }
}

```
Example 2: Request alerts for only **scooters** in Austin, Texas
```
Request:
http://localhost:3000/Jump/alerts/?rideType=scooter&cityCode=atx

Response:
{
  "scooters": {
    "alerts": []
  }
}
```

### getSystemData(rideType, cityCode)
Retrieves system data for a given city.
Combines results from Jump's **system information**, **system regions** and **system calender** APIs.

Example 1: Get system data of all ride types in Austin, Texas.
```
Request:
http://localhost:3000/Jump/system/?cityCode=atx

Response:
{
  "bikes": {
    "calendars": [
      {
        "end_day": 31,
        "end_month": 12,
        "start_day": 1,
        "start_month": 1
      }
    ],
    "info": {
      "email": "support@jumpbikes.com",
      "language": "en",
      "name": "Austin Bike JUMP System",
      "phone_number": "(833) 300-6106",
      "purchase_url": "https://www.jumpbikes.com",
      "system_id": "austin_bike_jump_system",
      "url": "https://www.jumpbikes.com"
    },
    "regions": []
  },
  "scooters": {
    "info": {
      "email": "support@jumpbikes.com",
      "language": "en",
      "name": "Austin Scooter JUMP System",
      "phone_number": "(833) 300-6106",
      "purchase_url": "https://www.jumpbikes.com",
      "system_id": "austin_scooter_jump_system",
      "url": "https://www.jumpbikes.com"
    },
    "regions": [],
    "calendars": [
      {
        "end_day": 31,
        "end_month": 12,
        "start_day": 1,
        "start_month": 1
      }
    ]
  }
}
```

Example 2: Get system data of all ride types in Austin, Texas.
```
Request:
http://localhost:3000/Jump/system/?rideType=bike&cityCode=atx

Response:
{
  "bikes": {
    "calendars": [
      {
        "end_day": 31,
        "end_month": 12,
        "start_day": 1,
        "start_month": 1
      }
    ],
    "regions": [],
    "info": {
      "email": "support@jumpbikes.com",
      "language": "en",
      "name": "Austin Bike JUMP System",
      "phone_number": "(833) 300-6106",
      "purchase_url": "https://www.jumpbikes.com",
      "system_id": "austin_bike_jump_system",
      "url": "https://www.jumpbikes.com"
    }
  }
}
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Salman Anza** - *Initial work* - [salanza](https://github.com/salanza)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [PurpleBooth](https://gist.github.com/PurpleBooth) for this awesome readme template!  
* [Jump Bikes](https://jump.com) for giving the public access to their Jump APIs!

