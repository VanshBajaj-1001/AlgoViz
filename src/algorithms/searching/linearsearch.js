function linearSearch(array,target){
    const steps=[]
    for(let i=0;i<array.length;i++){
        steps.push({type:"compare",index:i})
        if(array[i]==target){
            steps.push({type:"found",index:i})
            break
        }
    }
    return steps
}
export default linearSearch