function bstDelete(root, value) {
    const steps = []
    function deleteNode(node, parent = null) {
        if (!node) {
            steps.push({
                type: "notFound"
            })
            return null
        }
        steps.push({
            type: "compare",
            node: node.id
        })
        if (value < node.value) {
            node.left = deleteNode(node.left, node)
        }
        else if (value > node.value) {
            node.right = deleteNode(node.right, node)
        }
        else {
            steps.push({
                type: "delete",
                node: node.id
            })
            // Case 1: No children
            if (!node.left && !node.right) {
                return null
            }
            // Case 2: Only right child
            if (!node.left) {
                return node.right
            }
            // Case 2: Only left child
            if (!node.right) {
                return node.left
            }
            // Case 3: Two children
            let successor = node.right

            while (successor.left) {
                successor = successor.left
            }
            steps.push({
                type: "replace",
                node: node.id,
                replacement: successor.id
            })
            node.value = successor.value

            node.right = deleteNode(
                node.right,
                node
            )
        }
        return node
    }
    const newRoot = deleteNode(root)
    return {
        root: newRoot,
        steps
    }
}
export default bstDelete