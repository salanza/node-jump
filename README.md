# node-jump

A node-module to access Jump's open data APIs

### Prerequisites

The following is required to install node-jump

```
Latest version of npm
```

### Installing

In your project directory, run the following command:

```
npm install node-jump
```

End with an example of getting some data out of the system or using it for a little demo

## Usage

Example how to use API

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
An async function that retrieves a city's GBFS directory

### getFreeBikes(cityCode)

### getPaymentPlan(cityCode)

### getStationData(cityCode)

### getSystemAlerts(cityCode)

### getSystemData(cityCode)

```
Give an example
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
* Hat tip to anyone whose code was used
* Inspiration
* etc

