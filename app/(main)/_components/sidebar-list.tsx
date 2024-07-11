"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { Book, FileIcon } from "lucide-react";
import { toast } from "sonner";

interface SidebarListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
    subjectId?: Id<"subjects">;
    onSubjectClick: (subjectId: Id<"subjects">) => void;
}

export const SidebarList = ({
    parentDocumentId,
    level = 0,
    subjectId,
    onSubjectClick
}: SidebarListProps) => {
    if (subjectId) {
        // Render documents for a specific subject
        return (
            <DocumentList
                subjectId={subjectId}
                parentDocumentId={parentDocumentId}
                level={level}
            />
        )
    }

    // Render the list of subjects
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

    if (subjects.length === 0) {
        return null;
    }

    return (
        <>
            <div className="text-xs font-medium text-muted-foreground/80 mb-1 ml-4">
                <p>
                    WORKSPACES
                </p>
            </div>
            {subjects.map((subject) => (
                <SubjectItem
                    key={subject._id}
                    subjectId={subject._id}
                    subject={subject}
                    level={level}
                    onSubjectClick={onSubjectClick}
                />
            ))}
        </>
    )
}

interface SubjectItemProps {
    subjectId: Id<"subjects">;
    subject: Doc<"subjects">;
    level: number;
    onSubjectClick: (subjectId: Id<"subjects">) => void;
}

const SubjectItem = ({ subjectId, subject, level, onSubjectClick }: SubjectItemProps) => {
    const params = useParams();
    const pathname = usePathname();
    const active = pathname.startsWith(`/subjects/${subjectId}`);

    const createDocument = useMutation(api.documents.createDocument);
    const router = useRouter();

    const onCreate = () => {
        const promise = createDocument({ title: "Untitled", subjectId: subjectId })
            .then((documentId) => {
                if (!documentId) return;
                router.push(`/subjects/${subjectId}/${documentId}`);
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
                id={subjectId}
                onClick={() => onSubjectClick(subjectId)}
                label={subject.name}
                icon={Book}
                active={active}
                level={level}
                onCreate={onCreate}
                isSubject={true}
            />
        </div>
    );
}

interface DocumentListProps {
    subjectId: Id<"subjects">;
    parentDocumentId?: Id<"documents">;
    level: number;
}

const DocumentList = ({ subjectId, level, parentDocumentId }: DocumentListProps) => {
    const router = useRouter();
    const documents = useQuery(api.documents.getSidebarDocuments, {
        parentDocument: parentDocumentId,
        subjectId: subjectId,
    });

    const onRedirect = (documentId: string) => {
        router.push(`/subjects/${subjectId}/${documentId}`);
    }

    if (documents === undefined) {
        return <Item.Skeleton level={level} />;
    }

    if (documents.length === 0) {
        // TODO: empty subject handling
        return (
            <p
                style={{ paddingLeft: `${(level * 12) + 37}px` }}
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
                    onRedirect={onRedirect}
                />
            ))}
        </>
    );
}

interface DocumentItemProps {
    document: Doc<"documents">;
    level: number;
    onRedirect: (documentId: string) => void;
}

const DocumentItem = ({ document, level, onRedirect }: DocumentItemProps) => {
    const params = useParams();
    const [expanded, setExpanded] = useState(false);
    const childDocuments = useQuery(api.documents.getSidebarDocuments, {
        parentDocument: document._id,
        subjectId: document.subjectId,
    });
    
    const createDocument = useMutation(api.documents.createDocument);
    const isActive = params.documentId === document._id;
  
    const onCreate = () => {
        const promise = createDocument({ title: "Untitled", parentDocument: document._id, subjectId: document.subjectId })
            .then((documentId) => {
                if (!documentId) return;
                onRedirect(documentId);
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
                id={document._id}
                onClick={() => onRedirect(document._id)}
                onCreate={onCreate}
                label={document.title}
                icon={FileIcon}
                documentIcon={document.icon}
                active={isActive}
                level={level}
                onExpand={onExpand}
                expanded={expanded}
                showExpandButton={true}
                showCreateButton={true}
            />
            {expanded && childDocuments !== undefined && (
                childDocuments.length === 0 ? (
                    <p
                        style={{ paddingLeft: `${(level * 12) + 37}px` }}
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
                                onRedirect={onRedirect}
                            />
                        ))}
                    </>
                )
            )}
        </div>
    );
}