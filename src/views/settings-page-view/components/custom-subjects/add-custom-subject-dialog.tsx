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
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import GeneralGroupField from "./general-group-field";
import SubgroupField from "./subgroup-field";
import SubjectsField from "./subjects-field";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: {
        name: string;
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

    const customSubjectSchema = z.object({
        name: z.string().min(1, t("nameRequired")),
        generalGroup: z.string().min(1, t("generalGroupRequired")),
        subGroup: z.string().optional(),
    });

    type CustomSubjectSchema = z.infer<typeof customSubjectSchema>;

    const form = useForm<CustomSubjectSchema>({
        resolver: zodResolver(customSubjectSchema),
        defaultValues: {
            name: "",
            generalGroup: "",
            subGroup: "",
        },
    });

    const [generalGroup, subject] = useWatch({
        control: form.control,
        name: ["generalGroup", "name"],
    });

    const [generalGroups] = api.timetable.getGeneralGroups.useSuspenseQuery();

    const { data: subjects, isFetching: isFetchingSubjects } =
        api.timetable.getSubjectsForGeneralGroup.useQuery(
            {
                generalGroup,
            },
            {
                enabled: generalGroup.length > 0,
            },
        );

    const { data: subGroups, isFetching: isFetchingSubGroups } =
        api.timetable.getSubGroupsForGeneralAndSubject.useQuery(
            {
                generalGroup,
                subject,
            },
            {
                enabled: generalGroup.length > 0 && subject.length > 0,
            },
        );

    // Clear subGroup when generalGroup changes
    // useEffect(() => {
    //     form.setValue("subGroup", "");
    // }, [generalGroup, form]);

    const handleSubmit = (values: CustomSubjectSchema) => {
        onSubmit(values);
        form.reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="default"
                    className="w-full cursor-pointer sm:w-auto"
                    disabled={isMaxReached}
                >
                    <Plus className="mr-2 h-4 w-4" />
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
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="grid gap-4"
                    >
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
