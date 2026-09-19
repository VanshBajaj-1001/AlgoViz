function insertionSort(array) {
    const arr = [...array]
    const steps = []
    for (let i = 1; i < arr.length; i++) {
        let j = i
        while (j > 0) {
            steps.push({
                type: "compare",
                indices: [j - 1, j]
            })
            if (arr[j - 1] > arr[j]) {
                ;[arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
                steps.push({
                    type: "swap",
                    indices: [j - 1, j],
                    array: [...arr]
                })
                j--
            } else {
                break
            }
        }
    }
    return steps
}
export default insertionSort