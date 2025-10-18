import {
    type CustomSubjectFormSchema,
    getCustomSubjectFormSchema,
} from "@/schema/forms/custom-subject-form-schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

type Props = {
    onSubmit: (values: CustomSubjectFormSchema) => void;
    onOpenChange: (open: boolean) => void;
};

const useCustomSubjectForm = ({ onSubmit, onOpenChange }: Props) => {
    const t = useTranslations("settings.customSubjects");

    const form = useForm<CustomSubjectFormSchema>({
        resolver: zodResolver(getCustomSubjectFormSchema(t)),
        defaultValues: {
            generalGroup: "",
            subject: "",
            subGroup: "",
        },
    });

    const [generalGroup, subject] = useWatch({
        control: form.control,
        name: ["generalGroup", "subject"],
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

    const handleSubmit = form.handleSubmit((values) => {
        onSubmit(values);
        form.reset();
        onOpenChange(false);
    });

    // Clear subGroup when generalGroup changes
    useEffect(() => {
        form.reset({
            generalGroup: form.getValues("generalGroup"),
            subject: "",
            subGroup: "",
        });
    }, [generalGroup, form]);

    return {
        form,
        generalGroups,
        subjects,
        subGroups,
        isFetchingSubjects,
        isFetchingSubGroups,
        handleSubmit,
    };
};

export default useCustomSubjectForm;
