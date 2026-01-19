import Link from "next/link";
import { Search, Award, TrendingUp } from "lucide-react";

export default function QuickActions() {
    return (
        <div className="card bg-base-100 shadow">
            <div className="card-body">
                <h3 className="card-title text-lg">Quick Actions</h3>
                <div className="space-y-2 mt-2">
                    <Link
                        href="/home"
                        className="btn btn-ghost btn-block justify-start"
                    >
                        <Search className="w-4 h-4" />
                        Browse Courses
                    </Link>
                    <Link
                        href="/certificates"
                        className="btn btn-ghost btn-block justify-start"
                    >
                        <Award className="w-4 h-4" />
                        View Certificates
                    </Link>
                    <Link
                        href="/progress"
                        className="btn btn-ghost btn-block justify-start"
                    >
                        <TrendingUp className="w-4 h-4" />
                        View Progress
                    </Link>
                </div>
            </div>
        </div>
    );
}
