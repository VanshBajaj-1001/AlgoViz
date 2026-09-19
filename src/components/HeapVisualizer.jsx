import { useEffect, useState } from "react"
import {
    insert,
    peek,
    extract
} from "../algorithms/heap/heapOperations"
import heapSort from "../algorithms/heap/heapSort"
import {
    Layers3,
    Play,
    Pause,
    SkipForward,
    RotateCcw,
    PlayCircle,
    Gauge,
    Plus,
    Eye,
    ArrowDownToLine,
    ArrowUpDown,
    CheckCircle2,
    Circle,ArrowDown,ArrowUp
} from "lucide-react"
function HeapVisualizer() {
    const [heap, setHeap] = useState([50, 30, 40, 10, 20])
    const [heapType, setHeapType] = useState("max")
    const [operation, setOperation] = useState("insert")
    const [value, setValue] = useState("")
    const [steps, setSteps] = useState([])
    const [currentStep, setCurrentStep] = useState(0)
    const [activeIndices, setActiveIndices] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [speed, setSpeed] = useState(500)
    const [message, setMessage] = useState("Press Start to Begin")
    function startOperation() {

        let result

        if (operation === "insert") {

            if (value === "") {
                setMessage("Enter a value")
                return
            }

            result = insert(
                heap,
                Number(value),
                heapType
            )

        } else if (operation === "peek") {

            result = peek(heap)

        } else if (operation === "extract") {

            result = extract(
                heap,
                heapType
            )

        }

        else if (operation === "heapSort") {

            result = heapSort(heap)

            setHeap(result.array)
            setSteps(result.steps)
            setCurrentStep(0)
            setActiveIndices([])
            setIsPlaying(false)
            setMessage("Heap Sort started")

            return
        }

        setHeap(result.heap)
        setSteps(result.steps)
        setCurrentStep(0)
        setActiveIndices([])
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

        if (step.type === "insert") {

            setActiveIndices([step.index])

            setMessage(
                `Inserted ${heap[step.index]}`
            )
        }

        if (step.type === "compare") {

            setActiveIndices([
                step.index1,
                step.index2
            ])

            setMessage(
                `Comparing indices ${step.index1} and ${step.index2}`
            )
        }

        if (step.type === "swap") {

            setActiveIndices([
                step.index1,
                step.index2
            ])

            if (operation === "heapSort" && step.array) {
                setHeap(step.array)
            }

            setMessage(
                `Swapped indices ${step.index1} and ${step.index2}`
            )
        }

        if (step.type === "peek") {

            setActiveIndices([0])

            setMessage(
                `Top element is ${heap[0]}`
            )
        }

        if (step.type === "extract") {

            setActiveIndices([step.index])

            setMessage(
                `Extracted ${step.value}`
            )
        }

        if (step.type === "empty") {

            setActiveIndices([])

            setMessage("Heap is empty")
        }

        if (step.type === "sorted") {

            setActiveIndices([])

            setHeap(step.array)

            setMessage("Heap Sort completed")
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
        setActiveIndices([])
        setIsPlaying(false)
        setMessage("Press Start to Begin")
    }
    const progress =
        steps.length > 0
            ? Math.min((currentStep / steps.length) * 100, 100)
            : 0
    const operationInfo = {

        insert: {
            title: "Insert",
            description: "Add a new value while maintaining the heap property.",
            icon: <Plus size={18} />
        },

        extract: {
            title: "Extract Root",
            description: "Remove the root element and restore the heap property.",
            icon: <ArrowDownToLine size={18} />
        },

        peek: {
            title: "Peek",
            description: "Inspect the root element without removing it.",
            icon: <Eye size={18} />
        },

        heapSort: {
            title: "Heap Sort",
            description: "Sort the array by repeatedly extracting elements from the heap.",
            icon: <ArrowUpDown size={18} />
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
                            <Layers3 size={22} />
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight">
                            Heap Visualizer
                        </h1>

                    </div>

                    <p className="text-slate-400">
                        Visualize heap operations, heapify and Heap Sort step by step.
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
                            Configure your heap operation
                        </p>

                    </div>

                </div>
                <div className="p-6 space-y-6">

                    {/* HEAP TYPE + OPERATION */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>

                            <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
                                Heap Type
                            </label>

                            <select
                                value={heapType}
                                onChange={(e) => {

                                    setHeapType(e.target.value)
                                    setSteps([])
                                    setCurrentStep(0)
                                    setActiveIndices([])
                                    setIsPlaying(false)
                                    setMessage("Press Start to Begin")

                                }}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
                            >

                                <option value="max">
                                    Max Heap
                                </option>

                                <option value="min">
                                    Min Heap
                                </option>

                            </select>

                        </div>
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
                                    setActiveIndices([])
                                    setIsPlaying(false)
                                    setMessage("Press Start to Begin")

                                }}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
                            >

                                <option value="insert">
                                    Insert
                                </option>

                                <option value="extract">
                                    Extract Root
                                </option>

                                <option value="peek">
                                    Peek
                                </option>

                                <option value="heapSort">
                                    Heap Sort
                                </option>

                            </select>

                        </div>

                    </div>
                    {/* VALUE */}

                    {operation === "insert" && (

                        <div>

                            <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
                                Value
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
            {/* ARRAY REPRESENTATION */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">

                    <div>

                        <h2 className="font-semibold">
                            Array Representation
                        </h2>

                        <p className="text-xs text-slate-500 mt-1">
                            Index-based view of the heap
                        </p>

                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">

                        {heapType === "max"
                            ? <ArrowUp size={14} />
                            : <ArrowDown size={14} />
                        }

                        {heapType === "max"
                            ? "Maximum at root"
                            : "Minimum at root"}

                    </div>

                </div>
                <div className="p-8 overflow-x-auto">

                    <div className="flex gap-3 min-w-max">

                        {heap.map((item, index) => {

                            const isActive =
                                activeIndices.includes(index)

                            return (

                                <div
                                    key={index}
                                    className={`
                                        w-20 h-20
                                        border-2 rounded-xl
                                        flex flex-col
                                        items-center
                                        justify-center
                                        transition-all duration-300
                                        ${
                                            isActive
                                                ? "bg-yellow-500/20 border-yellow-400 scale-105 shadow-[0_0_25px_rgba(250,204,21,0.12)]"
                                                : "bg-slate-800/80 border-cyan-500/60"
                                        }
                                    `}
                                >

                                    <span className="text-[11px] text-slate-500">
                                        index {index}
                                    </span>

                                    <span className="text-xl font-bold mt-1">
                                        {item}
                                    </span>

                                </div>

                            )

                        })}

                    </div>

                </div>

            </div>
            {/* HEAP STRUCTURE */}
{/* HEAP STRUCTURE */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

    <div className="px-6 py-4 border-b border-slate-800">

        <h2 className="font-semibold">
            Heap Structure
        </h2>

        <p className="text-xs text-slate-500 mt-1">
            Complete binary tree representation
        </p>

    </div>

    <div className="p-8 overflow-x-auto">

        {heap.length === 0 ? (

            <div className="min-h-[220px] flex items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <Layers3 size={26} />
                    </div>

                    <h3 className="font-semibold text-white mb-1">
                        Heap is empty
                    </h3>

                    <p className="text-sm text-slate-500">
                        Insert an element to build the heap.
                    </p>

                </div>

            </div>

        ) : (

            <div
                className="relative mx-auto min-w-[700px]"
                style={{
                    height: `${Math.max(
                        260,
                        (Math.floor(Math.log2(heap.length)) + 1) * 100
                    )}px`
                }}
            >

                {/* CONNECTIONS */}

                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                >

                    {heap.map((_, index) => {

                        if (index === 0) return null

                        const parentIndex = Math.floor((index - 1) / 2)

                        const level = Math.floor(
                            Math.log2(index + 1)
                        )

                        const parentLevel = level - 1

                        const position =
                            index - (2 ** level - 1)

                        const parentPosition =
                            parentIndex - (2 ** parentLevel - 1)

                        const levelCount = 2 ** level
                        const parentLevelCount = 2 ** parentLevel

                        const x1 =
                            ((parentPosition + 0.5) /
                                parentLevelCount) *
                            100

                        const x2 =
                            ((position + 0.5) /
                                levelCount) *
                            100

                        const y1 = parentLevel * 100 + 45
                        const y2 = level * 100 + 45

                        return (
                            <line
                                key={`edge-${index}`}
                                x1={`${x1}%`}
                                y1={y1}
                                x2={`${x2}%`}
                                y2={y2}
                                stroke="#334155"
                                strokeWidth="2"
                            />
                        )
                    })}

                </svg>
                {/* NODES */}

                {heap.map((item, index) => {

                    const level = Math.floor(
                        Math.log2(index + 1)
                    )

                    const position =
                        index - (2 ** level - 1)

                    const levelCount = 2 ** level

                    const left =
                        ((position + 0.5) /
                            levelCount) *
                        100

                    const isActive =
                        activeIndices.includes(index)

                    return (
                        <div
                            key={`node-${index}`}
                            className="absolute -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `${left}%`,
                                top: `${level * 100 + 45}px`
                            }}
                        >

                            <div
                                className={`
                                    w-14 h-14
                                    rounded-full
                                    border-2
                                    flex items-center justify-center
                                    font-bold
                                    transition-all duration-300
                                    ${
                                        isActive
                                            ? "bg-yellow-500/20 border-yellow-400 text-yellow-300 scale-110 shadow-[0_0_25px_rgba(250,204,21,0.18)]"
                                            : "bg-slate-800 border-cyan-500/70 text-white"
                                    }
                                `}
                            >
                                {item}
                            </div>

                            <div className="text-center mt-2 text-[10px] text-slate-600">
                                index {index}
                            </div>

                        </div>
                    )
                })}

            </div>

        )}

    </div>

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
            {/* EDUCATIONAL SECTION */}

<div className="bg-slate-900/60 border border-amber-500/20 rounded-2xl overflow-hidden">

    <div className="px-6 py-5 border-b border-amber-500/10">

        <div className="flex items-center gap-3">

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Layers3 size={20} />
            </div>

            <div>

                <h2 className="font-semibold text-white">
                    Understanding Heaps
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                    Learn the structure and operations behind the visualization
                </p>

            </div>

        </div>

    </div>
    <div className="p-6 space-y-7">

        {/* WHAT IS A HEAP */}

        <div>

            <h3 className="text-amber-400 font-semibold mb-2">
                What is a Heap?
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed">
                A heap is a complete binary tree that follows a special
                ordering property called the heap property. In a Max Heap,
                the parent is always greater than or equal to its children.
                In a Min Heap, the parent is always less than or equal to
                its children.
            </p>

        </div>
        {/* MAX VS MIN */}

        <div>

            <h3 className="text-amber-400 font-semibold mb-3">
                Max Heap vs Min Heap
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">

                    <h4 className="font-medium text-white mb-2">
                        Max Heap
                    </h4>

                    <p className="text-sm text-slate-400 leading-relaxed">
                        The largest element is always at the root.
                        Every parent is greater than or equal to its
                        children.
                    </p>

                </div>
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">

                    <h4 className="font-medium text-white mb-2">
                        Min Heap
                    </h4>

                    <p className="text-sm text-slate-400 leading-relaxed">
                        The smallest element is always at the root.
                        Every parent is less than or equal to its
                        children.
                    </p>

                </div>

            </div>

        </div>
        {/* ARRAY REPRESENTATION */}

        <div>

            <h3 className="text-amber-400 font-semibold mb-3">
                Heap as an Array
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-3">
                A heap does not require separate tree nodes. Because it is
                a complete binary tree, it can be efficiently stored inside
                an array.
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">

                    <div>
                        <span className="text-slate-500">
                            Parent
                        </span>

                        <div className="font-mono text-amber-300 mt-1">
                            ⌊(i - 1) / 2⌋
                        </div>
                    </div>
                    <div>
                        <span className="text-slate-500">
                            Left Child
                        </span>

                        <div className="font-mono text-amber-300 mt-1">
                            2i + 1
                        </div>
                    </div>
                    <div>
                        <span className="text-slate-500">
                            Right Child
                        </span>

                        <div className="font-mono text-amber-300 mt-1">
                            2i + 2
                        </div>
                    </div>

                </div>

            </div>

        </div>
        {/* HOW IT WORKS */}

        <div>

            <h3 className="text-amber-400 font-semibold mb-3">
                {currentOperation.title} — How It Works
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed">
                {operation === "insert" &&
                    "The new element is placed at the end of the heap. It is then compared with its parent and moved upward until the heap property is restored."}

                {operation === "peek" &&
                    "Peek simply reads the root element. No elements are removed or rearranged."}

                {operation === "extract" &&
                    "The root element is removed. The last element is moved to the root and then moved downward until the heap property is restored."}

                {operation === "heapSort" &&
                    "Heap Sort builds a heap and repeatedly moves the root element to its final position while restoring the heap property after each step."}
            </p>

        </div>
        {/* PSEUDOCODE */}

        <div>

            <h3 className="text-amber-400 font-semibold mb-3">
                Pseudocode
            </h3>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

                <div className="flex items-center gap-1 mb-4">

                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />

                </div>
                <pre className="text-sm text-slate-300 leading-7 overflow-x-auto font-mono">

{operation === "insert" &&
`INSERT(heap, value)
    Add value at the end
    Compare with its parent

    while value violates heap property
        Swap value with parent
        Move to parent position`}
{operation === "peek" &&
`PEEK(heap)
    if heap is empty
        return empty

    return heap[0]`}
{operation === "extract" &&
`EXTRACT_ROOT(heap)
    Save the root element
    Move last element to root
    Remove last position

    Heapify downward
    until heap property is restored

    return saved root`}
{operation === "heapSort" &&
`HEAP_SORT(array)
    Build a heap

    for each element from end
        Swap root with last element
        Reduce heap size
        Heapify downward

    return sorted array`}

                </pre>

            </div>

        </div>
        {/* COMPLEXITY */}

        <div>

            <h3 className="text-amber-400 font-semibold mb-3">
                Time & Space Complexity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <div className="text-xs text-slate-500">
                        Insert
                    </div>
                    <div className="text-white font-mono mt-1">
                        O(log n)
                    </div>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <div className="text-xs text-slate-500">
                        Peek
                    </div>
                    <div className="text-white font-mono mt-1">
                        O(1)
                    </div>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <div className="text-xs text-slate-500">
                        Extract
                    </div>
                    <div className="text-white font-mono mt-1">
                        O(log n)
                    </div>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <div className="text-xs text-slate-500">
                        Heap Sort
                    </div>
                    <div className="text-white font-mono mt-1">
                        O(n log n)
                    </div>
                </div>

            </div>

        </div>

    </div>

</div>
        </div>
    )
}
export default HeapVisualizer