function kruskal(edges, nodes) {
    const steps = []
    const parent = {}
    const rank = {}
    nodes.forEach(node => {
        parent[node] = node
        rank[node] = 0
    })
    function find(node) {
        if (parent[node] !== node) {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }
    function union(a, b) {
        const rootA = find(a)
        const rootB = find(b)
        if (rootA === rootB) {
            return false
        }
        if (rank[rootA] < rank[rootB]) {
            parent[rootA] = rootB
        }
        else if (rank[rootA] > rank[rootB]) {
            parent[rootB] = rootA
        }
        else {
            parent[rootB] = rootA
            rank[rootA]++
        }
        return true
    }
    const sortedEdges = [...edges].sort(
        (a, b) => a[2] - b[2]
    )
    const mstEdges = []
    let totalWeight = 0
    for (const [from, to, weight] of sortedEdges) {
        steps.push({
            type: "consider",
            from,
            to,
            weight
        })
        if (union(from, to)) {
            mstEdges.push([from, to])
            totalWeight += weight
            steps.push({
                type: "select",
                from,
                to,
                weight
            })
        }
        else {
            steps.push({
                type: "reject",
                from,
                to,
                weight
            })
        }
    }
    return {
        steps,
        mstEdges,
        totalWeight
    }
}
export default kruskal