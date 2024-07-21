"use client";

import { Navbar } from "@/app/(main)/_components/navbar";
import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useState } from "react";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    })

    if (document === undefined) {
        return <div>Loading</div>
    }

    if (document === null) {
        return <div>Document not found</div>
    }

    return ( 
        <div className="flex flex-col h-full">
            <Navbar 
                isCollapsed={isCollapsed}
                onResetWidth={() => setIsCollapsed(false)}
            />
            <div className="flex-1 overflow-y-auto">
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto pt-16">
                    <Toolbar initialData={document}/>
                    <p className="text-sm text-muted-foreground mt-2 pl-[104px]">
                        Start typing...
                    </p>
                </div>
            </div>
        </div>
    );
}
 
export default DocumentIdPage;