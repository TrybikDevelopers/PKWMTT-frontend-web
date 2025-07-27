import { fetchMainPageData } from "@/server/fetchers/main-page";
import TimetableForm from "@/views/main-page-view/components/timetable-form/timetable-form";
import MainPageView from "@/views/main-page-view/main-page-view";

export default async function Home() {
    const data = await fetchMainPageData();

    return (
        <main className="h-full w-full">
            {data.timetable ? (
                <MainPageView timetable={data.timetable} />
            ) : (
                <TimetableForm generalGroups={data.generalGroups} />
            )}
        </main>
    );
}
