function search(head, target) {
    const steps = []
    let current = head
    while (current) {
        steps.push({
            type: "compare",
            node: current.id
        })
        if (current.value === target) {
            steps.push({
                type: "found",
                node: current.id
            })
            return steps
        }
        current = current.next
    }
    steps.push({
        type: "notFound"
    })
    return steps
}
export default search