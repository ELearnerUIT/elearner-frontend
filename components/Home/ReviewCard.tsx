import { Star } from "lucide-react"

export default function ReviewCard({
    name = "No Name",
    avatar = "",
    role = "Guest",
    rating = 4,
    review = "No Review"
}

) {
    let starCount = Math.round(rating)

    return (
        <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex gap-1 mb-4">
                {
                    [...Array(starCount)].map((_, i) => (
                        <Star
                            key={i}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                    ))
                }
                {
                    starCount < 5 &&
                    [...Array(5 - starCount)].map((_, i) => (
                        <Star
                            key={i}
                            className="h-5 w-5 text-gray-300"
                        />
                    ))
                }
            </div>
            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                {review}
            </p>
            <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                    {/* <Image
                        src="/student-1.jpg"
                        alt="John Davis"
                        fill
                        className="object-cover"
                    /> */}
                    <img
                        src={avatar}
                        alt={name}
                        className="object-cover w-full h-full object-center"
                    />
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                </div>
            </div>
        </div>
    )
}