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
import { FileIcon, TrashIcon } from "lucide-react";

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
    //const files = useQuery(api.files.getFilesBySubject, { subjectId: subject._id });
  
    return (
      <Card className="w-full max-w-lg text-[#3F3F3F] dark:text-[#CFCFCF]">
        <CardHeader className="pb-4">
          <CardTitle>{subject.name}</CardTitle>
          <CardDescription>Files added:</CardDescription>
        </CardHeader>
        {/* <CardContent className="grid gap-0 pt-0">
          {files?.map((file) => (
            <div key={file._id} className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
              <FileIcon className="w-4 h-4" />
              <span className="text-sm">{file.fileName}</span>
              <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                <TrashIcon className="w-4 h-4 hover:text-destructive" />
                <span className="sr-only">Delete file</span>
              </Button>
            </div>
          ))}
        </CardContent> */}
      </Card>
    );
  }
