import { useEffect, useState } from "react"

import {
    insert,
    search,
    deleteKey,
    clearTable
} from "../algorithms/hashTable/hashTableOperations"

import {
    Hash,
    Play,
    Pause,
    SkipForward,
    RotateCcw,
    PlayCircle,
    Gauge,
    Search,
    Plus,
    Trash2,
    Eraser,
    CheckCircle2,
    Circle,
    ArrowRight,
    Database
} from "lucide-react"
function HashTableVisualizer() {

    const TABLE_SIZE = 11

    const createEmptyTable = () =>
        Array.from({ length: TABLE_SIZE }, () => [])
const [table, setTable] = useState([
    [],
    [{ key: 12, value: "C" }],
    [],
    [],
    [],
    [],
    [],
    [],
    [{ key: 8, value: "A" }],
    [],
    [{ key: 10, value: "B" }]
])

    const [operation, setOperation] = useState("insert")
    const [key, setKey] = useState("")
    const [value, setValue] = useState("")
    const [steps, setSteps] = useState([])
    const [currentStep, setCurrentStep] = useState(0)
    const [activeBucket, setActiveBucket] = useState(null)
    const [activeItem, setActiveItem] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [speed, setSpeed] = useState(500)
    const [message, setMessage] = useState("Press Start to Begin")
    function startOperation() {

        let result

        const numberKey = Number(key)

        if (operation === "insert") {

            if (key === "" || value === "") {
                setMessage("Enter key and value")
                return
            }

            result = insert(
                table,
                numberKey,
                value
            )

        } else if (operation === "search") {

            if (key === "") {
                setMessage("Enter key to search")
                return
            }

            result = search(
                table,
                numberKey
            )

        } else if (operation === "delete") {

            if (key === "") {
                setMessage("Enter key to delete")
                return
            }

            result = deleteKey(
                table,
                numberKey
            )

        } else if (operation === "clear") {

            result = clearTable(table)
        }

        setTable(result.table)
        setSteps(result.steps)
        setCurrentStep(0)
        setActiveBucket(null)
        setActiveItem(null)
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

        if (step.type === "hash") {

            setActiveBucket(step.index)
            setActiveItem(null)

            setMessage(
                `Key ${step.key} → Bucket ${step.index}`
            )
        }

        if (step.type === "compare") {

            setActiveBucket(step.index)
            setActiveItem(step.bucketIndex)

            setMessage(
                `Comparing key ${step.key}`
            )
        }

        if (step.type === "found") {

            setActiveBucket(step.index)
            setActiveItem(step.bucketIndex)

            setMessage(
                `Found key ${step.key}`
            )
        }

        if (step.type === "insert") {

            setActiveBucket(step.index)
            setActiveItem(null)

            setMessage(
                `Inserted key ${step.key} into bucket ${step.index}`
            )
        }

        if (step.type === "update") {

            setActiveBucket(step.index)
            setActiveItem(null)

            setMessage(
                `Updated key ${step.key}`
            )
        }

        if (step.type === "delete") {

            setActiveBucket(step.index)
            setActiveItem(null)

            setMessage(
                `Deleted key ${step.key}`
            )
        }

        if (step.type === "notFound") {

            setActiveBucket(step.index)
            setActiveItem(null)

            setMessage(
                `Key ${step.key} not found`
            )
        }

        if (step.type === "clear") {

            setActiveBucket(null)
            setActiveItem(null)

            setMessage("Hash table cleared")
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
        setActiveBucket(null)
        setActiveItem(null)
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
            description: "Calculate the bucket and insert a key-value pair using chaining.",
            icon: <Plus size={18} />
        },

        search: {
            title: "Search",
            description: "Calculate the bucket and compare keys until the target is found.",
            icon: <Search size={18} />
        },

        delete: {
            title: "Delete",
            description: "Find the key inside its bucket and remove it from the chain.",
            icon: <Trash2 size={18} />
        },

        clear: {
            title: "Clear",
            description: "Remove all key-value pairs from the hash table.",
            icon: <Eraser size={18} />
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
                            <Hash size={22} />
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight">
                            Hash Table Visualizer
                        </h1>

                    </div>

                    <p className="text-slate-400">
                        Visualize hashing, collisions, chaining and key operations.
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
                            Configure your hash table operation
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
                                setActiveBucket(null)
                                setActiveItem(null)
                                setIsPlaying(false)
                                setMessage("Press Start to Begin")

                            }}
                            className="w-full md:w-80 bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
                        >

                            <option value="insert">
                                Insert
                            </option>

                            <option value="search">
                                Search
                            </option>

                            <option value="delete">
                                Delete
                            </option>

                            <option value="clear">
                                Clear
                            </option>

                        </select>

                    </div>
                    {/* INPUTS */}

                    {operation !== "clear" && (

                        <div className="flex flex-wrap gap-4">

                            <div>

                                <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
                                    Key
                                </label>

                                <input
                                    type="number"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    placeholder="Enter key"
                                    className="w-52 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 placeholder:text-slate-600"
                                />

                            </div>
                            {operation === "insert" && (

                                <div>

                                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
                                        Value
                                    </label>

                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        placeholder="Enter value"
                                        className="w-52 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 placeholder:text-slate-600"
                                    />

                                </div>

                            )}

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
            {/* HASH TABLE */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">

                    <div>

                        <h2 className="font-semibold">
                            Hash Table
                        </h2>

                        <p className="text-xs text-slate-500 mt-1">
                            Separate chaining representation
                        </p>

                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">

                        <Database size={14} />

                        {TABLE_SIZE} buckets

                    </div>

                </div>
                <div className="p-6 space-y-3">

                    {table.map((bucket, index) => {

                        const isActive =
                            index === activeBucket

                        return (

                            <div
                                key={index}
                                className={`
                                    flex items-center gap-4
                                    transition-all duration-300
                                    ${isActive
                                        ? "scale-[1.01]"
                                        : ""
                                    }
                                `}
                            >

                                {/* INDEX */}

                                <div
                                    className={`
                                        w-16 h-14 shrink-0
                                        border-2 rounded-xl
                                        flex flex-col
                                        items-center
                                        justify-center
                                        transition-all duration-300
                                        ${isActive
                                            ? "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                                            : "bg-slate-800 border-slate-700 text-slate-400"
                                        }
                                    `}
                                >

                                    <span className="text-[10px] uppercase tracking-wider text-slate-500">
                                        Bucket
                                    </span>

                                    <span className="font-bold">
                                        {index}
                                    </span>

                                </div>
                                {/* ARROW */}

                                <ArrowRight
                                    size={18}
                                    className={
                                        isActive
                                            ? "text-cyan-400"
                                            : "text-slate-700"
                                    }
                                />
                                {/* BUCKET */}

                                <div
                                    className={`
                                        min-h-14 flex-1
                                        border-2 rounded-xl
                                        p-2.5
                                        flex items-center gap-2
                                        overflow-x-auto
                                        transition-all duration-300
                                        ${isActive
                                            ? "border-cyan-400 bg-cyan-400/5 shadow-[0_0_20px_rgba(34,211,238,0.06)]"
                                            : "border-slate-800 bg-slate-950"
                                        }
                                    `}
                                >

                                    {bucket.length === 0 ? (

                                        <span className="text-slate-600 text-sm italic px-2">
                                            empty
                                        </span>

                                    ) : (

                                        bucket.map((item, itemIndex) => {

                                            const isItemActive =
                                                index === activeBucket &&
                                                itemIndex === activeItem

                                            return (

                                                <div
                                                    key={item.key}
                                                    className={`
                                                        min-w-[120px]
                                                        px-4 py-2.5
                                                        rounded-xl
                                                        border
                                                        transition-all duration-300
                                                        ${isItemActive
                                                            ? "bg-yellow-500/20 border-yellow-400 scale-105 shadow-[0_0_20px_rgba(250,204,21,0.10)]"
                                                            : "bg-slate-800 border-cyan-500/50"
                                                        }
                                                    `}
                                                >

                                                    <div className="flex items-center gap-2">

                                                        <span className="text-xs text-slate-500">
                                                            key
                                                        </span>

                                                        <span className="font-bold">
                                                            {item.key}
                                                        </span>

                                                    </div>

                                                    <div className="flex items-center gap-2 mt-1">

                                                        <span className="text-xs text-slate-500">
                                                            value
                                                        </span>

                                                        <span className="text-slate-300">
                                                            {item.value}
                                                        </span>

                                                    </div>

                                                </div>

                                            )

                                        })

                                    )}

                                </div>

                            </div>

                        )

                    })}

                </div>

            </div>
            {/* HASH FUNCTION */}

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">

                <div className="flex items-center gap-3">

                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Hash size={18} />
                    </div>

                    <div>

                        <p className="text-sm font-medium">
                            Hash Function
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                            bucket = key % {TABLE_SIZE}
                        </p>

                    </div>

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
            {/* EDUCATIONAL SECTION */}

            <div className="bg-slate-900/60 border border-amber-500/20 rounded-2xl overflow-hidden">

                <div className="px-6 py-5 border-b border-amber-500/10">

                    <div className="flex items-center gap-3">

                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                            <Hash size={20} />
                        </div>

                        <div>

                            <h2 className="font-semibold text-white">
                                Understanding Hash Tables
                            </h2>

                            <p className="text-xs text-slate-500 mt-1">
                                Learn hashing, collisions and separate chaining
                            </p>

                        </div>

                    </div>

                </div>
                <div className="p-6 space-y-7">

                    {/* WHAT IS A HASH TABLE */}

                    <div>

                        <h3 className="text-amber-400 font-semibold mb-2">
                            What is a Hash Table?
                        </h3>

                        <p className="text-sm text-slate-400 leading-relaxed">
                            A hash table is a data structure that stores key-value pairs.
                            A hash function converts a key into a bucket index, allowing
                            the table to quickly locate where a key should be stored.
                        </p>

                    </div>
                    {/* HASH FUNCTION */}

                    <div>

                        <h3 className="text-amber-400 font-semibold mb-3">
                            Hash Function
                        </h3>

                        <p className="text-sm text-slate-400 leading-relaxed mb-3">
                            This visualizer uses the modulo operation to calculate the
                            bucket for each key.
                        </p>

                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

                            <div className="text-center">

                                <div className="text-xs text-slate-500 mb-2">
                                    Bucket Index
                                </div>

                                <div className="font-mono text-lg text-amber-300">
                                    key % {TABLE_SIZE}
                                </div>

                            </div>

                        </div>

                    </div>
                    {/* SEPARATE CHAINING */}

                    <div>

                        <h3 className="text-amber-400 font-semibold mb-3">
                            Collision Handling — Separate Chaining
                        </h3>

                        <p className="text-sm text-slate-400 leading-relaxed">
                            Different keys can produce the same bucket index. This is
                            called a collision. Instead of replacing the existing item,
                            this implementation stores multiple key-value pairs in the
                            same bucket using a chain.
                        </p>

                        <div className="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-4">

                            <div className="flex items-center gap-3 text-sm overflow-x-auto">

                                <div className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700">
                                    Bucket
                                </div>

                                <ArrowRight
                                    size={16}
                                    className="text-amber-400 shrink-0"
                                />

                                <div className="px-4 py-2 rounded-lg bg-slate-800 border border-cyan-500/40">
                                    Key 8
                                </div>

                                <ArrowRight
                                    size={16}
                                    className="text-slate-600 shrink-0"
                                />

                                <div className="px-4 py-2 rounded-lg bg-slate-800 border border-cyan-500/40">
                                    Key 15
                                </div>

                                <ArrowRight
                                    size={16}
                                    className="text-slate-600 shrink-0"
                                />

                                <div className="px-4 py-2 rounded-lg bg-slate-800 border border-cyan-500/40">
                                    Key 22
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
                                "First, the hash function calculates the bucket index. The bucket is then checked for an existing key. If the key exists, its value is updated. Otherwise, the new key-value pair is added to the bucket chain."}

                            {operation === "search" &&
                                "The hash function determines the bucket. The implementation then checks each key-value pair in that bucket until the requested key is found or the chain is exhausted."}

                            {operation === "delete" &&
                                "The hash function determines the bucket. The chain is searched for the requested key, and the matching key-value pair is removed when found."}

                            {operation === "clear" &&
                                "All buckets are emptied, removing every key-value pair from the hash table."}

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
                                    `INSERT(table, key, value)
    index = key % TABLE_SIZE

    for each item in table[index]
        if item.key == key
            update item.value
            return

    add { key, value } to table[index]`}
                                {operation === "search" &&
                                    `SEARCH(table, key)
    index = key % TABLE_SIZE

    for each item in table[index]
        if item.key == key
            return item

    return not found`}
                                {operation === "delete" &&
                                    `DELETE(table, key)
    index = key % TABLE_SIZE

    find key inside table[index]

    if key exists
        remove key-value pair
    else
        return not found`}
                                {operation === "clear" &&
                                    `CLEAR(table)
    for each bucket
        remove all key-value pairs

    return empty table`}

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
                                    O(1) average
                                </div>

                            </div>
                            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">

                                <div className="text-xs text-slate-500">
                                    Search
                                </div>

                                <div className="text-white font-mono mt-1">
                                    O(1) average
                                </div>

                            </div>
                            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">

                                <div className="text-xs text-slate-500">
                                    Delete
                                </div>

                                <div className="text-white font-mono mt-1">
                                    O(1) average
                                </div>

                            </div>
                            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">

                                <div className="text-xs text-slate-500">
                                    Worst Case
                                </div>

                                <div className="text-white font-mono mt-1">
                                    O(n)
                                </div>

                            </div>

                        </div>

                    </div>
                    {/* KEY IDEA */}

                    <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">

                        <h3 className="text-amber-400 font-semibold mb-2">
                            Key Idea
                        </h3>

                        <p className="text-sm text-slate-400 leading-relaxed">
                            Hashing gives fast access by converting a key into an array
                            index. When collisions occur, separate chaining allows
                            multiple elements to coexist inside the same bucket.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default HashTableVisualizer