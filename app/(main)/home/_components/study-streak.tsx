"use client";

import ActivityCalendar, { ThemeInput } from "react-activity-calendar";

const generateSampleData = (year: number, days: number) => {
    return Array.from({ length: days }, (_, i) => ({
        date: `${year}-${String(Math.floor(i / 31) + 1).padStart(2, '0')}-${String((i % 31) + 1).padStart(2, '0')}`,
        count: Math.floor(Math.random() * 10),
        level: Math.floor(Math.random() * 5)
    }));
};

const StudyStreak = () => {
    const sampleData = generateSampleData(2023, 365);

    const explicitTheme: ThemeInput = {
        dark: ['#f0f0f0', '#B1D4E0', '#2E8BC0', '#145DA0', '#0C2D48'],
      };

    return (
        <>
            <h2 className="text-lg font-medium">Progress Tracker</h2>
            <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
                <ActivityCalendar
                    data={sampleData}
                    theme={explicitTheme}
                    hideTotalCount={true}
                />
            </div>
        </>
    );
}

export default StudyStreak;