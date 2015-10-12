# Intro

Javascript is a hard language to document, and JSDoc is full of weird quirks
because of this. The following standards have been compiled from playing with
various approaches to using JSDoc with an attempt to make something that is
effective, but not too intrusive on the development process.

# Tutorials

Tutorials are typically markdown files that describe to the user how to use the
application. They are used when the README.md file is insufficient for covering
high level overview an instructional information.

To make a tutorial simply place markdown files in the `./doc/tutorials` folder.

If you want to define structure to the organization of the tutorials you can
create a `docs.json` file in the folder.
See [this article](http://usejsdoc.org/about-tutorials.html#configuring-titles-order-and-hierarchy).

# Documenting Modules

We use *JSDoc modules* to document modules available for dependency injection.

These will typically be a folder containing a number of classes (services and
models) which should all be documented separately.

Define the module at the point it is exposed to dependency injection, it's name
should be identical to how it is referenced within dependency injection.

Since the dependency injection module typically just injects a class or interface
(which should be documented separately / individually, the documentation for the
module should simply describe the purpose and reference the injected service).

```js
/**
 * The notification module allows
 * @see NotificationService
 */
```

**IMPORTANT: when declaring `@module` on a file, all classes documented within
the same file will be recorded as a part of that module. AVOID THIS and define
the classes elsewhere (ie keep the modules VERY light).**
**The reason for this is that it changes the name required to reference the class
that will likely lead to mistakes and broken links.**.

To demonstrate:
```js
/**
 * This is a test module
 * @module test
 */

/**
 * To refer to this class you will now need to use `module:test~TestClass`.
 * Referring by `TestClass` will not work.
 * @class TestClass
 */
function TestClass() { }

// example...

/**
 * Links will be broken
 * @param {TestClass} param - test param
 */
function stuff(param) { }

/**
 * Links will be work
 * @param {module:test~TestClass} param - test param
 */
function moreStuff(param) { }
```

Apart from being really annoying in writing the long `module:test~TestClass` the
chance of someone forgetting to do this is extremely high, so lets avoid this!
See more below in namespaces and modules.

# Documenting Classes

Objects are constructed in a few different ways in javascript, so there are a
few different ways to notate them.

## Document the factory method

Use `@constructs`

```js
/**
 * User entity
 * @constructs UserEntity
 */
function createUser() {
  return {
    /**
     * Sends a notification to the user
     * @method UserEntity#sendNotification
     */
    sendNotification: function() { }
  };
}
```

## Document the constructor

Use either `@constructor` or `@class` (both work).

```js
/**
 * User entity
 * @constructor UserEntity
 */
function UserEntity() {
}

/**
 * Sends a notification to the user
 * @method UserEntity#sendNotification
 */
UserEntity.prototype.sendNotification: function() { }
```

## Document the object inline

Use `@class`

```js
/**
 * User entity
 * @class UserEntity
 */
var user = {
  /**
   * Sends a notification to the user
   * @method UserEntity#sendNotification
   */
  sendNotification: function() { }
};
```

## Documenting methods on classes

There are a lot of ways to do this, but always use the `@method` tag.

### Instance methods

Option 1: prefix with with `Class#`

```js
/**
 * Sends a notification to the user
 * @method UserEntity#sendNotification
 */
UserEntity.prototype.sendNotification: function() { }
```

Option 2: use the `@memberof` or `@lends` tag (either work)

```js
/**
 * Sends a notification to the user
 * @method sendNotification
 * @memberof UserEntity#
 */
UserEntity.prototype.sendNotification: function() { }
```

**TIP 1:**

ES5 prototype methods don't need anything but the comment (and the `@param`s if
any). JSDoc can figure out that it's an instance member of the class.

```js
/** Sends a notification to the user */
UserEntity.prototype.sendNotification: function() { }
```

**TIP 2:**

If a factory is used JSDoc can't figure out if a method is an instance or static.
All that needs to be specified is `@memberof` with `#` to indicate instance.

```js
/**
 * User entity
 * @constructs UserEntity
 */
function createUser() {
  return {
    /**
     * Sends a notification to the user
     * @memberof UserEntity#
     */
    sendNotification: function() { }
  };
}
```

**TIP 3:**

If referencing another function then you will need to specify `@method` so that
JSDoc knows it's not a `@member`.
JSDoc can figure out the name, but you'll need `@memberof` unless it's a prototype
method.

```js
/**
 * User entity
 * @constructs UserEntity
 */
function createUser() {
  return {
    /**
     * Sends a notification to the user
     * @method
     * @memberof UserEntity#
     */
    sendNotification: sendNotification
  };
}
```

### Static methods

Use all of the same options as instance methods, except replace `#` with `.`:

```js
/**
 * Does stuff
 * @method UserEntity.doStuff
 */
UserEntity.doStuff: function() { }

/**
 * Does things
 * @method doThings
 * @memberof UserEntity.
 */
UserEntity.doThings: function() { }
```

### Method parameters and return values

### Asynchronous methods and timeouts

If a method is asynchronous (ie results are returned in a callback or promise)
then add the `@async` tag.

If the method has a timeout value then use the `@timeout` tag to define the
timeout period (in milliseconds).

### Internal methods

Most methods in the app you won't want to include in the compiled documentation.
Still put a JSDoc header comment to help describe these, but omit the `@method`
tag. This places the method under "global" which is skipped in this theme.

Feel free to add as much, or little information to non-exposed methods that you
see fit. Tip: put just enough so that another developer can use the method and
no more. The `@param` tags can be super useful to indicate whether or not params
can/can't be null.

Example:

```js
/**
 * This method will do stuff and things
 * NOTE: you should use this for gizmos
 * @param {?string} id - optionally specify an ID
 */
function doStuffAndThings(id) { }
```

### Method Parameters

See the notes on `@params` in the Types section below.

### Exceptions

Use the `@throws` tag to communicate to other developers what sort of errors
are thrown from a particular method.

```js
/**
 * Sends a notification to the user
 * @method UserEntity#sendNotification
 * @throws {NoEmailError} the user does not have an email address associated
 *                        with their account
 */
function sendNotification() { }
```

## Documenting members of classes

Use the `@member` tag

```js
/**
 * Represents a user
 * @class UserEntity
 */
function UserEntity(name) {
  /**
   * The user's name
   * @member {string} UserEntity#name
   */
  this.name = name;

  // you can use use @memberof or @lends
  /**
   * The user's gender
   * @member {string} gender
   * @memberof UserEntity#
   */
  this.gender = 'unknown';
}
```

## Namespaces and Modules

Classes can be contained within a namespace or module.

This is nice in that it groups relevant data together, *however* unfortunately
JSDoc makes it a burden to reference classes within a namespace or module, and
the chance of someone incorrectly referencing a class is high, so we won't use
this feature.

Instead try and avoid name classes by a) naming the classes better, and b)
keeping our applications broken into small enough components / services that
the chance of clashes is minimized.

For example to reference classes in a module or namespace:

```js
/**
 * @param {module:mymodule~User} moduleUser - user type in module
 * @param {mynamespace.User} namespaceUser - user type in namespace
 */
function test(moduleUser, namespaceUser) { }
```

Instead, keep all classes at the global level so they can be referenced like:
```js
/**
 * @param {PromotionUser} user - user linked to a promotion
 */
```

# Documenting RPC Services

## Class Exposed by RPC

Add the `@rpc` to the service. If the name is different to the class (which it
probably is) then specify the service name afterwards.

This will result with navigation items being created that link back to the actual
class, and a label listing this on the class documentation.

```js
/**
 * Test class
 * @class TestService
 * @rpc test
 */
```

## Method Exposed by RPC

Add the `@rpc` to the method. If the RPC method name is different to the actual
method then specify the service name afterwards.

This will result with navigation items being created that link back to the actual
method, and a label listing this on the method documentation.

```js
/**
 * Does stuff
 * @method TestService#doStuff
 * @rpc dostuff
 */
```

# Documenting API Routes

**COMING SOON**

Add the `@api` or `@route` to the function followed by the route.

```js
/**
 * Gets all users
 * @method TestController#getUsers
 * @api GET /v1/users
 */
function getUsers(req, res, next) { }
```

You can also document route parameters with the `@apiparam` tag.

```js
/**
 * Gets a single user
 * @method TestController#getUser
 * @api GET /v1/users/:id
 * @apiparam {integer} id - the user's unique ID
 */
function getUser(req, res, next) { }
```

Any query string parameters with `@apiquery`. The following can be used like
`GET /v1/users?max=100`:

```js
/**
 * Gets users
 * @method TestController#getUsers
 * @api GET /v1/users
 * @apiquery {integer} max - limit the number of results
 */
function getUsers(req, res, next) { }
```

For POST/PATCH/PUT requests specify the posted data in `@apibody`:

```js
/**
 * Creates a new user
 * @method TestController#createUser
 * @api POST /v1/users
 * @apibody {UserDetails} details of the user to create
 */
function createUser(req, res, next) { }
```

# TODO Notes

Use the `@todo` tag to list TODO information. At present these are listed with
the classes, methods, etc. In the future the theme will provide an index to all
of the items on a single page.

# Types

As noted in Namespaces and Modules do not attach classes and other types to these.

[See this link for more examples.](http://usejsdoc.org/tags-type.html)

Some useful ones:

```js
// nullable
{?string}

// not nullable
{!string}

// various
{(string|number)}

```

## Mixed Type

Sometimes an argument in Javascript can be anything. Use `{*}`, example:

```js
/**
 * @param {*} foo
 */
function bar(foo) {}
```

This is equivalent to `{null|undefined|String|Number|Object}`.

*Note: this is part of the closure compiler dictionary, not the standard JSDoc
dictionary*

## Promises

Represents a promise that resolves with a user:

```js
Promise<User>
```

## Arrays & Dictionaries or Hash-maps

Represents an array of strings:

```js
{Array<string>}

// or

{string[]}
```

Represents a key-value collection of numbers:

```js
{Object<string, number>}
```

## Callback Types

Callbacks are common in javascript. Document them with the `@callback` tag.

If the callback is a common signature define it once and reuse it wherever
necessary.

```js
/**
 * @callback NodeCallback
 * @param {?Error} err - if an error occurred
 * @param {*} result - the result
 */
```

## Custom Types

If a document is a POJSO (it's a real term) then defining a class is likely
overkill. Instead define a type.

Use `@typedef`:

```js
/**
 * @typedef UserDetails
 * @type {Object}
 * @property {string} id - an ID.
 * @property {string} name - your name.
 * @property {number} age - your age.
 */

// then use in a function

/**
 * @param {UserDetails} user - user details
 */
function doStuff(user) { }
```

## Parameters

Parameters are defined as additional tags on the method or constructor. Use the
`@param` tag, example:

```js
/**
 * @param {number} myParam - this is my param
 */
function myFun(myParam) { }
```

### Optional Parameters

```js
// preferred
/**
 * @param {number} [foo]
 */

// alt
/**
 * @param {number=} foo
 */
```

### Default values
```js
/**
 * @param {number} [foo=1]
 */
```

### Variable number of params

```js
/**
 * @param {...number} num - variable number of numeric parameters
 */
```

## Variables

Sometimes it is useful to indicate the type of a variable, especially with
integers and floats. This won't be published in the theme built docs, but since
javascript doesn't enforce types it is helpful in communicating with other
developers as to the intent of the variable.

```js
/** @type integer */
var total;
```

## Constants, Read-only Variables and Getters

Use `@const` with `@type`:

```js
/**
 * @type {number}
 * @const
 */
var FOO = 1;
```

For getters or read-only variables use `@readonly`.
You'll also need to be explicit with the `@member` tag:

```js
/**
 * Gets a value that is mine
 * @member MyClass#myValue
 * @readonly
 */
Object.defineProperty(this, 'myValue', {get: getMyValue});
```

## ES6

Full ES6 is coming in JSDoc 3.4. Until then it is possible to use the plugin on
NPM called `jsdoc-babel`.
