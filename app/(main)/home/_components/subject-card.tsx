import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface SubjectCardProps {
    subject: {
        _id: string;
        name: string;
        isArchived: boolean;
        fileId?: string;
    };
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
    return (
        <Card className="w-[150px] hover:bg-gray-50 transition cursor-pointer">
            <CardContent className="p-4">
                <div className="flex items-center mb-2">
                    <FileText className="mr-2 h-4 w-4" />
                    <div className="font-medium truncate">{subject.name}</div>
                </div>
                {/* Add more details here if needed */}
            </CardContent>
        </Card>
    );
};

export default SubjectCard;