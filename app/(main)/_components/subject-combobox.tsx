"use client";

import { ArrowLeft, ChevronsLeft } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

import {
    Avatar,
    AvatarImage
} from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface UserItemProps {
    onCollapse: () => void;
    isMobile: boolean;
}

export const SubjectCombobox = ({ onCollapse, isMobile }: UserItemProps) => {
    const { user } = useUser();
    const router = useRouter();
    const subjects = useQuery(api.subjects.getSubjects);
    const params = useParams();
    const subjectId = params.subjectId as Id<"subjects"> | undefined;

    const currentSubject = useQuery(
        api.subjects.getSubject,
        subjectId ? { subjectId } : "skip"
    );

    return (
        <div className="flex items-center w-full px-2 pt-1 py-[2px] group/sidebar">
            <div className="flex items-center pl-1 py-3 w-full">
                <div
                    role="button"
                    onClick={() => router.push("/home")}
                    className="flex items-center cursor-pointer"
                >
                    <div className="relative h-6 w-6 rounded-lg hover:bg-primary/5 dark:hover:bg-neutral-600 transition flex items-center justify-center">
                        <Avatar className="h-5 w-5 group-hover/sidebar:opacity-0 transition-opacity">
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/sidebar:opacity-100 transition-opacity">
                            <ArrowLeft className="h-5 w-5 text-muted-foreground"/>
                        </div>
                    </div>
                </div>
                <div
                    role="button"
                    onClick={() => {/* Add your onClick handler here */}}
                    className="flex-grow flex items-center px-2 h-[30px] cursor-pointer hover:bg-primary/5 dark:hover:bg-neutral-600 transition rounded-xl overflow-hidden"
                >
                    <span className="text-[15px] truncate font-semibold w-full">
                        {currentSubject?.name}
                    </span>
                </div>
                <div
                    onClick={onCollapse}
                    role="button"
                    className={cn(
                        "h-full ml-auto flex items-center justify-center",
                        isMobile && "opacity-100"
                    )}
                >
                    <div className={cn(
                        "h-6 w-6 text-muted-foreground rounded-lg hover:bg-primary/5 dark:hover:bg-neutral-600 transition flex items-center justify-center",
                        isMobile ? "opacity-100" : "opacity-0 group-hover/sidebar:opacity-100"
                    )}>
                        <ChevronsLeft
                            className="h-6 w-6"
                            strokeWidth={1.75}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}