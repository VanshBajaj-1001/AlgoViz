function quickSort(array) {
    const arr = [...array]
    const steps = []
    function partition(low, high) {
        const pivot = arr[high]
        let i = low
        for (let j = low; j < high; j++) {
            steps.push({
                type: "compare",
                indices: [j, high]
            })
            if (arr[j] < pivot) {
                ;[arr[i], arr[j]] = [arr[j], arr[i]]
                steps.push({
                    type: "swap",
                    indices: [i, j],
                    array: [...arr]
                })
                i++
            }
        }
        ;[arr[i], arr[high]] = [arr[high], arr[i]]
        steps.push({
            type: "swap",
            indices: [i, high],
            array: [...arr]
        })
        return i
    }
    function sort(low, high) {
        if (low >= high) return
        const pivotIndex = partition(low, high)
        sort(low, pivotIndex - 1)
        sort(pivotIndex + 1, high)
    }
    sort(0, arr.length - 1)
    return steps
}
export default quickSort