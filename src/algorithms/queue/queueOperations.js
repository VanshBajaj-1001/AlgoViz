function enqueue(queue, value) {
    const steps = []
    steps.push({
        type: "enqueue",
        value: value
    })
    return {
        queue: [...queue, value],
        steps
    }
}
function dequeue(queue) {
    const steps = []
    if (queue.length === 0) {
        steps.push({
            type: "empty"
        })
        return {
            queue,
            steps
        }
    }
    const value = queue[0]
    steps.push({
        type: "dequeue",
        value: value
    })
    return {
        queue: queue.slice(1),
        steps
    }
}
function front(queue) {
    const steps = []
    if (queue.length === 0) {
        steps.push({
            type: "empty"
        })
        return {
            queue,
            steps
        }
    }
    steps.push({
        type: "front",
        value: queue[0]
    })
    return {
        queue,
        steps
    }
}
function rear(queue) {
    const steps = []
    if (queue.length === 0) {
        steps.push({
            type: "empty"
        })
        return {
            queue,
            steps
        }
    }
    steps.push({
        type: "rear",
        value: queue[queue.length - 1]
    })
    return {
        queue,
        steps
    }
}
function search(queue, target) {
    const steps = []
    for (let i = 0; i < queue.length; i++) {
        steps.push({
            type: "compare",
            index: i,
            value: queue[i]
        })
        if (queue[i] === target) {
            steps.push({
                type: "found",
                index: i,
                value: queue[i]
            })
            return {
                queue,
                steps
            }
        }
    }
    steps.push({
        type: "notFound"
    })
    return {
        queue,
        steps
    }
}
function clearQueue(queue) {
    const steps = []
    if (queue.length === 0) {
        steps.push({
            type: "empty"
        })
        return {
            queue,
            steps
        }
    }
    steps.push({
        type: "clear"
    })
    return {
        queue: [],
        steps
    }
}
export {
    enqueue,
    dequeue,
    front,
    rear,
    search,
    clearQueue
}