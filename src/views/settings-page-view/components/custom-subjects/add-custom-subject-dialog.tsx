"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import useCustomSubjectForm from "../../hooks/use-custom-subject-form";
import GeneralGroupField from "./general-group-field";
import SubgroupField from "./subgroup-field";
import SubjectsField from "./subjects-field";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: {
        subject: string;
        generalGroup: string;
        subGroup?: string;
    }) => void;
    isMaxReached: boolean;
};

export default function AddCustomSubjectDialog({
    open,
    onOpenChange,
    onSubmit,
    isMaxReached,
}: Props) {
    const t = useTranslations("settings.customSubjects");

    const {
        form,
        generalGroups,
        subjects,
        subGroups,
        // isFetchingSubjects,
        // isFetchingSubGroups,
        handleSubmit,
    } = useCustomSubjectForm({ onSubmit, onOpenChange });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="default"
                    className="w-full cursor-pointer sm:w-fit"
                    disabled={isMaxReached}
                >
                    <Plus className="size-4" />
                    {t("addButton")}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("dialogTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("dialogDescription")}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <GeneralGroupField generalGroups={generalGroups} />

                        {subjects && subjects.length > 0 && (
                            <SubjectsField subjects={subjects} />
                        )}

                        {subGroups && subGroups.length > 0 && (
                            <SubgroupField subGroups={subGroups} />
                        )}

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="cursor-pointer"
                                >
                                    {t("cancelButton")}
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                variant="default"
                                className="cursor-pointer"
                            >
                                {t("confirmButton")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
