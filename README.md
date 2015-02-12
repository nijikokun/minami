# Minami

A clean, responsive documentation template theme for JSDoc 3.

![Minami Screenshot](http://puu.sh/fNzGh/1759187a44.png)

## Uses

- [the Taffy Database library](http://taffydb.com/)
- [Underscore Template library](http://documentcloud.github.com/underscore/#template)
- [Open Sans](http://www.google.com/fonts/specimen/Open+Sans)

## Usage

Clone repository to your designated `jsdoc` template directory, then:

```bash
$ jsdoc entry-file.js -t path/to/minami
```

### Node.js Dependency

In your projects `package.json` file add a script and a dependency.

```json
"script": {
  "generate-docs": "node_modules/.bin/jsdoc --configure .jsdoc.json --verbose"
},

"devDependencies": {
  "jsdoc": "3.3.0-alpha13",
  "minami": "git+https://github.com/nijikokun/minami.git#master"
}
```

In your `.jsdoc.json` file, add a template option.

```json
"opts": {
  "template": "node_modules/minami"
}
```

### Example JSDoc Config

```json
{
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc"]
    },
    "source": {
        "include": ["lib", "package.json", "README.md"],
        "includePattern": ".js$",
        "excludePattern": "(node_modules/|docs)"
    },
    "plugins": [
        "plugins/markdown"
    ],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": true
    },
    "opts": {
        "destination": "./docs/",
        "encoding": "utf8",
        "private": true,
        "recurse": true,
        "template": "./node_modules/minami"
    }
}
```

## License

Licensed under the MIT license.