function bfs(graph,start){
    const steps=[]
    const visited=new Set()
    const queue=[start]
    visited.add(start)
    while(queue.length>0){
        const current=queue.shift()
        steps.push({type:"visit",node:current})
        for(const neighbor of graph[current]){
            if(!visited.has(neighbor)){
                visited.add(neighbor)
                queue.push(neighbor)
                steps.push({type:"discover",node:neighbor,from:current})

            }
        }
    }
    return steps
}
export default bfs;