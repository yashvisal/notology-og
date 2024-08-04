"use client";

import { X } from "lucide-react";

interface ChatHeaderProps {
    onClose: () => void;
}

export const ChatHeader = ({ onClose }: ChatHeaderProps) => {
    return (
        <div className="bg-background top-0 flex flex-row items-center justify-between w-full py-3 px-3">
            <h2 className="text-primary font-semibold">Chat</h2>
            <div 
                onClick={onClose} 
                role="button" 
                className="h-7 w-7 text-primary rounded-lg hover:bg-primary/5 dark:hover:bg-neutral-600 transition flex items-center justify-center"
            >
                <X
                    className="w-[16px] h-[16px]"
                    strokeWidth={2.5}
                />
            </div>
        </div>
    );
}
