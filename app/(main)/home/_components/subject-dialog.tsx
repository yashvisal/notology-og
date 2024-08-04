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
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";

export function CreateSubjectDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const createSubject = useMutation(api.subjects.createSubject);
  const [isOpen, setIsOpen] = useState(false);
  const createFile = useMutation(api.files.createFile);
  const { user } = useUser();

  const uploadToS3 = async (file: File, namespace: string) => {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: file.name, type: file.type, namespace }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to get upload URL:', errorData);
      throw new Error('Failed to get upload URL');
    }

    const { uploadUrl, key } = await response.json();

    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    });

    if (!uploadResponse.ok) {
      console.error('Failed to upload to S3:', uploadResponse.statusText);
      throw new Error('Failed to upload to S3');
    }

    return { file_key: key, file_name: file.name };
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.name || !user) {
      toast.error("Please enter a subject name");
      return;
    }

    const filesToProcess = [];

    try {
      const subjectId = await createSubject({ name: values.name });
      const namespace = `${user.id}_${subjectId}`;

      for (const file of values.files || []) {
        try {
          console.log(`Attempting to upload file: ${file.name}`);
          const result = await uploadToS3(file, namespace);
          console.log(`Upload result:`, result);
          if (!result || !result.file_key || !result.file_name) {
            throw new Error("Failed to upload file");
          }

          const fileId = await createFile({
            fileName: result.file_name,
            fileId: result.file_key,
            subjectId,
            namespace,
          });
          
          filesToProcess.push(fileId);
          console.log(`File processed: ${fileId}`);
        } catch (error) {
          console.error(`Failed to upload file: ${file.name}`, error);
          toast.error(`Failed to upload file: ${file.name}`);
        }
      }

      setIsOpen(false);
      router.refresh();
      toast.success("Subject created successfully!");
    } catch (error) {
      console.error("Failed to create subject:", error);
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