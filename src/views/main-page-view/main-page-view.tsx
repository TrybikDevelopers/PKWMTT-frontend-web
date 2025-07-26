import MobileTimetable from "./components/mobile-calendar/mobile-timetable";

export default function MainPageView() {
    return (
        <main className="text-foreground flex h-full w-full flex-col">
            <MobileTimetable />
        </main>
    );
}
