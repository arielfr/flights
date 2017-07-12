/**
 * Created by arey on 7/11/17.
 */
const axios = require('axios');
const Flight = require('../models/Flight');

const OpenSky = function () {
  this.url = 'https://opensky-network.org/api/';
};

/**
 * Get all Flights
 */
OpenSky.prototype.getAll = function () {
  return new Promise((resolve, reject) => {
    axios.get(this.url.concat('states/all')).then(response => {
      let flights = [];

      if (response.data && response.data.states.length > 0) {
        response.data.states.forEach(states => {
          flights.push(new Flight(states));
        });
      }

      resolve(flights);
    }).catch(reject);
  });
};

module.exports = new OpenSky();