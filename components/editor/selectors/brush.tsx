import React, { useState } from "react";
import { useEditor } from "novel";
import { Brush, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface BrushProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const colorOptions = [
  { name: "Red", text: "#ef4444", highlight: "#fee2e2" },
  { name: "Orange", text: "#f97316", highlight: "#ffedd5" },
  { name: "Yellow", text: "#eab308", highlight: "#fef9c3" },
  { name: "Green", text: "#22c55e", highlight: "#dcfce7" },
  { name: "Blue", text: "#3b82f6", highlight: "#dbeafe" },
  { name: "Pink", text: "#ec4899", highlight: "#fce7f3" },
  { name: "Purple", text: "#a855f7", highlight: "#f3e8ff" },
];

export const BrushItem = ({ open, onOpenChange }: BrushProps) => {
  const { editor } = useEditor();
  const [selectedColor, setSelectedColor] = useState<
    (typeof colorOptions)[0] | null
  >(null);
  const [hoverColor, setHoverColor] = useState<(typeof colorOptions)[0] | null>(
    null
  );

  if (!editor) return null;

  const applyBrushEffect = (color: (typeof colorOptions)[0]) => {
    editor
      .chain()
      .focus()
      .setColor(color.text)
      .setHighlight({ color: color.highlight })
      .run();
    setSelectedColor(color);
    onOpenChange(false);
  };

  const resetBrushEffect = () => {
    editor.chain().focus().unsetColor().unsetHighlight().run();
    setSelectedColor(null);
    onOpenChange(false);
  };

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="xs" variant="ghost" className="rounded-lg px-[9px]">
          <Brush
            className="h-[14px] w-[14px]"
            style={{
              color: selectedColor ? selectedColor.text : "currentColor",
            }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[200px] p-1 rounded-xl"
        sideOffset={7.5}
      >
        <div className="flex flex-col gap-y-1 pb-2">
          <div className="text-xs text-center bg-background rounded-xl pt-1">
            <span
              style={{
                color: hoverColor ? hoverColor.text : "currentColor",
                backgroundColor: hoverColor
                  ? hoverColor.highlight
                  : "transparent",
              }}
            >
              Hover on a color to test out this custom brush effect!
            </span>
          </div>
          <Separator className="my-1.5 w-[150px] mx-auto" />
          <div className="grid grid-cols-4 gap-y-2 place-items-center">
            {colorOptions.map((color) => (
              <Button
                key={color.name}
                size="xs"
                variant="ghost"
                className="w-[22px] h-[22px] p-0 rounded-md"
                style={{
                  backgroundColor: color.text,
                }}
                onClick={() => applyBrushEffect(color)}
                onMouseEnter={() => setHoverColor(color)}
                onMouseLeave={() => setHoverColor(null)}
              />
            ))}
            <Button
              size="xs"
              variant="ghost"
              className="w-[22px] h-[22px] p-0 rounded-md flex items-center justify-center hover:bg-background group"
              onClick={resetBrushEffect}
            >
              <Trash2 className="h-4 w-4 group-hover:text-red-500" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};