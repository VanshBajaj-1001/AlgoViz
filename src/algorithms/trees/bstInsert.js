function bstInsert(root, value) {
    const steps = []
    function insert(node) {
        if (value < node.value) {
            steps.push({
                type: "compare",
                node: node.id
            })
            if (node.left === null) {
                const newNode = {
                    id: `N${value}`,
                    value: value,
                    left: null,
                    right: null
                }
                node.left = newNode
                steps.push({
                    type: "insert",
                    node: newNode.id,
                    parent: node.id
                })
                return
            }
            insert(node.left)
        }
        else if (value > node.value) {
            steps.push({
                type: "compare",
                node: node.id
            })
            if (node.right === null) {
                const newNode = {
                    id: `N${value}`,
                    value: value,
                    left: null,
                    right: null
                }
                node.right = newNode
                steps.push({
                    type: "insert",
                    node: newNode.id,
                    parent: node.id
                })
                return
            }
            insert(node.right)
        }
        else {
            steps.push({
                type: "duplicate",
                node: node.id
            })
        }
    }
    insert(root)
    return steps
}
export default bstInsert