function MonthSelectSkeleton() {
    return (
        <>
            {/* Mobile: Select dropdown skeleton */}
            <div className="mt-6 flex items-center justify-center md:hidden">
                <div className="bg-button h-10 w-56 rounded-lg"></div>
            </div>

            {/* Desktop: Nav + Month picker skeleton */}
            <div className="mt-8 hidden items-center justify-center gap-4 md:flex xl:gap-6">
                <div className="bg-button h-10 w-10 rounded-md"></div>
                <div className="bg-button h-8 w-32 rounded-sm xl:h-9 xl:w-36"></div>
                <div className="bg-button h-10 w-10 rounded-md"></div>
            </div>
        </>
    );
}

function WeekdaysHeaderSkeleton() {
    return (
        <>
            {Array.from({ length: 7 }).map((_, index) => (
                <div
                    key={`weekday-skeleton-${index}`}
                    className="flex justify-center px-2 py-1 md:py-4 lg:px-3 lg:py-5 xl:px-4 xl:py-6"
                >
                    <div className="bg-button xxs:h-7 xxs:w-8 h-6 w-5 shrink-0 rounded-sm lg:h-8 lg:w-10 xl:h-9 xl:w-12"></div>
                </div>
            ))}
        </>
    );
}

function CalendarDayMobileSkeleton() {
    return (
        <div className="md:hidden">
            <div className="bg-button aspect-square w-full animate-pulse rounded-md"></div>
        </div>
    );
}

function CalendarDayDesktopSkeleton() {
    return (
        <div className="hidden md:block">
            <div className="bg-background-muted mx-auto flex min-h-32 w-full max-w-32 flex-col items-center justify-start rounded-xl border p-3 shadow-sm lg:min-h-36 lg:max-w-40 lg:p-4 xl:min-h-44 xl:p-5">
                {/* Day number skeleton */}
                <div className="mb-2 lg:mb-3 xl:mb-4">
                    <div className="bg-button h-7 w-8 rounded-sm lg:h-8 lg:w-10 xl:h-9 xl:w-12"></div>
                </div>

                {/* Event indicators skeleton */}
                {Math.random() > 0.7 && (
                    <div className="mb-3 flex min-h-2.5 gap-1 lg:mb-4 lg:gap-1.5 xl:mb-5">
                        <div className="bg-button h-2.5 w-2.5 rounded-full lg:h-3 lg:w-3 xl:h-3.5 xl:w-3.5"></div>
                        {Math.random() > 0.7 && (
                            <div className="bg-button h-2.5 w-2.5 rounded-full lg:h-3 lg:w-3 xl:h-3.5 xl:w-3.5"></div>
                        )}
                        {Math.random() > 0.8 && (
                            <div className="bg-button h-2.5 w-2.5 rounded-full lg:h-3 lg:w-3 xl:h-3.5 xl:w-3.5"></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function CalendarGridSkeleton() {
    return (
        <>
            <WeekdaysHeaderSkeleton />
            {/* Calendar days - 6 weeks x 7 days = 42 days */}
            {Array.from({ length: 42 }).map((_, index) => (
                <div key={`calendar-day-skeleton-${index}`}>
                    <CalendarDayMobileSkeleton />
                    <CalendarDayDesktopSkeleton />
                </div>
            ))}
        </>
    );
}

export default function CalendarLoading() {
    return (
        <div className="mx-auto w-full max-w-3xl animate-pulse space-y-4 px-4 md:max-w-6xl lg:max-w-7xl xl:max-w-[1920px] 2xl:px-8">
            <MonthSelectSkeleton />

            <div className="grid grid-cols-7 gap-2 md:gap-3 lg:gap-4 xl:gap-5">
                <CalendarGridSkeleton />
            </div>
        </div>
    );
}
