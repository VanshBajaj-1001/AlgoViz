function push(stack,value){
    const steps=[]
    steps.push({
        type:"push",
        value:value
    })
    return {
        stack:[...stack,value],
        steps
    }
}
function pop(stack){
    const steps=[]
    if(stack.length===0){
        steps.push({
            type:"empty"
        })
        return {
            stack,steps
        }
    }
    const value=stack[stack.length-1]
    steps.push({
        type:"pop",
        value:value
    })
    return {
        stack:stack.slice(0,-1),
        steps
    }
}
function peek(stack){
    const steps = []
    if (stack.length === 0) {
        steps.push({
            type: "empty"
        })
        return {
            stack,
            steps
        }
    }
    const value = stack[stack.length - 1]
    steps.push({
        type: "peek",
        value: value
    })
    return {
        stack,
        steps
    }
}
function search(stack,target){
    const steps=[]
    for(let i=stack.length-1;i>=0;i--){
           steps.push({
            type: "compare",
            index: i,
            value: stack[i]
        })
        if(stack[i]==target){
             steps.push({
                type: "found",
                index: i,
                value: stack[i]
            })
            return {
                stack,
                steps
            } 
        }
    }
     steps.push({
        type: "notFound"
    })
    return {
        stack,steps
    }
}
function clearStack(stack){
    const steps=[]
    if(stack.length===0){
        steps.push({
            type:"empty"
        })
        return{
            stack,steps
        }
    }
    steps.push({
        type:"clear"
    })
    return{
        stack: [],
        steps
    }
}
export {
    push,peek,pop,search,clearStack
}