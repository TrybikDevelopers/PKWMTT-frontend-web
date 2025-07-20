import LessonCard from "./components/LessonCard";
import LessonHeader from "./components/LessonHeader";

export default function MainPageView() {
    return (
        <main className="text-foreground flex h-full w-full flex-col">
            <LessonHeader />
            <div className="mt-6 flex flex-col">
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
            </div>
        </main>
    );
}
