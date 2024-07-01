"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { FileIcon, Settings, TrashIcon } from "lucide-react";

export function SubjectCards() {
    const subjects = useQuery(api.subjects.getSubjects);
  
    if (!subjects) {
      return <Spinner />;
    }
  
    return (
      <div className="flex flex-col w-full min-h-screen">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mx-auto">
          {subjects.map((subject) => (
            <SubjectCard key={subject._id} subject={subject} />
          ))}
        </div>
      </div>
    );
  }

function SubjectCard({ subject }: { subject: Doc<"subjects"> }) {
    const files = useQuery(api.files.getFilesBySubject, { subjectId: subject._id });
  
    return (
      <Card className="w-full max-w-lg mt-4 text-[#3F3F3F] dark:text-[#CFCFCF] flex flex-col">
        <CardHeader className="pb-1 flex-shrink-0">
            <div className="flex justify-between items-center">
                <CardTitle className="truncate text-xl pr-1" title={subject.name}>
                    {subject.name}
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-2">
                    <Settings className="w-4 h-4" />
                    <span className="sr-only">Add file</span>
                </Button>
            </div>
            <CardDescription>Files added:</CardDescription>
        </CardHeader>
        <CardContent className="pt-0 flex-grow overflow-y-auto max-h-[200px]">
            {files?.map((file) => (
            <div key={file._id} className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
              <FileIcon className="w-4 h-4 ml-2 flex-shrink-0" />
              <span className="text-sm truncate flex-grow mr-2">{file.fileName}</span>
              <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <TrashIcon className="w-4 h-4 hover:text-destructive" />
                <span className="sr-only">Delete file</span>
              </Button>
            </div>
          ))}
        </CardContent>
    </Card>
    );
  }
