export default function LessonCard() {
    const { startTime, endTime, lessonType, room, title } = {
        startTime: "7:30",
        endTime: "9:15",
        lessonType: "O",
        room: "A521",
        title: "Aplikacje internetowe no i coś tam dalej aby było widać kropki",
    };

    return (
        <div className="bg-background flex flex-row overflow-hidden py-2.5">
            <div className="flex h-full w-1.5 shrink-0 bg-[#D2D4D3]"></div>
            <div className="flex w-full flex-col gap-5 p-1.25 px-2">
                <div className="flex items-center">
                    <span className="text-accent-light xs:text-base w-fit text-sm font-normal">{`${startTime} - ${endTime}`}</span>
                    <span className="xs:text-base ml-auto flex items-center gap-1 rounded-full text-sm">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white uppercase">
                            {lessonType}
                        </span>
                        <span className="xs:text-base text-sm">
                            sala: {room}
                        </span>
                    </span>
                </div>
                <div className="">
                    <div className="text-accent-light xs:text-base text-sm font-normal">
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );
}
