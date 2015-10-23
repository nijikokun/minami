// You _should_ be able to leave out the class name after @class, but it often doesn't work

/**
 * @classdesc This is a mega class with lots of examples
 * @class MegaClass
 * @param {object} opts - constructor options
 * @param {string} [opts.name] - display name
 * @param {integer} [opts.id] - integer ID
 * @implements AddStuff
 * @rpc mega
 */
function MegaClass(opts) {

  // You _should_ be able to leave out the @memberof, but it generally doesn't work without it

  /**
   * ID of this instance
   * @member {integer} id
   * @memberof MegaClass#
   */
  this.id = opts.id || 0;


  // these won't be displayed

  /**
   * Something private
   * @member {string} _something
   * @memberof MegaClass#
   * @private
   */
  this._something = 'something';

  /**
   * @var {string}
   * @private
   */
  var name = opts.name || 'mega';

  // these will

  /**
   * Get the display name
   * @method getName
   * @return {string} the display name
   * @memberof MegaClass#
   * @deprecated use {@link MegaClass#displayName} instead
   * @rpc get-name
   */
  this.getName = function() {
    return name;
  };

  /**
   * Gets a value for the display name
   * @member displayName
   * @memberof MegaClass#
   * @readonly
   */
  Object.defineProperty(this, 'displayName', {get: function() { return name; }});
}

/** @inheritdoc */
MegaClass.prototype.add = function (x,y) {
  return x + y;
};

/**
 * Connect to the server
 * @async
 * @return {Promise} promise that resolves when connected
 * @throws {ConnectionError} if unable to connect
 * @throws {NoServerError} if not configured
 */
MegaClass.prototype.connect = function () {
};

/**
 * Creates a new {@link MegaClass} instance
 * @return {MegaClass} a new MegaClass instance
 */
MegaClass.create = function () {
};

/**
 * Gets stuff
 * @api GET /v1/stuff
 * @apiquery {Date} [from] - get stuff from this date
 * @apiresponse {Array<string>} an array of string stuff
 * @return {ApiResponse}
 */
MegaClass.prototype.getStuff = function () {
};
