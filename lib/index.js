function someMethod() {
  /**
   * @class Test1
   * @rpc testsvc
   */
  var test1 = {
    /**
     * Some method
     * @memberof Test1
     * @rpc
     * @instance
     */
    one: function() {}
  };
}

/**
 * This is and interface that does stuff and things
 * @interface SomeInterface
 * @classdesc This is and interface that does stuff and things
 * @see Test2
 */
/**
 * Three
 * @method SomeInterface#three
 */

/**
 * Constructs a new Test2 instance
 * @classdesc This is class 2
 * @implements SomeInterface
 * @constructor Test2
 * @example
 * var two = new Test2();
 * two.one();
 */
function Test2(opts) {
  /**
   * This is just a method that does stuff
   * @method one
   * @memberof Test2#
   * @extends Test1
   * @param {integer} x - Ecks
   * @param {integer} [y] - Why
   * @returns {string} a string representation
   * @async
   * @throws an error when something is broken
   * @throws {BadError} something bad happened
   * @todo Don't forget the milk!
   * @todo Make this method do something useful!
   * @api GET /v1/users/:id
   * @apiparam {string} id - the user's id
   * @apiquery {boolean} filter - filter stuff
   * @apibody {UserEntity}
   * @example
   * var me = getMe();
   * // do one
   * me.one();
   */
  this.one = function() {}

  /**
   * someMember description
   * @member {string} someMember
   * @memberof Test2
   * @instance
   */
  this.someMember = opts.x;

  /**
   * someOtherMember description
   * @member {Test1} someOtherMember
   * @memberof Test2#
   * @readonly
   */
  this.someOtherMember = opts.x;
}

/** number two */
Test2.prototype.two = function() {}

/**
 * This method is deprecated
 * @deprecated use {@link Test2#one one} instead
 */
Test2.prototype.three = function() {}

/**
 * @constructs Test3
 */
function factory() {
  return {
    /** @method Test3#one */
    one: function() {}
  };
}

/**
 * User entity
 * @class UserEntity
 */
function createUser() {
  return {
    /**
     * Sends a notification to the user
     * @type {string}
     * @memberof UserEntity
     * @instance
     */
    sendNotification: sendNotification
  };
}

function sendNotification() {}
