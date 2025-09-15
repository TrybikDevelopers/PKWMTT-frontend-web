import { useRouter } from "@/i18n/navigation";
import {
    getTimetableFormSchema,
    type TimetableFormSchema,
} from "@/schema/forms/timetable-form-schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useTimetableForm = () => {
    const [subGroupsPlaceholdersLength, setSubGroupsPlaceholdersLength] =
        useState<number>(2);
    const t = useTranslations("timetableForm");
    const tErrors = useTranslations("errors");

    const router = useRouter();

    const form = useForm<TimetableFormSchema>({
        resolver: zodResolver(getTimetableFormSchema(t)),
        defaultValues: {
            generalGroup: "",
            groups: [],
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const prevGeneralGroup = useRef<string | null>(null);
    const generalGroup = form.watch("generalGroup");

    const { data: subGroups, isFetching: isFetchingSubGroups } =
        api.timetable.getSubGroups.useQuery(
            {
                generalGroup,
            },
            {
                enabled: generalGroup.length > 0,
            },
        );

    const { mutate, isPending } = api.timetable.submitTimetableForm.useMutation(
        {
            onSuccess: () => {
                router.refresh();
            },
            onError: () => {
                toast.error(tErrors("actions.unknown"));
            },
        },
    );

    // reset form when general group changes
    useEffect(() => {
        if (prevGeneralGroup.current !== generalGroup) {
            form.reset({
                generalGroup,
                groups: [],
            });
        }

        prevGeneralGroup.current = generalGroup;
    }, [generalGroup, form]);

    useEffect(() => {
        // if new subGroups are fetched, update the placeholders length for next fetch
        if (subGroups && subGroups.length > 0) {
            setSubGroupsPlaceholdersLength(subGroups.length);
        }
    }, [subGroups, setSubGroupsPlaceholdersLength]);

    const onSubmit = form.handleSubmit((data) => mutate(data));

    return {
        form,
        generalGroup,
        subGroups,
        isFetchingSubGroups,
        subGroupsPlaceholdersLength,
        onSubmit,
        isSubmitting: isPending,
    };
};

export default useTimetableForm;
