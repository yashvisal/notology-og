"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SubjectCard from "./_components/subject-card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Component() {
const subjects = useQuery(api.subjects.getSubjects);

  return (
    <div className="p-10 pt-16">
      <main className="space-y-8">
        <h1 className="text-3xl font-semibold text-center">Good afternoon, Yash Visal</h1>
        <section>
          <h2 className="text-lg font-medium mb-4">Subjects</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {subjects?.map((subject) => (
                <SubjectCard key={subject._id} subject={subject} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-lg font-medium mb-4">Study Streak</h2>
          <div className="flex items-center justify-between bg-muted rounded-md p-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm font-medium">Current Streak</p>
                <p className="text-lg font-bold">12 Days</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Study Now
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}