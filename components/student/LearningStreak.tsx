import { Flame } from "lucide-react";

interface LearningStreakProps {
    streakDays: number;
    activeDays?: number;
}

export default function LearningStreak({
    streakDays,
    activeDays = 7,
}: LearningStreakProps) {
    const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

    return (
        <div className="card bg-base-100 shadow">
            <div className="card-body">
                <h3 className="card-title text-lg">
                    <Flame className="w-5 h-5 text-orange-500" />
                    Learning Streak
                </h3>
                <div className="text-center py-4">
                    <div className="text-4xl font-bold text-orange-500">
                        {streakDays}
                    </div>
                    <div className="text-sm text-base-content/70">days in a row</div>
                </div>
                <div className="flex justify-center gap-1">
                    {weekDays.map((day, i) => (
                        <div
                            key={i}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                                i < activeDays
                                    ? "bg-orange-500 text-white"
                                    : "bg-base-200 text-base-content/50"
                            }`}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
