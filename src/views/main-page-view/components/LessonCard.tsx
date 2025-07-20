export default function LessonCard() {
    const { startTime, endTime, lessonType, room, title } = {
        startTime: "7:30",
        endTime: "9:15",
        lessonType: "L",
        room: "A521",
        title: "Aplikacje internetowe",
    };

    return (
        <div className="-mt-3 flex flex-col overflow-hidden bg-zinc-900">
            <div className="h-px w-full rounded-full bg-zinc-800" />
            <div className="flex items-center px-4 pt-3">
                <span className="w-20 text-xs text-zinc-400">{`${startTime} - ${endTime}`}</span>
                <span className="ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 font-bold text-white uppercase">
                        {lessonType}
                    </span>
                    <span className="text-xs">sala: {room}</span>
                </span>
            </div>
            <div className="px-4 pt-1 pb-3">
                <div className="truncate text-base font-semibold" title={title}>
                    {title}
                </div>
            </div>
            <div className="h-px w-full rounded-full bg-zinc-800" />
        </div>
    );
}
