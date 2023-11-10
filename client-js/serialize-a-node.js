function serializeANode (tree, rootId, result) {
	tree.children(rootId).forEach(function (child) {
		child.parentId = rootId
		result.push(child)
		serialize(tree, child.id, result)
	})
}

module.exports = serializeANode