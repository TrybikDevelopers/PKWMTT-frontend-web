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

function DesktopLessonCardSkeleton() {
    return (
        <div className="bg-background-darker flex h-full w-full flex-col justify-between gap-2 rounded-lg p-2">
            <div className="flex items-start justify-between gap-2">
                <div className="bg-button h-3 w-full rounded-sm"></div>
                <div className="bg-button size-4 rounded-full"></div>
            </div>
            <div className="bg-button h-3 w-20 rounded-sm"></div>
        </div>
    );
}

export default function MainPageLoading() {
    return (
        <div className="h-full w-full animate-pulse">
            {/* Mobile */}
            <div className="mx-auto flex w-full max-w-2xl flex-col lg:hidden">
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
            <div className="mx-auto hidden h-full w-full max-w-[1920px] flex-col p-4 lg:flex">
                {/* Desktop Header */}
                <div className="mb-5 grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] gap-4">
                    {/* Empty cell for time column */}
                    <div></div>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={`day-header-skeleton-${index}`}
                            className="flex justify-center py-4"
                        >
                            <div className="bg-button h-8 w-20 rounded-sm"></div>
                        </div>
                    ))}
                </div>

                {/* Desktop Grid */}
                <div className="flex-1 overflow-auto">
                    <div className="grid min-h-full grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] gap-4">
                        {/* Time column */}
                        <div className="flex flex-col">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={`time-skeleton-${index}`}
                                    className="flex min-h-20 items-center justify-center border-b border-[#5A5B5C] first:border-t"
                                >
                                    <div className="bg-button h-4 w-16 rounded-sm"></div>
                                </div>
                            ))}
                        </div>

                        {/* Days columns */}
                        {Array.from({ length: 5 }, (_, dayIndex) => (
                            <div
                                key={`day-skeleton-${dayIndex}`}
                                className="flex flex-col"
                            >
                                {Array.from({ length: 6 }).map(
                                    (_, hourIndex) => (
                                        <div
                                            key={`cell-skeleton-${dayIndex}-${hourIndex}`}
                                            className="min-h-20 border-b border-[#5A5B5C] p-1 first:border-t"
                                        >
                                            {/* Randomly show skeleton cards to simulate some lessons */}
                                            {Math.random() > 0.6 && (
                                                <DesktopLessonCardSkeleton />
                                            )}
                                        </div>
                                    ),
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
