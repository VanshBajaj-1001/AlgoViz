import createNode from "./createNode"
function insertAtBeginning(head, value) {
    const steps = []
    const newNode = createNode(value, head)
    steps.push({
        type: "insert",
        node: newNode.id,
        position: "beginning"
    })
    return {
        head: newNode,
        steps
    }
}
function insertAtEnd(head, value) {
    const steps = []
    const newNode = createNode(value)
    if (!head) {
        steps.push({
            type: "insert",
            node: newNode.id,
            position: "end"
        })
        return {
            head: newNode,
            steps
        }
    }
    let current = head
    while (current.next) {
        steps.push({
            type: "compare",
            node: current.id
        })
        current = current.next
    }
    steps.push({
        type: "compare",
        node: current.id
    })
    current.next = newNode
    steps.push({
        type: "insert",
        node: newNode.id,
        position: "end"
    })
    return {
        head,
        steps
    }
}
function insertAtPosition(head, value, position) {
    const steps = []
    if (position === 0) {
        const newNode = createNode(value, head)
        steps.push({
            type: "insert",
            node: newNode.id,
            position: 0
        })
        return {
            head: newNode,
            steps
        }
    }
    if (!head || position < 0) {
        return {
            head,
            steps: [{ type: "notFound" }]
        }
    }
    let current = head
    for (let i = 0; i < position - 1; i++) {
        steps.push({
            type: "compare",
            node: current.id
        })
        if (!current.next) {
            return {
                head,
                steps: [{ type: "notFound" }]
            }
        }
       current = current.next
    }
    const newNode = createNode(value, current.next)
    current.next = newNode
    steps.push({
        type: "insert",
        node: newNode.id,
        position
    })
    return {
        head,
        steps
    }
}
function deleteByValue(head, value) {
    const steps = []
    if (!head) {
        return {
            head: null,
            steps: [{ type: "notFound" }]
        }
    }
    steps.push({
        type: "compare",
        node: head.id
    })
    if (head.value === value) {
        steps.push({
            type: "delete",
            node: head.id
        })
        return {
            head: head.next,
            steps
        }
    }
    let current = head
    while (current.next) {
        steps.push({
            type: "compare",
            node: current.next.id
        })
        if (current.next.value === value) {
            steps.push({
                type: "delete",
                node: current.next.id
            })
            current.next = current.next.next
            return {
                head,
                steps
            }
        }
        current = current.next
    }
    steps.push({
        type: "notFound"
    })
    return {
        head,
        steps
    }
}
export {
    insertAtBeginning,
    insertAtEnd,
    insertAtPosition,
    deleteByValue
}