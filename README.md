# Kalpa Tree on Page

For creating editable trees on the web, the package [Kalpa Tree](https://www.npmjs.com/package/kalpa-tree) is
absolutely fantastic. It's fast, flexible, pretty, and will handle 10s or 100s of thousands of nodes. It's
well worth using.

However...

It was designed to work as part of a single-page application. If, instead, you want to use it occassionally and
conditionally on a web page, it benefits from a little glue code (which is what this package is).

This package has compiled js and css from the kalpa tree package which can be loaded directly by the browser. Not only does it make it simpler
to use Kalpa Tree as a "plugin", it simplifies the install and compile tool chain.

## Install

```bash
npm install kalpa-tree-on-page
```


## First Steps

```js
const makeTree = require('kalpa-tree-on-page')

makeTree({
	data: data
}).then(tree => {

	// Do something with the tree
})

```

```html
<div id="kalpa-tree" style="width: 500px; height: 500px;">
	
</div>
```

For this package to work, you must:

- Have the resources from the kalpa-tree-on-page/public directory available for url based access
- Have a container element created

If you are using [Webhandle](https://www.npmjs.com/package/webhandle), makeing sure the resources
are on the path can be done like:

```js
const kalpaTreeOnPage = require('kalpa-tree-on-page')
const webhandle = require('webhandle')
kalpaTreeOnPage(webhandle)
```


## Options

There are a number of options for quick setup.

```js
{
	treeContainerSelector: '#kalpa-tree' // Where the tree will go
	, stream: nodeStream // stream of nodes for the tree. This can be as simple as an EventEmitter where you emit 'data' events.
	, loadStyles: true 	// whether to load a stylesheet
	, styleLocation: '/kalpa-tree-on-page/css/white-page-tree.css' // the stylesheet url to load
	, scriptLocation: '/kalpa-tree-on-page/js/kalpa-tree.js' // the compiled kalpa tree url to load
	, data: dataArray // an array of nodes. probably either use this or the stream parameter
}
```

Each node, whether in the data array or coming from the stream need to look like:

```js
{
	"id": 1002, // must have a unique numeric id
	"label": "node 2", // should have a label
	"parentId": 1001 // determines under which node it will be placed, the root node will not have a parent id
	// Also you can add other attributes
}

```


## Usage

Check out the Kalpa Tree documentation for how to use the tree as part of an app/page.
