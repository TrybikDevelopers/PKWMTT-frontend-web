import LessonButton from "./LessonButton";

export default function LessonHeader() {
    return (
        <header className="flex items-center justify-between p-4 shadow">
            <LessonButton></LessonButton>
            <h1 className="text-white-800 text-xl font-bold">Poniedziałek</h1>
            <LessonButton arrowClassName="rotate-180"></LessonButton>
        </header>
    );
}
