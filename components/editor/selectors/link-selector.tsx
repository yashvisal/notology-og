import { cn } from "@/lib/utils";
import { useEditor } from "novel";
import { Check, Link, Trash } from "lucide-react";
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (e) {
    return null;
  }
}
interface LinkSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LinkSelector = ({ open, onOpenChange }: LinkSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { editor } = useEditor();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  const handleLinkSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const target = e.currentTarget as HTMLFormElement;
    const input = target[0] as HTMLInputElement;
    const url = getUrlFromString(input.value);
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
    setTimeout(() => {
      onOpenChange(false);
      setIsSubmitting(false);
    }, 50);
  };

  if (!editor) return null;

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          size="xs"
          variant="ghost"
          className="rounded-lg px-[9px]"
        >
          <Link
            className={cn("h-[14px] w-[14px]", {
              "text-blue-500": editor.isActive("link"),
            })}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 p-0 rounded-xl text-[#272727]" sideOffset={10}>
        <form onSubmit={handleLinkSubmit} className="flex items-center mx-1">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter link"
            className="flex-1 bg-background p-1 rounded-xl text-sm outline-none"
            defaultValue={editor.getAttributes("link").href || ""}
          />
          {editor.getAttributes("link").href ? (
            <div
              className="cursor-pointer rounded-lg p-1 text-primary transition-all hover:text-red-600 hover:bg-background dark:hover:bg-red-800"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editor.chain().focus().unsetLink().run();
                onOpenChange(false);
              }}
            >
              <Trash className="h-4 w-4" />
            </div>
          ) : (
            <Button
              size="xs"
              variant="ghost"
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg px-1 transition-all hover:bg-background hover:text-blue-500"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};