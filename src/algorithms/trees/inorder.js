function inorder(root) {
    const steps = []
    function traverse(node) {
        if (!node) {
            return
        }
        traverse(node.left)
        steps.push({
            type: "visit",
            node: node.id
        })
        traverse(node.right)
    }
    traverse(root)
    return steps
}

export default inorder