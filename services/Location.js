/**
 * Created by arey on 7/11/17.
 */
const geolib = require('geolib');

const Location = function () {
};

/**
 * Check if position is inside a radius from the center position
 * @param position
 * @param center
 * @param distance
 * @returns {*|bool}
 */
Location.prototype.isInsideRadius = function (position, center, distance) {
  return geolib.isPointInCircle(
    position,
    center,
    distance
  );
};

/**
 * If position is going in the specific direction
 * @param origin
 * @param destination
 * @param direction
 * @returns {boolean}
 */
Location.prototype.isGoingInDirection = function (origin, destination, direction) {
  const result = geolib.getCompassDirection(
    origin,
    destination
  );

  return result.rough === direction;
};

/**
 * Returns the distance from the origin point to the destination point
 * @param origin
 * @param destination
 * @returns {*}
 */
Location.prototype.getDistanceFromPoint = function (origin, destination) {
  return geolib.getDistance(
    origin,
    destination
  );
};

module.exports = new Location();