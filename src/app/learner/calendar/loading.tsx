export default function CalendarLoading() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 animate-pulse">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-4">
                    <div>
                        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-64"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-96 mt-2"></div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="h-8 w-20 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Events List */}
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5"
                        >
                            <div className="flex gap-4">
                                {/* Date Badge */}
                                <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>

                                {/* Content */}
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between">
                                        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-48"></div>
                                        <div className="flex gap-2">
                                            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-64"></div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-32"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
