"use client";

import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";

interface TextInputProps {
  onSend: (message: string) => void;
}

export const TextInput = ({ onSend }: TextInputProps) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = input ? `${Math.min(textarea.scrollHeight, 240)}px` : "36px"; // Max 15rem (240px)
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "36px";
      }
    }
  };

  return (
    <div className="sticky p-4 bottom-0 flex flex-col text-sm z-10 bg-none w-full">
      <div className="flex flex-col justify-between gap-2 bg-white shadow-feint rounded-xl border border-border3 pt-1 pb-2 min-h-[36px] max-h-[15rem]">
        <Textarea
          ref={textareaRef}
          placeholder="Ask Noto anything!"
          className="w-full resize-none focus:outline-none focus:ring-0 border-none placeholder:placeholder-light-gray !outline-none !ring-0 !ring-offset-0 scrollbar-hide min-h-[36px] overflow-y-auto"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <div className="flex flex-row items-center justify-end w-full px-2.5">
          <div
            role="button"
            onClick={handleSend}
            className="flex items-center justify-center h-7 w-7 text-muted-foreground bg-background rounded-lg border hover:bg-primary/5 dark:hover:bg-neutral-600 transition"
          >
            <ArrowUp className="w-[20px] h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};