import { useState, useEffect } from "react"
import {
    GitBranch,Play,Pause,SkipForward,
    RotateCcw,Shuffle,
    Route,Network
} from "lucide-react"
import bfs from "../algorithms/graphs/bfs"
import dfs from "../algorithms/graphs/dfs"
import dijkstra from "../algorithms/graphs/dijkstra"
import prim from "../algorithms/graphs/prim"
import kruskal from "../algorithms/graphs/kruskul"
function GraphVisualizer() {
    const [nodes, setNodes] = useState([
        { id: "A", x: 150, y: 100 },
        { id: "B", x: 350, y: 100 },
        { id: "C", x: 250, y: 250 },
        { id: "D", x: 450, y: 250 },
        { id: "E", x: 550, y: 150 }
    ])
    const [edges, setEdges] = useState([
        ["A", "B"],
        ["A", "C"],
        ["B", "D"],
        ["B", "E"]
    ])
    const [weightedEdges, setWeightedEdges] = useState([
        ["A", "B", 4],
        ["A", "C", 2],
        ["B", "D", 5],
        ["B", "E", 3]
    ])
    const [currentNode, setCurrentNode] = useState(null)
    const [visitedNodes, setVisitedNodes] = useState([])
    const [activeEdge, setActiveEdge] = useState(null)
    const [steps, setSteps] = useState([])
    const [currentStep, setCurrentStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [speed, setSpeed] = useState(500)
    const [algorithm, setAlgorithm] = useState("bfs")
    const [distances, setDistances] = useState({})
    const [previousNodes, setPreviousNodes] = useState({})
    const [shortestPath, setShortestPath] = useState([])
    const [mstEdges, setMstEdges] = useState([])
    const [mstWeight, setMstWeight] = useState(0)
    const [message, setMessage] = useState("")
    const algorithmInfo = {
        bfs: {
            name: "Breadth-First Search",
            description:
                "Explores a graph level by level using a queue.",
            time: "O(V + E)",
            space: "O(V)"
        },

        dfs: {
            name: "Depth-First Search",
            description:
                "Explores as far as possible along each branch before backtracking.",
            time: "O(V + E)",
            space: "O(V)"
        },

        dijkstra: {
            name: "Dijkstra's Algorithm",
            description:
                "Finds shortest paths from a starting node in a weighted graph with non-negative edge weights.",
            time: "O(V² + E)",
            space: "O(V)"
        },
        prim: {
            name: "Prim's Algorithm",
            description:
                "Builds a minimum spanning tree by repeatedly selecting the lowest-weight edge connecting to an unvisited node.",
            time: "O(V² + E)",
            space: "O(V)"
        },

        kruskal: {
            name: "Kruskal's Algorithm",
            description:
                "Builds a minimum spanning tree by considering edges in increasing order of weight.",
            time: "O(E log E)",
            space: "O(V)"
        }

    }
    const currentAlgorithm = algorithmInfo[algorithm]
    function createGraph() {

        const graph = {}

        nodes.forEach(node => {
            graph[node.id] = []
        })

        edges.forEach(([from, to]) => {
            graph[from].push(to)
            graph[to].push(from)
        })

        return graph
    }
    function createWeightedGraph() {

        const graph = {}

        nodes.forEach(node => {
            graph[node.id] = []
        })

        weightedEdges.forEach(([from, to, weight]) => {

            graph[from].push({
                node: to,
                weight: weight
            })

            graph[to].push({
                node: from,
                weight: weight
            })

        })

        return graph
    }
    function buildShortestPath(previous, target) {
        const path = []
        let current = target
        while (current) {
            path.unshift(current)
            current = previous[current]
        }
        setShortestPath(path)
    }
    function generateGraph() {

        const nodeIds = ["A", "B", "C", "D", "E"]

        const newNodes = nodeIds.map(id => ({
            id: id,
            x: Math.floor(Math.random() * 450) + 100,
            y: Math.floor(Math.random() * 220) + 80
        }))

        const newEdges = []
        const newWeightedEdges = []

        for (let i = 1; i < nodeIds.length; i++) {

            const from = nodeIds[
                Math.floor(Math.random() * i)
            ]

            const to = nodeIds[i]

            const weight =
                Math.floor(Math.random() * 9) + 1

            newEdges.push([
                from,
                to
            ])

            newWeightedEdges.push([
                from,
                to,
                weight
            ])
        }

        setNodes(newNodes)
        setEdges(newEdges)
        setWeightedEdges(newWeightedEdges)

        resetVisualization()
    }
    function startSearch() {

        const graph = createGraph()

        let generatedSteps = []
        let previous = {}

        if (algorithm === "bfs") {
            generatedSteps = bfs(graph, "A")
        }

        else if (algorithm === "dfs") {
            generatedSteps = dfs(graph, "A")
        }

        else if (algorithm === "dijkstra") {

            const weightedGraph = createWeightedGraph()

            const result = dijkstra(
                weightedGraph,
                "A"
            )

            generatedSteps = result.steps
            previous = result.previous
        }

        else if (algorithm === "prim") {

            const weightedGraph = createWeightedGraph()

            const result = prim(
                weightedGraph,
                "A"
            )

            generatedSteps = result.steps

            setMstEdges([])
            setMstWeight(0)
        }

        else if (algorithm === "kruskal") {

            const nodeIds = nodes.map(node => node.id)

            const result = kruskal(
                weightedEdges,
                nodeIds
            )

            generatedSteps = result.steps

            setMstEdges([])
            setMstWeight(0)
        }
        setSteps(generatedSteps)
        setCurrentStep(0)
        setCurrentNode(null)
        setVisitedNodes([])
        setDistances({})
        setActiveEdge(null)
        setPreviousNodes(previous)
        setShortestPath([])

        setIsPlaying(true)
        if (algorithm === "dijkstra") {
            setMessage("Dijkstra Started")
        }

        else if (algorithm === "prim") {
            setMessage("Prim's MST Started")
        }

        else if (algorithm === "kruskal") {
            setMessage("Kruskal's MST Started")
        }

        else {
            setMessage(`${algorithm.toUpperCase()} Started`)
        }

    }
    function nextStep() {

        if (currentStep >= steps.length) {

            setIsPlaying(false)
            setActiveEdge(null)

            if (algorithm === "dijkstra") {

                buildShortestPath(
                    previousNodes,
                    "E"
                )

                setMessage("Dijkstra Completed")
            }

            else if (algorithm === "prim") {
                setMessage("Prim's MST Completed")
            }

            else if (algorithm === "kruskal") {
                setMessage("Kruskal's MST Completed")
            }

            else {
                setMessage(
                    `${algorithm.toUpperCase()} Completed`
                )
            }

            return
        }
        const step = steps[currentStep]
        if (step.type === "visit") {

            setCurrentNode(step.node)

            setVisitedNodes(prev => {

                if (prev.includes(step.node)) {
                    return prev
                }

                return [...prev, step.node]
            })
            if (algorithm === "dijkstra") {

                setDistances(prev => ({
                    ...prev,
                    [step.node]: step.distance
                }))

                setMessage(
                    `Visiting ${step.node} (distance ${step.distance})`
                )
            }

            else {
                setMessage(
                    `Visiting ${step.node}`
                )
            }

        }
        else if (step.type === "discover") {

            setActiveEdge([
                step.from,
                step.node
            ])

            setVisitedNodes(prev => {

                if (prev.includes(step.node)) {
                    return prev
                }

                return [...prev, step.node]
            })

            setMessage(
                `Discovered ${step.node}`
            )

        }
        else if (step.type === "update") {

            setDistances(prev => ({
                ...prev,
                [step.node]: step.distance
            }))

            setActiveEdge([
                step.from,
                step.node
            ])

            setMessage(
                `Updated ${step.node} to ${step.distance}`
            )

        }
        else if (step.type === "consider") {

            setActiveEdge([
                step.from,
                step.to
            ])

            setMessage(
                `Considering ${step.from} → ${step.to} (${step.weight})`
            )

        }
        else if (step.type === "select") {

            setActiveEdge([
                step.from,
                step.to
            ])

            setMstEdges(prev => [
                ...prev,
                [step.from, step.to]
            ])

            setMstWeight(
                prev => prev + step.weight
            )

            setMessage(
                `Selected ${step.from} → ${step.to} (${step.weight})`
            )

        }
        else if (step.type === "reject") {

            setActiveEdge([
                step.from,
                step.to
            ])

            setMessage(
                `Rejected ${step.from} → ${step.to} (${step.weight})`
            )

        }
        setCurrentStep(prev => prev + 1)
    }
    useEffect(() => {

        if (!isPlaying) return

        const timer = setTimeout(() => {
            nextStep()
        }, speed)

        return () => clearTimeout(timer)

    }, [
        isPlaying,
        currentStep,
        speed
    ])
    function resetVisualization() {

        setCurrentNode(null)
        setVisitedNodes([])
        setSteps([])
        setCurrentStep(0)
        setIsPlaying(false)

        setDistances({})
        setActiveEdge(null)
        setPreviousNodes({})
        setShortestPath([])

        setMstEdges([])
        setMstWeight(0)

        setMessage("")
    }
    function togglePlay() {

        if (!steps.length) {
            startSearch()
            return
        }

        setIsPlaying(prev => !prev)
    }
    const progress =
        steps.length === 0
            ? 0
            : Math.min(
                (currentStep / steps.length) * 100,
                100
            )
    return (

        <div className="max-w-7xl mx-auto">

            {/* Header */}

            <div className="mb-8">

                <div className="flex items-center gap-3">

                    <div className="p-3 rounded-xl bg-cyan-500/10">
                        <GitBranch
                            size={26}
                            className="text-cyan-400"
                        />
                    </div>

                    <div>

                        <h1 className="text-3xl font-bold">
                            Graph Visualizer
                        </h1>

                        <p className="mt-1 text-slate-400">
                            Explore graph traversal, shortest paths,
                            and minimum spanning trees.
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
                            onChange={(e) => {
                                setAlgorithm(e.target.value)
                                resetVisualization()
                            }}
                            className="
                                bg-slate-800
                                border border-slate-700
                                rounded-lg
                                px-4 py-2.5
                                outline-none
                                focus:border-cyan-500
                            "
                        >
                            <option value="bfs">BFS</option>
                            <option value="dfs">DFS</option>
                            <option value="dijkstra">Dijkstra</option>
                            <option value="prim">Prim's MST</option>
                            <option value="kruskal">Kruskal's MST</option>
                        </select>

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
                            <option value={250}>Fast</option>
                        </select>

                    </div>
                    <div className="hidden lg:block h-10 w-px bg-slate-700 mx-1" />
                    {/* Generate */}

                    <button
                        onClick={generateGraph}
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
                        Generate Graph
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
                    {/* Play */}

                    <button
                        onClick={togglePlay}
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
                        onClick={resetVisualization}
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
            {/* Status */}

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">

                <div className="flex items-center justify-between mb-3">

                    <div>

                        <p className="text-xs uppercase tracking-wider text-slate-500">
                            Current Status
                        </p>

                        <p className="mt-1 text-cyan-400 font-semibold">
                            {message || "Ready to visualize"}
                        </p>

                    </div>

                    <div className="text-sm text-slate-400">

                        Step{" "}

                        <span className="text-white font-medium">
                            {Math.min(
                                currentStep,
                                steps.length
                            )}
                        </span>

                        {" / "}

                        {steps.length}

                    </div>

                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

                    <div
                        className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

            </div>
            {/* Dijkstra Distances */}

            {algorithm === "dijkstra" &&
                Object.keys(distances).length > 0 && (

                    <div className="mb-6">

                        <div className="flex items-center gap-2 mb-3">

                            <Route
                                size={18}
                                className="text-cyan-400"
                            />

                            <h2 className="font-semibold">
                                Current Distances
                            </h2>

                        </div>

                        <div className="grid grid-cols-5 gap-3">

                            {nodes.map(node => (

                                <div
                                    key={node.id}
                                    className="
                                        p-4
                                        rounded-xl
                                        bg-slate-900
                                        border border-slate-800
                                        text-center
                                    "
                                >

                                    <p className="text-sm text-slate-500">
                                        Node {node.id}
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-cyan-400">
                                        {distances[node.id] ?? "∞"}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>
                )}
            {/* MST Information */}

            {(algorithm === "prim" ||
                algorithm === "kruskal") && (

                    <div className="mb-6">

                        <div className="flex items-center gap-2 mb-3">

                            <Network
                                size={18}
                                className="text-cyan-400"
                            />

                            <h2 className="font-semibold">
                                Minimum Spanning Tree
                            </h2>

                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">

                                <p className="text-sm text-slate-500">
                                    Total Weight
                                </p>

                                <p className="mt-1 text-2xl font-bold text-cyan-400">
                                    {mstWeight}
                                </p>

                            </div>
                            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">

                                <p className="text-sm text-slate-500 mb-2">
                                    Selected Edges
                                </p>

                                <div className="flex flex-wrap gap-2">

                                    {mstEdges.length === 0 ? (

                                        <span className="text-sm text-slate-500">
                                            No edges selected yet
                                        </span>

                                    ) : (

                                        mstEdges.map(
                                            ([from, to], index) => (

                                                <span
                                                    key={index}
                                                    className="
                                                        px-2.5
                                                        py-1
                                                        rounded-md
                                                        bg-green-500/10
                                                        text-green-400
                                                        text-sm
                                                    "
                                                >
                                                    {from} → {to}
                                                </span>

                                            )
                                        )

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>
                )}
            {/* Graph */}

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

                <div className="flex items-center justify-between mb-5">

                    <div>

                        <h2 className="text-lg font-semibold">
                            Graph
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Follow the algorithm as it explores the graph.
                        </p>

                    </div>

                    <span className="text-sm text-slate-500">
                        {nodes.length} Nodes
                    </span>

                </div>
                <div className="rounded-xl bg-slate-950/60 border border-slate-800 overflow-hidden">

                    <svg
                        viewBox="0 0 700 400"
                        className="w-full h-[500px]"
                    >

                        {/* Edges */}

                        {weightedEdges.map(
                            ([from, to, weight], index) => {

                                const start =
                                    nodes.find(
                                        node => node.id === from
                                    )

                                const end =
                                    nodes.find(
                                        node => node.id === to
                                    )
                                const isMST =
                                    mstEdges.some(
                                        ([a, b]) =>
                                            (a === from && b === to) ||
                                            (a === to && b === from)
                                    )
                                const isPath =
                                    shortestPath.some(
                                        (node, i) => {

                                            if (
                                                i ===
                                                shortestPath.length - 1
                                            ) {
                                                return false
                                            }

                                            const next =
                                                shortestPath[i + 1]

                                            return (
                                                (node === from &&
                                                    next === to) ||
                                                (node === to &&
                                                    next === from)
                                            )
                                        }
                                    )
                                const isActive =
                                    activeEdge &&
                                    (
                                        (
                                            activeEdge[0] === from &&
                                            activeEdge[1] === to
                                        ) ||
                                        (
                                            activeEdge[0] === to &&
                                            activeEdge[1] === from
                                        )
                                    )
                                return (

                                    <g key={index}>

                                        <line
                                            x1={start.x}
                                            y1={start.y}
                                            x2={end.x}
                                            y2={end.y}
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            className={
                                                isMST
                                                    ? "text-green-400"
                                                    : isPath
                                                        ? "text-green-400"
                                                        : isActive
                                                            ? "text-yellow-400"
                                                            : "text-slate-600"
                                            }
                                        />

                                        <text
                                            x={(start.x + end.x) / 2}
                                            y={(start.y + end.y) / 2 - 10}
                                            textAnchor="middle"
                                            className="fill-slate-300 text-sm font-medium"
                                        >
                                            {weight}
                                        </text>

                                    </g>
                                )
                            }
                        )}
                        {/* Nodes */}

                        {nodes.map(node => {

                            const isCurrent =
                                currentNode === node.id

                            const isVisited =
                                visitedNodes.includes(node.id)
                            return (

                                <g key={node.id}>

                                    <circle
                                        cx={node.x}
                                        cy={node.y}
                                        r="30"
                                        className={
                                            isCurrent
                                                ? "fill-yellow-400 stroke-yellow-200"
                                                : isVisited
                                                    ? "fill-green-500 stroke-green-300"
                                                    : "fill-slate-800 stroke-slate-600"
                                        }
                                        strokeWidth="3"
                                    />

                                    <text
                                        x={node.x}
                                        y={node.y + 6}
                                        textAnchor="middle"
                                        className="fill-white font-bold text-lg"
                                    >
                                        {node.id}
                                    </text>
                                    {algorithm === "dijkstra" &&
                                        distances[node.id] !== undefined && (

                                            <text
                                                x={node.x}
                                                y={node.y + 45}
                                                textAnchor="middle"
                                                className="fill-cyan-400 text-sm"
                                            >
                                                d={distances[node.id]}
                                            </text>

                                        )}

                                </g>

                            )
                        })}

                    </svg>

                </div>
                {/* Legend */}

                <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">

                    <div className="flex items-center gap-2">

                        <div className="w-3 h-3 rounded-full bg-slate-700" />

                        <span className="text-slate-400">
                            Unvisited
                        </span>

                    </div>
                    <div className="flex items-center gap-2">

                        <div className="w-3 h-3 rounded-full bg-green-500" />

                        <span className="text-slate-400">
                            Visited
                        </span>

                    </div>
                    <div className="flex items-center gap-2">

                        <div className="w-3 h-3 rounded-full bg-yellow-400" />

                        <span className="text-slate-400">
                            Current
                        </span>

                    </div>
                    <div className="flex items-center gap-2">

                        <div className="w-3 h-3 rounded-full bg-yellow-400" />

                        <span className="text-slate-400">
                            Active Edge
                        </span>

                    </div>
                    <div className="flex items-center gap-2">

                        <div className="w-3 h-3 rounded-full bg-green-400" />

                        <span className="text-slate-400">
                            MST / Shortest Path
                        </span>

                    </div>

                </div>

            </div>
            {/* Shortest Path */}

            {algorithm === "dijkstra" &&
                shortestPath.length > 0 && (

                    <div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl p-5">

                        <p className="text-sm text-slate-500">
                            Shortest Path
                        </p>

                        <p className="mt-2 text-lg font-semibold text-green-400">
                            {shortestPath.join(" → ")}
                        </p>

                    </div>
                )}
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
                            Learn how this graph algorithm works
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
                            {algorithm === "bfs" &&
                                "Start from a source node and explore all of its immediate neighbors before moving to the next level. A queue is used to keep track of nodes that still need to be explored."
                            }
                            {algorithm === "dfs" &&
                                "Start from a source node and explore as far as possible along one branch before backtracking. A stack or recursion is used to remember the nodes that still need to be explored."
                            }
                            {algorithm === "dijkstra" &&
                                "Start from the source node with distance zero. Repeatedly choose the unvisited node with the smallest known distance and relax its neighboring edges to find shorter paths."
                            }
                            {algorithm === "prim" &&
                                "Start with one node and repeatedly select the minimum-weight edge that connects a node already in the tree to an unvisited node. Continue until every node belongs to the spanning tree."
                            }
                            {algorithm === "kruskal" &&
                                "Sort all edges by increasing weight and consider them one by one. Add an edge if it does not create a cycle. Continue until the minimum spanning tree contains enough edges."
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
                        <p className="text-sm text-slate-400 leading-6">                {algorithm === "bfs" &&
                            "Nodes are processed level by level. Once a node is visited, its unvisited neighbors are added to the queue. This continues until the queue becomes empty."
                        }
                            {algorithm === "dfs" &&
                                "The algorithm follows one path deeply. When it reaches a node with no unvisited neighbors, it backtracks and continues with another available branch."
                            }
                            {algorithm === "dijkstra" &&
                                "For every selected node, the algorithm checks its neighbors and updates their distances when a shorter route is found. This continues until all reachable nodes are processed."
                            }
                            {algorithm === "prim" &&
                                "The growing tree always chooses the cheapest edge that connects the existing tree to a new node. This guarantees that the selected edges form a minimum spanning tree."
                            }
                            {algorithm === "kruskal" &&
                                "Edges are examined from smallest to largest. An edge is selected only when it connects different components, preventing cycles while gradually building the minimum spanning tree."
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

                                {algorithm === "bfs" &&
                                    "BFS uses a queue and explores the graph level by level. It is useful for finding the shortest path in an unweighted graph."
                                }
                                {algorithm === "dfs" &&
                                    "DFS explores depth before breadth. It is commonly used for graph traversal, connected components and cycle detection."
                                }
                                {algorithm === "dijkstra" &&
                                    "Dijkstra's algorithm requires non-negative edge weights. It maintains the shortest known distance from the source to every processed node."
                                }
                                {algorithm === "prim" &&
                                    "Prim's algorithm grows one minimum spanning tree from a starting node by repeatedly choosing the cheapest connecting edge."
                                }
                                {algorithm === "kruskal" &&
                                    "Kruskal's algorithm builds a minimum spanning forest by selecting edges globally from smallest to largest while avoiding cycles."
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

                            {algorithm === "bfs" &&
                                `BFS(graph, start)

    create queue
    mark start as visited
    add start to queue

    while queue is not empty

        node = remove front of queue

        for each neighbor of node

            if neighbor is not visited
                mark neighbor as visited
                add neighbor to queue`
                            }
                            {algorithm === "dfs" &&
                                `DFS(graph, node)

    mark node as visited

    for each neighbor of node

        if neighbor is not visited
            DFS(graph, neighbor)`
                            }
                            {algorithm === "dijkstra" &&
                                `Dijkstra(graph, source)

    distance[source] = 0
    distance[all other nodes] = infinity

    while unvisited nodes remain

        choose node with smallest distance
        mark node as visited

        for each neighbor

            newDistance =
                distance[node] + edgeWeight

            if newDistance < distance[neighbor]
                distance[neighbor] = newDistance`
                            }
                            {algorithm === "prim" &&
                                `Prim(graph, start)

    add start to MST

    while not all nodes are in MST

        find minimum-weight edge
        connecting MST to an unvisited node

        add edge to MST
        add new node to MST`
                            }
                            {algorithm === "kruskal" &&
                                `Kruskal(graph)

    sort all edges by increasing weight

    for each edge

        if adding edge does not create a cycle
            add edge to MST

        if MST has V - 1 edges
            stop`
                            }
                        </pre>
                    </div>
                </div>
                {/* Complexity */}
                <div>
                    <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
                        Complexity
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-slate-800/60">
                            <p className="text-xs text-slate-500 uppercase">
                                Time Complexity
                            </p>
                            <p className="mt-2 text-amber-400 font-semibold">
                                {currentAlgorithm.time}
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-800/60">
                            <p className="text-xs text-slate-500 uppercase">
                                Space Complexity
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
export default GraphVisualizer