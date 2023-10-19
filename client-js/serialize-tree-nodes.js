
function serializeTreeNodes(tree, rootId, result) {
	tree.children(rootId).forEach(function (child) {
		child.parentId = rootId
		result.push(child)
		serializeTreeNodes(tree, child.id, result)
	})
}

module.exports = serializeTreeNodes