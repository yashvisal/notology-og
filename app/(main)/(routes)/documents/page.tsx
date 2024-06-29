"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const DocumentsPage = () => {
    const { user } = useUser();

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
            <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add a new class!
            </Button>
        </div>
    );
}
 
export default DocumentsPage;