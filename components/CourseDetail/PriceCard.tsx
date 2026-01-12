'use client'

import { Share2, Clock, Heart, Award, User, CheckCircle } from 'lucide-react';
import { ButtonColor, CustomButton } from '../shared/CustomButton';
import { useState } from 'react';

export default function PriceCard(
    {
        price = 0,
        oldPrice = 0
    }
) {

    const discount = Math.round(((oldPrice - price) / oldPrice) * 100);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const addToWishlist = () => {
        setIsWishlisted(!isWishlisted);
    }


    return (
        <div className="bg-white rounded-lg overflow-hidden sticky top-4">
            {/* Course Image */}
            <img src="https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg" className="object-cover object-center overflow-hidden" />

            {/* Price Section */}
            <div className="p-6">
                <div className="mb-6">
                    <span className="text-3xl font-semibold text-indigo-600">
                        ${price.toLocaleString()}
                        <del className="text-xl font-normal text-gray-400 pl-2">
                            {oldPrice > 0 && "$" + oldPrice.toLocaleString()}
                        </del>
                    </span>
                    <div className="inline-block ml-5 bg-red-400 text-white px-3 py-1 rounded text-sm font-semibold">
                        {discount}% OFF
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col items-center justify-between gap-2">
                    <CustomButton
                        text="Enroll Now"
                        enabled={true}
                        color={ButtonColor.PURPLE}
                    />
                    <CustomButton
                        text="Add to Cart"
                        enabled={true}
                        color={ButtonColor.WHITE}
                    />
                </div>

                {/* Wishlist and Share */}
                <div className="grid grid-cols-2 gap-3 pb-6 mt-3 border-b border-gray-700">
                    <CustomButton
                        color={ButtonColor.WHITE}
                        onClick={(event) => { addToWishlist() }}
                    >
                        <div className="flex items-center gap-2">
                            <Heart
                                size={20}
                                fill={isWishlisted ? 'currentColor' : 'none'}
                                className="text-[rgb(99,102,241)]"
                            />
                            <span>Wishlist</span>
                        </div>

                    </CustomButton>
                    <CustomButton
                        color={ButtonColor.WHITE}
                    >
                        <div className="flex items-center gap-2">
                            <Share2 size={20} className="text-[rgb(99,102,241)]" />
                            <span>Share</span>
                        </div>
                    </CustomButton>
                </div>

                {/* Course Features */}
                <div className="pt-6 space-y-4">
                    <div className="flex items-start gap-3">
                        <Award className="text-[rgb(99,102,241)]" />
                        <span className="text-black">Certificate of completion</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <Clock className="text-[rgb(99,102,241)]" />
                        <span className="text-black">52 hours on-demand video</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <User className="text-[rgb(99,102,241)]" />
                        <span className="text-black">Full lifetime access</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle className="text-[rgb(99,102,241)]" />
                        <span className="text-black">Access on mobile and desktop</span>
                    </div>
                </div>
            </div>
        </div>
    )
}