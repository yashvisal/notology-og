import { Card, CardContent } from "@/components/ui/card";
import { Book, Plus } from "lucide-react";
import { useState } from "react";
import { NewSubjectDialog } from "./new-subject-dialogue";

interface SubjectCardProps {
    subject?: {
        _id: string;
        name: string;
        isArchived: boolean;
        fileId?: string;
    };
    isAddNew?: boolean;
}

const SubjectCard = ({ subject, isAddNew }: SubjectCardProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleAddNew = () => setIsDialogOpen(true);

    const renderAddNewCard = () => (
        <Card 
            className="w-[150px] rounded-xl transition cursor-pointer flex-shrink-0 border border-gray-200 hover:border-gray-300 hover:shadow-sm duration-150 ease-in-out"
            onClick={handleAddNew}
        >
            <CardContent className="p-4 flex flex-col items-start justify-between h-full space-y-2">
                <Plus className="h-4 w-4" />
                <div className="text-sm font-medium">New Subject</div>
            </CardContent>
        </Card>
    );

    const renderSubjectCard = () => (
        <Card className="w-[150px] rounded-xl transition cursor-pointer flex-shrink-0 border border-gray-200 hover:border-gray-300 hover:shadow-sm duration-150 ease-in-out">
            <CardContent className="p-4 flex flex-col gap-4 items-start justify-between h-full space-y-2">
                <Book className="h-4 w-4 text-primary" />
                <div className="text-sm font-medium truncate">{subject!.name}</div>
            </CardContent>
        </Card>
    );
    
    return (
        <>
            {isAddNew ? renderAddNewCard() : subject && renderSubjectCard()}
            <NewSubjectDialog
                open={isDialogOpen} 
                onOpenChange={setIsDialogOpen}
            />
        </>
    );
};

export default SubjectCard;