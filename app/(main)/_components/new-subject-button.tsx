"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";

export function CreateSubjectDialog() {
    const router = useRouter()
    const createSubject = useMutation(api.subjects.createSubject)
    const generateUploadUrl = useMutation(api.files.generateUploadUrl)
    const [name, setName] = useState("")
    const [files, setFiles] = useState<File[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const createFile = useMutation(api.files.createFile)
    
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name) {
            toast.error("Please enter a subject name")
            return
        }

        setIsLoading(true)

        try {
            // Step 1: Create the subject
            const subjectId = await createSubject({ name })

            // Step 2: Upload files and create file records 
            for (const file of files) {
                // Get a short-lived upload URL
                const postUrl = await generateUploadUrl()

                // Upload the file
                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": file.type },
                    body: file,
                })
                const { storageId } = await result.json()

                // Create a file record
                await createFile({
                    fileName: file.name,
                    fileId: storageId,
                    subjectId
                })
            }

            setIsOpen(false)
            setName("")
            setFiles([])
            router.refresh()
            toast.success("Subject created successfully!")

        } catch (error) {
            console.error(error)
            toast.error("Failed to create subject")
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
            <PlusCircleIcon className="w-4 h-4 mr-2" />
            New Subject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Subject</DialogTitle>
          <DialogDescription>
            Add a new subject with any relevant documents!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter the subject name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="file">Attachment</Label>
                <Input 
                    id="file" 
                    type="file"
                    multiple
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Spinner />
                    </>
                ) : (
                    "Create Subject"    
                )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}