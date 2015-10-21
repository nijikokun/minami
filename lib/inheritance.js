/**
 * @classdesc This in an interface with one method - `add`
 * @interface AddStuff
 */
/**
 * Adds x and y
 * @method AddStuff#add
 * @param {number} x - the first number
 * @param {number} y - the second number
 * @returns {number} the sum of `x` and `y`
 */

/**
 * @constructor AddThings
 * @implements AddStuff
 */
function AddThings() {
}

/**
 * @inheritdoc
 */
AddThings.prototype.add = function (x,y) {
};

/**
 * @constructs AddBits
 * @implements AddStuff
 */
function addStuffFactory() {
  return {
    /**
     * @method
     * @memberof AddBits#
     * @inheritdoc
     */
    add: function(x,y) {}
  };
}
