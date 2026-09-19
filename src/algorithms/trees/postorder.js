function postorder(root) {
    const steps = []
    function traverse(node) {
        if (!node) {
            return
        }
        traverse(node.left)
        traverse(node.right)
        steps.push({
            type: "visit",
            node: node.id
        })
    }
    traverse(root)
    return steps
}
export default postorder