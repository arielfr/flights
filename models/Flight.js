/**
 * Created by arey on 7/11/17.
 */
class Flight {

  constructor(properties){
    // Unique ICAO 24-bit address of the transponder in hex string representation.
    this.icao = properties[0];
    // Callsign of the vehicle (8 chars). Can be null if no callsign has been received.
    this.callsign = properties[1];
    // Country name inferred from the ICAO 24-bit address.
    this.originCountry = properties[2];
    // Unix timestamp (seconds) for the last position update. Can be null if no position report was received by OpenSky within the past 15s.
    this.timePosition = properties[3];
    // Unix timestamp (seconds) for the last velocity update. Can be null if no velocity report was received by OpenSky within the past 15s.
    this.timeVelocity = properties[4];
    // WGS-84 longitude in decimal degrees. Can be null.
    this.longitude = properties[5];
    // WGS-84 latitude in decimal degrees. Can be null.
    this.latitude = properties[6];
    // Barometric or geometric altitude in meters. Can be null.
    this.altitude = properties[7];
    // Boolean value which indicates if the position was retrieved from a surface position report.
    this.onGround = properties[8];
    // Velocity over ground in m/s. Can be null.
    this.velocity = properties[9];
    // Heading in decimal degrees clockwise from north (i.e. north=0°). Can be null.
    this.heading = properties[10];
    // Vertical rate in m/s. A positive value indicates that the airplane is climbing, a negative value indicates that it descends. Can be null.
    this.verticalRate = properties[11];
    // IDs of the receivers which contributed to this state vector. Is null if no filtering for sensor was used in the request.
    this.sensorts = properties[12];
  }

  /**
   * Get speed on kilometers per hour
   * @returns {*}
   */
  getSpeedOnKilometers () {
    return (this.velocity) ? parseInt(this.velocity * 3.6) : 0;
  }

  /**
   * Get the position into a prety object
   * @returns {{latitude: *, longitude: *}}
   */
  getPrettyPosition () {
    return {
      latitude: this.latitude,
      longitude: this.longitude
    };
  }
}

module.exports = Flight;