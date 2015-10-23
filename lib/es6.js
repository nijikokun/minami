// jsdoc-babel manages to parse the code without errors, but needs a lot of help.
// 1) document the constructor, not the class.
// 2) you'll need to use @memberof everywhere

class Es6Client {
  /**
   * Creates a new {@link Es6Client} instance
   * @method Es6Client.create
   * @param {Object} options
   * @returns {Es6Client}
   */
  static create(options) {
    return new this(options);
  }

  /**
   * This is the constructor description.
   * Create an instance.
   * You must call .end() afterwards.
   * @constructor Es6Client
   * @classdesc This is the description for client class
   * @param  {Object} options
   * @param  {String} options.cert PEM formatted certificate
   * @param  {String} [options.key] PEM formatted private key if not within the cert
   */
  constructor(options) {
    this[CONNECTION] = new Connection({
      cert       : options.cert,
      key        : options.key || options.cert,
      gateway    : 'gateway.push.apple.com'
    });
  }

  /**
   * Send a notification
   * @method Es6Client#send
   * @param  {String} token for the device
   * @param  {Object} details
   * @param  {String} details.title
   */
  send(token, details) {
    const device = new Device(token);
    const note = new Notification();
    note.expiry = Math.floor(Date.now() / 1000) + 3600;
    // note.badge = 0;
    note.sound = 'ping.aiff';
    note.alert = details.title;
    note.data  = {};

    this[CONNECTION].pushNotification(note, device);
  }

  /**
   * Disconnects and shuts down
   * @method end
   * @memberof Es6Client#
   */
  end() {
    this[CONNECTION].shutdown();
  }
};
