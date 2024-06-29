"use client"

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
    const { isAuthenticated, isLoading} = useConvexAuth();
    
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-bold">
                Schol temp landing page
            </h1>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg" /> 
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        Enter Schol
                        <ArrowRight className="h-4 w-4 ml-2"/>
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>
                        Get Schol
                        <ArrowRight className="h-4 w-4 ml-2"/>
                    </Button>
                </SignInButton>
            )}
        </div>
    );
}
 
export default Heading;