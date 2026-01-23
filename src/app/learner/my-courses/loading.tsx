export default function MyCoursesLoading() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 animate-pulse">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-4">
                    <div>
                        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-64"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-40 mt-2"></div>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 h-10 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"></div>
                        <div className="flex gap-2">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-10 w-24 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                        >
                            {/* Thumbnail */}
                            <div className="h-48 bg-slate-200 dark:bg-slate-800"></div>

                            {/* Content */}
                            <div className="p-5 space-y-4">
                                <div className="space-y-2">
                                    <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                                </div>

                                {/* Progress */}
                                <div className="space-y-2">
                                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                                    <div className="flex justify-between">
                                        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
                                        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
                                    </div>
                                </div>

                                {/* Button */}
                                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
