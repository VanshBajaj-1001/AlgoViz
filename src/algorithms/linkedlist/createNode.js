let nodeCounter = 5
function createNode(value, next = null) {
    const newNode = {
        id: `N${nodeCounter}`,
        value: value,
        next: next
    }
    nodeCounter++
    return newNode
}
export default createNode