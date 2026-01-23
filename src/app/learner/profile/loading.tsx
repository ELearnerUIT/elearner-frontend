export default function ProfileLoading() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 animate-pulse">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-64"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-96 mt-2"></div>
                    </div>
                    <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                </div>

                {/* Profile Card */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {/* Cover */}
                    <div className="h-32 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700"></div>

                    {/* Avatar & Info */}
                    <div className="px-8 pb-8">
                        <div className="flex flex-col sm:flex-row gap-6 -mt-16">
                            {/* Avatar */}
                            <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900"></div>

                            {/* Name */}
                            <div className="flex-1 pt-4 space-y-2">
                                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-48"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-32"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-40"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Form */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-48 mb-6"></div>

                    <div className="space-y-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i}>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-32 mb-2"></div>
                                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Account Info */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-48 mb-4"></div>
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex justify-between">
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-32"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-40"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
