import { useTranslations } from "next-intl";
import AddModeratorDialog from "./components/add-moderator-dialog";
import ModeratorTable from "./components/moderator-table";

export default function ModeratorPanelView() {
    const t = useTranslations("moderatorPanel");

    return (
        <div className="bg-background min-h-screen">
            <div className="flex items-center justify-between border-b p-6">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-foreground text-2xl font-bold">
                            {t("title")}
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            {t("description")}
                        </p>
                    </div>
                </div>

                <AddModeratorDialog />
            </div>

            <div className="p-6">
                <ModeratorTable />
            </div>
        </div>
    );
}
