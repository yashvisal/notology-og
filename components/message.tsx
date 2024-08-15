import Markdown from "react-markdown";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/clerk-react";
import { Pencil, Sparkles } from "lucide-react";

export interface MessageTextProps {
  content: string;
}

export function AIMessageText(props: MessageTextProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2 mt-2">
        <div className="relative h-3 w-3 mr-2">
          {/* <Avatar className="h-3 w-3 bg-gray-300"/> */}
          {/* <Pencil className="h-3 w-3"/> */}
          <Sparkles className="h-3 w-3" strokeWidth={1.75}/>
        </div>
        <span className="text-xs text-black">NOTO</span>
      </div>
      <div className="text-normal text-black">
        <Markdown>{props.content}</Markdown>
      </div>
    </div>
  );
}

export function HumanMessageText(props: MessageTextProps) {
  const { user } = useUser();

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2 mt-2">
        <div className="relative h-3 w-3 mr-2">
          <Avatar className="h-3 w-3">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
        </div>
        <span className="text-xs text-black">YOU</span>
      </div>
      <p className="text-normal text-black">
        {props.content}
      </p>
    </div>
  );
}