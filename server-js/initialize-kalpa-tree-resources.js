const path = require('path')
let initialized = false


function initializeKalpaTreeResources(webhandle) {
	if(!initialized) {
		initialized = true
		webhandle.addStaticDir(path.join(webhandle.projectRoot, 'node_modules/kalpa-tree-on-page/public/kalpa-tree-on-page'), {urlPrefix: '/kalpa-tree-on-page'})
	}
}

module.exports = initializeKalpaTreeResources