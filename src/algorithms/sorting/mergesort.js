function mergeSort(array) {
    const arr = [...array]
    const steps = []
    function merge(left, mid, right) {
        const temp = []
        let i = left
        let j = mid + 1
        while (i <= mid && j <= right) {
            steps.push({
                type: "compare",
                indices: [i, j]
            })
            if (arr[i] <= arr[j]) {
                temp.push(arr[i])
                i++
            } else {
                temp.push(arr[j])
                j++
            }
        }
        while (i <= mid) {
            temp.push(arr[i])
            i++
        }
        while (j <= right) {
            temp.push(arr[j])
            j++
        }
        for (let k = 0; k < temp.length; k++) {
            arr[left + k] = temp[k]
            steps.push({
                type: "swap",
                indices: [left + k, left + k],
                array: [...arr]
            })
        }
    }
    function divide(left, right) {
        if (left >= right) return
        const mid = Math.floor((left + right) / 2)
        divide(left, mid)
        divide(mid + 1, right)
        merge(left, mid, right)
    }
    divide(0, arr.length - 1)
    return steps
}
export default mergeSort