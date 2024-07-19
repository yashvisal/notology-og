"use client";

import { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { useSearch } from "@/hooks/use-search";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

export const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch);
    const [ isMounted, setIsMounted ] = useState(false);

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                toggle();
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [toggle]);

    const onSelect = (id: string) => {
        const [ documentId, subjectId ] = id.split("-");
        router.push(`/${subjectId}/${documentId}`);
        onClose();
    }

    if (!isMounted) {
        return null;
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput
                placeholder={`Search ${user?.firstName}'s Notology...`}
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {documents?.map((document) => (
                        <div
                            key={document._id}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => onSelect(`${document._id}-${document.subjectId}`)}
                            className={cn(
                                "cursor-pointer transition-all duration-200",
                                "hover:bg-primary/5 focus:bg-primary/5 ",
                                "rounded-xl"
                            )}
                        >
                            <CommandItem
                                value={document.title}
                                className="flex items-center gap-2 w-full data-[selected=true]:bg-transparent"
                            >
                                {document.icon ? (
                                    <p className="text-[18px]">
                                        {document.icon}
                                    </p>
                                ) : (
                                    <File className="h-4 w-4" />
                                )}
                                <span className="truncate">
                                    {document.title}
                                </span>
                            </CommandItem>
                        </div>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}