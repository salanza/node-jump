# node-jump

A node-module to access Jump's open data APIs

### Prerequisites

The following is required to install node-jump:

```
Latest version of npm
```

### Installing

In your project directory, run the following command:

```
npm install node-jump
```

## Functionality Overview

node-jump provides wrapper functions for accessing Jump's GBFS api. Each function takes **one** parameter, ***cityCode***, and returns a ***promise***. A ***cityCode*** refers to the abbreviated city name used by Jump as part of their GBFS url. For example, the URL to get Jump GBFS data for San Francisco, California:

```
https://sf.jumpbikes.com/opendata/gbfs.json
```

Notice the abbreviation ***sf*** that is a part of the URL. 
Similarly, for Austin, Texas:

```
https://atx.jumpbikes.com/opendata/gbfs.json
```

### getFileDirectory(cityCode)
An async function that retrieves a city's GBFS directory. 

Example response:
```
{
  en: {
    feeds: [
      {
        "name": "gbfs",
        "url": "http://sf.jumpbikes.com/opendata/gbfs.json"
      },
      {
        "name": "system_information",
        "url": "http://sf.jumpbikes.com/opendata/system_information.json"
      },
      {
        "name": "station_information",
        "url": "http://sf.jumpbikes.com/opendata/station_information.json"
      },
      {
        "name": "station_status",
        "url": "http://sf.jumpbikes.com/opendata/station_status.json"
      },
      {
        "name": "free_bike_status",
        "url": "http://sf.jumpbikes.com/opendata/free_bike_status.json"
      },
      {
        "name": "system_hours",
        "url": "http://sf.jumpbikes.com/opendata/system_hours.json"
      },
      {
        "name": "system_calendar",
        "url": "http://sf.jumpbikes.com/opendata/system_calendar.json"
      },
      {
        "name": "system_regions",
        "url": "http://sf.jumpbikes.com/opendata/system_regions.json"
      },
      {
        "name": "system_pricing_plans",
        "url": "http://sf.jumpbikes.com/opendata/system_pricing_plans.json"
      },
      {
        "name": "system_alerts",
        "url": "http://sf.jumpbikes.com/opendata/system_alerts.json"
      }
    ]
  }
}
```

### getFreeBikes(cityCode)
Retrieves all available bikes within a given city.

Example Response:
```
{ bikes:
   [ { bike_id: 'bike_79814',
       name: '14881',
       lon: -122.399695,
       lat: 37.79277166666667,
       is_reserved: 0,
       is_disabled: 0,
       jump_ebike_battery_level: '51%',
       jump_vehicle_type: 'bike' },
       ...
       { bike_id: 'bike_145948',
       name: '21613',
       lon: -122.40180833333334,
       lat: 37.791986666666666,
       is_reserved: 0,
       is_disabled: 0,
       jump_ebike_battery_level: '78%',
       jump_vehicle_type: 'bike' }]
```

### getPaymentPlan(cityCode)
Retrieves payment plan and rental configuration for a given city.
Combines results from Jump's **system hours** and **payment plan** apis.

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

### getStationData(cityCode)
Retrieve stations data for a given city.
Combines results from Jump's **stations status** and **station info**.

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

### getSystemAlerts(cityCode)
Retrieves all alerts within a given city.

Example Response:
```
{
  alerts:[]
}
```

### getSystemData(cityCode)
Retrieves system data for a given city.
Combines results from **system information**, **system regions** and **system calender**.

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

