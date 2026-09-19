function levelorder(root) {
    const steps = []
    if (!root) {
        return steps
    }
    const queue = [root]
    while (queue.length > 0) {
        const current = queue.shift()
        steps.push({
            type: "visit",
            node: current.id
        })
        if (current.left) {
            queue.push(current.left)
        }
        if (current.right) {
            queue.push(current.right)
        }
    }
    return steps
}
export default levelorder