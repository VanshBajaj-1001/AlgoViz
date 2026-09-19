function traverse(head) {
    const steps = []
    let current = head
    while (current) {
        steps.push({
            type: "visit",
            node: current.id
        })
        current = current.next
    }
    return steps
}
export default traverse