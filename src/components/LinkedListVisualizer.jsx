import { useEffect, useState } from "react"

import linkedList from "../algorithms/linkedlist/linkedListData"
import traverse from "../algorithms/linkedlist/traverse"
import search from "../algorithms/linkedlist/search"

import {
    insertAtBeginning,
    insertAtEnd,
    insertAtPosition,
    deleteByValue
} from "../algorithms/linkedlist/linkedListOperations"

import {
    Link,
    Play,
    Pause,
    SkipForward,
    RotateCcw,
    PlayCircle,
    Search,
    Plus,
    Trash2,
    List,
    Gauge,
    CheckCircle2,
    Circle
} from "lucide-react"
function LinkedListVisualizer() {

    const [listData, setListData] = useState(linkedList)
    const [operation, setOperation] = useState("traverse")
    const [steps, setSteps] = useState([])
    const [currentStep, setCurrentStep] = useState(0)
    const [currentNode, setCurrentNode] = useState(null)
    const [visitedNodes, setVisitedNodes] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [speed, setSpeed] = useState(500)
    const [message, setMessage] = useState("Press Start to Begin")
    const [target, setTarget] = useState("")
    const [position, setPosition] = useState("")
    function startOperation() {

        let generatedSteps = []
        let resultHead = listData

        if (operation === "traverse") {

            generatedSteps = traverse(listData)

        } else if (operation === "search") {

            if (target === "") {
                setMessage("Enter a value to search")
                return
            }

            generatedSteps = search(listData, Number(target))

        } else if (operation === "insertBeginning") {

            if (target === "") {
                setMessage("Enter a value")
                return
            }

            const result = insertAtBeginning(
                structuredClone(listData),
                Number(target)
            )

            resultHead = result.head
            generatedSteps = result.steps

        } else if (operation === "insertEnd") {

            if (target === "") {
                setMessage("Enter a value")
                return
            }

            const result = insertAtEnd(
                structuredClone(listData),
                Number(target)
            )

            resultHead = result.head
            generatedSteps = result.steps

        } else if (operation === "insertPosition") {

            if (target === "" || position === "") {
                setMessage("Enter value and position")
                return
            }

            const result = insertAtPosition(
                structuredClone(listData),
                Number(target),
                Number(position)
            )

            resultHead = result.head
            generatedSteps = result.steps

        } else if (operation === "delete") {

            if (target === "") {
                setMessage("Enter value to delete")
                return
            }

            const result = deleteByValue(
                structuredClone(listData),
                Number(target)
            )

            resultHead = result.head
            generatedSteps = result.steps
        }

        setListData(resultHead)
        setSteps(generatedSteps)
        setCurrentStep(0)
        setCurrentNode(null)
        setVisitedNodes([])
        setIsPlaying(false)
        setMessage("Operation started")
    }
    function resetVisualization() {

        setSteps([])
        setCurrentStep(0)
        setCurrentNode(null)
        setVisitedNodes([])
        setIsPlaying(false)
        setMessage("Press Start to Begin")
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

        if (step.type === "visit" || step.type === "compare") {

            setCurrentNode(step.node)

            setVisitedNodes(prev => {

                if (prev.includes(step.node)) {
                    return prev
                }

                return [...prev, step.node]
            })
        }

        if (step.type === "found") {
            setCurrentNode(step.node)
            setMessage(`Found node ${step.node}`)
        }

        if (step.type === "insert") {
            setCurrentNode(step.node)
            setMessage(`Inserted node ${step.node}`)
        }

        if (step.type === "delete") {
            setCurrentNode(step.node)
            setMessage(`Deleted node ${step.node}`)
        }

        if (step.type === "notFound") {
            setMessage("Value not found")
        }

        const nextStepIndex = currentStep + 1

        setCurrentStep(nextStepIndex)

        if (nextStepIndex >= steps.length) {

            setIsPlaying(false)

            if (
                step.type !== "found" &&
                step.type !== "notFound" &&
                step.type !== "insert" &&
                step.type !== "delete"
            ) {
                setMessage("Operation completed")
            }
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
    // CONVERT LINKED LIST INTO ARRAY FOR DISPLAY

    const nodes = []

    let current = listData

    while (current) {
        nodes.push(current)
        current = current.next
    }
    const progress =
        steps.length > 0
            ? Math.min((currentStep / steps.length) * 100, 100)
            : 0
    const operationInfo = {
        traverse: {
            title: "Traverse",
            description: "Visit every node sequentially from the head to NULL.",
            icon: <List size={18} />
        },

        search: {
            title: "Search",
            description: "Compare each node with the target value until it is found.",
            icon: <Search size={18} />
        },

        insertBeginning: {
            title: "Insert at Beginning",
            description: "Create a new node and place it before the current head.",
            icon: <Plus size={18} />
        },

        insertEnd: {
            title: "Insert at End",
            description: "Traverse to the last node and attach the new node.",
            icon: <Plus size={18} />
        },

        insertPosition: {
            title: "Insert at Position",
            description: "Insert a new node at the specified position.",
            icon: <Plus size={18} />
        },

        delete: {
            title: "Delete by Value",
            description: "Find the target node and remove it from the linked list.",
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
                            <Link size={22} />
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight">
                            Linked List Visualizer
                        </h1>

                    </div>

                    <p className="text-slate-400">
                        Visualize traversal, searching, insertion and deletion step by step.
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
                                setCurrentNode(null)
                                setVisitedNodes([])
                                setIsPlaying(false)
                                setMessage("Press Start to Begin")

                            }}
                            className="w-full md:w-80 bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
                        >

                            <option value="traverse">
                                Traverse
                            </option>

                            <option value="search">
                                Search
                            </option>

                            <option value="insertBeginning">
                                Insert at Beginning
                            </option>

                            <option value="insertEnd">
                                Insert at End
                            </option>

                            <option value="insertPosition">
                                Insert at Position
                            </option>

                            <option value="delete">
                                Delete by Value
                            </option>

                        </select>

                    </div>
                    {/* INPUTS */}

                    {operation !== "traverse" && (

                        <div className="flex flex-wrap gap-4">

                            <div>

                                <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">

                                    {operation === "delete"
                                        ? "Value to Delete"
                                        : "Value"}

                                </label>

                                <input
                                    type="number"
                                    value={target}
                                    onChange={(e) => setTarget(e.target.value)}
                                    placeholder="Enter value"
                                    className="w-52 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 placeholder:text-slate-600"
                                />

                            </div>
                            {operation === "insertPosition" && (

                                <div>

                                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
                                        Position
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                        placeholder="0"
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
                            ? <CheckCircle2
                                size={18}
                                className="text-green-400"
                            />
                            : <Circle
                                size={18}
                                className="text-cyan-400"
                            />
                        }

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
            {/* VISUALIZATION */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                <div className="px-6 py-4 border-b border-slate-800">

                    <div className="flex items-center justify-between">

                        <div>

                            <h2 className="font-semibold">
                                Linked List
                            </h2>

                            <p className="text-xs text-slate-500 mt-1">
                                Head → Nodes → NULL
                            </p>

                        </div>

                        <div className="text-xs text-slate-500">
                            {nodes.length} nodes
                        </div>

                    </div>

                </div>
                <div className="min-h-[280px] flex items-center px-8 py-12 overflow-x-auto">

                    <div className="flex items-center justify-center min-w-max mx-auto">

                        {/* HEAD */}

                        <div className="flex flex-col items-center mr-5">

                            <span className="text-xs font-semibold text-cyan-400 mb-2">
                                HEAD
                            </span>

                            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />

                        </div>
                        {nodes.map((node, index) => {

                            let nodeClass =
                                "bg-slate-800/80 border-slate-700"

                            if (visitedNodes.includes(node.id)) {

                                nodeClass =
                                    "bg-green-500/10 border-green-400/70 shadow-[0_0_20px_rgba(74,222,128,0.08)]"

                            }

                            if (currentNode === node.id) {

                                nodeClass =
                                    "bg-yellow-500/10 border-yellow-400 shadow-[0_0_24px_rgba(250,204,21,0.12)]"

                            }
                            return (

                                <div
                                    key={node.id}
                                    className="flex items-center shrink-0"
                                >

                                    <div
                                        className={`w-28 h-24 border-2 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${nodeClass}`}
                                    >

                                        <span className="text-[11px] uppercase tracking-wider text-slate-500">
                                            Node {node.id}
                                        </span>

                                        <span className="text-2xl font-bold mt-1">
                                            {node.value}
                                        </span>

                                    </div>
                                    {index < nodes.length - 1 && (

                                        <div className="flex items-center px-3">

                                            <div className="w-8 h-px bg-slate-600" />

                                            <span className="text-cyan-400 text-xl">
                                                →
                                            </span>

                                        </div>

                                    )}

                                </div>

                            )

                        })}
                        {/* NULL */}

                        <div className="flex items-center ml-3">

                            <div className="w-8 h-px bg-slate-600" />

                            <span className="text-cyan-400 text-xl mr-3">
                                →
                            </span>

                            <div className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800/60 text-slate-500 text-sm font-medium">
                                NULL
                            </div>

                        </div>

                    </div>

                </div>

            </div>
            {/* LEGEND */}

            <div className="flex flex-wrap items-center gap-6 px-2">

                <div className="flex items-center gap-2 text-sm text-slate-400">

                    <div className="w-3 h-3 rounded-full bg-slate-600 border border-slate-500" />

                    Unvisited

                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">

                    <div className="w-3 h-3 rounded-full bg-yellow-400" />

                    Current

                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">

                    <div className="w-3 h-3 rounded-full bg-green-400" />

                    Visited

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
                Understand how this linked list operation works.
            </p>
        </div>

    </div>
    {/* What is it? */}

    <div className="mb-7">

        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">
            What is it?
        </h3>

        <p className="text-sm text-slate-400 leading-6 max-w-4xl">
            {operation === "traverse" &&
                "Traversal means visiting every node in a linked list sequentially, starting from the head and continuing until NULL is reached."
            }

            {operation === "search" &&
                "Searching means checking each node's value against a target value until the target is found or the end of the linked list is reached."
            }

            {operation === "insertBeginning" &&
                "Insertion at the beginning adds a new node before the current head and makes the new node the head of the linked list."
            }

            {operation === "insertEnd" &&
                "Insertion at the end adds a new node after the current last node and connects it to NULL."
            }

            {operation === "insertPosition" &&
                "Insertion at a position places a new node between existing nodes by changing the required next pointers."
            }

            {operation === "delete" &&
                "Deletion by value removes the node containing the target value and reconnects the surrounding nodes."
            }
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

                {operation === "traverse" &&
                    "Start at HEAD and repeatedly follow the next pointer until the current node becomes NULL."
                }

                {operation === "search" &&
                    "Start from HEAD and compare each node's value with the target. Move to the next node when the value does not match."
                }

                {operation === "insertBeginning" &&
                    "Create a new node, point its next to the current head, and then update HEAD to the new node."
                }

                {operation === "insertEnd" &&
                    "Traverse to the final node, create the new node, and set the final node's next pointer to the new node."
                }

                {operation === "insertPosition" &&
                    "Reach the node before the required position, connect the new node to the next node, and then connect the previous node to the new node."
                }

                {operation === "delete" &&
                    "Find the target node and its previous node. Change the previous node's next pointer so that the target node is skipped."
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

                {operation === "traverse" &&
                    "The pointer moves from one node to the next. Every visited node is processed exactly once."
                }

                {operation === "search" &&
                    "Because linked lists do not provide direct indexing, nodes must be checked one by one from the beginning."
                }

                {operation === "insertBeginning" &&
                    "Only the new node and HEAD need to be updated, so no traversal of the list is required."
                }

                {operation === "insertEnd" &&
                    "The list must first be traversed to find the final node before attaching the new node."
                }

                {operation === "insertPosition" &&
                    "The list is traversed until the required position is reached. The surrounding next pointers are then updated."
                }

                {operation === "delete" &&
                    "Once the target is located, its previous node is connected directly to the target's next node."
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

                    {operation === "traverse" &&
                        "A linked list is accessed sequentially. To reach a node, you generally follow the chain from the head."
                    }

                    {operation === "search" &&
                        "Searching a singly linked list takes linear time because nodes must be checked sequentially."
                    }

                    {operation === "insertBeginning" &&
                        "Insertion at the beginning is O(1) because only the new node's next pointer and HEAD need to change."
                    }

                    {operation === "insertEnd" &&
                        "Without a tail pointer, reaching the last node requires traversal, making insertion at the end O(n)."
                    }

                    {operation === "insertPosition" &&
                        "The pointer connections must be changed carefully so that no part of the linked list becomes disconnected."
                    }

                    {operation === "delete" &&
                        "Deletion is mainly a pointer operation. The target node is removed by reconnecting the previous node to the next node."
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

{operation === "traverse" &&
`Traverse(head)

    current = head

    while current is not NULL

        visit current

        current = current.next`
}

{operation === "search" &&
`Search(head, target)

    current = head

    while current is not NULL

        if current.value == target
            return FOUND

        current = current.next

    return NOT FOUND`
}

{operation === "insertBeginning" &&
`InsertAtBeginning(head, value)

    create newNode

    newNode.next = head

    head = newNode

    return head`
}

{operation === "insertEnd" &&
`InsertAtEnd(head, value)

    create newNode
    newNode.next = NULL

    if head is NULL
        return newNode

    current = head

    while current.next is not NULL
        current = current.next

    current.next = newNode

    return head`
}

{operation === "insertPosition" &&
`InsertAtPosition(head, value, position)

    create newNode

    if position == 0
        newNode.next = head
        return newNode

    current = head

    move to node before position

    newNode.next = current.next
    current.next = newNode

    return head`
}

{operation === "delete" &&
`DeleteByValue(head, target)

    if head is NULL
        return head

    if head.value == target
        return head.next

    current = head

    while current.next is not NULL

        if current.next.value == target
            current.next = current.next.next
            return head

        current = current.next

    return head`
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

                    {operation === "traverse" && "O(n)"}
                    {operation === "search" && "O(n)"}
                    {operation === "insertBeginning" && "O(1)"}
                    {operation === "insertEnd" && "O(n)"}
                    {operation === "insertPosition" && "O(n)"}
                    {operation === "delete" && "O(n)"}

                </p>

            </div>
            <div className="p-4 rounded-lg bg-slate-800/60">

                <p className="text-xs text-slate-500 uppercase">
                    Space
                </p>

                <p className="mt-2 text-amber-400 font-semibold">
                    O(1)
                </p>

            </div>
            <div className="p-4 rounded-lg bg-slate-800/60">

                <p className="text-xs text-slate-500 uppercase">
                    Structure
                </p>

                <p className="mt-2 text-amber-400 font-semibold">
                    Sequential
                </p>

            </div>

        </div>

    </div>

</div>
        </div>
    )
}
export default LinkedListVisualizer