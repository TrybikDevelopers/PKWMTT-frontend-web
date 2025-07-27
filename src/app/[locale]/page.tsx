import { fetchGeneralGroups } from "@/server/data-access/timetable";
import TimetableForm from "@/views/main-page-view/components/timetable-form/timetable-form";
// import MainPageView from "@/views/main-page-view/main-page-view";

export default async function Home() {
    // return <MainPageView />;

    const { generalGroups } = await fetchGeneralGroups();

    if (!generalGroups) {
        throw new Error("No general groups found");
    }

    return (
        <main className="h-full w-full">
            <TimetableForm generalGroups={generalGroups} />
            {/* <MainPageView /> */}
        </main>
    );
}
