import useFirstRender from "@/hooks/use-first-render";
import {
    getTimetableFormSchema,
    type TimetableFormSchema,
} from "@/schema/forms/timetable-form-schema";
import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

const sortDefaultGroups = (groups: string[]): string[] => {
    const lGroup = groups.find((group) => group.startsWith("L"));
    const kGroup = groups.find((group) => group.startsWith("K"));
    const pGroup = groups.find((group) => group.startsWith("P"));

    const sortedGroups: string[] = [];

    if (lGroup) {
        sortedGroups.push(lGroup);
    }

    if (kGroup) {
        sortedGroups.push(kGroup);
    }

    if (pGroup) {
        sortedGroups.push(pGroup);
    }

    return sortedGroups;
};

const useStudentGroups = (
    timetableSettings: TimetableSettingsSchema | null,
) => {
    const { isFirstRender } = useFirstRender();

    const t = useTranslations("timetableForm");
    const tErrors = useTranslations("errors");

    const router = useRouter();

    const [generalGroups] = api.timetable.getGeneralGroups.useSuspenseQuery();

    const form = useForm<TimetableFormSchema>({
        resolver: zodResolver(getTimetableFormSchema(t)),
        defaultValues: {
            generalGroup: timetableSettings?.generalGroup || "",
            groups: sortDefaultGroups(timetableSettings?.groups || []),
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const prevGeneralGroup = useRef<string | null>(
        form.getValues("generalGroup"),
    );
    const prevGroups = useRef<string[]>([]);

    const [generalGroup, groups] = useWatch({
        control: form.control,
        name: ["generalGroup", "groups"],
    });

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
                toast.success(t("groupsSaved"));
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

            prevGroups.current = [];
        }

        prevGeneralGroup.current = generalGroup;
    }, [generalGroup, form]);

    useEffect(() => {
        if (isFirstRender) return;

        const currentGroups = groups.toSorted(); // sort to always get the same order

        const timeoutId = setTimeout(() => {
            const groupsChanged =
                JSON.stringify(prevGroups.current) !==
                JSON.stringify(currentGroups);

            if (form.formState.isValid && groupsChanged) {
                mutate({
                    generalGroup,
                    groups,
                });
            }

            prevGroups.current = currentGroups;
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [generalGroup, mutate, form, isFirstRender, groups]);

    return {
        form,
        generalGroups,
        subGroups,
        isFetchingSubGroups,
        isSubmitting: isPending,
    };
};

export default useStudentGroups;
