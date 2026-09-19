function bstDelete(root, value) {
    const steps = []
    function deleteNode(node, target) {
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
        if (target < node.value) {
            node.left = deleteNode(node.left, target)
        }
        else if (target > node.value) {
            node.right = deleteNode(node.right, target)
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
            // Delete the successor from the right subtree
            node.right = deleteNode(
                node.right,
                successor.value
            )
        }
        return node
    }
    const newRoot = deleteNode(root, value)
    return {
        root: newRoot,
        steps
    }
}
export default bstDelete