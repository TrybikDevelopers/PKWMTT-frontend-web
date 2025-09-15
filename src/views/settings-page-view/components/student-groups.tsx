import { Form } from "@/components/ui/form";
import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import { FlaskConical, FolderOpen, Monitor, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { useWatch } from "react-hook-form";
import useStudentGroups from "../hooks/use-student-groups";
import GeneralGroupCombobox from "./general-group-combobox";
import GroupCard, { GroupCardSkeleton } from "./group-card";
import SubgroupSelect from "./subgroup-select";

type Props = {
    timetableSettings: TimetableSettingsSchema | null;
};

export default function StudentGroups({ timetableSettings }: Props) {
    const t = useTranslations("settings.studentGroups");

    const { form, generalGroups, subGroups, isFetchingSubGroups } =
        useStudentGroups(timetableSettings);

    const labGroup = subGroups?.find((group) => group.firstLetter === "L");
    const kompLabGroup = subGroups?.find((group) => group.firstLetter === "K");
    const projGroup = subGroups?.find((group) => group.firstLetter === "P");

    const groupsRequired = useWatch({ control: form.control, name: "groups" });

    const groupsToRender: React.ReactNode[] = [];

    if (labGroup && !isFetchingSubGroups) {
        const index = groupsToRender.length;

        const labValueRequired = (groupsRequired.at(index) ?? "").length === 0;

        groupsToRender.push(
            <GroupCard
                title={t("labGruop")}
                icon={FlaskConical}
                iconColor="bg-red-500"
                valueRequired={labValueRequired}
            >
                <SubgroupSelect
                    index={index}
                    label={t("labGruop")}
                    subGroups={labGroup.subGroups}
                />
            </GroupCard>,
        );
    }

    if (kompLabGroup && !isFetchingSubGroups) {
        const index = groupsToRender.length;

        const kompLabValueRequired =
            (groupsRequired.at(index) ?? "").length === 0;

        groupsToRender.push(
            <GroupCard
                title={t("kompLabGruop")}
                icon={Monitor}
                iconColor="bg-orange-500"
                valueRequired={kompLabValueRequired}
            >
                <SubgroupSelect
                    index={index}
                    label={t("kompLabGruop")}
                    subGroups={kompLabGroup.subGroups}
                />
            </GroupCard>,
        );
    }

    if (projGroup && !isFetchingSubGroups) {
        const index = groupsToRender.length;

        const projValueRequired = (groupsRequired.at(index) ?? "").length === 0;

        groupsToRender.push(
            <GroupCard
                title={t("projGruop")}
                icon={FolderOpen}
                iconColor="bg-gray-500"
                valueRequired={projValueRequired}
            >
                <SubgroupSelect
                    index={index}
                    label={t("projGruop")}
                    subGroups={projGroup.subGroups}
                />
            </GroupCard>,
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()}>
                <h1 className="text-foreground mb-6 text-3xl font-bold">
                    {t("text")}
                </h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <GroupCard
                        title={t("generalGroup")}
                        icon={Users}
                        iconColor="bg-teal-500"
                        valueRequired={false}
                    >
                        <GeneralGroupCombobox generalGroups={generalGroups} />
                    </GroupCard>
                    {isFetchingSubGroups && (
                        <>
                            <GroupCardSkeleton />
                            <GroupCardSkeleton />
                            <GroupCardSkeleton />
                        </>
                    )}
                    {groupsToRender.map((group, index) => (
                        <Fragment key={index}>{group}</Fragment>
                    ))}
                </div>
            </form>
        </Form>
    );
}
