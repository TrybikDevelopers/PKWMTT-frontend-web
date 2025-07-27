import { fetchMainPageData } from "@/server/fetchers/main-page";
import TimetableForm from "@/views/main-page-view/components/timetable-form/timetable-form";
import MainPageView from "@/views/main-page-view/main-page-view";

export default async function Home() {
    const data = await fetchMainPageData();

    return (
        <main className="h-full w-full">
            {data.generalGroups ? (
                <TimetableForm generalGroups={data.generalGroups} />
            ) : (
                <MainPageView timetable={data.timetable} hours={data.hours} />
            )}
        </main>
    );
}
