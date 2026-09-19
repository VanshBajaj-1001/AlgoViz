function bstSearch(root,target){
    const steps=[]
    let current =root
    while(current){
        steps.push({type:"compare",node:current.id})
        if(current.value===target){
            steps.push({
                type:"found",node:current.id
            })
            break
        }
        if(target<current.value){
            current=current.left
        }
        else{
            current=current.right
        }
    }
    if(!current){
        steps.push({type:"notFound"})
    }
    return steps
}
export default bstSearch