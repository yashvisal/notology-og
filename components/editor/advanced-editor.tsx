"use client";

import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";

import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
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
  initialValue?: JSONContent;
  onChange: (value: JSONContent) => void;
}
const Editor = ({ initialValue, onChange }: EditorProp) => {
  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  return (
    <EditorRoot>
      <EditorContent
        {...(initialValue && { initialContent: initialValue })}
        extensions={extensions}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          handleDrop: (view, event, _slice, moved) =>
            handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
        onUpdate={({ editor }) => {
          onChange(editor.getJSON());
        }}
        slotAfter={<ImageResizer />}
        className="w-full"
      >
        <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
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