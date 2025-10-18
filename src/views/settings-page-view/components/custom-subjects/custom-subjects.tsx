"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AddCustomSubjectDialog from "./add-custom-subject-dialog";
import CustomSubjectItem from "./custom-subject-item";

type CustomSubject = {
    id: string;
    subject: string;
    generalGroup: string;
    subGroup?: string;
};

const MAX_CUSTOM_SUBJECTS = 10;

export default function CustomSubjects() {
    const [customSubjects, setCustomSubjects] = useState<CustomSubject[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const t = useTranslations("settings.customSubjects");

    const handleAddSubject = (values: {
        subject: string;
        generalGroup: string;
        subGroup?: string;
    }) => {
        const newSubject: CustomSubject = {
            id: Date.now().toString(),
            subject: values.subject,
            generalGroup: values.generalGroup,
            subGroup: values.subGroup,
        };

        setCustomSubjects((prev) => [...prev, newSubject]);
    };

    const handleRemoveSubject = (id: string) => {
        setCustomSubjects((prev) =>
            prev.filter((subject) => subject.id !== id),
        );
    };

    const isMaxReached = customSubjects.length >= MAX_CUSTOM_SUBJECTS;

    return (
        <div>
            <h2 className="text-foreground xs:text-2xl mb-6 text-xl font-bold md:text-3xl">
                {t("text")}
            </h2>
            <Card className="bg-card border-border">
                <CardContent className="xs:px-6 xs:py-4 space-y-4 px-4 py-4">
                    <div className="space-y-6 py-2">
                        {customSubjects.length > 0 && (
                            <>
                                <div className="space-y-2">
                                    {customSubjects.map((subject) => (
                                        <CustomSubjectItem
                                            key={subject.id}
                                            id={subject.id}
                                            subject={subject.subject}
                                            generalGroup={subject.generalGroup}
                                            subGroup={subject.subGroup}
                                            onRemove={handleRemoveSubject}
                                        />
                                    ))}
                                </div>
                                {isMaxReached && (
                                    <p className="text-muted-foreground text-center text-sm">
                                        {t("maxSubjectsReached")}
                                    </p>
                                )}
                            </>
                        )}
                        {customSubjects.length === 0 && (
                            <p className="text-muted-foreground mx-auto max-w-xl text-center text-sm">
                                {t("emptyState")}
                            </p>
                        )}
                        <div className="flex justify-center">
                            <AddCustomSubjectDialog
                                open={dialogOpen}
                                onOpenChange={setDialogOpen}
                                onSubmit={handleAddSubject}
                                isMaxReached={isMaxReached}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
