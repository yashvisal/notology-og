"use client";

import { useUser } from "@clerk/clerk-react";
import SubjectSummary from "./_components/subject-summary";
import StudyStreak from "./_components/study-streak";

export default function Component() {
    const { user } = useUser();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="flex flex-col h-full transition-all ease-in-out w-full">
            <div className="w-full h-full relative overflow-hidden">
                <div className="overflow-y-auto transition-all ease-in-out duration-200 scrollbar-hide w-full">
                    <div className="mx-auto max-w-3xl mt-12 px-4">
                        <h1 className="text-3xl font-semibold text-center mb-8">
                            {getGreeting()}, {user?.firstName || 'Student'}!
                        </h1>
                        <div className="flex flex-col gap-8">
                            <SubjectSummary />
                            <StudyStreak />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}