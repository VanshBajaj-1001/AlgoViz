function preorder(root) {
    const steps = []
    function traverse(node) {
        if (!node) {
            return
        }
        steps.push({
            type: "visit",
            node: node.id
        })
        traverse(node.left)
        traverse(node.right)
    }
    traverse(root)
    return steps
}
export default preorder