"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";


const HomePage = () => {
    const { user } = useUser();
    const createSubject = useMutation(api.subjects.createSubject);

    const onCreate = () => {
        const promise = createSubject({ name: "New Subject" });

        toast.promise(promise, {
            loading: "Creating...",
            success: "Subject created!",
            error: "Failed to create subject",
        });
    }

    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            {/* TODO: get a light mode and dark mode image, upload to public folder, replace names and uncomment */}
            {/* <Image
                src="image-file-name.png"
                height={300}
                width={300}
                alt="Empty"
                className="dark:hidden"
            />
            <Image
                src="image-file-name-dark.png"
                height={300}
                width={300}
                alt="Empty"
                className="hidden dark:block"
            /> */}
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s Schol
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add a new subject!
            </Button>
        </div>
    );
}
 
export default HomePage;