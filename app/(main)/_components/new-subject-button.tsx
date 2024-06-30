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
  const [name, setName] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const promise = createSubject({ name })

    toast.promise(promise, {
      loading: "Creating subject...",
      success: "Subject created successfully!",
      error: "Failed to create subject",
    })

    try {
      await promise
      setIsOpen(false)
      setName("")
      router.refresh()
    } catch (error) {
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
                <Input id="file" type="file" />
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