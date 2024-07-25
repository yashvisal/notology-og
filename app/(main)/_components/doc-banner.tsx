"use client";

import { Ellipsis, MessageCircle } from "lucide-react";

interface DocBannerProps {
    onToggleChatbot: () => void;
    isChatbotOpen: boolean;
}

export const DocBanner = ({ onToggleChatbot, isChatbotOpen }: DocBannerProps) => {
    return (
        <div className="bg-background top-0 flex flex-row items-center justify-end w-full py-2 gap-x-2 pr-3">
            <div 
                onClick={onToggleChatbot} 
                role="button" 
                className={`h-6 w-6 text-primary rounded-lg transition flex items-center justify-center
                    ${isChatbotOpen ? 'bg-primary/5 dark:bg-neutral-600' : 'hover:bg-primary/5 dark:hover:bg-neutral-600'}`}
            >
                <MessageCircle
                    className="w-[16px] h-[16px]"
                    strokeWidth={2.5}
                />
            </div>
            <div 
                onClick={() => {}} 
                role="button" 
                className="h-6 w-6 text-primary rounded-lg hover:bg-primary/5 dark:hover:bg-neutral-600 transition flex items-center justify-center"
            >
                <Ellipsis
                    className="w-5 h-5"
                />
            </div>
        </div>
    );
}