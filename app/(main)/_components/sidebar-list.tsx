"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { Book, FileIcon } from "lucide-react";
import { toast } from "sonner";
import { createDocument } from "@/convex/documents";

interface SidebarListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
}

export const SidebarList = ({
    parentDocumentId,
    level = 0,
}: SidebarListProps) => {
    const subjects = useQuery(api.subjects.getSubjects);

    if (subjects === undefined) {
        return(
            <>
                <Item.Skeleton level={level} />
                <Item.Skeleton level={level} />
                <Item.Skeleton level={level} />
            </>
        )
    }

    return (
        <>
            {subjects.map((subject) => (
                <SubjectItem
                    key={subject._id}
                    subjectId={subject._id}
                    subject={subject}
                    level={level}
                />
            ))}
        </>
    )
}

interface SubjectItemProps {
    subjectId: Id<"subjects">;
    subject: Doc<"subjects">;
    level: number;
}

const SubjectItem = ({ subjectId, subject, level }: SubjectItemProps) => {
    const [expanded, setExpanded] = useState(false);
    const createDocument = useMutation(api.documents.createDocument);
    const router = useRouter();

    const onExpand = () => setExpanded(!expanded);

    const onCreate = () => {
        const promise = createDocument({ title: "Untitled", subjectId: subjectId })
            .then((documentId) => {
                if (!documentId) return;
                router.push(`/subjects/${documentId}`);
            });

        toast.promise(promise, {
            loading: "Creating a new document...",
            success: "New document created!",
            error: "Failed to create a new document."
        });
    };

    return (
        <div>
            <Item
                subjectId={subjectId}
                onClick={onExpand}
                label={subject.name}
                icon={Book}
                active={false}
                level={level}
                onExpand={onExpand}
                expanded={expanded}
                onCreate={onCreate}
            />
            {expanded && (
                <DocumentList
                    subjectId={subjectId}
                    level={level + 1}
                />
            )}
        </div>
    );
}

interface DocumentListProps {
    subjectId: Id<"subjects">;
    level: number;
}

const DocumentList = ({ subjectId, level }: DocumentListProps) => {
    const params = useParams();
    const router = useRouter();
    const documents = useQuery(api.documents.getSidebarDocuments, {
        parentDocument: undefined,
        subjectId: subjectId,
    });

    const onRedirect = (documentId: string) => {
        router.push(`/subjects/${documentId}`);
    }

    if (documents === undefined) {
        return <Item.Skeleton level={level} />;
    }

    if (documents.length === 0) {
        return (
            <p
                style={{ paddingLeft: `${(level * 12) + 25}px` }}
                className="text-sm font-medium text-muted-foreground/80"
            >
                No pages inside
            </p>
        );
    }

    return (
        <>
            {documents.map((document) => (
                <DocumentItem
                    key={document._id}
                    document={document}
                    level={level}
                    active={params.documentId === document._id}
                    onRedirect={onRedirect}
                />
            ))}
        </>
    );
}

interface DocumentItemProps {
    document: Doc<"documents">;
    level: number;
    active: boolean;
    onRedirect: (documentId: string) => void;
}

const DocumentItem = ({ document, level, active, onRedirect }: DocumentItemProps) => {
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);
    const childDocuments = useQuery(api.documents.getSidebarDocuments, {
        parentDocument: document._id,
        subjectId: document.subjectId,
    });

    const createDocument = useMutation(api.documents.createDocument);
  
    const onCreate = () => {
        const promise = createDocument({ title: "Untitled", parentDocument: document._id, subjectId: document.subjectId })
            .then((documentId) => {
                if (!documentId) return;
                router.push(`/subjects/${documentId}`);
            });

        toast.promise(promise, {
            loading: "Creating a new document...",  
            success: "New document created!",
            error: "Failed to create a new document."
        });
    };

    const onExpand = () => setExpanded(!expanded);

    return (
        <div>
            <Item
                docId={document._id}
                onClick={() => onRedirect(document._id)}
                onCreate={onCreate}
                label={document.title}
                icon={FileIcon}
                documentIcon={document.icon}
                active={active}
                level={level}
                onExpand={onExpand}
                expanded={expanded}
            />
            {expanded && childDocuments !== undefined && (
                childDocuments.length === 0 ? (
                    <p
                        style={{ paddingLeft: `${(level * 12) + 25}px` }}
                        className="text-sm font-medium text-muted-foreground/80"
                    >
                        No pages inside
                    </p>
                ) : (
                    <>
                        {childDocuments.map((childDoc) => (
                            <DocumentItem
                                key={childDoc._id}
                                document={childDoc}
                                level={level + 1}
                                active={false}
                                onRedirect={onRedirect}
                            />
                        ))}
                    </>
                )
            )}
        </div>
    );

    // return (
    //     <div>
    //         <Item
    //             id={document._id}
    //             onClick={() => onRedirect(document._id)}
    //             label={document.title}
    //             icon={FileIcon}
    //             documentIcon={document.icon}
    //             active={active}
    //             level={level}
    //             onExpand={onExpand}
    //             expanded={expanded}
    //         />
    //         {expanded && childDocuments !== undefined && (
    //             childDocuments.length === 0 ? (
    //                 <p
    //                     style={{ paddingLeft: `${(level * 12) + 25}px` }}
    //                     className="text-sm font-medium text-muted-foreground/80"
    //                 >
    //                     No pages inside
    //                 </p>
    //             ) : (
    //                 <DocumentList
    //                     subjectId={document.subjectId}
    //                     level={level + 1}
    //                 />
    //             )
    //         )}
    //     </div>
    // );
}