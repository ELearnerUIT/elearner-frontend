'use client'

import Image from "next/image"
import { Star } from "lucide-react"
import { ButtonColor } from "@/components/shared/CustomButton"
import { CustomButton } from "@/components/shared/CustomButton"

export default function CourseCard({
    imgSource = "",
    level = "Beginner",
    category = "None",
    courseTitle = "No Name",
    author = "No Author",
    rating = 0,
    ratingCount = 0,
    duration = 0,
    oldPrice = 0,
    price = 0
}
) {
    const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        alert("Add course to cart: " + courseTitle)
    }

    return (
        <div className="rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-2/5">
                <img className="object-cover w-full h-full object-center"
                    src={imgSource} />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                    {level}
                </div>
            </div>
            <div className="p-5 bg-white">
                <p className="text-sm text-indigo-600 font-semibold">{category}</p>
                <h3 className="text-lg font-semibold text-gray-900 mt-2">{courseTitle}</h3>
                <p className="text-sm text-gray-600 mt-1">by {author}</p>
                <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">{rating}</span>
                        <span className="text-xs text-gray-500">{ratingCount.toLocaleString()}</span>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 flex items-center gap-1">
                    <span className="text-gray-400">⏱️</span>
                    {duration} hours
                </p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-3xl font-semibold text-indigo-600">
                        ${price.toLocaleString()}
                        <del className="text-xl font-normal text-gray-400 pl-2">
                            {oldPrice > 0 && "$" + oldPrice.toLocaleString()}
                        </del>
                    </span>
                    <CustomButton
                        text="Add to Cart"
                        enabled={true}
                        color={ButtonColor.WHITE}
                        width="w-1/2"
                        onClick={(event => handleAddToCart(event))}
                    />
                </div>
            </div>
        </div>
    )
}