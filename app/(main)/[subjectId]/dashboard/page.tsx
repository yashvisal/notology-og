"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";

const SubjectDashboard = () => {
    const { user } = useUser();
    const params = useParams();
    const subjectId = params.subjectId as Id<"subjects">;
    
    const subject = useQuery(api.subjects.getSubject, { subjectId });

    // TODO: replace with loading skeleton
    if (!subject) {
        return (
            <div>Loading...</div>
        )
    }

    return ( 
        <div className="flex-1 overflow-y-auto relative pl-[104px]">
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto pt-16">
                    <div
                        className="text-4xl mb-1.5 font-semibold"
                    >
                        {subject.name}
                    </div>
                    <h2
                        className="text-lg"
                        style={{ fontWeight: 400 }}
                    >
                        Welcome back, {user?.firstName}! Let's dive right in.
                    </h2>
                    <div className="flex flex-col gap-4">
                        {/* dashboard components */}
                    </div>
                </div>
            </div>
    );
}
 
export default SubjectDashboard;