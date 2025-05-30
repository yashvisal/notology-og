import {
    Check,
    ChevronDown,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    ListChecks,
    TextIcon,
    Code,
    type LucideIcon,
  } from "lucide-react";
  import { EditorBubbleItem, EditorInstance, useEditor } from "novel";
  
  import { Popover } from "@radix-ui/react-popover";
  import { PopoverContent, PopoverTrigger } from "@/components//ui/popover";
  import { Button } from "@/components//ui/button";
  
  export type SelectorItem = {
    name: string;
    icon: LucideIcon;
    command: (editor: EditorInstance) => void;
    isActive: (editor: EditorInstance) => boolean;
  };
  
  const items: SelectorItem[] = [
    {
      name: "Body",
      icon: TextIcon,
      command: (editor) => editor.chain().focus().clearNodes().run(),
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: (editor) =>
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
    },
    {
      name: "Heading 1",
      icon: Heading1,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
      isActive: (editor) => editor.isActive("heading", { level: 1 }),
    },
    {
      name: "Heading 2",
      icon: Heading2,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
      isActive: (editor) => editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Heading 3",
      icon: Heading3,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
      isActive: (editor) => editor.isActive("heading", { level: 3 }),
    },
    {
      name: "To-do",
      icon: ListChecks,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleTaskList().run(),
      isActive: (editor) => editor.isActive("taskItem"),
    },
    {
      name: "Bullet",
      icon: List,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleBulletList().run(),
      isActive: (editor) => editor.isActive("bulletList"),
    },
    {
      name: "Numbered",
      icon: ListOrdered,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleOrderedList().run(),
      isActive: (editor) => editor.isActive("orderedList"),
    },
    {
      name: "Code",
      icon: Code,
      command: (editor) =>
        editor.chain().focus().clearNodes().toggleCodeBlock().run(),
      isActive: (editor) => editor.isActive("codeBlock"),
    },
  ];
  interface NodeSelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }
  
  export const NodeSelector = ({ open, onOpenChange }: NodeSelectorProps) => {
    const { editor } = useEditor();
    if (!editor) return null;
  
    const activeItem = items.filter((item) => item.isActive(editor)).pop() ?? {
      name: "Multiple",
    };
  
    return (
      <div className="group">
        <Popover modal={true} open={open} onOpenChange={onOpenChange}>
          <PopoverTrigger
            asChild
            className="border-none"
          >
            <Button
              size="xs"
              variant="ghost"
              className="rounded-lg px-2 gap-0.5 group-hover:bg-accent focus:ring-0"
            >
              <span className="whitespace-nowrap text-sm">{activeItem.name}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            sideOffset={7.5}
            align="start"
            className="w-[136px] p-[2px] rounded-xl"
          >
            {items.map((item, index) => (
              <EditorBubbleItem
                key={index}
                onSelect={(editor) => {
                  item.command(editor);
                  onOpenChange(false);
                }}
                className="flex cursor-pointer items-center justify-between rounded-lg px-1 py-0.5 text-sm text-[#272727] hover:bg-accent"
              >
                <div className="flex items-center space-x-2 font-medium">
                  <div className="rounded-lg">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span>{item.name}</span>
                </div>
                {activeItem.name === item.name && <Check className="h-4 w-4" />}
              </EditorBubbleItem>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    );
  };