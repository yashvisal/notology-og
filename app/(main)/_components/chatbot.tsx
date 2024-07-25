"use client";

import { cn } from "@/lib/utils";
import { ElementRef, useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, MoveUp } from "lucide-react";

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
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [input, setInput] = useState("");
    const [textareaHeight, setTextareaHeight] = useState('4rem');

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

        if (newWidth < 360) newWidth = 360;
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

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = '4rem'; // Reset to minimum height
            const newHeight = Math.min(textarea.scrollHeight, 320); // Max height of 20rem (320px)
            textarea.style.height = `${newHeight}px`;
            setTextareaHeight(`${newHeight}px`);
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [input]);

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
                <div className="flex-1 flex flex-col items-center justify-center w-full text-center px-4 pt-4">
                    <Image 
                        src="/chatbot-empty-light.png" 
                        alt="Chatbot Empty State" 
                        width={200} 
                        height={200}
                    />
                    <div className="text-center mt-4 text-primary">
                        Welcome back, send a message to get started!
                    </div>
                </div>
                <div className="sticky p-4 bottom-0 flex flex-col text-sm z-10 bg-none w-full">
                    <div className="flex flex-col justify-between gap-2 bg-white shadow-feint rounded-xl border border-border3 pt-1 pb-2">
                        <Textarea
                            ref={textareaRef}
                            placeholder="Ask the document a question..."
                            className="w-full resize-none focus:outline-none focus:ring-0 border-none placeholder:text-textGray2 !outline-none !ring-0 !ring-offset-0 scrollbar-hide"
                            style={{ 
                                height: textareaHeight,
                                minHeight: '4rem', 
                                maxHeight: '20rem', 
                                overflowY: 'auto'
                            }}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div className="flex flex-row items-center justify-end w-full px-2">
                            <div
                                role="button"
                                className="flex items-center justify-center h-7 w-7 text-muted-foreground bg-background rounded-lg border hover:bg-primary/5 dark:hover:bg-neutral-600 transition"
                            >
                                <ArrowUp className="w-[20px] h-6" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};