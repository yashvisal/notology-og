"use client";

import { cn } from "@/lib/utils";
import { ElementRef, useEffect, useRef, useState } from "react";
import Chat from "@/components/chat";

interface ChatbotProps {
    isOpen: boolean;
    onClose: () => void;
    onResize: (newWidth: number) => void;
}

export const Chatbot = ({ isOpen, onClose, onResize }: ChatbotProps) => {
    const chatbotRef = useRef<ElementRef<"aside">>(null);
    const isResizingRef = useRef(false);

    const [isResetting, setIsResetting] = useState(false);
    const [chatbotWidth, setChatbotWidth] = useState(300);

    useEffect(() => {
        if (isOpen) {
            resetWidth();
        } else {
            collapse();
        }
    }, [isOpen]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        
        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = window.innerWidth - e.clientX;

        if (newWidth < 300) newWidth = 300;
        if (newWidth > 540) newWidth = 540;

        if (chatbotRef.current) {
            chatbotRef.current.style.width = `${newWidth}px`;
        }
        onResize(newWidth);
        setChatbotWidth(newWidth);
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetWidth = () => {
        if (chatbotRef.current) {
            setIsResetting(true);
            setChatbotWidth(360);
            onResize(360);
            setIsResetting(false);
        }
    };

    const collapse = () => {
        if (chatbotRef.current) {
            setIsResetting(true);
            setChatbotWidth(0);
            onResize(0);
            setTimeout(() => {
                setIsResetting(false);
                onClose();
            }, 300);
        }
    };

    return (
        <aside
            ref={chatbotRef}
            className={cn(
                "group/chatbot bg-none overflow-y-auto absolute top-0 right-0 z-[60] border-l h-full scrollbar-hide",
                isResetting && "transition-all ease-in-out duration-300",
                !isOpen && "w-0"
            )}
            style={{ width: isOpen ? `${chatbotWidth}px` : '0' }}
        >
            <div
                onMouseDown={handleMouseDown}
                onClick={resetWidth}
                className="opacity-0 transition cursor-ew-resize absolute h-full w-1 bg-primary/20 left-0 top-0"
            />
            <div className="flex flex-col items-center justify-between h-full w-full">
                <Chat />
            </div>
        </aside>
    );
};