function prim(graph, start) {
    const steps = []
    const visited = new Set()
    const mstEdges = []
    let totalWeight = 0
    visited.add(start)
    steps.push({
        type: "visit",
        node: start
    })
    while (visited.size < Object.keys(graph).length) {
        let bestEdge = null
        let smallestWeight = Infinity
        for (const node of visited) {
            for (const edge of graph[node]) {
                if (visited.has(edge.node)) {
                    continue
                }
                steps.push({
                    type: "consider",
                    from: node,
                    to: edge.node,
                    weight: edge.weight
                })
                if (edge.weight < smallestWeight) {
                    smallestWeight = edge.weight
                    bestEdge = {
                        from: node,
                        to: edge.node,
                        weight: edge.weight
                    }
                }
            }
        }
        if (bestEdge === null) {
            break
        }
        visited.add(bestEdge.to)
        mstEdges.push(bestEdge)
        totalWeight += bestEdge.weight
        steps.push({
            type: "select",
            from: bestEdge.from,
            to: bestEdge.to,
            weight: bestEdge.weight
        })
        steps.push({
            type: "visit",
            node: bestEdge.to
        })
    }
    return {
        steps,
        mstEdges,
        totalWeight
    }
}
export default prim