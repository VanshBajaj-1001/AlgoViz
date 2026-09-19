function layoutTree(root){
    const nodes=[]
    const edges=[]
    function traverse(node,x,y,horizontalGap){
        if(!node){
            return
        }
        nodes.push({id:node.id,value:node.value,
            x:x,y:y
        })
        if(node.left){
            edges.push([node.id,node.left.id])
            traverse(node.left,x-horizontalGap,y+100,horizontalGap/2)
        }
        if(node.right){
            edges.push([node.id,node.right.id])
            traverse(node.right,x+horizontalGap,y+100,
                horizontalGap/2
            )
        }
    }
    traverse(root,400,80,200)
    return {nodes,edges

    }
}
export default layoutTree