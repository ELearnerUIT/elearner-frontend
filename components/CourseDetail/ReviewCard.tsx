import { Star } from 'lucide-react';

export default function ReviewCard({
    name = "John Doe1",
    avatar = "https://i.pravatar.cc/300?img=47",
    rating = 4.5,
    date = new Date(),
    content = "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
    helpful = 234
}
) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={avatar} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-medium text-gray-800">{name}</div>
                        <div className="text-xs text-gray-400">{date.toISOString().split('T')[0]}</div>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400 mt-2">
                    {
                        [...Array(Math.round(rating))].map((_, i) => (
                            <Star
                                key={i}
                                className="h-5 w-5 fill-yellow-400 text-yellow-400"
                            />
                        ))
                    }
                    {
                        Math.round(rating) < 5 &&
                        [...Array(5 - Math.round(rating))].map((_, i) => (
                            <Star
                                key={i}
                                className="h-5 w-5 text-gray-300"
                            />
                        ))
                    }
                </div>
                <p className="text-sm text-gray-600 mt-2">{content}</p>
                <div className="text-xs text-gray-500 mt-2">Helpful {helpful.toLocaleString()}</div>
            </div>
        </div>
    )
}