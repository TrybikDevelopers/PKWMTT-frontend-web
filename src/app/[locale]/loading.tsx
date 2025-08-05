function MobileLessonCard() {
    return (
        <div className="flex h-full min-h-25 w-full shrink-0 flex-row justify-between py-2.5">
            <div className="bg-button w-1.5 shrink-0 rounded-sm"></div>
            <div className="flex w-full flex-col justify-between p-0.5 px-2">
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="bg-button h-5 w-16 rounded-sm"></div>
                    <div className="bg-button h-5 w-20 rounded-sm"></div>
                </div>
                <div className="bg-button h-5 w-32 rounded-sm"></div>
            </div>
        </div>
    );
}

export default function MainPageLoading() {
    return (
        <div className="h-full w-full animate-pulse">
            {/* Mobile */}
            <div className="flex flex-col lg:hidden">
                <div className="flex items-center justify-between p-4">
                    <div className="bg-button h-9 w-10 rounded-xl"></div>
                    <div className="bg-button h-8 w-28 rounded-xl"></div>
                    <div className="bg-button h-9 w-10 rounded-xl"></div>
                </div>
                <div className="xxs:mt-6 mt-4 flex flex-col px-2 pb-10 *:border-b-1 *:border-[#5A5B5C] *:first:border-t-1 *:first:border-t-[#5A5B5C]">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <MobileLessonCard key={`mobile-lesson-card-${index}`} />
                    ))}
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:flex"></div>
        </div>
    );
}
