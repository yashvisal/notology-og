"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-bold">
                Schol temp landing page
            </h1>
            <Button>
                Enter Schol
                <ArrowRight className="h-4 w-4 ml-2"/>
            </Button>
        </div>
    );
}
 
export default Heading;