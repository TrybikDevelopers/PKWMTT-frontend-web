import { redirect } from "@/i18n/navigation";

export default function ModeratorPage() {
    redirect({
        href: "/moderator/representatives",
        locale: "pl",
    });
}
