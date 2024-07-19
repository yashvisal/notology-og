"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Title } from "./title";

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
    const params = useParams();

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">
    });

    if (document === undefined) {
        return (
            <nav className="bg-background px-3 py-2 w-full flex items-center gap-x-4">
                <Title.Skeleton />
            </nav>
        );
    }

    if (document === null) {
        return null;
    }

    return (
        <nav className="bg-background px-3 py-3 w-full flex items-center gap-x-4 border-b">
            {isCollapsed && (
                <div 
                    onClick={onResetWidth} 
                    role="button" 
                    className="h-6 w-6 text-muted-foreground rounded-lg hover:bg-primary/5 dark:hover:bg-neutral-6000 transition flex items-center justify-center"
                >
                    <MenuIcon
                        className="w-5 h-5"
                        strokeWidth={1.9}
                    />
                </div>
            )}
            <div className="flex items-center justify-between w-full">
                <Title initialData={document} />
            </div>
        </nav>
    );
}