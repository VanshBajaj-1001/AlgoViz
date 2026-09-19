function dfs(graph, start) {
    const steps = []
    const visited = new Set()
    function traverse(node) {
        visited.add(node)
        steps.push({
            type: "visit",
            node: node
        })
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                steps.push({
                    type: "discover",
                    node: neighbor,
                    from: node
                })
                traverse(neighbor)
            }
        }
    }
    traverse(start)
    return steps
}

export default dfs