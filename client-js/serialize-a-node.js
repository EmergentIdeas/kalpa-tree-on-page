function serializeANode (tree, rootId, result) {
	tree.children(rootId).forEach(function (child) {
		child.parentId = rootId
		result.push(child)
		serializeANode(tree, child.id, result)
	})
}

module.exports = serializeANode