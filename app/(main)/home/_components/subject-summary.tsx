"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SubjectCard from "./subject-card";

const SubjectSummary = () => {
    const subjects = useQuery(api.subjects.getSubjects);

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-medium mb-4">Subjects</h2>
            <div className="flex flex-row gap-4 overflow-x-auto">
                <SubjectCard isAddNew={true} />
                {subjects?.map((subject) => (
                    <SubjectCard
                        key={subject._id}
                        subject={subject}
                    />
                ))}
            </div>
        </div>
    );
}

export default SubjectSummary;