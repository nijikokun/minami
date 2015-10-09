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
will be recorded as a part of that module. AVOID THIS and define the classes
elsewhere (ie keep the modules VERY light).**
**The reason for this is that it changes the name required to reference the class
that will likely lead to mistakes and broken links.**.

To demonstrate:
```js
/**
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

Always use the `@method` tag.

### Instance methods

Option 1: prefix with with `Class#`

```js
/**
 * Sends a notification to the user
 * @method UserEntity#sendNotification
 */
UserEntity.prototype.sendNotification: function() { }
```

### Static methods

Document

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

## Documenting members of classes

Use the `@method` tag

```js
/**
 * Sends a notification to the user
 * @method UserEntity#sendNotification
 */
UserEntity.prototype.sendNotification: function() { }
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

```js
/**
 * Test class
 * @class TestService
 * @rpc Test
 */
```

# Documenting API Routes

**COMING SOON**

Add the `@api` or `@route` to the function followed by the route.

```js
/**
 * Gets all users
 * @method TestController#listUsers
 * @api GET /v1/users
 */
function getUsers(req, res, next) { }
```

You can also document route parameters with the `@apiparam` tag.
```js
/**
 * Gets a single user
 * @method TestController#listUsers
 * @api GET /v1/users/:id
 * @apiparam {integer} id - the user's unique ID
 */
function getUser(req, res, next) { }
```

# TODO Notes

# Types

Arrays, generics, nullable, not null, etc
