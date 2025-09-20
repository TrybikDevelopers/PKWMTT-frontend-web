type Props = {
    fallbacksLength: number;
};

export default function SubGroupsSelectsFallback({ fallbacksLength }: Props) {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: fallbacksLength }, (_, index) => (
                <div
                    className="flex w-full flex-col gap-1.5"
                    key={`fallback-${index}`}
                >
                    <div className="h-3.5 w-24 animate-pulse rounded-sm bg-black/25 dark:bg-white/25" />
                    <div className="border-input bg-input/30 h-12 w-full animate-pulse rounded-md border" />
                </div>
            ))}
        </div>
    );
}
