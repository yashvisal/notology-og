"use client";

import { useState } from "react";
import { TextInput } from "@/app/(main)/_components/(chatbot)/text-input";
import { EndpointsContext } from "@/app/(main)/[subjectId]/[documentId]/agent";
import { useActions } from "@/utils/client";
import { LocalContext } from "@/app/(main)/[subjectId]/[documentId]/shared";
import { HumanMessageText } from "./message";
import Image from "next/image";

export interface ChatProps {}

function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(",")[1]); // Remove the data URL prefix
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

function FileUploadMessage({ file }: { file: File }) {
  return (
    <div className="flex w-full max-w-fit ml-auto">
      <p>File uploaded: {file.name}</p>
    </div>
  );
}

export default function Chat() {
  const actions = useActions<typeof EndpointsContext>();

  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [history, setHistory] = useState<[role: string, content: string][]>([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  async function onSubmit(input: string) {
    const newElements = [...elements];
    let base64File: string | undefined = undefined;
    let fileExtension = selectedFile?.type.split("/")[1];
    if (selectedFile) {
      base64File = await convertFileToBase64(selectedFile);
    }
    const element = await actions.agent({
      input,
      chat_history: history,
      file:
        base64File && fileExtension
          ? {
              base64: base64File,
              extension: fileExtension,
            }
          : undefined,
    });

    newElements.push(
      <div className="flex flex-col w-full gap-2 mt-2" key={history.length}>
        {selectedFile && <FileUploadMessage file={selectedFile} />}
        <HumanMessageText content={input} />
        <div className="flex flex-col gap-2 w-full max-w-fit mr-auto">
          {element.ui}
        </div>
      </div>
    );

    // consume the value stream to obtain the final string value
    // after which we can append to our chat history state
    (async () => {
      let lastEvent = await element.lastEvent;
      if (Array.isArray(lastEvent)) {
        if (lastEvent[0].invoke_model && lastEvent[0].invoke_model.result) {
          setHistory((prev) => [
            ...prev,
            ["human", input],
            ["ai", lastEvent[0].invoke_model.result],
          ]);
        } else if (lastEvent[1].invoke_tools) {
          setHistory((prev) => [
            ...prev,
            ["human", input],
            [
              "ai",
              `Tool result: ${JSON.stringify(lastEvent[1].invoke_tools.tool_result, null)}`,
            ],
          ]);
        } else {
          setHistory((prev) => [...prev, ["human", input]]);
        }
      } else if (lastEvent.invoke_model && lastEvent.invoke_model.result) {
        setHistory((prev) => [
          ...prev,
          ["human", input],
          ["ai", lastEvent.invoke_model.result],
        ]);
      }
    })();

    setElements(newElements);
    setInput("");
    setSelectedFile(undefined);
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow overflow-y-auto pt-1 pl-4 text-sm scrollbar-gutter-stable">
        <LocalContext.Provider value={onSubmit}>
          <div className="flex flex-col w-full h-full">
            {elements.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center w-full max-w-xs mx-auto">
                  <Image 
                    src="/chatbot-empty-light.png" 
                    alt="Chatbot Empty State" 
                    width={200} 
                    height={200}
                    className="mx-auto"
                  />
                  <div className="mt-4 text-primary">
                    Welcome back, send a message to get started!
                  </div>
                </div>
              </div>
            ) : (
              elements
            )}
          </div>
        </LocalContext.Provider>
      </div>
      <div className="sticky bottom-0 bg-white">
        <TextInput
          onSend={async (message) => {
            await onSubmit(message);
          }}
        />
      </div>
    </div>
  );
}