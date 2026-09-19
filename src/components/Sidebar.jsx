import { useState } from "react"
import {
    Home,
    ArrowDownUp,
    Search,
    GitBranch,
    TreePine,
    Box,
    Link,
    Layers,
    List,
    Hash,
    Settings,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import SidebarItem from "./SidebarItem"
function Sidebar({ activePage, setActivePage }) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <aside
            className={`
                ${isCollapsed ? "w-20" : "w-64"}
                min-h-screen
                bg-slate-900
                text-white
                border-r border-slate-800
                transition-all
                duration-300
                flex
                flex-col
                shrink-0
            `}
        >
            {/* Logo + Collapse Button */}
            <div className="p-5 flex items-center justify-between border-b border-slate-800">

                {!isCollapsed && (
                    <h1 className="text-2xl font-bold text-cyan-300">
                        AlgoViz
                    </h1>
                )}

                <button
                    type="button"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="
                        p-2
                        rounded-lg
                        text-slate-400
                        hover:text-white
                        hover:bg-slate-800
                        transition
                    "
                >
                    {isCollapsed
                        ? <ChevronRight size={20} />
                        : <ChevronLeft size={20} />
                    }
                </button>
            </div>
            {/* Navigation */}
            <nav className="px-3 py-5 flex-1">
                {/* Dashboard */}
                <SidebarItem
                    icon={<Home size={20} />}
                    label="Dashboard"
                    isCollapsed={isCollapsed}
                    active={activePage === "dashboard"}
                    onClick={() => setActivePage("dashboard")}
                />
                {/* Algorithms */}
                <div className="mt-7">
                    {!isCollapsed && (
                        <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Algorithms
                        </p>
                    )}
                    <div className="space-y-1">
                        <SidebarItem
                            icon={<ArrowDownUp size={20} />}
                            label="Sorting"
                            isCollapsed={isCollapsed}
                            active={activePage === "sorting"}
                            onClick={() => setActivePage("sorting")}
                        />
                        <SidebarItem
                            icon={<Search size={20} />}
                            label="Searching"
                            isCollapsed={isCollapsed}
                            active={activePage === "searching"}
                            onClick={() => setActivePage("searching")}
                        />
                        <SidebarItem
                            icon={<GitBranch size={20} />}
                            label="Graphs"
                            isCollapsed={isCollapsed}
                            active={activePage === "graphs"}
                            onClick={() => setActivePage("graphs")}
                        />
                        <SidebarItem
                            icon={<TreePine size={20} />}
                            label="Trees"
                            isCollapsed={isCollapsed}
                            active={activePage === "trees"}
                            onClick={() => setActivePage("trees")}
                        />
                    </div>
                </div>
                {/* Data Structures */}
                <div className="mt-7">
                    {!isCollapsed && (
                        <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Data Structures
                        </p>
                    )}
                    <div className="space-y-1">
                        <SidebarItem
                            icon={<Link size={20} />}
                            label="Linked List"
                            isCollapsed={isCollapsed}
                            active={activePage === "linkedlist"}
                            onClick={() => setActivePage("linkedlist")}
                        />
                        <SidebarItem
                            icon={<Layers size={20} />}
                            label="Stack"
                            isCollapsed={isCollapsed}
                            active={activePage === "stack"}
                            onClick={() => setActivePage("stack")}
                        />
                        <SidebarItem
                            icon={<List size={20} />}
                            label="Queue"
                            isCollapsed={isCollapsed}
                            active={activePage === "queue"}
                            onClick={() => setActivePage("queue")}
                        />
                        <SidebarItem
                            icon={<Box size={20} />}
                            label="Heap"
                            isCollapsed={isCollapsed}
                            active={activePage === "heap"}
                            onClick={() => setActivePage("heap")}
                        />
                        <SidebarItem
                            icon={<Hash size={20} />}
                            label="Hash Table"
                            isCollapsed={isCollapsed}
                            active={activePage === "hashtable"}
                            onClick={() => setActivePage("hashtable")}
                        />
                    </div>
                </div>
            </nav>

            {/* Settings */}
            <div className="px-3 pb-5 border-t border-slate-800 pt-4">
                <SidebarItem
                    icon={<Settings size={20} />}
                    label="Settings"
                    isCollapsed={isCollapsed}
                />
            </div>
        </aside>
    )
}
export default Sidebar