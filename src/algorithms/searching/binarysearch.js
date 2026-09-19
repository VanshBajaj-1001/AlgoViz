function binarySearch(array,target){
    const steps=[]
    let left=0
    let right=array.length-1
    while(left<=right){
        const mid=Math.floor((left+right)/2)
        steps.push({type:"compare",index:mid,left:left,
            right:right
        })
        if(array[mid]===target){
            steps.push({type:"found",index:mid})
            break
        }
        if(array[mid]<target){
            left=mid+1
        }
        else{
            right=mid-1
        }
    }
    if(left>right){
        steps.push({type:"notFound"})
    }
    return steps
}
export default binarySearch