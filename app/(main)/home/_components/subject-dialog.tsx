"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import SubjectForm, { formSchema } from "./subject-form";
import { z } from "zod";
import { uploadToS3 } from "@/lib/s3";
import { v4 as uuidv4 } from 'uuid'; // Make sure to install this package

export function CreateSubjectDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const createSubject = useMutation(api.subjects.createSubject);
  const [isOpen, setIsOpen] = useState(false);
  const createFile = useMutation(api.files.createFile);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.name) {
      toast.error("Please enter a subject name");
      return;
    }

    const filesToProcess = [];

    try {
      const subjectId = await createSubject({ name: values.name });

      for (const file of values.files || []) {
        try {
          const result = await uploadToS3(file);
          if (!result || !result.file_key || !result.file_name) {
            throw new Error("Failed to upload file");
          }

          const fileId = await createFile({
            fileName: result.file_name,
            fileId: result.file_key,
            subjectId,
          });
          
          filesToProcess.push(fileId);
        } catch (error) {
          toast.error(`Failed to upload file: ${file.name}`);
        }
      }

      setIsOpen(false);
      router.refresh();
      toast.success("Subject created successfully!");
    } catch (error) {
      toast.error("Failed to create subject");
    }

    if (filesToProcess.length > 0) {
      const processingId = uuidv4();
      fetch('/api/load-documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileIds: filesToProcess, processingId }),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Subject</DialogTitle>
          <DialogDescription>
            Add a new subject with any relevant documents!
          </DialogDescription>
        </DialogHeader>
        <SubjectForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}