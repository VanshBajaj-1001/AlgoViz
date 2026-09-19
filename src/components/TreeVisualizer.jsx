import tree from "../algorithms/trees/treeData";
import layoutTree from "../algorithms/trees/layoutTree";
import inorder from "../algorithms/trees/inorder";
import preorder from "../algorithms/trees/preorder";
import postorder from "../algorithms/trees/postorder";
import levelorder from "../algorithms/trees/levelorder";
import bstSearch from "../algorithms/trees/bstSearch";
import bstInsert from "../algorithms/trees/bstInsert";
import bstDelete from "../algorithms/trees/bstDelete";
import { useEffect, useState } from "react";
import {
    TreePine, Play,Pause,SkipForward,RotateCcw,Shuffle, Search,Plus,Trash2,GitCompare,
} from "lucide-react";
function TreeVisualizer() {
    const [treeData, setTreeData] = useState(tree);
    const [algorithm, setAlgorithm] = useState("inorder");
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentNode, setCurrentNode] = useState(null);
    const [visitedNodes, setVisitedNodes] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(500);
    const [message, setMessage] = useState("Press Start to Begin");
    const [target, setTarget] = useState(7);
    const [insertValue, setInsertValue] = useState(8);
    const [deleteValue, setDeleteValue] = useState(7);
    const layout = layoutTree(treeData);
    function insertIntoTree(root, value) {
        if (!root) {
            return {
               id: value,
               value,
                left: null,
                right: null
            };
        }
        const newRoot = structuredClone(root);
        if (value < newRoot.value) {
            newRoot.left = insertIntoTree(newRoot.left, value);
        }
        else if (value > newRoot.value) {
            newRoot.right = insertIntoTree(newRoot.right, value);
        }
        return newRoot;
    }
function generateRandomTree() {
    const values = [];
    while (values.length < 8) {
        const value =
            Math.floor(Math.random() * 90) + 10;
        if (!values.includes(value)) {
            values.push(value);
        }
    }
    let newTree = null;
    values.forEach(value => {
        newTree = insertIntoTree(newTree, value);
    });
    setTreeData(newTree);
    setSteps([]);
    setCurrentStep(0);
    setCurrentNode(null);
    setVisitedNodes([]);
    setIsPlaying(false);

    setMessage("New random BST generated");
}
    function startTraversal() {
        let generatedSteps = [];
        if (algorithm === "inorder") {
            generatedSteps = inorder(treeData);
        }
        else if (algorithm === "preorder") {
            generatedSteps = preorder(treeData);
        }
        else if (algorithm === "postorder") {
            generatedSteps = postorder(treeData);
        }
        else if (algorithm === "levelorder") {
            generatedSteps = levelorder(treeData);
        }
        else if (algorithm === "bstSearch") {
            generatedSteps = bstSearch(treeData, target);
        }
        else if (algorithm === "bstInsert") {

            generatedSteps = bstInsert(
                structuredClone(treeData),
                insertValue
            );
            const duplicate = generatedSteps.some(
                step => step.type === "duplicate"
            );
            if (!duplicate) {
                setTreeData(
                    insertIntoTree(treeData, insertValue)
                );
            }
        }
        else if (algorithm === "bstDelete") {

            const result = bstDelete(
                structuredClone(treeData),
                deleteValue
            );
            generatedSteps = result.steps;
            setTreeData(result.root);
        }
        setSteps(generatedSteps);
        setCurrentStep(0);
        setCurrentNode(null);
        setVisitedNodes([]);
        setIsPlaying(false);
        setMessage(`${algorithm.toUpperCase()} started`);
    }
    function resetVisualization() {
        setCurrentStep(0);
        setCurrentNode(null);
        setVisitedNodes([]);
        setIsPlaying(false);

        setMessage("Press Start to Begin");
    }
    function nextStep() {

        if (currentStep >= steps.length) {
            setIsPlaying(false);
            return;
        }
        const step = steps[currentStep];
if (step.type === "visit") {
    setCurrentNode(step.node);
    setVisitedNodes(prev =>
        prev.includes(step.node)
            ? prev
            : [...prev, step.node]
    );
    setMessage(`Visiting node ${step.node}`);
}
else if (step.type === "compare") {
    setCurrentNode(step.node);
    setMessage(`Comparing with ${step.node}`);
}
else if (step.type === "found") {
    setCurrentNode(step.node);
    setVisitedNodes(prev =>
        prev.includes(step.node)
            ? prev
            : [...prev, step.node]
    );
    setMessage(`Found ${step.node}`);
}
else if (step.type === "notFound") {
    setCurrentNode(null);
    setMessage("Value not found");
}
else if (step.type === "insert") {
    setCurrentNode(step.node);
    setMessage(`Inserting ${step.node}`);
}
else if (step.type === "duplicate") {
    setCurrentNode(step.node);
    setMessage(`${step.node} already exists`);
}
else if (step.type === "delete") {
    setCurrentNode(step.node);
    setMessage(`Deleting ${step.node}`);
}
else if (step.type === "replace") {
    setCurrentNode(step.node);
    setMessage(`Replacing with ${step.node}`);
}
        setCurrentStep(prev => prev + 1);
    }
    function togglePlay() {
        if (steps.length === 0) return;
        setIsPlaying(prev => !prev);
    }
    useEffect(() => {
        if (!isPlaying) return;
        if (currentStep >= steps.length) {
            setIsPlaying(false);
            return;
        }
        const timer = setTimeout(() => {
            nextStep();
        }, speed);
        return () => clearTimeout(timer);
    }, [isPlaying, currentStep, steps, speed]);
    const algorithmInfo = {
        inorder: {
            name: "Inorder Traversal",
            description: "Visits the left subtree, root, then right subtree.",
            order: "Left → Root → Right",
            complexity: "O(n)",
            space: "O(h)"
        },
        preorder: {
            name: "Preorder Traversal",
            description: "Visits the root before its subtrees.",
            order: "Root → Left → Right",
            complexity: "O(n)",
            space: "O(h)"
        },
        postorder: {
            name: "Postorder Traversal",
            description: "Visits both subtrees before the root.",
            order: "Left → Right → Root",
            complexity: "O(n)",
            space: "O(h)"
        },
        levelorder: {
            name: "Level Order Traversal",
            description: "Visits nodes level by level from top to bottom.",
            order: "Level by Level",
            complexity: "O(n)",
            space: "O(w)"
        },
        bstSearch: {
            name: "BST Search",
            description: "Compares the target and moves left or right accordingly.",
            order: "Compare → Move → Repeat",
            complexity: "O(log n) average",
            space: "O(h)"
        },
        bstInsert: {
            name: "BST Insert",
            description: "Finds the correct empty position while preserving BST ordering.",
            order: "Compare → Move → Insert",
            complexity: "O(log n) average",
            space: "O(h)"
        },
        bstDelete: {
            name: "BST Delete",
            description: "Removes a node while preserving the BST property.",
            order: "Find → Remove → Replace",
            complexity: "O(log n) average",
            space: "O(h)"
        }
    };
    const info = algorithmInfo[algorithm];
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                        <TreePine size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">
                            Tree Visualizer
                        </h1>
                        <p className="mt-1 text-slate-400">
                            Visualize tree traversal and BST operations step by step.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800">
                    <TreePine
                        size={16}
                        className="text-cyan-400"
                    />
                    <span className="text-sm text-slate-400">
                        {layout.nodes.length} Nodes
                    </span>
                </div>
            </div>
            {/* CONTROLS */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex flex-wrap items-end gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-slate-500 uppercase tracking-wide">
                            Algorithm
                        </label>
                        <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value)}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm min-w-[190px] outline-none focus:border-cyan-500"
                        >
                            <option value="inorder">
                                Inorder
                            </option>
                            <option value="preorder">
                                Preorder
                            </option>
                            <option value="postorder">
                                Postorder
                            </option>
                            <option value="levelorder">
                                Level Order
                            </option>
                            <option value="bstSearch">
                                BST Search
                            </option>
                            <option value="bstInsert">
                                BST Insert
                            </option>
                            <option value="bstDelete">
                                BST Delete
                            </option>
                        </select>
                    </div>
                    {/* Target */}
                    {algorithm === "bstSearch" && (
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-slate-500 uppercase tracking-wide">
                                Target
                            </label>
                            <div className="relative">
                                <Search
                                    size={15}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                                <input
                                    type="number"
                                    value={target}
                                    onChange={(e) =>
                                        setTarget(Number(e.target.value))
                                    }
                                    className="bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 w-28 outline-none focus:border-cyan-500"
                                />
                            </div>
                        </div>
                    )}
                    {algorithm === "bstInsert" && (
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-slate-500 uppercase tracking-wide">
                                Value
                            </label>
                            <div className="relative">
                                <Plus
                                    size={15}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                                <input
                                    type="number"
                                    value={insertValue}
                                    onChange={(e) =>
                                        setInsertValue(Number(e.target.value))
                                    }
                                    className="bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 w-28 outline-none focus:border-cyan-500"
                                />
                            </div>
                        </div>
                    )}
                    {algorithm === "bstDelete" && (
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-slate-500 uppercase tracking-wide">
                                Value
                            </label>
                            <div className="relative">
                                <Trash2
                                    size={15}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                                <input
                                    type="number"
                                    value={deleteValue}
                                    onChange={(e) =>
                                        setDeleteValue(Number(e.target.value))
                                    }
                                    className="bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 w-28 outline-none focus:border-cyan-500"
                                />
                            </div>
                        </div>
                    )}
                    <div className="h-10 w-px bg-slate-800 hidden md:block" />
                    <button
                        onClick={startTraversal}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition"
                    >
                        <Play size={16} />
                        Start
                    </button>
                    <button
                        onClick={nextStep}
                        disabled={currentStep >= steps.length}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        <SkipForward size={16} />
                        Step
                    </button>
                    <button
                        onClick={togglePlay}
                        disabled={steps.length === 0}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        {isPlaying
                            ? <Pause size={16} />
                            : <Play size={16} />
                        }
                        {isPlaying ? "Pause" : "Play"}
                    </button>
<button
    onClick={generateRandomTree}
    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
>
    <Shuffle size={16} />
    Generate
</button>
                    <button
                        onClick={resetVisualization}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
                    >
                        <RotateCcw size={16} />
                        Reset
                    </button>
                    <div className="ml-auto flex flex-col gap-2">
                        <label className="text-xs text-slate-500 uppercase tracking-wide">
                            Speed
                        </label>
                        <select
                            value={speed}
                            onChange={(e) =>
                                setSpeed(Number(e.target.value))
                            }
                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-500"
                        >
                            <option value={100}>Fast</option>
                            <option value={500}>Normal</option>
                            <option value={1000}>Slow</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-sm font-medium text-slate-200">
                            {message}
                        </span>
                    </div>
                    <span className="text-xs text-slate-500">
                        Step {Math.min(currentStep, steps.length)} / {steps.length}
                    </span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-cyan-400 transition-all duration-300"
                        style={{
                            width:
                                steps.length === 0
                                    ? "0%"
                                    : `${Math.min(
                                        (currentStep / steps.length) * 100,
                                        100
                                    )}%`
                        }}
                    />
                </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold">
                            Tree Structure
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Current visualization
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-cyan-400" />
                            <span className="text-slate-400">
                                Normal
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-400" />
                            <span className="text-slate-400">
                                Current
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-400" />
                            <span className="text-slate-400">
                                Visited
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-6 overflow-auto">
                    <div
                        className="relative mx-auto"
                        style={{
                            width: 850,
                            height: 420
                        }}
                    >
                        {/* Edges */}
                        <svg
                            className="absolute inset-0 w-full h-full"
                            style={{ overflow: "visible" }}
                        >
                            {layout.edges.map(([from, to], index) => {
    const parent = layout.nodes.find(
        n => n.id === from
    );
    const child = layout.nodes.find(
        n => n.id === to
    );
    if (!parent || !child) return null;
    return (
        <line
            key={index}
            x1={parent.x}
            y1={parent.y}
            x2={child.x}
            y2={child.y}
            stroke="#334155"
            strokeWidth="2"
        />
    );
})}
                        </svg>
                        {/* Nodes */}
                        {layout.nodes.map(node => {
                            const isCurrent =
                                currentNode === node.id;
                            const isVisited =
                                visitedNodes.includes(node.id);
                            let nodeStyle =
                                "bg-slate-800 border-slate-600 text-slate-200";
                            if (isVisited) {
                                nodeStyle =
                                    "bg-green-500/20 border-green-400 text-green-300";
                            }
                            if (isCurrent) {
                                nodeStyle =
                                    "bg-yellow-400 border-yellow-300 text-slate-950 shadow-lg shadow-yellow-400/20";
                            }
                            return (
                                <div
                                    key={node.id}
                                    className={`
                                        absolute
                                        w-12 h-12
                                        rounded-full
                                        border-2
                                        flex
                                        items-center
                                        justify-center
                                        font-semibold
                                        transition-all
                                        duration-300
                                        ${nodeStyle}
                                    `}
                                    style={{
                                        left: node.x - 24,
                                        top: node.y - 24
                                    }}
                                >
                                    {node.value}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/*  ALGORITHM INFORMATION*/}
<div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
    <div className="flex items-center gap-3 mb-7">
        <div className="w-1 h-8 bg-amber-400 rounded-full" />
        <div>
            <h2 className="text-xl font-semibold">
                Learn: {info.name}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
                Understand the logic behind this tree algorithm.
            </p>
        </div>
    </div>
    <div className="mb-7">
        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">
            What is it?
        </h3>
        <p className="text-sm text-slate-400 leading-6 max-w-4xl">
            {info.description}
        </p>
    </div>
    {/* Logic + How it works */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7">
        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <h3 className="font-semibold text-amber-400">
                    Logic
                </h3>
            </div>
            <p className="text-sm text-slate-400 leading-6">
                {algorithm === "inorder" &&
                    "First visit the left subtree, then process the current node, and finally visit the right subtree."
                }
                {algorithm === "preorder" &&
                    "Process the current node first, then recursively visit the left subtree followed by the right subtree."
                }
                {algorithm === "postorder" &&
                    "First process both subtrees and process the current node only after its left and right subtrees are complete."
                }
                {algorithm === "levelorder" &&
                    "Visit nodes level by level from the root. A queue is used to process nodes in the same order they are discovered."
                }
                {algorithm === "bstSearch" &&
                    "Compare the target with the current node. If the target is smaller, move left; if larger, move right. Repeat until the value is found or the search reaches an empty position."
                }
                {algorithm === "bstInsert" &&
                    "Compare the new value with each node and move left or right according to the BST property until an empty position is found."
                }
                {algorithm === "bstDelete" &&
                    "First locate the node. Then remove it while maintaining the BST property. The replacement depends on whether the node has zero, one, or two children."
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
                {algorithm === "inorder" &&
                    "The algorithm recursively explores the left side, processes the current node, and then explores the right side."
                }
                {algorithm === "preorder" &&
                    "The current node is processed immediately, followed by the left subtree and then the right subtree."
                }
                {algorithm === "postorder" &&
                    "The algorithm travels down both subtrees first and processes the parent node after its children."
                }
                {algorithm === "levelorder" &&
                    "The root is placed into a queue. Each processed node adds its children to the queue, producing a level-by-level traversal."
                }
                {algorithm === "bstSearch" &&
                    "At every comparison, half of the possible search direction is eliminated in a balanced BST, allowing the search to move quickly toward the target."
                }
                {algorithm === "bstInsert" &&
                    "The value follows the same left-smaller/right-larger rule as searching until the correct empty position is reached."
                }
                {algorithm === "bstDelete" &&
                    "A leaf can be removed directly, a node with one child can be replaced by that child, and a node with two children can be replaced using its inorder successor."
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

                    {algorithm === "inorder" &&
                        "Inorder traversal of a Binary Search Tree produces values in sorted ascending order."
                    }

                    {algorithm === "preorder" &&
                        "Preorder traversal is useful when the root needs to be processed before its subtrees."
                    }

                    {algorithm === "postorder" &&
                        "Postorder is useful when children must be processed before their parent, such as deleting or freeing a tree."
                    }

                    {algorithm === "levelorder" &&
                        "Level order traversal processes nodes according to their depth from the root and naturally uses a queue."
                    }

                    {algorithm === "bstSearch" &&
                        "BST search relies on the ordering rule: values smaller than a node are on the left and larger values are on the right."
                    }

                    {algorithm === "bstInsert" &&
                        "Every insertion must preserve the BST property so that future searches and other BST operations remain valid."
                    }

                    {algorithm === "bstDelete" &&
                        "Deletion is more complex because removing a node must preserve the BST ordering. A node with two children requires a replacement node."
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
{algorithm === "inorder" &&
`Inorder(node)

    if node is null
        return

    Inorder(node.left)

    visit node

    Inorder(node.right)`
}

{algorithm === "preorder" &&
`Preorder(node)

    if node is null
        return

    visit node

    Preorder(node.left)

    Preorder(node.right)`
}

{algorithm === "postorder" &&
`Postorder(node)

    if node is null
        return

    Postorder(node.left)

    Postorder(node.right)

    visit node`
}
{algorithm === "levelorder" &&
`LevelOrder(root)

    create queue
    add root to queue

    while queue is not empty

        node = remove front

        visit node

        if node.left exists
            add node.left

        if node.right exists
            add node.right`
}

{algorithm === "bstSearch" &&
`BSTSearch(node, target)

    if node is null
        return NOT FOUND

    if node.value == target
        return FOUND

    if target < node.value
        search left subtree

    else
        search right subtree`
}

{algorithm === "bstInsert" &&
`BSTInsert(node, value)

    if node is null
        create new node
        return node

    if value < node.value
        node.left = BSTInsert(node.left, value)

    else if value > node.value
        node.right = BSTInsert(node.right, value)

    return node`
}

{algorithm === "bstDelete" &&
`BSTDelete(node, value)

    if node is null
        return node

    if value < node.value
        delete from left subtree

    else if value > node.value
        delete from right subtree

    else

        if no left child
            return right child

        if no right child
            return left child

        find inorder successor

        replace node value

        delete successor

    return node`
}
            </pre>
        </div>
    </div>
    {/* Complexity */}
    <div>
        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">Complexity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-800/60">
                <p className="text-xs text-slate-500 uppercase">
                    Order
                </p>
                <p className="mt-2 text-amber-400 font-semibold">
                    {info.order}
                </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/60">

                <p className="text-xs text-slate-500 uppercase">
                    Time
                </p>

                <p className="mt-2 text-amber-400 font-semibold">
                    {info.complexity}
                </p>

            </div>
            <div className="p-4 rounded-lg bg-slate-800/60">

                <p className="text-xs text-slate-500 uppercase">
                    Space
                </p>
                <p className="mt-2 text-amber-400 font-semibold">
                    {info.space}
                </p>
            </div>
        </div>
    </div>
</div>
        </div>
    );
}

export default TreeVisualizer;