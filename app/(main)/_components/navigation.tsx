"use client";

import { cn } from "@/lib/utils";

import { ArrowLeft, Home, LibraryBig, MenuIcon, Search, Settings } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { UserItem } from "./user-item";

import { Item } from "./item";
import { SidebarList } from "./sidebar-list";
import { Id } from "@/convex/_generated/dataModel";
import { Navbar } from "./doc-navbar";

import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";

export const Navigation = () => {
    const settings = useSettings();
    const search = useSearch();
    const pathname = usePathname();
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const params = useParams();
        
    const [activeSubject, setActiveSubject] = useState<Id<"subjects"> | null>(null);
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.preventDefault();
        e.stopPropagation();
        
        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!sidebarRef.current) return;
        let newWidth = e.clientX

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100%-${newWidth}px)`);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100%-240px)");
            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
            setTimeout(() => {
                setIsResetting(false);
            }, 300);
        }
    };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => {
                setIsResetting(false);
            }, 300);
        }
    };

    useEffect(() => {
        if (params.subjectId) {
            setActiveSubject(params.subjectId as Id<"subjects">);
        } else {
            setActiveSubject(null);
        }
    }, [params.subjectId]);

    const handleSubjectClick = (subjectId: Id<"subjects">) => {
        setActiveSubject(subjectId);
        router.push(`/subjects/${subjectId}`);
    };

    const handleBackClick = () => {
        setActiveSubject(null);
        router.push('/home');
    };

    const renderMainSidebar = () => (
        <>
            <UserItem
                onCollapse={collapse}
                isMobile={isMobile}
            />
            <Item 
                label="Home"
                icon={Home}
                onClick={() => router.push("/home")}
                active={pathname === "/home"}
            />
            <Item 
                label="Search"
                icon={Search}
                isSearch
                onClick={search.onOpen}
                active={pathname === "/search"}
            />
            <Item 
                label="Subjects"
                icon={LibraryBig}
                onClick={() => router.push("/subjects")}
                active={pathname === "/subjects"}
            />
            <Item
                label="Settings"
                icon={Settings}
                onClick={settings.onOpen}
                active={pathname === "/settings"}
            />
            <div className="mt-3">
                <SidebarList 
                    onSubjectClick={handleSubjectClick}
                />
            </div>
        </>
    );

    const renderSubjectSidebar = () => (
        <>
            <UserItem
                onCollapse={collapse}
                isMobile={isMobile}
            />
            <Item
                label="Dashboard"
                icon={LibraryBig}
                onClick={() => {}}
            />
            <Item 
                label="Return Home"
                icon={ArrowLeft}
                onClick={handleBackClick}
            />
            <SidebarList 
                parentDocumentId={undefined} 
                subjectId={activeSubject!}
                onSubjectClick={handleSubjectClick}
            />
        </>
    );

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar bg-secondary/30 h-full overflow-y-auto relative flex w-60 flex-col z-[50] border-r",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}
            >
                <div>
                    {activeSubject ? renderSubjectSidebar() : renderMainSidebar()}
                </div>
                <div
                    // div when hover on sidebar, resizing logic
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 transition cursor-ew-resize absolute h-full w-1 bg-primary/20 right-0 top-0"
                />
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[50]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}
                style={{
                    left: sidebarRef.current?.style.width || '240px',
                    maxWidth: `calc(100% - ${sidebarRef.current?.style.width})`,
                }}
                // above is the logic to make it in sync with navbar, potentially need for ai chatbot on right side?
            >
                {/* if documentId is present, render the navbar. if change to subject is needed then its here */}
                {!!params.documentId ? (
                    <Navbar 
                        isCollapsed={isCollapsed}
                        onResetWidth={resetWidth}
                    />
                ) : (
                    <nav className="bg-transparent px-3 py-2 w-full">
                        {isCollapsed && (
                            <div 
                                onClick={resetWidth} 
                                role="button" 
                                className="h-7 w-7 text-muted-foreground rounded-lg hover:bg-primary/5 dark:hover:bg-neutral-600 transition flex items-center justify-center"
                            >
                                <MenuIcon className="w-6 h-6"/>
                            </div>
                        )}
                    </nav>
                )}
            </div>
        </>
    );
};