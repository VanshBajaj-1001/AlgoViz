function dijkstra(graph, start) {
    const steps = []
    const distances = {}
    const visited = new Set()
    const previous = {}
    // Initial distances
    for (const node in graph) {
        distances[node] = Infinity
        previous[node]=null 
    }
    distances[start] = 0
    while (visited.size < Object.keys(graph).length) {
        let current = null
        let smallestDistance = Infinity
        // Find unvisited node with smallest distance
        for (const node in distances) {
            if (
                !visited.has(node) &&
                distances[node] < smallestDistance
            ) {
                smallestDistance = distances[node]
                current = node
            }
        }
        // No reachable nodes left
        if (current === null) {
            break
        }
        visited.add(current)
        steps.push({
            type: "visit",
            node: current,
            distance: distances[current]
        })
        // Check neighbours
        for (const neighbor of graph[current]) {
            const newDistance =
                distances[current] + neighbor.weight
            if (newDistance < distances[neighbor.node]) {
                distances[neighbor.node] = newDistance
                previous[neighbor.node]=current 
                steps.push({
                    type: "update",
                    node: neighbor.node,
                    distance: newDistance,
                    from: current
                })
            }
        }
    }
    return {steps,previous}
}
export default dijkstra