import { useState, useEffect } from "react";
import {
    ArrowDownUp,
    Play,
    Pause,
    SkipForward,
    RotateCcw,
    Shuffle
} from "lucide-react";

import bubbleSort from "../algorithms/sorting/bubblesort";
import selectionSort from "../algorithms/sorting/selectionsort";
import insertionSort from "../algorithms/sorting/insertionsort";
import mergeSort from "../algorithms/sorting/mergesort";
import quickSort from "../algorithms/sorting/quicksort";

function SortingVisualizer() {

    const [array, setArray] = useState([40, 70, 30, 90, 20, 60, 50])
    const [steps, setSteps] = useState([])
    const [currentstep, setCurrentStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [activeIndex, setActiveIndex] = useState([])
    const [stepType, setSteptype] = useState(null)
    const [speed, setSpeed] = useState(500)
    const [message, setMessage] = useState("Ready to sort")
    const [arraySize, setArraySize] = useState(10)
    const [algorithm, setAlgorithm] = useState("bubble")
    const algorithmInfo = {

        bubble: {
            name: "Bubble Sort",
            description: "Repeatedly compares adjacent elements and swaps them when they are in the wrong order.",
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)",
            space: "O(1)"
        },

        selection: {
            name: "Selection Sort",
            description: "Repeatedly finds the minimum element and places it at its correct position.",
            best: "O(n²)",
            average: "O(n²)",
            worst: "O(n²)",
            space: "O(1)"
        },

        insertion: {
            name: "Insertion Sort",
            description: "Builds the sorted array one element at a time by inserting each element into its correct position.",
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)",
            space: "O(1)"
        },

        merge: {
            name: "Merge Sort",
            description: "Divides the array into smaller parts, sorts them, and merges the sorted parts together.",
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)",
            space: "O(n)"
        },

        quick: {
            name: "Quick Sort",
            description: "Uses a pivot to partition the array and recursively sorts the resulting sections.",
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n²)",
            space: "O(log n)"
        }

    }
    function startSorting() {

        let generatedSteps = []

        if (algorithm === "bubble") {
            generatedSteps = bubbleSort(array)
        }

        if (algorithm === "selection") {
            generatedSteps = selectionSort(array)
        }

        if (algorithm === "insertion") {
            generatedSteps = insertionSort(array)
        }

        if (algorithm === "merge") {
            generatedSteps = mergeSort(array)
        }

        if (algorithm === "quick") {
            generatedSteps = quickSort(array)
        }

        setSteps(generatedSteps)
        setCurrentStep(0)
        setActiveIndex([])
        setSteptype(null)
        setMessage("Ready to sort")
        setIsPlaying(false)
    }
    function generateArray() {

        const newArray = Array.from(
            { length: arraySize },
            () => Math.floor(Math.random() * 90) + 10
        )

        setArray(newArray)
        setSteps([])
        setCurrentStep(0)
        setActiveIndex([])
        setSteptype(null)
        setIsPlaying(false)
        setMessage("New array generated")
    }
    function resetArray() {

        setArray([40, 70, 30, 90, 20, 60, 50])
        setSteps([])
        setCurrentStep(0)
        setActiveIndex([])
        setSteptype(null)
        setIsPlaying(false)
        setMessage("Ready to sort")
    }
    function nextStep() {

        if (currentstep >= steps.length) {

            setIsPlaying(false)
            setActiveIndex([])
            setSteptype(null)
            setMessage("Sorting Complete")

            return
        }

        const step = steps[currentstep]

        setActiveIndex(step.indices)
        setSteptype(step.type)

        if (step.type === "swap") {
            setArray(step.array)
            setMessage("Swapping elements")
        }

        if (step.type === "compare") {
            setMessage("Comparing elements")
        }

        setCurrentStep(currentstep + 1)
    }
    useEffect(() => {

        if (!isPlaying) return

        const timer = setTimeout(() => {
            nextStep()
        }, speed)

        return () => clearTimeout(timer)

    }, [isPlaying, currentstep, speed])
    const maxValue = Math.max(...array)

    const currentAlgorithm = algorithmInfo[algorithm]

    const progress =
        steps.length === 0
            ? 0
            : (currentstep / steps.length) * 100
    return (

        <div className="max-w-7xl mx-auto">

            {/* Header */}

            <div className="mb-8">

                <div className="flex items-center gap-3">

                    <div className="p-3 rounded-xl bg-cyan-500/10">
                        <ArrowDownUp
                            size={26}
                            className="text-cyan-400"
                        />
                    </div>

                    <div>

                        <h1 className="text-3xl font-bold">
                            Sorting Visualizer
                        </h1>

                        <p className="mt-1 text-slate-400">
                            Visualize sorting algorithms step by step.
                        </p>

                    </div>

                </div>

            </div>
            {/* Controls */}

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">

                <div className="flex flex-wrap items-end gap-4">

                    {/* Algorithm */}

                    <div>

                        <label className="block text-sm text-slate-400 mb-1">
                            Algorithm
                        </label>

                        <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value)}
                            className="
                                bg-slate-800
                                border border-slate-700
                                rounded-lg
                                px-4
                                py-2.5
                                outline-none
                                focus:border-cyan-500
                            "
                        >
                            <option value="bubble">Bubble Sort</option>
                            <option value="selection">Selection Sort</option>
                            <option value="insertion">Insertion Sort</option>
                            <option value="merge">Merge Sort</option>
                            <option value="quick">Quick Sort</option>
                        </select>

                    </div>
                    {/* Array Size */}

                    <div>

                        <label className="block text-sm text-slate-400 mb-1">
                            Array Size
                        </label>

                        <select
                            value={arraySize}
                            onChange={(e) => setArraySize(Number(e.target.value))}
                            className="
                                bg-slate-800
                                border border-slate-700
                                rounded-lg
                                px-4
                                py-2.5
                                outline-none
                                focus:border-cyan-500
                            "
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>

                    </div>
                    {/* Speed */}

                    <div>

                        <label className="block text-sm text-slate-400 mb-1">
                            Speed
                        </label>

                        <select
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="
                                bg-slate-800
                                border border-slate-700
                                rounded-lg
                                px-4
                                py-2.5
                                outline-none
                                focus:border-cyan-500
                            "
                        >
                            <option value={1000}>Slow</option>
                            <option value={500}>Normal</option>
                            <option value={200}>Fast</option>
                        </select>

                    </div>
                    {/* Divider */}

                    <div className="hidden lg:block h-10 w-px bg-slate-700 mx-1" />
                    {/* Generate */}

                    <button
                        onClick={generateArray}
                        className="
                            flex items-center gap-2
                            px-4 py-2.5
                            rounded-lg
                            bg-slate-800
                            border border-slate-700
                            text-white
                            font-semibold
                            hover:bg-slate-700
                            transition
                        "
                    >
                        <Shuffle size={18} />
                        Generate
                    </button>
                    {/* Start */}

                    <button
                        onClick={startSorting}
                        className="
                            flex items-center gap-2
                            px-4 py-2.5
                            rounded-lg
                            bg-cyan-500
                            text-slate-950
                            font-semibold
                            hover:bg-cyan-400
                            transition
                        "
                    >
                        <Play size={18} />
                        Start
                    </button>
                    {/* Play / Pause */}

                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="
                            flex items-center gap-2
                            px-4 py-2.5
                            rounded-lg
                            bg-slate-800
                            border border-slate-700
                            text-white
                            font-semibold
                            hover:bg-slate-700
                            transition
                        "
                    >
                        {isPlaying
                            ? <Pause size={18} />
                            : <Play size={18} />
                        }

                        {isPlaying ? "Pause" : "Play"}
                    </button>
                    {/* Step */}

                    <button
                        onClick={nextStep}
                        className="
                            flex items-center gap-2
                            px-4 py-2.5
                            rounded-lg
                            bg-slate-800
                            border border-slate-700
                            text-white
                            font-semibold
                            hover:bg-slate-700
                            transition
                        "
                    >
                        <SkipForward size={18} />
                        Step
                    </button>
                    {/* Reset */}

                    <button
                        onClick={resetArray}
                        className="
                            flex items-center gap-2
                            px-4 py-2.5
                            rounded-lg
                            bg-slate-800
                            border border-slate-700
                            text-slate-300
                            font-semibold
                            hover:bg-slate-700
                            transition
                        "
                    >
                        <RotateCcw size={18} />
                        Reset
                    </button>

                </div>

            </div>
            {/* Visualization */}

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">

                {/* Status */}

                <div className="flex items-center justify-between mb-5">

                    <div>

                        <p className="text-xs uppercase tracking-wider text-slate-500">
                            Current Status
                        </p>

                        <p className="mt-1 text-cyan-400 font-semibold">
                            {message}
                        </p>

                    </div>

                    <div className="text-sm text-slate-400">
                        Step{" "}
                        <span className="text-white font-medium">
                            {Math.min(currentstep, steps.length)}
                        </span>
                        {" / "}
                        {steps.length}
                    </div>

                </div>
                {/* Progress */}

                <div className="w-full h-2 bg-slate-800 rounded-full mb-7 overflow-hidden">

                    <div
                        className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>
                {/* Legend */}

                <div className="flex justify-center gap-6 mb-8 text-sm">

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-500" />
                        <span className="text-slate-400">
                            Normal
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <span className="text-slate-400">
                            Comparing
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <span className="text-slate-400">
                            Swapping
                        </span>
                    </div>

                </div>
                {/* Bars */}

                <div className="h-80 flex items-end justify-center gap-3">

                    {array.map((value, index) => {

                        const isActive = activeIndex.includes(index)

                        let barColor = "bg-cyan-500"

                        if (
                            isActive &&
                            stepType === "compare"
                        ) {
                            barColor = "bg-yellow-400"
                        }

                        if (
                            isActive &&
                            stepType === "swap"
                        ) {
                            barColor = "bg-red-400"
                        }

                        return (

                            <div
                                key={index}
                                className={`
                                    flex-1
                                    max-w-12
                                    ${barColor}
                                    rounded-t-md
                                    transition-all
                                    duration-300
                                    relative
                                `}
                                style={{
                                    height: `${(value / maxValue) * 280}px`
                                }}
                            >

                                <div className="
                                    absolute
                                    -top-6
                                    left-1/2
                                    -translate-x-1/2
                                    text-xs
                                    text-slate-300
                                ">
                                    {value}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* Algorithm Information */}
<div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl p-6">

    {/* Header */}

    <div className="flex items-center gap-3 mb-6">

        <div className="w-1 h-8 bg-amber-400 rounded-full" />

        <div>
            <h2 className="text-xl font-semibold">
                {currentAlgorithm.name}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
                Learn how this algorithm works
            </p>
        </div>

    </div>
    {/* Description */}

    <div className="mb-7">

        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">
            What is it?
        </h3>

        <p className="text-slate-400 text-sm leading-6 max-w-4xl">
            {currentAlgorithm.description}
        </p>

    </div>
    {/* Logic + How it works */}

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7">

        {/* Logic */}

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">

            <div className="flex items-center gap-2 mb-3">

                <div className="w-2 h-2 rounded-full bg-amber-400" />

                <h3 className="font-semibold text-amber-400">
                    Logic
                </h3>

            </div>

            <p className="text-sm text-slate-400 leading-6">
                {algorithm === "bubble" &&
                    "Compare adjacent elements. If the left element is greater than the right element, swap them. Repeat these comparisons until the largest elements gradually move to the end of the array."
                }

                {algorithm === "selection" &&
                    "Find the smallest element from the unsorted portion of the array and place it at the beginning of that portion. Repeat until the entire array is sorted."
                }

                {algorithm === "insertion" &&
                    "Take one element at a time and insert it into its correct position among the elements that are already sorted. The sorted portion grows one element at a time."
                }

                {algorithm === "merge" &&
                    "Divide the array into smaller halves until each part contains one element. Then merge those parts back together in sorted order."
                }

                {algorithm === "quick" &&
                    "Choose a pivot element and partition the array so smaller elements are placed before the pivot and larger elements after it. Recursively apply the same process to both sides."
                }
            </p>

        </div>
        {/* How It Works */}

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">

            <div className="flex items-center gap-2 mb-3">

                <div className="w-2 h-2 rounded-full bg-amber-400" />

                <h3 className="font-semibold text-amber-400">
                    How It Works
                </h3>

            </div>

            <p className="text-sm text-slate-400 leading-6">

                {algorithm === "bubble" &&
                    "Each pass compares neighboring values. Whenever they are in the wrong order, they are swapped. After one complete pass, the largest unsorted value reaches the end."
                }

                {algorithm === "selection" &&
                    "The algorithm searches the unsorted portion for the minimum value. Once found, it swaps that value with the first unsorted position."
                }

                {algorithm === "insertion" &&
                    "The algorithm treats the left side as sorted. Each new element is compared with previous elements and shifted left until its correct position is found."
                }

                {algorithm === "merge" &&
                    "The array is repeatedly divided into halves. During merging, elements from the two sorted halves are compared and placed into the correct order."
                }

                {algorithm === "quick" &&
                    "After choosing a pivot, the array is partitioned around it. The pivot reaches its final position, and the same process is repeated recursively on the left and right portions."
                }

            </p>

        </div>

    </div>
    {/* Pseudocode */}

    <div className="mb-7">

        <div className="flex items-center gap-2 mb-3">

            <div className="w-2 h-2 rounded-full bg-amber-400" />

            <h3 className="font-semibold text-amber-400">
                Pseudocode
            </h3>

        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">

            <div className="px-4 py-2 border-b border-slate-800 flex items-center gap-2">

                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />

                <span className="ml-2 text-xs text-slate-500">
                    pseudocode
                </span>

            </div>
            <pre className="p-5 overflow-x-auto text-sm leading-7 text-slate-300 font-mono">

{algorithm === "bubble" &&
`BubbleSort(array)
    for i = 0 to n - 2
        for j = 0 to n - i - 2
            if array[j] > array[j + 1]
                swap(array[j], array[j + 1])`
}
{algorithm === "selection" &&
`SelectionSort(array)
    for i = 0 to n - 2
        minIndex = i

        for j = i + 1 to n - 1
            if array[j] < array[minIndex]
                minIndex = j

        swap(array[i], array[minIndex])`
}
{algorithm === "insertion" &&
`InsertionSort(array)
    for i = 1 to n - 1
        key = array[i]
        j = i - 1

        while j >= 0 and array[j] > key
            array[j + 1] = array[j]
            j = j - 1

        array[j + 1] = key`
}
{algorithm === "merge" &&
`MergeSort(array)
    if array has one element
        return array

    divide array into left and right

    left = MergeSort(left)
    right = MergeSort(right)

    return Merge(left, right)

Merge(left, right)
    compare elements from both arrays
    place smaller element into result
    continue until both arrays are merged`
}
{algorithm === "quick" &&
`QuickSort(array, low, high)
    if low < high
        pivotIndex = Partition(array, low, high)

        QuickSort(array, low, pivotIndex - 1)
        QuickSort(array, pivotIndex + 1, high)

Partition(array, low, high)
    choose pivot
    place smaller elements before pivot
    place larger elements after pivot
    return pivot position`
}

            </pre>

        </div>

    </div>
    {/* Complexity */}

    <div>

        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
            Complexity
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="p-4 rounded-lg bg-slate-800/60">
                <p className="text-xs text-slate-500 uppercase">
                    Best Case
                </p>

                <p className="mt-2 text-amber-400 font-semibold">
                    {currentAlgorithm.best}
                </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/60">
                <p className="text-xs text-slate-500 uppercase">
                    Average Case
                </p>

                <p className="mt-2 text-amber-400 font-semibold">
                    {currentAlgorithm.average}
                </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/60">
                <p className="text-xs text-slate-500 uppercase">
                    Worst Case
                </p>

                <p className="mt-2 text-amber-400 font-semibold">
                    {currentAlgorithm.worst}
                </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/60">
                <p className="text-xs text-slate-500 uppercase">
                    Space
                </p>

                <p className="mt-2 text-amber-400 font-semibold">
                    {currentAlgorithm.space}
                </p>
            </div>

        </div>

    </div>

</div>

        </div>
    )
}

export default SortingVisualizer