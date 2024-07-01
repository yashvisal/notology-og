"use client";

import { CreateSubjectDialog } from "../_components/new-subject-button";
import { SubjectCards } from "../_components/subject-card";

const SubjectsPage = () => {
    return (
        <main className="max-w-[84rem] mx-auto pt-16 px-8 sm:px-12 md:px-16">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-5xl font-bold text-[#3F3F3F] dark:text-[#CFCFCF]">
                    My Subjects
                </h1>
                <CreateSubjectDialog />
            </div>
            <SubjectCards />
        </main>
        
    );
}
 
export default SubjectsPage;