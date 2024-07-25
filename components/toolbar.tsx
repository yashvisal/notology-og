"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ElementRef, useRef, useState, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface ToolbarProps {
    initialData: Doc<"documents">;
    preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);
    const [isDefault, setIsDefault] = useState(initialData.title === "Untitled");

    const update = useMutation(api.documents.update);

    const enableInput = useCallback(() => {
        if (!isEditing) {
            setIsEditing(true);
            setIsDefault(false);
            setValue(initialData.title === "Untitled" ? "" : initialData.title);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    }, [isEditing, initialData.title]);

    const disableInput = () => {
        setIsEditing(false);
        if (value.trim() === "") {
            setValue("Untitled");
            setIsDefault(true);
        }
    }

    const onInput = useCallback((value: string) => {
        setValue(value);
        setIsDefault(value.trim() === "");
        update({
            id: initialData._id,
            title: value.trim() === "" ? "Untitled" : value
        })
    }, [update, initialData._id]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            disableInput();
        }
    }

    return (
        <div className="relative h-[50px]">
            <TextareaAutosize
                ref={inputRef}
                onFocus={enableInput}
                onBlur={disableInput}
                value={isEditing ? value : initialData.title}
                onChange={(e) => onInput(e.target.value)}
                onKeyDown={onKeyDown}
                className={`absolute top-0 left-0 w-full h-[50px] pb-[11.5px] text-4xl bg-transparent font-semibold break-words outline-none resize-none ${
                    isDefault || (!isEditing && initialData.title === "Untitled")
                        ? "text-light-gray"
                        : "text-[#000000]"
                } placeholder-light-gray`}
                placeholder="Untitled"
                readOnly={!isEditing}
            />
        </div>
    )
}