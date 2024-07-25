"use client";

import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";

import "@/styles/prosemirror.css";

import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorContent,
  type JSONContent,
  EditorCommandList,
  EditorBubble,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { handleImageDrop, handleImagePaste } from "novel/plugins";

import { TextButtons } from "./selectors/text-buttons";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";

import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./slash-command";
import { uploadFn } from "./image-upload";

const extensions = [...defaultExtensions, slashCommand];

interface EditorProp {
  initialContent?: string | JSONContent;
  onChange: (value: JSONContent) => void;
}
const Editor = ({ initialContent, onChange }: EditorProp) => {
  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  return (
    <EditorRoot>
      <EditorContent
        initialContent={
          typeof initialContent === 'string' 
            ? JSON.parse(initialContent) 
            : initialContent
        }
        extensions={extensions}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          handleDrop: (view, event, _slice, moved) =>
            handleImageDrop(view, event, moved, uploadFn),
        }}
        onUpdate={({ editor }) => {
          onChange(editor.getJSON());
        }}
        slotAfter={<ImageResizer />}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-xl border border-muted bg-background p-0.5 shadow-md transition-all">
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`flex w-full items-center gap-x-1 rounded-lg text-left text-[#272727] text-sm hover:bg-accent aria-selected:bg-accent `}
                key={item.title}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                  {item.icon}
                </div>
                <div>
                  <p className="flex items-center justify-center font-medium mr-2">{item.title}</p>
                  {/* <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p> */}
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>

        <EditorBubble
          tippyOptions={{
            placement: "top",
          }}
          className="flex w-fit max-w-[90vw] text-[#272727] overflow-hidden rounded-xl p-[2px] border border-muted bg-background shadow-md"
        >
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator
            orientation="vertical"
            className="mx-[2px] h-4 self-center bg-gray-300 dark:bg-gray-700"
          />
          <TextButtons />
          <Separator
            orientation="vertical"
            className="mx-[2px] h-4 self-center bg-gray-300 dark:bg-gray-700"
          />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
};

export default Editor;