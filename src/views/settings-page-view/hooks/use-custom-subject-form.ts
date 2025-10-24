import { useRouter } from "@/i18n/navigation";
import {
    type CustomSubjectFormSchema,
    getCustomSubjectFormSchema,
} from "@/schema/forms/custom-subject-form-schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

type Props = {
    onOpenChange: (open: boolean) => void;
};

const useCustomSubjectForm = ({ onOpenChange }: Props) => {
    const t = useTranslations("settings.customSubjects");
    const tErrors = useTranslations("errors");

    const router = useRouter();

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

    const { mutate, isPending } =
        api.timetable.submitCustomSubjectsForm.useMutation({
            onSuccess: () => {
                form.reset({
                    generalGroup: "",
                    subject: "",
                    subGroup: "",
                });
                onOpenChange(false);

                router.refresh();
            },
            onError: () => {
                toast.error(tErrors("actions.unknown"));
            },
        });

    const handleSubmit = form.handleSubmit((values) => {
        mutate(values);
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
        isSubmitting: isPending,
    };
};

export default useCustomSubjectForm;
