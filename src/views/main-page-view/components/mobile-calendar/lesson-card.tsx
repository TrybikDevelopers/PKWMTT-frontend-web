import { useTranslations } from "next-intl";

export default function LessonCard() {
    const t = useTranslations("home.mobileTimetable");

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
                    <span className="xs:text-base w-fit text-sm font-normal text-white">{`${startTime} - ${endTime}`}</span>
                    <span className="xs:text-base ml-auto flex items-center gap-1 rounded-full text-sm">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white uppercase">
                            {lessonType}
                        </span>
                        <span className="xs:text-base text-sm text-white lowercase">
                            {t("classRoom")}: {room}
                        </span>
                    </span>
                </div>
                <div className="">
                    <div className="xs:text-base text-sm font-normal text-white">
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );
}
