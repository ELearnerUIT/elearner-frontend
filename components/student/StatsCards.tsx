import { BookOpen, Clock, Award, CheckCircle } from "lucide-react";

export interface Stats {
    inProgress: number;
    completed: number;
    totalHours: number;
    certificates: number;
}

interface StatsCardsProps {
    stats: Stats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="stat bg-base-100 rounded-box shadow">
                <div className="stat-figure text-primary">
                    <BookOpen className="w-8 h-8" />
                </div>
                <div className="stat-title">In Progress</div>
                <div className="stat-value text-primary">{stats.inProgress}</div>
                <div className="stat-desc">Active courses</div>
            </div>

            <div className="stat bg-base-100 rounded-box shadow">
                <div className="stat-figure text-success">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <div className="stat-title">Completed</div>
                <div className="stat-value text-success">{stats.completed}</div>
                <div className="stat-desc">Finished courses</div>
            </div>

            <div className="stat bg-base-100 rounded-box shadow">
                <div className="stat-figure text-info">
                    <Clock className="w-8 h-8" />
                </div>
                <div className="stat-title">Learning Hours</div>
                <div className="stat-value text-info">{stats.totalHours}</div>
                <div className="stat-desc">Total time spent</div>
            </div>

            <div className="stat bg-base-100 rounded-box shadow">
                <div className="stat-figure text-warning">
                    <Award className="w-8 h-8" />
                </div>
                <div className="stat-title">Certificates</div>
                <div className="stat-value text-warning">{stats.certificates}</div>
                <div className="stat-desc">Earned</div>
            </div>
        </div>
    );
}
