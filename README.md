# LOKE JSDoc Theme

Also see [the howto doc](howto-jsdoc.md)

Based on Minami - A clean, responsive documentation template theme for JSDoc 3.

*TODO: show LOKE theme...*

![Screenshot](screenshot.png)

## Install

```bash
$ npm install --save-dev loke-jsdoc-theme
```

## Basic Usage

Clone repository to your designated `jsdoc` template directory, then:

```bash
$ jsdoc /my/code.js -t path/to/theme
```

### Package.json Usage

In your projects `package.json` file add a generate script:

```json
"script": {
  "generate-docs": "jsdoc --configure node_modules/loke-jsdoc-theme/default.jsdoc.json --verbose"
}
```

To build docs run:
```bash
$ npm run generate-docs
```

Alternatively copy the default configuration file from the NPM package to the project folder and customise it. See http://usejsdoc.org/about-configuring-jsdoc.html


## License

Licensed under the Apache2 license.
