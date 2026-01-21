import { File, GraduationCap, Star, UserPlus, Users } from "lucide-react"

export enum ActivityNotificationType {
    NEW_STUDENT,
    NEW_RATING,
    NEW_ASSIGNMENT,
    NEW_COURSE
}

export default function ActivityNotification({
    type = ActivityNotificationType.NEW_STUDENT,
    title = "",
    time = "",
}: {
    type?: ActivityNotificationType,
    title?: string,
    time?: string
}

) {

    const getIcon = (type: ActivityNotificationType) => {
        switch (type) {
            case ActivityNotificationType.NEW_STUDENT:
                return (
                    <div className="h-12 w-12 flex rounded-xl items-center justify-center bg-[rgb(238,242,255)] text-[rgb(99,102,241)]">
                        <UserPlus />
                    </div>
                )
            case ActivityNotificationType.NEW_RATING:
                return (
                    <div className="h-12 w-12 flex rounded-xl items-center justify-center bg-[rgb(209,250,229)] text-[rgb(16,185,129)]">
                        <Star />
                    </div>
                )
            case ActivityNotificationType.NEW_ASSIGNMENT:
                return (
                    <div className="h-12 w-12 flex rounded-xl items-center justify-center bg-[rgb(243,232,255)] text-[rgb(139,92,246)]">
                        <File />
                    </div>
                )
            case ActivityNotificationType.NEW_COURSE:
                return (
                    <div className="h-12 w-12 flex rounded-xl items-center justify-center bg-[rgb(254,243,199)] text-[rgb(245,158,11)]">
                        <GraduationCap />
                    </div>
                )
            default:
                return (
                    <div className="h-12 w-12 flex rounded-xl items-center justify-center bg-[rgb(209,250,229)] text-[rgb(16,185,129)]">
                        <Star />
                    </div>
                )
        }
    }
    return (
        <div className="flex items-center space-x-4 pb-4">
            {getIcon(type)}
            <div className="flex-1">
                <p className="text-base font-normal text-black">{title}</p>
                <p className="text-xs text-gray-500 mt-1">{time}</p>
            </div>
        </div>
    )
}
