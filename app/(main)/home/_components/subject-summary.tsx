"use client";

import { useQuery } from "convex/react";
import { FileText } from "lucide-react";
import { api } from "@/convex/_generated/api";

const SubjectSummary = () => {
    const subjects = useQuery(api.subjects.getSubjects);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">My Subjects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects?.map((subject) => (
                    <div 
                        key={subject._id} 
                        className="p-4 border rounded-lg hover:bg-primary/5 transition-all duration-200 ease-in-out cursor-pointer"
                    >
                        <div className="flex items-center mb-2">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium truncate">{subject.name}</span>
                        </div>
                        {/* Add more details here if needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubjectSummary;