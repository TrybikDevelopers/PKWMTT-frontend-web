"use client";

import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import type { GeneralGroups } from "@/types/data-access/timetable";
import { useTranslations } from "next-intl";
import useTimetableForm from "../../hooks/use-timetable-form";
import GeneralGroupCombobox from "./general-group-combobox";
import SubGroupsSelects from "./subgroups-selects";
import SubGroupsSelectsFallback from "./subgroups-selects-fallback";
import SubmitButton from "./submit-button";

type Props = {
    generalGroups: GeneralGroups;
};

export default function TimetableForm({ generalGroups }: Props) {
    const t = useTranslations("home.timetableForm");

    const {
        form,
        generalGroup,
        isFetchingSubGroups,
        subGroups,
        subGroupsPlaceholdersLength,
    } = useTimetableForm();

    return (
        <div className="flex h-full w-full flex-col items-center justify-center p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(async (data) => {
                        await new Promise((resolve) =>
                            setTimeout(resolve, 1000),
                        );
                        console.log("Form submitted with data:", data);
                    })}
                    className={cn(
                        "mb-28 flex w-full max-w-84 flex-col gap-4",
                        generalGroup.length > 0 && "mb-10",
                    )}
                >
                    <h1 className="text-center text-2xl font-bold">
                        {t("welcomeFirstTime")}
                    </h1>
                    <p className="text-muted-foreground text-center">
                        {t("selectGroupsToContinue")}
                    </p>
                    <GeneralGroupCombobox generalGroups={generalGroups} />
                    {!isFetchingSubGroups &&
                        subGroups &&
                        subGroups.length > 0 && (
                            <SubGroupsSelects subGroups={subGroups} />
                        )}
                    {isFetchingSubGroups && (
                        <SubGroupsSelectsFallback
                            fallbacksLength={subGroupsPlaceholdersLength}
                        />
                    )}
                    {generalGroup.length > 0 && (
                        <SubmitButton isLoading={form.formState.isSubmitting} />
                    )}
                </form>
            </Form>
        </div>
    );
}
