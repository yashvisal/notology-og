"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";

interface ItemProps {
    id?: Id<"documents"> | Id<"subjects">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick: () => void;
    onCreate?: () => void;
    icon: LucideIcon;
    isSubject?: boolean;
    showExpandButton?: boolean;
    showCreateButton?: boolean;
};

export const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    isSearch,
    level = 0,
    onExpand,
    expanded,
    onCreate,
    isSubject,
    showExpandButton = false,
    showCreateButton = false,
}: ItemProps) => {

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    }

    const handleCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onCreate?.();
    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div className="px-2">
            <div
                onClick={onClick}
                role="button"
                style={{
                    paddingLeft: level ? `${(level * 12) + 12}px` : "0px",
                }}
                className={cn(
                    "group min-h-[27px] text-sm px-1.5 w-full hover:rounded-lg hover:bg-primary/5 transition-all duration-200 ease-in-out flex items-center text-muted-foreground font-medium",
                    active && "bg-primary/5 text-primary"
                )}
            >
                {!!id && showExpandButton && onExpand && (
                    <div
                        role="button"
                        className="h-full pl-1.5"
                        onClick={handleExpand}
                    >
                        <ChevronIcon
                            className="h-4 w-4 shrink-0 rounded-md hover:bg-primary/5 dark:hover:bg-neutral-600 text-muted-foreground/70"
                        />
                    </div>
                )}
                {documentIcon ? (
                        <div className="shrink-0 mr-2 text-[18px]">
                            {documentIcon}
                        </div>
                    ) : (
                        <Icon 
                        className="shrink-0 h-[18px] ml-1 mr-2 text-muted-foreground" 
                    />
                )}
                <span className="truncate">
                    {label}
                </span>
                {isSearch && (
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-md border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                )}
                {!!id && showCreateButton && onCreate && (
                    <div className="ml-auto flex items-center gap-x-2">
                        <div
                            role="button"
                            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                            onClick={handleCreate}                        
                        >
                            <Plus className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4"/>
            <Skeleton className="h-4 w-[30%]"/>
        </div>
    )
}