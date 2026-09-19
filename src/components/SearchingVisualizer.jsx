import { useState, useEffect } from "react"
import {
    Search,
    Play,
    Pause,
    SkipForward,
    RotateCcw,
    Shuffle
} from "lucide-react"

import linearSearch from "../algorithms/searching/linearsearch"
import binarySearch from "../algorithms/searching/binarysearch"

function SearchingVisualizer() {

    const [array, setArray] = useState([10, 25, 40, 55, 70, 85])
    const [target, setTarget] = useState(40)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [isPlaying, setIsPlaying] = useState(false)
    const [message, setMessage] = useState("Ready to search")
    const [speed, setSpeed] = useState(500)
    const [steps, setSteps] = useState([])
    const [algorithm, setAlgorithm] = useState("linear")
    const [searchRange, setSearchRange] = useState({
        left: 0,
        right: array.length - 1
    })
    const [visualstep, setVisualStep] = useState(null)
    const algorithmInfo = {

        linear: {
            name: "Linear Search",
            description:
                "Checks each element one by one until the target is found or the entire array has been searched.",
            best: "O(1)",
            average: "O(n)",
            worst: "O(n)",
            space: "O(1)"
        },

        binary: {
            name: "Binary Search",
            description:
                "Repeatedly divides a sorted array in half and eliminates the half that cannot contain the target.",
            best: "O(1)",
            average: "O(log n)",
            worst: "O(log n)",
            space: "O(1)"
        }

    }
    function startSearch() {

        let generatedSteps = []

        if (algorithm === "linear") {
            generatedSteps = linearSearch(array, target)
        }

        if (algorithm === "binary") {
            generatedSteps = binarySearch(array, target)
        }

        setSteps(generatedSteps)
        setCurrentIndex(0)
        setIsPlaying(false)
        setVisualStep(null)
        setMessage("Ready to search")
        setSearchRange({
            left: 0,
            right: array.length - 1
        })
    }
    function nextStep() {

        if (steps.length === 0 || currentIndex < 0) {
            setMessage("Press Start First")
            return
        }

        if (currentIndex >= steps.length) {
            setIsPlaying(false)
            setMessage("Search Complete")
            return
        }

        const step = steps[currentIndex]

        setVisualStep(step)

        if (step.type === "compare") {

            setMessage(`Checking ${array[step.index]}`)

            if (algorithm === "binary") {
                setSearchRange({
                    left: step.left,
                    right: step.right
                })
            }
        }
        if (step.type === "found") {

            setMessage(`Found ${target}!`)
            setIsPlaying(false)

            if (algorithm === "binary") {
                setSearchRange({
                    left: step.index,
                    right: step.index
                })
            }
        }
        if (step.type === "notFound") {

            setMessage(`${target} not found in the array`)
            setIsPlaying(false)
        }

        setCurrentIndex(currentIndex + 1)
    }
    useEffect(() => {

        if (!isPlaying) return

        const timer = setTimeout(() => {
            nextStep()
        }, speed)

        return () => clearTimeout(timer)

    }, [isPlaying, currentIndex, speed])
    function generateArray() {

    let newArray = Array.from(
        { length: 8 },
        () => Math.floor(Math.random() * 90) + 10
    )

    // Binary Search requires sorted data
    if (algorithm === "binary") {
        newArray.sort((a, b) => a - b)
    }

    setArray(newArray)
    setSteps([])
    setCurrentIndex(-1)
    setIsPlaying(false)
    setMessage("Ready to search")

    setSearchRange({
        left: 0,
        right: newArray.length - 1
    })

    setVisualStep(null)
}
    function resetSearch() {

        setArray([10, 25, 40, 55, 70, 85])
        setSteps([])
        setCurrentIndex(-1)
        setIsPlaying(false)
        setMessage("Ready to search")
        setTarget(40)
        setSearchRange({
            left: 0,
            right: -1
        })
        setVisualStep(null)
    }
    const currentStep = visualstep

    const currentAlgorithm = algorithmInfo[algorithm]

    const progress =
        steps.length === 0
            ? 0
            : Math.min((currentIndex / steps.length) * 100, 100)
    return (

        <div className="max-w-7xl mx-auto">

            {/* Header */}

            <div className="mb-8">

                <div className="flex items-center gap-3">

                    <div className="p-3 rounded-xl bg-cyan-500/10">
                        <Search
                            size={26}
                            className="text-cyan-400"
                        />
                    </div>

                    <div>

                        <h1 className="text-3xl font-bold">
                            Searching Visualizer
                        </h1>

                        <p className="mt-1 text-slate-400">
                            Visualize searching algorithms step by step.
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
                                px-4 py-2.5
                                outline-none
                                focus:border-cyan-500
                            "
                        >
                            <option value="linear">
                                Linear Search
                            </option>

                            <option value="binary">
                                Binary Search
                            </option>
                        </select>

                    </div>
                    {/* Target */}

                    <div>

                        <label className="block text-sm text-slate-400 mb-1">
                            Target
                        </label>

                        <input
                            type="number"
                            value={target}
                            onChange={(e) =>
                                setTarget(Number(e.target.value))
                            }
                            className="
                                w-28
                                bg-slate-800
                                border border-slate-700
                                rounded-lg
                                px-4 py-2.5
                                outline-none
                                focus:border-cyan-500
                            "
                        />

                    </div>
                    {/* Speed */}

                    <div>

                        <label className="block text-sm text-slate-400 mb-1">
                            Speed
                        </label>

                        <select
                            value={speed}
                            onChange={(e) =>
                                setSpeed(Number(e.target.value))
                            }
                            className="
                                bg-slate-800
                                border border-slate-700
                                rounded-lg
                                px-4 py-2.5
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
                        onClick={startSearch}
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
                        onClick={resetSearch}
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
                            {Math.min(currentIndex, steps.length)}
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
                {/* Current Index */}

                <div className="text-center text-sm text-slate-400 mb-8">

                    Checking index:{" "}

                    <span className="text-white font-medium">
                        {currentStep
                            ? currentStep.index
                            : "-"
                        }
                    </span>

                </div>
                {/* Array */}

                <div className="h-80 flex items-end justify-center gap-3">

                    {array.map((value, index) => {

                        let barColor = "bg-cyan-500"
                        if (algorithm === "binary") {

                            if (
                                index < searchRange.left ||
                                index > searchRange.right
                            ) {
                                barColor = "bg-slate-700"
                            }

                            if (
                                currentStep &&
                                currentStep.type === "compare" &&
                                index === currentStep.index
                            ) {
                                barColor = "bg-yellow-400"
                            }

                            if (
                                currentStep &&
                                currentStep.type === "found" &&
                                index === currentStep.index
                            ) {
                                barColor = "bg-green-400"
                            }

                        } else {

                            if (
                                currentStep &&
                                currentStep.type === "compare" &&
                                index === currentStep.index
                            ) {
                                barColor = "bg-yellow-400"
                            }

                            if (
                                currentStep &&
                                currentStep.type === "found" &&
                                index === currentStep.index
                            ) {
                                barColor = "bg-green-400"
                            }

                        }
                        return (

                            <div
                                key={index}
                                className={`
                                    flex-1
                                    max-w-16
                                    ${barColor}
                                    rounded-t-md
                                    transition-all
                                    duration-300
                                    relative
                                `}
                                style={{
                                    height: `${(value / Math.max(...array)) * 280}px`
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
                {/* Legend */}

                <div className="flex justify-center gap-6 mt-8 text-sm flex-wrap">

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-500" />
                        <span className="text-slate-400">
                            Normal
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <span className="text-slate-400">
                            Checking
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <span className="text-slate-400">
                            Found
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-700" />
                        <span className="text-slate-400">
                            Eliminated
                        </span>
                    </div>

                </div>

            </div>
            {/* Algorithm Information */}
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
                Learn how this searching algorithm works
            </p>

        </div>

    </div>
    {/* What is it? */}

    <div className="mb-7">

        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">
            What is it?
        </h3>

        <p className="text-slate-400 text-sm leading-6 max-w-4xl">
            {currentAlgorithm.description}
        </p>

    </div>
    {/* Logic + How It Works */}

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

                {algorithm === "linear" &&
                    "Start from the first element and compare each element with the target one by one. Stop immediately when the target is found. If every element is checked without a match, the target does not exist in the array."
                }

                {algorithm === "binary" &&
                    "Start with the complete sorted array. Find the middle element and compare it with the target. If the target is smaller, search the left half. If it is larger, search the right half. Continue until the target is found or the search range becomes empty."
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

                {algorithm === "linear" &&
                    "The algorithm moves from left to right through the array. Each comparison checks whether the current value equals the target. This method does not require the array to be sorted."
                }

                {algorithm === "binary" &&
                    "The algorithm repeatedly cuts the search space approximately in half. Because the array is sorted, an entire half can be eliminated after every comparison, making the search much faster for large arrays."
                }

            </p>

        </div>

    </div>
    {/* Important Requirement */}

    <div className="mb-7 p-4 rounded-xl bg-amber-400/5 border border-amber-400/20">

        <div className="flex items-start gap-3">

            <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />

            <div>

                <p className="text-sm font-semibold text-amber-400">
                    {algorithm === "linear"
                        ? "No sorting required"
                        : "Sorted array required"
                    }
                </p>

                <p className="text-sm text-slate-400 mt-1 leading-6">

                    {algorithm === "linear"
                        ? "Linear Search can search through elements regardless of their order."
                        : "Binary Search only works correctly when the elements are arranged in sorted order."
                    }

                </p>

            </div>

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

{algorithm === "linear" &&
`LinearSearch(array, target)

    for i = 0 to n - 1

        if array[i] == target
            return i

    return -1`
}
{algorithm === "binary" &&
`BinarySearch(array, target)

    left = 0
    right = n - 1

    while left <= right

        mid = (left + right) / 2

        if array[mid] == target
            return mid

        if array[mid] < target
            left = mid + 1

        else
            right = mid - 1

    return -1`
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
export default SearchingVisualizer