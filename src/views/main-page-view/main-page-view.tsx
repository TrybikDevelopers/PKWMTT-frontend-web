import MobileTimetable from "./components/mobile-calendar/mobile-timetable";

export default function MainPageView() {
    return (
        <div className="text-foreground flex h-full w-full flex-col">
            <MobileTimetable />
        </div>
    );
}
