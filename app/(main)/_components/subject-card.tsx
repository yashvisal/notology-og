"use client";

import { Button } from "@/components/ui/button";
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"
import { FileIcon, TrashIcon } from "lucide-react";

export function SubjectCard() {
    return (
      <div className="flex flex-col w-full min-h-screen">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mx-auto">
            <Card className="w-full max-w-lg">
              <CardHeader className="pb-4">
                <CardTitle>Mathematics</CardTitle>
                <CardDescription>Files added:</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-0 pt-0">
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Lecture 1 - Introduction.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Lecture 2 - Algebra Basics.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Homework 1.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Practice Problems.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Midterm Study Guide.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full max-w-lg">
              <CardHeader className="pb-4">
                <CardTitle>Physics</CardTitle>
                <CardDescription>Files added:</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-0 pt-0">
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Lecture 1 - Introduction.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Lecture 2 - Mechanics.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Homework 1.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Practice Problems.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Midterm Study Guide.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full max-w-lg">
              <CardHeader className="pb-4">
                <CardTitle>Chemistry</CardTitle>
                <CardDescription>Files added:</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-0 pt-0">
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Lecture 1 - Introduction.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Lecture 2 - Atomic Structure.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Homework 1.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Practice Problems.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 group hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-sm">Midterm Study Guide.pdf</span>
                  <Button variant="ghost" size="icon" className="rounded-full ml-auto invisible group-hover:visible">
                    <TrashIcon className="w-4 h-4 hover:text-destructive" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
      </div>
    )
  }
  
 
export default SubjectCard;