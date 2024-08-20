"use client";

import { Loader2, Check } from "lucide-react";

export interface RetrieverToolProps {
  results: {
    content: string;
    filename: string;
  }[];
}

export function RetrieverToolLoading(): JSX.Element {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Researching your knowledge base...</span>
    </div>
  );
}

export function RetrieverTool(props: RetrieverToolProps): JSX.Element {
  return (
    <div className="flex items-center space-x-2 text-green-600">
      <Check className="h-4 w-4" />
      <span>Collected necessary information!</span>
    </div>
  );
}