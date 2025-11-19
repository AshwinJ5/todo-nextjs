export default function TaskSkeleton() {
    return (
        <div className="mb-4 flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="group flex items-center gap-4 bg-white dark:bg-gray-800/50 p-4 rounded-xl shadow-sm"
                >
                    <div className="h-5 w-5 shrink-0 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>

                    <div className="grow min-w-0 space-y-2">
                        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse w-24"></div>
                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse w-28"></div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
