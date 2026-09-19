function SidebarItem({
    icon,
    label,
    isCollapsed,
    active = false,
    onClick
}) {
    return (
        <div
            onClick={onClick}
            title={isCollapsed ? label : ""}
            className={`
                relative
                flex
                items-center
                gap-3
                px-3
                py-2.5
                rounded-lg
                cursor-pointer
                transition-all
                duration-200
                ${isCollapsed ? "justify-center" : ""}
                ${
                    active
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
            `}
        >
            {/* Active indicator */}
            {active && (
                <div
                    className="
                        absolute
                        left-0
                        top-1/2
                        -translate-y-1/2
                        w-1
                        h-6
                        bg-cyan-400
                        rounded-r-full
                    "
                />
            )}
            {icon}
            {!isCollapsed && (
                <span className="text-sm font-medium">
                    {label}
                </span>
            )}
        </div>
    )
}
export default SidebarItem