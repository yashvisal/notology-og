"use client";

import { Calendar } from "lucide-react";

const StudyStreak = () => {
    // This is a placeholder. You'll need to implement the actual streak logic
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Study Streak
            </h2>
            <div className="p-4 border rounded-lg">
                <div className="h-32 bg-gray-100 flex items-center justify-center text-muted-foreground">
                    Study streak graph will be implemented here
                </div>
            </div>
        </div>
    );
}

export default StudyStreak;