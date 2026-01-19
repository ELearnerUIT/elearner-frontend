import { TrendingUp, Play, CheckCircle, Award } from "lucide-react";

export interface Activity {
    id: number;
    type: "lesson" | "quiz" | "certificate";
    title: string;
    course: string;
    time: string;
}

interface RecentActivityProps {
    activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
    const getActivityStyles = (type: Activity["type"]) => {
        switch (type) {
            case "lesson":
                return "bg-primary/10 text-primary";
            case "quiz":
                return "bg-success/10 text-success";
            case "certificate":
                return "bg-warning/10 text-warning";
            default:
                return "bg-base-200 text-base-content";
        }
    };

    const getActivityIcon = (type: Activity["type"]) => {
        switch (type) {
            case "lesson":
                return <Play className="w-4 h-4" />;
            case "quiz":
                return <CheckCircle className="w-4 h-4" />;
            case "certificate":
                return <Award className="w-4 h-4" />;
            default:
                return null;
        }
    };

    return (
        <div className="card bg-base-100 shadow">
            <div className="card-body">
                <h3 className="card-title text-lg">
                    <TrendingUp className="w-5 h-5" />
                    Recent Activity
                </h3>
                <ul className="space-y-4 mt-2">
                    {activities.map((activity) => (
                        <li key={activity.id} className="flex gap-3">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityStyles(activity.type)}`}
                            >
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                    {activity.title}
                                </p>
                                <p className="text-xs text-base-content/60 truncate">
                                    {activity.course}
                                </p>
                                <p className="text-xs text-base-content/40">
                                    {activity.time}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
