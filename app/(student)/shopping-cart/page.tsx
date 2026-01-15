'use client'
import { CustomButton } from '@/components/shared/CustomButton';
import CustomInputField from '@/components/shared/CustomInputField';
import ShoppingCartItem from '@/components/ShoppingCart/ShoppingCartItem';
import { Tag } from 'lucide-react';
import { useState } from 'react'
export default function ShoppingCart() {
    // Mock course data
    const [coursesInCart, setCoursesInCart] = useState([
        {
            id: "0",
            imgSource: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
            level: 'Beginner',
            category: 'Web Development',
            courseTitle: 'Complete Web Development Bootcamp 2025',
            author: 'Sarah Johnson',
            rating: 4.8,
            ratingCount: 12453,
            duration: 52,
            oldPrice: 199,
            price: 89.99
        },
        {
            id: "1",
            imgSource: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
            level: 'Intermediate',
            category: 'Data Science',
            courseTitle: 'Data Science & Machine Learning Masterclass',
            author: 'Dr. Michael Chen',
            rating: 4.9,
            ratingCount: 9211,
            duration: 48,
            oldPrice: 199,
            price: 94.99
        },
        {
            id: "2",
            imgSource: 'https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=400&h=250&fit=crop',
            level: 'Beginner',
            category: 'Marketing',
            courseTitle: 'Digital Marketing Complete Course',
            author: 'Emma Williams',
            rating: 4.7,
            ratingCount: 6543,
            duration: 38,
            oldPrice: 199,
            price: 79.99
        },
        {
            id: "3",
            imgSource: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
            level: 'Advanced',
            category: 'Design',
            courseTitle: 'UI/UX Design Fundamentals',
            author: 'Alex Thompson',
            rating: 4.8,
            ratingCount: 5234,
            duration: 32,
            oldPrice: 169,
            price: 84.99
        },
        {
            id: "4",
            imgSource: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
            level: 'Intermediate',
            category: 'Business',
            courseTitle: 'Business Strategy & Leadership',
            author: 'John Smith',
            rating: 4.6,
            ratingCount: 4123,
            duration: 42,
            oldPrice: 149,
            price: 69.99
        },
        {
            id: "5",
            imgSource: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=250&fit=crop',
            level: 'Beginner',
            category: 'Photography',
            courseTitle: 'Professional Photography Masterclass',
            author: 'Lisa Anderson',
            rating: 4.9,
            ratingCount: 7654,
            duration: 45,
            oldPrice: 179,
            price: 89.99
        }
    ])

    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

    const [couponInput, setCouponInput] = useState("");


    const handleSelectCourse = (courseID: string) => {
        let newSelectedCourses = [...selectedCourses];
        if (!newSelectedCourses.includes(courseID)) {
            newSelectedCourses.push(courseID);
        }
        setSelectedCourses(newSelectedCourses);
        console.log("new: ", newSelectedCourses)
    }

    const handleRemoveCourse = (courseID: string) => {
        alert("Remove: " + courseID);
        let newCoursesInCart = [...coursesInCart];
        let indexToRemove = -1;
        newCoursesInCart.forEach((course, index) => {
            if (course.id === courseID) {
                indexToRemove = index;
                return;
            }
        })
        if (indexToRemove >= 0) {
            newCoursesInCart.splice(indexToRemove, 1);
        }
        setCoursesInCart(newCoursesInCart);
    }

    const countTotalPrice = () => {
        let totalPrice = 0;
        coursesInCart.map((course) => {
            if (selectedCourses.includes(course.id)) {
                totalPrice += course.price;
            }
        })
        return totalPrice;
    }

    const countDiscount = () => {
        let totalPrice = countTotalPrice();
        if (couponInput && couponInput.length > 0) {
            totalPrice *= 0.1;
        }
        return totalPrice;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-medium text-black">Shopping Cart</h1>
                {/* Cart Summary Header */}
                <div className="mb-6 text-xl w-full text-gray-600 mt-5 flex items-center justify-end">
                    <div>{coursesInCart.length} Courses in Cart</div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        {/* Cart Items Container */}
                        <div className="space-y-4">
                            {
                                coursesInCart.map((course, index) => {
                                    return (
                                        <ShoppingCartItem
                                            checked={selectedCourses.includes(course.id)}
                                            key={index}
                                            id={course.id}
                                            imgSource={course.imgSource}
                                            level={course.level}
                                            category={course.category}
                                            courseTitle={course.courseTitle}
                                            author={course.author}
                                            rating={course.rating}
                                            ratingCount={course.ratingCount}
                                            duration={course.duration}
                                            oldPrice={course.oldPrice}
                                            price={course.price}
                                            onSelect={(courseId) => handleSelectCourse(courseId)}
                                            onRemove={(courseId) => handleRemoveCourse(courseId)}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-lg p-6 shadow-sm h-fit sticky top-8">
                        <h2 className="text-lg font-bold mb-6">Order Summary</h2>

                        <div className="space-y-4 pb-4">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal:</span>
                                <span>${countTotalPrice().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Discount:</span>
                                <span>${countDiscount().toLocaleString()}</span>
                            </div>
                            <hr className="text-[rgba(0,0,0,0.1)] mb-5" />
                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                <span>Total:</span>
                                <span className="text-indigo-600">${(countTotalPrice() - countDiscount()).toLocaleString()}</span>
                            </div>
                        </div>

                        <CustomButton>
                            Checkout →
                        </CustomButton>

                        <hr className="text-[rgba(0,0,0,0.1)] mb-5 mt-5" />

                        <div className="mb-6">
                            <p className="text-sm text-gray-600 mb-2">Have a coupon?</p>
                            <div className="relative">
                                {/* <input
                                    type="text"
                                    placeholder="Enter code"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-600"
                                /> */}
                                <CustomInputField
                                    initValue={couponInput}
                                    placeholder="Enter Code"
                                    onValueChange={(event) => setCouponInput(event.target.value)}
                                />
                                <Tag className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🏷</Tag>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 text-sm">
                            <p className="font-semibold text-gray-900 mb-1">30-Day Money-Back Guarantee</p>
                            <p className="text-gray-600">Full refund if you're not satisfied</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}