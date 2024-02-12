
const Streamish = require('./streamish')
const serializeTreeNodes = require('./serialize-tree-nodes')
const serializeANode = require('./serialize-a-node')

const icons = require('./icons')

let loadedStyles = []


async function loadKalpaTree(scriptLocation) {
	return new Promise((resolve, reject) => {
		if (window.KalpaTree) {
			resolve(window.KalpaTree)
		}
		else {
			let ckscript = document.createElement('script');
			ckscript.setAttribute('src', scriptLocation);
			ckscript.onload = async function () {
				resolve(window.KalpaTree)
			}
			document.head.appendChild(ckscript)
		}
	})
}

async function createTree(options = {}) {
	let plan = Object.assign({
		treeContainerSelector: '#kalpa-tree'
		, stream: new Streamish()
		, loadStyles: true
		, styleLocation: '/kalpa-tree-on-page/css/white-page-tree.css'
		, scriptLocation: '/kalpa-tree-on-page/js/kalpa-tree.js'
		, data: null

	}, options)
	return new Promise((resolve, reject) => {
		// Add the icon svgs if they haven't been added yet
		if(!document.querySelector('#kalpa-tree-icons')) {
			document.body.insertAdjacentHTML('beforeend', icons)
		}

		// Load the kalpa-tree script dependency then configure it
		loadKalpaTree(plan.scriptLocation).then(KalpaTree => {

			const Tree = KalpaTree.default
			let tree = new Tree({
				stream: plan.stream,
				accessors: {
					icon: 'nodeType'
				},
				initialSelection: 0
			})

			tree.on('error', function (e) {
				console.log('tree error', e)
			})

			tree.on('move', function (node, newParent, previousParent, newIndex, prevIndex) {
				node.parentId = newParent.id
			})
			tree.serializeTree = function() {
				let result = []
				result.push(tree.get(tree.root.id))
				serializeTreeNodes(this, tree.root.id, result)
				return result
			}
			tree.serialize = function () {
				let result = tree.serializeTree()
				return JSON.stringify(result)
			}
			
			if(plan.treeContainerSelector) {
				document.querySelector(plan.treeContainerSelector).appendChild(tree.render().el.node())
			}
			
			if(plan.data && Array.isArray(plan.data)) {
				for(let node of plan.data) {
					tree.options.stream.emit('data', node)
				}
			}

			resolve(tree)
		})
		
		// Load the stylesheet for minimal formatting
		if(plan.loadStyles && plan.styleLocation) {
			if(!loadedStyles.includes(plan.styleLocation)) {
				loadedStyles.push(plan.styleLocation)
				document.head.insertAdjacentHTML('beforeend', `<link href="${plan.styleLocation}" rel="stylesheet">`)
			}
		}
	})

}

module.exports = createTree