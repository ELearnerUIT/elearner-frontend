import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { Bell, Mail } from "lucide-react";
import { useState } from "react";
export default function NotificationsTab() {
    const [courseUpdate, setCourseUpdate] = useState(false)
    const [newAssignments, setNewAssignments] = useState(false)
    const [gradeUpdates, setGradeUpdates] = useState(false)
    const [marketingEmails, setMarketingEmails] = useState(false)

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-black mb-1">Email Notifications</h2>
                <p className="text-gray-600 text-sm">Choose what emails you want to receive</p>
            </div>

            {/* Notification Items */}
            <div className="space-y-6">
                {/* Course Updates */}
                <div className="flex items-start justify-between py-4 border-gray-200">
                    <div className="flex items-start gap-3 flex-1">
                        <Bell />
                        <div className="flex-1">
                            <h3 className="font-medium text-black">Course Updates</h3>
                            <p className="text-gray-600 text-sm">Receive notifications about your enrolled courses</p>
                        </div>
                    </div>
                    <ToggleSwitch
                        checked={courseUpdate}
                        onChange={(value) => setCourseUpdate(value)}
                    />
                </div>
                <hr className="text-[rgba(0,0,0,0.1)] mb-5" />

                {/* New Assignments */}
                <div className="flex items-start justify-between py-4 border-gray-200">
                    <div className="flex items-start gap-3 flex-1">
                        <Bell />
                        <div className="flex-1">
                            <h3 className="font-medium text-black">New Assignments</h3>
                            <p className="text-gray-600 text-sm">Get notified when instructors post new assignments</p>
                        </div>
                    </div>
                    <ToggleSwitch
                        checked={newAssignments}
                        onChange={(value) => setNewAssignments(value)}
                    />
                </div>
                <hr className="text-[rgba(0,0,0,0.1)] mb-5" />

                {/* Grade Updates */}
                <div className="flex items-start justify-between py-4 border-gray-200">
                    <div className="flex items-start gap-3 flex-1">
                        <Bell />
                        <div className="flex-1">
                            <h3 className="font-medium text-black">Grade Updates</h3>
                            <p className="text-gray-600 text-sm">Receive notifications when you receive grades</p>
                        </div>
                    </div>
                    <ToggleSwitch
                        checked={gradeUpdates}
                        onChange={(value) => setGradeUpdates(value)}
                    />
                </div>
                <hr className="text-[rgba(0,0,0,0.1)] mb-5" />

                {/* Marketing Emails */}
                <div className="flex items-start justify-between py-4 border-gray-200">
                    <div className="flex items-start gap-3 flex-1">
                        <Mail />
                        <div className="flex-1">
                            <h3 className="font-medium text-black">Marketing Emails</h3>
                            <p className="text-gray-600 text-sm">Receive emails about new courses and special offers</p>
                        </div>
                    </div>
                    <ToggleSwitch
                        checked={marketingEmails}
                        onChange={(value) => setMarketingEmails(value)}
                    />
                </div>
                <hr className="text-[rgba(0,0,0,0.1)] mb-5" />
            </div>
        </div>
    )
}