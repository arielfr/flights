/**
 * Created by arey on 7/11/17.
 */
const OpenSky = require('./services/OpenSky');
const Location = require('./services/Location');
const Position = require('./models/Position');
const notifier = require('node-notifier');
const schedule = require('node-schedule');
const path = require('path');

// Office exact position
const officePosition = new Position(-34.5467034, -58.4895469);

// Save the flights already showed
let flightsNotified = [];

// Run a schedule every 30 seconds
schedule.scheduleJob('*/30 * * * * *', function () {
  flightIsNearTheOffice().catch(error => {
    console.log('An error ocurred: ' + error);
  });
});

// Clean the flights notified every 5 minutes
schedule.scheduleJob('*/1 * * * *', function () {
  flightsNotified = [];
});

/**
 * Check if the flight is near the office
 * @returns {Promise}
 */
function flightIsNearTheOffice() {
  console.log('Check Flights');

  return new Promise((resolve, reject) => {
    OpenSky.getAll().then(flights => {
      flights.forEach(flight => {
        if (flight.latitude !== null &&
          flight.longitude !== null &&
          Location.isInsideRadius(flight.getPrettyPosition(), officePosition.getPosition(), 3000) &&
          Location.isGoingInDirection(flight.getPrettyPosition(), officePosition.getPosition(), 'E') &&
          flightsNotified.indexOf(flight.callsign) === -1) {
          // Send a system notification
          notifier.notify({
            title: 'Avión aproximandose',
            message: `Avión ${flight.callsign} proveniente de ${flight.originCountry} a ${flight.getSpeedOnKilometers()}km/h`,
            icon: path.join(__dirname, 'plane.png'),
            timeout: 15
          });

          flightsNotified.push(flight.callsign);
        }
      });

      console.log('Flights Checked');

      resolve();
    }).catch(reject);
  });
}
