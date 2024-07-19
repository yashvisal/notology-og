"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Spinner } from "@/components/spinner";


const SubjectDashboard = () => {
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
                    <div className="pb-[11.5px] text-4xl bg-transparent font-semibold break-words outline-none text-[#000000] dark:text-[#CFCFCF] resize-none">
                        {subject.name} Dashboard
                    </div>
                </div>
            </div>
    );
}
 
export default SubjectDashboard;