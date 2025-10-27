function EctsTableRowSkeleton() {
    return (
        <div className="border-border flex min-h-12 w-full items-center border-b px-4">
            <div className="flex w-12 items-center justify-center">
                <div className="bg-button size-4 rounded"></div>
            </div>
            <div className="flex-1 px-4">
                <div className="bg-button h-4 w-32 rounded-sm"></div>
            </div>
            <div className="flex w-20 items-center justify-center">
                <div className="bg-button h-4 w-8 rounded-sm"></div>
            </div>
            <div className="flex w-20 items-center justify-center">
                <div className="bg-button h-4 w-8 rounded-sm"></div>
            </div>
        </div>
    );
}

function EctsStatsCardSkeleton() {
    return (
        <div className="min-w-40 flex-1 px-4 py-2">
            <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="bg-button mb-2 h-4 w-24 rounded-sm"></div>
                <div className="bg-button h-6 w-12 rounded-sm"></div>
            </div>
        </div>
    );
}

export default function EctsCalculatorLoading() {
    return (
        <div className="w-full animate-pulse p-4">
            <div className="w-full">
                {/* Table Header Skeleton */}
                <div className="border-border flex min-h-12 w-full items-center border-b-2 px-4">
                    <div className="flex w-12 items-center justify-center">
                        <div className="bg-button size-4 rounded"></div>
                    </div>
                    <div className="flex w-full items-center justify-around px-4">
                        <div className="">
                            <div className="bg-button h-5 w-32 rounded-sm"></div>
                        </div>
                        <div className="flex w-20 items-center justify-center">
                            <div className="bg-button h-5 w-20 rounded-sm"></div>
                        </div>
                        <div className="flex w-20 items-center justify-center">
                            <div className="bg-button h-5 w-20 rounded-sm"></div>
                        </div>
                    </div>
                </div>

                {/* Table Rows Skeleton */}
                {Array.from({ length: 5 }).map((_, index) => (
                    <EctsTableRowSkeleton key={`ects-row-skeleton-${index}`} />
                ))}

                {/* Statistics Section Skeleton */}
                <div className="mt-10 flex min-h-12 grid-cols-3 flex-wrap gap-y-2 rounded-2xl border p-1 sm:grid sm:gap-y-0">
                    <EctsStatsCardSkeleton />
                    <EctsStatsCardSkeleton />
                    <EctsStatsCardSkeleton />
                </div>
            </div>
        </div>
    );
}
