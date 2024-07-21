"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ElementRef, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface ToolbarProps {
    initialData: Doc<"documents">;
    preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);

    const update = useMutation(api.documents.update);

    const enableInput = () => {
        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        }, 0);
    }

    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) => {
        setValue(value);
        update({
            id: initialData._id,
            title: value || "Untitled"
        })
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            disableInput();
        }
    }

    return (
        <div className="relative">
            <div className="pl-[104px]">
                {isEditing ? (
                    <TextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    value={value}
                    onChange={(e) => onInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="pb-[11.5px] text-4xl bg-transparent font-semibold break-words outline-none text-[#000000] dark:text-[#CFCFCF] resize-none"
                    />
                ) : (
                    <div
                    onClick={enableInput}
                    className="pb-[11.5px] text-4xl font-semibold break-words outline-none text-[#000000] dark:text-[#CFCFCF]"
                    >
                        {initialData.title}
                    </div>
                )}
            </div>
        </div>
    )
}
