"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import type { GeneralGroups } from "@/types/data-access/timetable";
import { useTranslations } from "next-intl";
import useTimetableForm from "../../hooks/use-timetable-form";
import GeneralGroupCombobox from "./general-group-combobox";
import SubGroupsSelects from "./subgroups-selects";
import SubGroupsSelectsFallback from "./subgroups-selects-fallback";

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
        <div className="flex h-full w-full flex-col items-center justify-center p-4 pb-20">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((data) => console.log(data))}
                    className="flex w-full max-w-84 flex-col gap-4"
                >
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
                        <Button
                            type="submit"
                            className="mx-auto cursor-pointer"
                        >
                            {t("submit")}
                        </Button>
                    )}
                </form>
            </Form>
        </div>
    );
}
