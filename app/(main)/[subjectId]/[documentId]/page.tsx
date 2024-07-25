"use client";

import { cn } from "@/lib/utils";

import { Navbar } from "@/app/(main)/_components/navbar";
import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { ElementRef, useEffect, useRef, useState } from "react";

import Editor from "@/components/editor/advanced-editor";
import { Skeleton } from "@/components/ui/skeleton";

import { JSONContent } from "novel";
import { DocBanner } from "../../_components/doc-banner";
import { Chatbot } from "../../_components/chatbot";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [chatbotWidth, setChatbotWidth] = useState(240);
    const contentRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    })

    const update = useMutation(api.documents.update);

    const onChange = (content: JSONContent) => {
        update({
            id: params.documentId,
            content: JSON.stringify(content)
        })
    }

    useEffect(() => {
        if (contentRef.current) {
            setIsResetting(true);
            contentRef.current.style.marginRight = isChatbotOpen ? `${chatbotWidth}px` : "0";
            setIsResetting(false);
        }
    }, [isChatbotOpen, chatbotWidth]);

    const handleChatbotResize = (newWidth: number) => {
        setChatbotWidth(newWidth);
    };

    if (document === undefined) {
        return (
            <div className="md:max-w-2xl lg:max-w-3xl mx-auto mt-10">
                <div className="space-y-4 pl-8 pt-4">
                    <Skeleton className="h-14 w-[50%]" />
                    <Skeleton className="h-14 w-[80%]" />
                    <Skeleton className="h-14 w-[40%]" />
                    <Skeleton className="h-14 w-[60%]" />
                </div>
            </div>
        )
    }

    if (document === null) {
        return <div>Document not found</div>
    }

    return ( 
        <div className="flex flex-col h-screen">
            <Navbar 
                isCollapsed={isCollapsed}
                onResetWidth={() => setIsCollapsed(false)}
            />
            <div className="flex-1 relative">
                <div 
                    ref={contentRef}
                    className={cn(
                        "absolute inset-0 flex flex-col",
                        isResetting && "transition-all ease-in-out duration-300"
                    )}
                    style={{ marginRight: isChatbotOpen ? `${chatbotWidth}px` : "0" }}
                >
                    <DocBanner 
                        onToggleChatbot={() => setIsChatbotOpen(!isChatbotOpen)} 
                        isChatbotOpen={isChatbotOpen}
                    />
                    <div className="flex-1 overflow-y-auto" style={{ scrollbarGutter: 'stable' }}>
                        <div className="md:max-w-2xl lg:max-w-3xl mx-auto pt-4 px-8 pb-32">
                            <Toolbar initialData={document}/>
                            <div className="mt-2">
                                <Editor
                                    onChange={onChange}
                                    initialContent={document.content ? JSON.parse(document.content) : undefined}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Chatbot 
                    isOpen={isChatbotOpen} 
                    onClose={() => setIsChatbotOpen(false)}
                    onResize={handleChatbotResize}
                />
            </div>
        </div>
    );
}

export default DocumentIdPage;