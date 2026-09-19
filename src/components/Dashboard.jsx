import { ArrowDownUp, Search, GitBranch, TreePine, Link,Layers,List, Box,Hash,ArrowRight, Sparkles,
} from "lucide-react";
function Dashboard({ setActivePage }) {
  const quickStartItems = [
    {
      name: "Sorting",
      description: "Visualize sorting algorithms step by step.",
      icon: ArrowDownUp,
      page: "sorting",
    },
    {
      name: "Searching",
      description: "Understand how searching algorithms work.",
      icon: Search,
      page: "searching",
    },
    {
      name: "Graphs",
      description: "Explore traversal and shortest path algorithms.",
      icon: GitBranch,
      page: "graphs",
    },
    {
      name: "Trees",
      description: "Visualize tree traversals and BST operations.",
      icon: TreePine,
      page: "trees",
    },
    {
      name: "Linked List",
      description: "Explore linked list operations visually.",
      icon: Link,
      page: "linkedlist",
    },
    {
      name: "Stack",
      description: "Understand LIFO operations step by step.",
      icon: Layers,
      page: "stack",
    },
    {
      name: "Queue",
      description: "Visualize FIFO operations interactively.",
      icon: List,
      page: "queue",
    },
    {
      name: "Heap",
      description: "Explore heap operations and structure.",
      icon: Box,
      page: "heap",
    },
    {
      name: "Hash Table",
      description: "Understand hashing, searching and deletion.",
      icon: Hash,
      page: "hashtable",
    },
  ];

  const overviewItems = [
    {
      number: "09",
      label: "Learning Modules",
    },
    {
      number: "05",
      label: "Sorting Algorithms",
      page: "sorting",
    },
    {
      number: "02",
      label: "Searching Algorithms",
      page: "searching",
    },
    {
      number: "05",
      label: "Graph Algorithms",
      page: "graphs",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">

      {/* WELCOME */}

      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-8">

        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

        <div className="relative">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-5">

            <Sparkles size={14} />

            Interactive DSA Learning Platform

          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to{" "}
            <span className="text-cyan-400">
              AlgoViz
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400 text-lg leading-relaxed">
            Visualize algorithms and data structures. Understand how they work,
            one step at a time.
          </p>

        </div>

      </section>
      {/* PROJECT OVERVIEW */}

      <section>

        <div className="flex items-end justify-between mb-5">

          <div>
            <h2 className="text-xl font-semibold">
              Project Overview
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Explore the concepts available in AlgoViz.
            </p>
          </div>

        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {overviewItems.map((item) => {

            const clickable = Boolean(item.page);

            return (
              <button
                key={item.label}
                type="button"
                onClick={() =>
                  item.page && setActivePage(item.page)
                }
                disabled={!clickable}
                className={`
                  group
                  p-5
                  rounded-xl
                  bg-slate-900
                  border border-slate-800
                  text-left
                  transition-all duration-200
                  ${
                    clickable
                      ? "hover:border-cyan-500/40 hover:bg-slate-800/60 cursor-pointer"
                      : "cursor-default"
                  }
                `}
              >

                <div className="flex items-start justify-between">

                  <p className="text-3xl font-bold text-cyan-400">
                    {item.number}
                  </p>

                  {clickable && (
                    <ArrowRight
                      size={17}
                      className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all"
                    />
                  )}
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  {item.label}
                </p>
              </button>
            );
          })}
        </div>
      </section>
      {/* QUICK START */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-semibold">
            Quick Start
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Choose a topic and start visualizing.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {quickStartItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActivePage(item.page)}
                className="
                  group
                  p-5
                  rounded-xl
                  bg-slate-900
                  border border-slate-800
                  hover:border-cyan-500/40
                  hover:bg-slate-800/60
                  transition-all duration-200
                  text-left
                  cursor-pointer
                "
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="
                      p-2.5
                      rounded-lg
                      bg-slate-800
                      border border-slate-700
                      group-hover:bg-cyan-500/10
                      group-hover:border-cyan-500/20
                      transition
                    ">
                      <Icon
                        size={20}
                        className="text-cyan-400"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">
                      {item.name}
                    </h3>
                  </div>
                  <ArrowRight
                    size={17}
                    className="
                      mt-1
                      text-slate-700
                      group-hover:text-cyan-400
                      group-hover:translate-x-1
                      transition-all
                    "
                  />
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 text-xs text-slate-600 group-hover:text-cyan-500/70 transition">
                  Explore →
                </div>
              </button>
            );
          })}
        </div>
      </section>
      {/* POPULAR ALGORITHMS */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-semibold">
            Popular Algorithms
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Start with some of the most commonly studied algorithms.
          </p>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* BUBBLE SORT */}

          <button
            type="button"
            onClick={() => setActivePage("sorting")}
            className="
              group
              p-5
              rounded-xl
              bg-slate-900
              border border-slate-800
              hover:border-cyan-500/40
              hover:bg-slate-800/60
              transition-all duration-200
              text-left
              cursor-pointer
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-widest text-cyan-400 uppercase">
                Sorting
              </span>
              <ArrowRight
                size={16}
                className="text-slate-700 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all"
              />
            </div>
            <h3 className="mt-3 font-semibold text-lg">
              Bubble Sort
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Simple comparison-based sorting algorithm.
            </p>
            <div className="mt-4 text-xs text-slate-500">
              Time: <span className="text-slate-300">O(n²)</span>
            </div>
          </button>
          {/* BINARY SEARCH */}
          <button
            type="button"
            onClick={() => setActivePage("searching")}
            className="
              group p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all duration-200 text-left   cursor-pointer
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-widest text-cyan-400 uppercase">
                Searching
              </span>
              <ArrowRight
                size={16}
                className="text-slate-700 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all"
              />
            </div>
            <h3 className="mt-3 font-semibold text-lg">
              Binary Search
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Efficient searching on sorted data.
            </p>
            <div className="mt-4 text-xs text-slate-500">
              Time: <span className="text-slate-300">O(log n)</span>
            </div>
          </button>
          {/* DIJKSTRA */}
          <button
            type="button"
            onClick={() => setActivePage("graphs")}
            className="  group p-5 rounded-xl bg-slate-900  border border-slate-800  hover:border-cyan-500/40  hover:bg-slate-800/60  transition-all duration-200  text-left  cursor-pointer
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-widest text-cyan-400 uppercase">
                Graphs
              </span>
              <ArrowRight
                size={16}
                className="text-slate-700 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all"
              />
            </div>
            <h3 className="mt-3 font-semibold text-lg">
              Dijkstra
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Finds shortest paths in weighted graphs.
            </p>
            <div className="mt-4 text-xs text-slate-500">
              Time: <span className="text-slate-300">O(V² + E)</span>
            </div>
          </button>
        </div>
      </section>
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-semibold">
            How AlgoViz Works
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Learn by interacting with every step of an algorithm.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            {
              number: "01",
              title: "Choose",
              description: "Select an algorithm or data structure.",
            },
            {
              number: "02",
              title: "Start",
              description: "Start the visualization and watch it execute.",
            },
            {
              number: "03",
              title: "Control",
              description: "Play, pause or move through each step.",
            },
            {
              number: "04",
              title: "Understand",
              description: "Follow the changes and understand the logic.",
            },
          ].map((item, index) => (
            <div
              key={item.number}
              className="
                relative
                p-5
                rounded-xl
                bg-slate-900
                border border-slate-800
              "
            >
              <div className="flex items-center justify-between">
                <p className="text-cyan-400 font-semibold">
                  {item.number}
                </p>
                {index < 3 && (
                  <ArrowRight
                    size={16}
                    className="hidden xl:block text-slate-700"
                  />
                )}
              </div>
              <h3 className="mt-3 font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Dashboard;