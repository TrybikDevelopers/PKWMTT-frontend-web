export default function LessonCard() {
    const { startTime, endTime, lessonType, room, title } = {
        startTime: "7:30",
        endTime: "9:15",
        lessonType: "O",
        room: "A521",
        title: "Aplikacje internetowe no i coś tam dalej aby było widać kropki",
    };

    return (
        <div className="flex flex-row overflow-hidden bg-zinc-900 p-1 py-2 pl-2">
            <div className="flex h-full w-1.5 shrink-0 bg-[#D2D4D3]"></div>
            <div className="flex w-full flex-col gap-2">
                <div className="flex items-center px-4">
                    <span className="w-20 text-xs text-zinc-400">{`${startTime} - ${endTime}`}</span>
                    <span className="ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-xs">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white uppercase">
                            {lessonType}
                        </span>
                        <span className="text-xs">sala: {room}</span>
                    </span>
                </div>
                <div className="px-4 pt-1">
                    <div className="truncate text-sm font-semibold">
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );
}
