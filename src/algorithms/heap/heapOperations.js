function insert(heap, value, type) {
    const steps = []
    const newHeap = [...heap]
    newHeap.push(value)
    let index = newHeap.length - 1
    steps.push({
        type: "insert",
        index: index
    })
    while (index > 0) {
        const parent = Math.floor((index - 1) / 2)
        steps.push({
            type: "compare",
            index1: index,
            index2: parent
        })
        const shouldSwap =
            type === "max"
                ? newHeap[index] > newHeap[parent]
                : newHeap[index] < newHeap[parent]
        if (!shouldSwap) {
            break
        }
        ;[newHeap[index], newHeap[parent]] =
            [newHeap[parent], newHeap[index]]
        steps.push({
            type: "swap",
            index1: index,
            index2: parent
        })
        index = parent
    }
    return {
        heap: newHeap,
        steps
    }
}
function peek(heap) {
    const steps = []
    if (heap.length === 0) {
        steps.push({
            type: "empty"
        })
        return {
            heap,
            steps
        }
    }
    steps.push({
        type: "peek",
        index: 0
    })
    return {
        heap,
        steps
    }
}
function extract(heap, type) {
    const steps = []
    if (heap.length === 0) {
        steps.push({
            type: "empty"
        })
        return {
            heap,
            steps
       }
    }
    const newHeap = [...heap]
    const removedValue = newHeap[0]
    steps.push({
        type: "extract",
        index: 0,
        value: removedValue
    })
    if (newHeap.length === 1) {
        newHeap.pop()
        return {
            heap: newHeap,
            steps
        }
    }
    newHeap[0] = newHeap.pop()
    let index = 0
    while (true) {
        const left = 2 * index + 1
        const right = 2 * index + 2
        let best = index
        if (left < newHeap.length) {
            steps.push({
                type: "compare",
                index1: left,
                index2: best
            })
            if (
                type === "max"
                    ? newHeap[left] > newHeap[best]
                    : newHeap[left] < newHeap[best]
            ) {
                best = left
            }
        }
        if (right < newHeap.length) {
            steps.push({
                type: "compare",
                index1: right,
                index2: best
            })
            if (
                type === "max"
                    ? newHeap[right] > newHeap[best]
                    : newHeap[right] < newHeap[best]
            ) {
                best = right
            }
        }
        if (best === index) {
            break
        }
        ;[newHeap[index], newHeap[best]] =
            [newHeap[best], newHeap[index]]
        steps.push({
            type: "swap",
            index1: index,
            index2: best
        })
        index = best
    }
    return {
        heap: newHeap,
        steps
    }
}
export {
    insert,
    peek,
    extract
}