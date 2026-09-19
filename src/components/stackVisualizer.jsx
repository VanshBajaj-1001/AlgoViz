import { useEffect, useState } from "react";
import {
    push,
    pop,
    peek,
    search,
    clearStack
} from "../algorithms/stack/stackOperations";

import {
    Layers,
    Play,
    Pause,
    SkipForward,
    RotateCcw,
    PlayCircle,
    Gauge,
    Search,
    Plus,
    Eye,
    Trash2,
    CheckCircle2,
    Circle
} from "lucide-react";
function StackVisualizer() {

    const [stack, setStack] = useState([10, 20, 30])
    const [operation, setOperation] = useState("push")
    const [value, setValue] = useState("")
    const [steps, setSteps] = useState([])
    const [currentStep, setCurrentStep] = useState(0)
    const [activeIndex, setActiveIndex] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [speed, setSpeed] = useState(500)
    const [message, setMessage] = useState("Press Start to begin")
    function startOperation() {

        let result

        const number = Number(value)

        if (operation === "push") {

            if (value === "") {
                setMessage("Enter a value")
                return
            }

            result = push(stack, number)

        }

        else if (operation === "pop") {

            result = pop(stack)

        }

        else if (operation === "peek") {

            result = peek(stack)

        }

        else if (operation === "search") {

            if (value === "") {
                setMessage("Enter a value to search")
                return
            }

            result = search(stack, number)

        }

        else if (operation === "clear") {

            result = clearStack(stack)

        }

        setStack(result.stack)
        setSteps(result.steps)
        setCurrentStep(0)
        setActiveIndex(null)
        setIsPlaying(false)
        setMessage("operation Started")
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

        if (step.type === "push") {
            setMessage(`Pushed ${step.value}`)
            setActiveIndex(stack.length - 1)
        }

        if (step.type === "pop") {
            setMessage(`Popped ${step.value}`)
            setActiveIndex(stack.length - 1)
        }

        if (step.type === "peek") {
            setMessage(`Top element is ${step.value}`)
            setActiveIndex(stack.length - 1)
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
            setMessage("Stack is empty")
        }

        if (step.type === "clear") {
            setActiveIndex(null)
            setMessage("Stack cleared")
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

        push: {
            title: "Push",
            description: "Add a new element to the top of the stack.",
            icon: <Plus size={18} />
        },

        pop: {
            title: "Pop",
            description: "Remove the top element from the stack.",
            icon: <Trash2 size={18} />
        },

        peek: {
            title: "Peek",
            description: "View the top element without removing it.",
            icon: <Eye size={18} />
        },

        search: {
            title: "Search",
            description: "Check the stack elements until the target value is found.",
            icon: <Search size={18} />
        },

        clear: {
            title: "Clear",
            description: "Remove all elements from the stack.",
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
                            <Layers size={22} />
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight">
                            Stack Visualizer
                        </h1>

                    </div>

                    <p className="text-slate-400">
                        Visualize LIFO operations on a stack step by step.
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

                            <option value="push">
                                Push
                            </option>

                            <option value="pop">
                                Pop
                            </option>

                            <option value="peek">
                                Peek
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

                    {(operation === "push" || operation === "search") && (

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
            {/* STACK VISUALIZATION */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">

                    <div>

                        <h2 className="font-semibold">
                            Stack
                        </h2>

                        <p className="text-xs text-slate-500 mt-1">
                            LIFO — Last In, First Out
                        </p>

                    </div>

                    <div className="text-xs text-slate-500">
                        {stack.length} {stack.length === 1 ? "element" : "elements"}
                    </div>

                </div>
                <div className="min-h-[500px] flex items-center justify-center p-8">

                    <div className="relative flex flex-col items-center">

                        {/* TOP LABEL */}

                        {stack.length > 0 && (

                            <div className="flex items-center gap-2 mb-3 text-cyan-400 text-sm font-medium">

                                <span>TOP</span>

                                <span>↓</span>

                            </div>

                        )}
                        {/* STACK */}

                        <div className="flex flex-col-reverse gap-2">

                            {stack.map((item, index) => {

                                const isActive = index === activeIndex

                                return (

                                    <div
                                        key={index}
                                        className={`
                                            w-36 h-16
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

                                )

                            })}
                            {/* BASE */}

                            <div className="w-44 border-t-4 border-slate-600 mt-2" />

                            <div className="text-center text-slate-500 text-xs uppercase tracking-wider">
                                Bottom
                            </div>

                        </div>

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
                Understand how this stack operation works.
            </p>
        </div>

    </div>
    {/* What is it? */}

    <div className="mb-7">

        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">
            What is it?
        </h3>

        <p className="text-sm text-slate-400 leading-6 max-w-4xl">

            {operation === "push" &&
                "Push adds a new element to the top of the stack. The newly added element becomes the new top."
            }

            {operation === "pop" &&
                "Pop removes the element currently at the top of the stack. The next element then becomes the new top."
            }

            {operation === "peek" &&
                "Peek returns or examines the top element without removing it from the stack."
            }

            {operation === "search" &&
                "Search checks stack elements to find a particular value. Elements are examined one by one."
            }

            {operation === "clear" &&
                "Clear removes all elements from the stack, leaving it empty."
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

                {operation === "push" &&
                    "Place the new element at the top of the stack."
                }

                {operation === "pop" &&
                    "Take the top element out of the stack and move the top position to the next element."
                }

                {operation === "peek" &&
                    "Look at the top element without modifying the stack."
                }

                {operation === "search" &&
                    "Start from the top and compare elements until the target is found or the stack has been completely checked."
                }

                {operation === "clear" &&
                    "Remove every element so that no elements remain in the stack."
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

                {operation === "push" &&
                    "The new value is placed after the current top position. The stack size increases by one."
                }

                {operation === "pop" &&
                    "Only the top element can be removed. After removal, the element below it becomes accessible."
                }

                {operation === "peek" &&
                    "The top element is read directly, while the contents and size of the stack remain unchanged."
                }

                {operation === "search" &&
                    "Since a stack only exposes its top directly, searching requires checking elements one by one."
                }

                {operation === "clear" &&
                    "All elements are removed and the stack returns to its empty state."
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

                    {operation === "push" &&
                        "Stack follows LIFO — Last In, First Out. The most recently pushed element is the first one removed."
                    }

                    {operation === "pop" &&
                        "Pop always removes the top element. You cannot directly remove an element from the middle of a standard stack."
                    }

                    {operation === "peek" &&
                        "Peek allows you to inspect the next element that would be removed without actually removing it."
                    }

                    {operation === "search" &&
                        "Searching a stack is generally linear because elements may need to be examined one by one."
                    }

                    {operation === "clear" &&
                        "After clearing, the stack contains no elements and there is no top element."
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

{operation === "push" &&
`Push(stack, value)

    add value to top of stack

    return stack`
}

{operation === "pop" &&
`Pop(stack)

    if stack is empty
        return EMPTY

    value = top element

    remove top element

    return value`
}

{operation === "peek" &&
`Peek(stack)

    if stack is empty
        return EMPTY

    return top element`
}

{operation === "search" &&
`Search(stack, target)

    for each element from top to bottom

        if element == target
            return FOUND

    return NOT FOUND`
}

{operation === "clear" &&
`Clear(stack)

    remove all elements

    return empty stack`
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

                    {operation === "push" && "O(1)"}
                    {operation === "pop" && "O(1)"}
                    {operation === "peek" && "O(1)"}
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
                    LIFO
                </p>

            </div>

        </div>

    </div>

</div>
        </div>
    )
}
export default StackVisualizer