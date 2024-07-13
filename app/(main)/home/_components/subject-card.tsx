import { Card, CardContent } from "@/components/ui/card";
import { Book, Plus } from "lucide-react";
import { CreateSubjectDialog } from "./new-subject-dialog";
import { useRouter } from "next/navigation";

interface SubjectCardProps {
    subject?: {
        _id: string;
        name: string;
    };
    isAddNew?: boolean;
}

const SubjectCard = ({ subject, isAddNew }: SubjectCardProps) => {
    const router = useRouter();

    const renderAddNewCard = () => (
        <CreateSubjectDialog>
            <Card
                className="w-[150px] rounded-xl transition cursor-pointer flex-shrink-0 border border-gray-200 hover:border-gray-300 hover:shadow-sm duration-150 ease-in-out"
            >
                <CardContent className="p-4 flex flex-col items-start justify-between h-full font-medium text-primary/70">
                    <Plus className="h-4 w-4" />
                    <div className="text-sm">New Subject</div>
                </CardContent>
            </Card>
        </CreateSubjectDialog>
    );

    const renderSubjectCard = () => (
        <Card
            className="w-[150px] rounded-xl transition cursor-pointer flex-shrink-0 border border-gray-200 hover:border-gray-300 hover:shadow-sm duration-150 ease-in-out"
            onClick={() => router.push(`/subjects/${subject!._id}`)}
        >
            <CardContent className="p-4 flex flex-col gap-12 items-start justify-between h-full font-medium text-primary/70">
                <Book className="h-4 w-4" />
                <div className="w-full text-sm truncate">{subject!.name}</div>
            </CardContent>
        </Card>
    );
    
    return (
        <>
            {isAddNew ? renderAddNewCard() : subject && renderSubjectCard()}
        </>
    );
};

export default SubjectCard;