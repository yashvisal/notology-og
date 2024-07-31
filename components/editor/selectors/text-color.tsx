import { useEditor } from "novel";
import { Trash2, Type } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BlockPicker } from 'react-color';

interface ColorPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const colors = ['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8'];

export const TextColorPicker = ({ open, onOpenChange }: ColorPickerProps) => {
    const { editor } = useEditor();
    const [selectedTextColor, setSelectedTextColor] = useState("#000000");
  
    if (!editor) return null;
  
    return (
      <Popover modal={true} open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button size="xs" variant="ghost" className="rounded-lg px-[9px]">
            <Type className="h-[14px] w-[14px]" style={{ color: selectedTextColor !== "#000000" ? selectedTextColor : "currentColor" }} />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0 rounded-lg" sideOffset={7.5}>
          <BlockPicker
            color={selectedTextColor}
            colors={colors}
            onChange={(color) => {
              editor.chain().focus().setColor(color.hex).run();
              setSelectedTextColor(color.hex);
              onOpenChange(false);
            }}
            triangle="hide"
          />
          <div
            className="p-2 flex justify-center items-center hover:bg-background rounded-xl"
            role="button"
            onClick={() => {
              editor.chain().focus().unsetColor().run();
              setSelectedTextColor("#000000");
              onOpenChange(false);
            }}
          >
            <Trash2 className="h-4 w-4 hover:text-red-500" />
          </div>
        </PopoverContent>
      </Popover>
    );
  };