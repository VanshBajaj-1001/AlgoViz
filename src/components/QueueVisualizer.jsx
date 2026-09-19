import { useEffect, useState } from "react"

import {
    enqueue,
    dequeue,
    front,
    rear,
    search,
    clearQueue
} from "../algorithms/queue/queueOperations"

import {
    ListOrdered,
    Play,
    Pause,
    SkipForward,
    RotateCcw,
    PlayCircle,
    Gauge,
    Search,
    Plus,
    ArrowDownToLine,
    ArrowUpFromLine,
    Eye,
    Trash2,
    CheckCircle2,
    Circle
} from "lucide-react"
function QueueVisualizer() {

    const [queue, setQueue] = useState([10, 20, 30])
    const [operation, setOperation] = useState("enqueue")
    const [value, setValue] = useState("")
    const [steps, setSteps] = useState([])
    const [currentStep, setCurrentStep] = useState(0)
    const [activeIndex, setActiveIndex] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [speed, setSpeed] = useState(500)
    const [message, setMessage] = useState("Press Start to Begin")
    function startOperation() {

        let result
        const number = Number(value)

        if (operation === "enqueue") {

            if (value === "") {
                setMessage("Enter a value")
                return
            }

            result = enqueue(queue, number)

        } else if (operation === "dequeue") {

            result = dequeue(queue)

        } else if (operation === "front") {

            result = front(queue)

        } else if (operation === "rear") {

            result = rear(queue)

        } else if (operation === "search") {

            if (value === "") {
                setMessage("Enter a value to search")
                return
            }

            result = search(queue, number)

        } else if (operation === "clear") {

            result = clearQueue(queue)
        }

        setQueue(result.queue)
        setSteps(result.steps)
        setCurrentStep(0)
        setActiveIndex(null)
        setIsPlaying(false)
        setMessage("Operation started")
    }
    function nextStep() {

        if (steps.length === 0) {
            setMessage("Press Start First")
            return
        }

        if (currentStep >= steps.length) {
            setIsPlaying(false)
            return
        }

        const step = steps[currentStep]

        if (step.type === "enqueue") {
            setMessage(`Enqueued ${step.value}`)
            setActiveIndex(queue.length - 1)
        }

        if (step.type === "dequeue") {
            setMessage(`Dequeued ${step.value}`)
            setActiveIndex(0)
        }

        if (step.type === "front") {
            setMessage(`Front element is ${step.value}`)
            setActiveIndex(0)
        }

        if (step.type === "rear") {
            setMessage(`Rear element is ${step.value}`)
            setActiveIndex(queue.length - 1)
        }

        if (step.type === "compare") {
            setActiveIndex(step.index)
            setMessage(`Checking ${step.value}`)
        }

        if (step.type === "found") {
            setActiveIndex(step.index)
            setMessage(`Found ${step.value}`)
        }

        if (step.type === "notFound") {
            setActiveIndex(null)
            setMessage("Value not found")
        }

        if (step.type === "empty") {
            setActiveIndex(null)
            setMessage("Queue is empty")
        }

        if (step.type === "clear") {
            setActiveIndex(null)
            setMessage("Queue cleared")
        }

        const nextStepIndex = currentStep + 1

        setCurrentStep(nextStepIndex)

        if (nextStepIndex >= steps.length) {
            setIsPlaying(false)
        }
    }
    function togglePlay() {

        if (steps.length === 0) {
            setMessage("Press Start First")
            return
        }

        setIsPlaying(prev => !prev)
    }
    useEffect(() => {

        if (!isPlaying) return

        const timer = setTimeout(() => {
            nextStep()
        }, speed)

        return () => clearTimeout(timer)

    }, [isPlaying, currentStep, speed])
    function resetVisualization() {

        setSteps([])
        setCurrentStep(0)
        setActiveIndex(null)
        setIsPlaying(false)
        setMessage("Press Start to Begin")
    }
    const progress =
        steps.length > 0
            ? Math.min((currentStep / steps.length) * 100, 100)
            : 0
    const operationInfo = {

        enqueue: {
            title: "Enqueue",
            description: "Add a new element to the rear of the queue.",
            icon: <Plus size={18} />
        },

        dequeue: {
            title: "Dequeue",
            description: "Remove the element from the front of the queue.",
            icon: <ArrowDownToLine size={18} />
        },

        front: {
            title: "Front",
            description: "View the first element without removing it.",
            icon: <Eye size={18} />
        },

        rear: {
            title: "Rear",
            description: "View the last element without removing it.",
            icon: <ArrowUpFromLine size={18} />
        },

        search: {
            title: "Search",
            description: "Check queue elements until the target value is found.",
            icon: <Search size={18} />
        },

        clear: {
            title: "Clear",
            description: "Remove all elements from the queue.",
            icon: <Trash2 size={18} />
        }

    }
    const currentOperation = operationInfo[operation]
    return (

        <div className="space-y-7">

            {/* HEADER */}

            <div className="flex items-start justify-between gap-6">

                <div>

                    <div className="flex items-center gap-3 mb-2">

                        <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                            <ListOrdered size={22} />
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight">
                            Queue Visualizer
                        </h1>

                    </div>

                    <p className="text-slate-400">
                        Visualize FIFO operations on a queue step by step.
                    </p>

                </div>

                <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
                    <Gauge size={16} />
                    Interactive Visualization
                </div>

            </div>
            {/* CONTROL PANEL */}

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">

                    <div className="p-2 rounded-lg bg-slate-800 text-cyan-400">
                        {currentOperation.icon}
                    </div>

                    <div>

                        <h2 className="font-semibold text-white">
                            {currentOperation.title}
                        </h2>

                        <p className="text-xs text-slate-500 mt-0.5">
                            Configure your operation
                        </p>

                    </div>

                </div>
                <div className="p-6 space-y-6">

                    {/* OPERATION */}

                    <div>

                        <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
                            Operation
                        </label>

                        <select
                            value={operation}
                            onChange={(e) => {

                                setOperation(e.target.value)
                                setSteps([])
                                setCurrentStep(0)
                                setActiveIndex(null)
                                setIsPlaying(false)
                                setMessage("Press Start to Begin")

                            }}
                            className="w-full md:w-80 bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
                        >

                            <option value="enqueue">
                                Enqueue
                            </option>

                            <option value="dequeue">
                                Dequeue
                            </option>

                            <option value="front">
                                Front
                            </option>

                            <option value="rear">
                                Rear
                            </option>

                            <option value="search">
                                Search
                            </option>

                            <option value="clear">
                                Clear
                            </option>

                        </select>

                    </div>
                    {/* VALUE INPUT */}

                    {(operation === "enqueue" || operation === "search") && (

                        <div>

                            <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">

                                {operation === "search"
                                    ? "Value to Search"
                                    : "Value"}

                            </label>

                            <input
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Enter value"
                                className="w-52 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 placeholder:text-slate-600"
                            />

                        </div>

                    )}
                    {/* BUTTONS */}

                    <div className="flex flex-wrap gap-3">

                        <button
                            onClick={startOperation}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition"
                        >
                            <PlayCircle size={17} />
                            Start
                        </button>
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
                        >
                            <SkipForward size={17} />
                            Step
                        </button>
                        <button
                            onClick={togglePlay}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
                        >

                            {isPlaying
                                ? <Pause size={17} />
                                : <Play size={17} />
                            }

                            {isPlaying ? "Pause" : "Play"}

                        </button>
                        <button
                            onClick={resetVisualization}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
                        >
                            <RotateCcw size={17} />
                            Reset
                        </button>

                    </div>
                    {/* SPEED */}

                    <div className="flex items-center gap-3">

                        <Gauge
                            size={17}
                            className="text-slate-500"
                        />

                        <label className="text-sm text-slate-400">
                            Speed
                        </label>

                        <select
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-400"
                        >

                            <option value={1000}>
                                Slow
                            </option>

                            <option value={500}>
                                Normal
                            </option>

                            <option value={200}>
                                Fast
                            </option>

                        </select>

                    </div>

                </div>

            </div>
            {/* STATUS */}

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">

                <div className="flex items-center justify-between mb-3">

                    <div className="flex items-center gap-2">

                        {currentStep >= steps.length && steps.length > 0
                            ? (
                                <CheckCircle2
                                    size={18}
                                    className="text-green-400"
                                />
                            )
                            : (
                                <Circle
                                    size={18}
                                    className="text-cyan-400"
                                />
                            )}

                        <span className="text-sm font-medium">
                            {message}
                        </span>

                    </div>

                    <span className="text-xs text-slate-500">

                        {steps.length > 0
                            ? `${Math.min(currentStep, steps.length)} / ${steps.length} steps`
                            : "Ready"}

                    </span>

                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">

                    <div
                        className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />

                </div>

            </div>
            {/* QUEUE VISUALIZATION */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">

                    <div>

                        <h2 className="font-semibold">
                            Queue
                        </h2>

                        <p className="text-xs text-slate-500 mt-1">
                            FIFO — First In, First Out
                        </p>

                    </div>

                    <div className="text-xs text-slate-500">
                        {queue.length} {queue.length === 1 ? "element" : "elements"}
                    </div>

                </div>
                <div className="min-h-[320px] flex items-center justify-center px-8 py-12 overflow-x-auto">

                    <div className="flex items-center min-w-max">

                        {/* FRONT */}

                        <div className="flex flex-col items-center mr-5">

                            <span className="text-xs font-semibold text-cyan-400 mb-2">
                                FRONT
                            </span>

                            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />

                        </div>
                        {queue.map((item, index) => {

                            const isActive = index === activeIndex

                            return (

                                <div
                                    key={index}
                                    className="flex items-center shrink-0"
                                >

                                    <div
                                        className={`
                                            w-28 h-20
                                            border-2 rounded-xl
                                            flex items-center justify-center
                                            text-xl font-bold
                                            transition-all duration-300
                                            ${
                                                isActive
                                                    ? "bg-yellow-500/20 border-yellow-400 scale-105 shadow-[0_0_25px_rgba(250,204,21,0.12)]"
                                                    : "bg-slate-800/80 border-cyan-500/60"
                                            }
                                        `}
                                    >
                                        {item}
                                    </div>
                                    {index < queue.length - 1 && (

                                        <div className="flex items-center px-3">

                                            <div className="w-7 h-px bg-slate-600" />

                                            <span className="text-cyan-400 text-xl">
                                                →
                                            </span>

                                        </div>

                                    )}

                                </div>

                            )

                        })}
                        {/* REAR */}

                        <div className="flex flex-col items-center ml-5">

                            <span className="text-xs font-semibold text-cyan-400 mb-2">
                                REAR
                            </span>

                            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />

                        </div>

                    </div>

                </div>

            </div>
            {/* DIRECTION */}

            <div className="flex justify-center items-center gap-4 text-sm text-slate-500">

                <span className="text-cyan-400">
                    FRONT
                </span>

                <span>→</span>

                <span>Elements</span>

                <span>→</span>

                <span className="text-cyan-400">
                    REAR
                </span>

            </div>
            {/* LEGEND */}

            <div className="flex flex-wrap items-center gap-6 px-2">

                <div className="flex items-center gap-2 text-sm text-slate-400">

                    <div className="w-3 h-3 rounded-full bg-cyan-400" />

                    Element

                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">

                    <div className="w-3 h-3 rounded-full bg-yellow-400" />

                    Active

                </div>

            </div>
            {/* OPERATION INFO */}

           {/* =====================================================
    EDUCATIONAL INFORMATION
===================================================== */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

    {/* Header */}

    <div className="flex items-center gap-3 mb-7">

        <div className="w-1 h-8 bg-amber-400 rounded-full" />

        <div>
            <h2 className="text-xl font-semibold">
                Learn: {currentOperation.title}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
                Understand how this queue operation works.
            </p>
        </div>

    </div>
    {/* What is it? */}

    <div className="mb-7">

        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">
            What is it?
        </h3>

        <p className="text-sm text-slate-400 leading-6 max-w-4xl">

            {operation === "enqueue" &&
                "Enqueue adds a new element to the rear of the queue. The new element becomes the last element in the queue."
            }

            {operation === "dequeue" &&
                "Dequeue removes the element from the front of the queue. It follows the FIFO principle: First In, First Out."
            }

            {operation === "front" &&
                "Front returns the first element of the queue without removing it."
            }

            {operation === "rear" &&
                "Rear returns the last element of the queue without removing it."
            }

            {operation === "search" &&
                "Search checks the elements of the queue one by one until the target value is found or the entire queue has been checked."
            }

            {operation === "clear" &&
                "Clear removes all elements from the queue and leaves it empty."
            }

        </p>

    </div>
    {/* Logic + How It Works */}

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7">

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">

            <div className="flex items-center gap-2 mb-3">

                <div className="w-2 h-2 rounded-full bg-amber-400" />

                <h3 className="font-semibold text-amber-400">
                    Logic
                </h3>

            </div>

            <p className="text-sm text-slate-400 leading-6">

                {operation === "enqueue" &&
                    "Add the new element after the current rear and update the rear position."
                }

                {operation === "dequeue" &&
                    "Remove the element at the front and move the front position to the next element."
                }

                {operation === "front" &&
                    "Access the first element without changing the queue."
                }

                {operation === "rear" &&
                    "Access the last element without changing the queue."
                }

                {operation === "search" &&
                    "Start from the front and compare each element with the target until it is found or the rear is reached."
                }

                {operation === "clear" &&
                    "Remove every element so that the queue contains no elements."
                }

            </p>

        </div>
        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">

            <div className="flex items-center gap-2 mb-3">

                <div className="w-2 h-2 rounded-full bg-amber-400" />

                <h3 className="font-semibold text-amber-400">
                    How It Works
                </h3>

            </div>

            <p className="text-sm text-slate-400 leading-6">

                {operation === "enqueue" &&
                    "The new element is placed at the rear, allowing elements already waiting in the queue to be processed first."
                }

                {operation === "dequeue" &&
                    "The oldest element is removed first. After removal, the next element becomes the new front."
                }

                {operation === "front" &&
                    "The queue is inspected at its front position while all elements remain unchanged."
                }

                {operation === "rear" &&
                    "The last element is inspected while the queue itself remains unchanged."
                }

                {operation === "search" &&
                    "Elements are examined sequentially from front to rear because a queue does not provide direct random access."
                }

                {operation === "clear" &&
                    "All elements are removed and the queue returns to its empty state."
                }

            </p>

        </div>

    </div>
    {/* Key Concept */}

    <div className="mb-7 p-4 rounded-xl bg-amber-400/5 border border-amber-400/20">

        <div className="flex items-start gap-3">

            <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />

            <div>

                <p className="text-sm font-semibold text-amber-400">
                    Key Concept
                </p>

                <p className="text-sm text-slate-400 mt-1 leading-6">

                    {operation === "enqueue" &&
                        "Queue follows FIFO — First In, First Out. A newly added element waits behind the elements already in the queue."
                    }

                    {operation === "dequeue" &&
                        "Dequeue always removes from the front, ensuring the earliest element added is processed first."
                    }

                    {operation === "front" &&
                        "Front lets you see which element will be removed next without modifying the queue."
                    }

                    {operation === "rear" &&
                        "Rear identifies the most recently added element currently present in the queue."
                    }

                    {operation === "search" &&
                        "Searching a queue is generally O(n) because elements may need to be checked one by one."
                    }

                    {operation === "clear" &&
                        "After clearing, the queue contains no elements and both front and rear have no valid element to reference."
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

{operation === "enqueue" &&
`Enqueue(queue, value)

    add value to rear of queue

    return queue`
}

{operation === "dequeue" &&
`Dequeue(queue)

    if queue is empty
        return EMPTY

    value = front element

    remove front element

    return value`
}

{operation === "front" &&
`Front(queue)

    if queue is empty
        return EMPTY

    return first element`
}

{operation === "rear" &&
`Rear(queue)

    if queue is empty
        return EMPTY

    return last element`
}

{operation === "search" &&
`Search(queue, target)

    for each element from front to rear

        if element == target
            return FOUND

    return NOT FOUND`
}

{operation === "clear" &&
`Clear(queue)

    remove all elements

    return empty queue`
}

            </pre>

        </div>

    </div>
    {/* Complexity */}

    <div>

        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
            Complexity
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="p-4 rounded-lg bg-slate-800/60">

                <p className="text-xs text-slate-500 uppercase">
                    Time
                </p>

                <p className="mt-2 text-amber-400 font-semibold">

                    {operation === "enqueue" && "O(1)"}
                    {operation === "dequeue" && "O(1)"}
                    {operation === "front" && "O(1)"}
                    {operation === "rear" && "O(1)"}
                    {operation === "search" && "O(n)"}
                    {operation === "clear" && "O(n)"}

                </p>

            </div>
            <div className="p-4 rounded-lg bg-slate-800/60">

                <p className="text-xs text-slate-500 uppercase">
                    Space
                </p>

                <p className="mt-2 text-amber-400 font-semibold">
                    O(1) Auxiliary
                </p>

            </div>
            <div className="p-4 rounded-lg bg-slate-800/60">

                <p className="text-xs text-slate-500 uppercase">
                    Principle
                </p>

                <p className="mt-2 text-amber-400 font-semibold">
                    FIFO
                </p>

            </div>

        </div>

    </div>

</div>
        </div>
    )
}
export default QueueVisualizer