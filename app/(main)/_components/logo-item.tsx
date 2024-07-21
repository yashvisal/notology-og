"use client";

import { ChevronsLeft } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import {
    Avatar,
    AvatarImage
} from "@/components/ui/avatar";

interface UserItemProps {
    onCollapse: () => void;
    isMobile: boolean;
}

export const LogoItem = ({ onCollapse, isMobile }: UserItemProps) => {
    const { user } = useUser();
    const router = useRouter();

    return (
        <div className="flex items-center w-full px-2 pt-1 py-[2px]">
            <div className="flex items-center px-2 py-3 w-full gap-x-2">
                <div
                    role="button"
                    onClick={() => router.push("/home")}
                    className="flex items-center cursor-pointer"
                >
                    <Avatar className="h-5 w-5">
                        <AvatarImage src={user?.imageUrl} />
                    </Avatar>
                </div>
                <span className="flex items-center h-[30px] text-[15px] font-semibold line-clamp-1">
                    notology.
                </span>
                {/* <span className="flex items-center h-[30px] text-sm font-medium line-clamp-1">
                    {user?.firstName}&apos;s Notology
                </span> */}
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
    );
}