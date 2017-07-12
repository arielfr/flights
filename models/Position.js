/**
 * Created by arey on 7/12/17.
 */
class Position {

  /**
   * Creates Object
   * @param latitude
   * @param longitude
   */
  constructor(latitude, longitude){
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * Get the position into a prety object
   * @returns {{latitude: *, longitude: *}}
   */
  getPosition () {
    return {
      latitude: this.latitude,
      longitude: this.longitude
    };
  }
}

module.exports = Position;