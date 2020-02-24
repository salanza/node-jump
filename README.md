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

### getPaymentPlan(rideType, cityCode)
Retrieves payment plan and rental configuration for a given city.
Combines results from Jump's **system hours** and **payment plan** APIs.

Example Response:
```
{
  pricing: [
      {
        "plan_id": "payment_plan_752",
        "name": "Single Ride",
        "url": "https://widget.socialbicycles.com/155/752",
        "currency": "USD",
        "price": 0,
        "is_taxable": 1,
        "description": "First ride paid in advance plus applicable taxes.  Always lock to a bike rack in the system area."
      }
    ],
    hours:[
      {
        "user_types": [
          "member",
          "nonmember"
        ],
        "days": [
          "mon",
          "tue",
          "wed",
          "thu",
          "fri",
          "sat",
          "sun"
        ],
        "start_time": "00:00:00",
        "end_time": "23:59:59"
      }
    ]
}
```

### getStationData(rideType, cityCode)
Retrieve stations data for a given city.
Combines results from Jump's **stations status** and **station info** APIs.

Example Response:
```
[ { station_id: 'hub_3835',
    num_bikes_available: 0,
    num_bikes_disabled: 0,
    num_docks_available: 0,
    is_installed: 1,
    is_renting: 1,
    is_returning: 1,
    last_reported: 1567643735,
    name: 'Warehouse_Bluxome',
    region_id: 'region_427',
    lon: -122.39900887012482,
    lat: 37.77530398263643,
    address: '140 Bluxome Street, San Francisco, CA',
    rental_methods:
     [ 'KEY',
       'APPLEPAY',
       'ANDROIDPAY',
       'TRANSITCARD',
       'ACCOUNTNUMBER',
       'PHONE' ] },
  ...
  { station_id: 'hub_11768',
    num_bikes_available: 0,
    num_bikes_disabled: 0,
    num_docks_available: 4,
    is_installed: 1,
    is_renting: 1,
    is_returning: 1,
    last_reported: 1567643735,
    name: '1432 Valencia',
    region_id: 'region_427',
    lon: -122.4205057695508,
    lat: 37.74992579831775,
    address: '1432 Valencia Street, San Francisco, CA',
    rental_methods:
     [ 'KEY',
       'APPLEPAY',
       'ANDROIDPAY',
       'TRANSITCARD',
       'ACCOUNTNUMBER',
       'PHONE' ] } ]
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

Example Response:
```
{
  info: {
    "system_id": "jump_sf",
    "language": "en",
    "name": "JUMP SF",
    "url": "https://www.jumpbikes.com",
    "purchase_url": "https://www.jumpbikes.com",
    "timezone": "America/Los_Angeles",
    "phone_number": "(833) 300-6106",
    "email": "support@jumpbikes.com"
  },
  regions: [
    {
      "region_id": "region_427",
      "name": "550 bike system area"
    }
  ],
  calenders: [
    {
      "start_month": 1,
      "start_day": 1,
      "end_month": 12,
      "end_day": 31
    }
  ]
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

