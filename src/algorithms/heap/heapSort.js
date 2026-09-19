function heapSort(array) {
    const steps = []
    const arr = [...array]
    function heapify(n, i) {
        let largest = i
        const left = 2 * i + 1
        const right = 2 * i + 2
        if (left < n) {
            steps.push({
                type: "compare",
                index1: i,
                index2: left
            })
            if (arr[left] > arr[largest]) {
                largest = left
            }
        }
        if (right < n) {
            steps.push({
                type: "compare",
                index1: largest,
                index2: right
           })
            if (arr[right] > arr[largest]) {
                largest = right
            }
        }
        if (largest !== i) {
            ;[arr[i], arr[largest]] = [
                arr[largest],
                arr[i]
            ]
            steps.push({
                type: "swap",
                index1: i,
                index2: largest,
                array: [...arr]
            })

            heapify(n, largest)
        }
    }
    // Build Max Heap
    for (
        let i = Math.floor(arr.length / 2) - 1;
        i >= 0;
        i--
    ) {

        heapify(arr.length, i)
    }
    // Heap Sort
    for (
        let end = arr.length - 1;
        end > 0;
        end--
    ) {
        ;[arr[0], arr[end]] = [
            arr[end],
            arr[0]
        ]
        steps.push({
            type: "swap",
            index1: 0,
            index2: end,
            array: [...arr]
        })
        heapify(end, 0)
    }
    steps.push({
        type: "sorted",
        array: [...arr]
    })
    return {
        array: arr,
        steps: steps
    }
}
export default heapSort