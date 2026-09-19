function selectionSort(array) {
    const arr = [...array]
    const steps = []
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < arr.length; j++) {
            steps.push({
                type: "compare",
                indices: [minIndex, j]
            })
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        if (minIndex !== i) {
            ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
            steps.push({
                type: "swap",
                indices: [i, minIndex],
                array: [...arr]
            })
        }
    }
    return steps
}
export default selectionSort