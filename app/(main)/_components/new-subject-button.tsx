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

export function CreateSubjectDialog() {
    const router = useRouter()
    const createSubject = useMutation(api.subjects.createSubject)
    const generateUploadUrl = useMutation(api.files.generateUploadUrl)
    const [name, setName] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const createFile = useMutation(api.files.createFile)
    
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name) {
            toast.error("Please enter a subject name")
            return
        }

        try {
            let fileId = null
            if (file) {
                // Step 1: Get a short-lived upload URL
                const postUrl = await generateUploadUrl()
                    
                // Step 2: Upload the file
                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": file.type },
                    body: file,
                })
                const { storageId } = await result.json()
                fileId = storageId
            }

            // Step 3: Create the subject with the file's storageId (if any)
            const subjectId = await createSubject({ name, fileId })

            if (fileId) {
                await createFile({
                    fileName: file!.name,
                    fileId,
                    subjectId
                })
            }

            setIsOpen(false)
            setName("")
            setFile(null)
            router.refresh()
            toast.success("Subject created successfully!")

        } catch (error) {
            console.error(error)
            toast.error("Failed to create subject")
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
              />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="file">Attachment</Label>
                <Input 
                    id="file" 
                    type="file" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Subject</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}