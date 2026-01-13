'use client'

import { useState } from 'react'
import CourseCard from '@/components/Home/CourseCard'
import { ChevronDown, Sliders } from 'lucide-react'
import PaginationBar from '@/components/shared/PaginationBar'

export default function Courses() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [priceRange, setPriceRange] = useState(20)
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
    const [selectedRating, setSelectedRating] = useState<number | null>(null)
    const [sortBy, setSortBy] = useState('popular')
    // const [showFilters, setShowFilters] = useState(true)

    const categories = [
        "Web Development",
        "Data Science",
        "Business",
        "Design",
        "Marketing",
        "Photography"
    ];
    const levels = [
        "Beginner",
        "Intermediate",
        "Advanced",
        "All Levels"
    ];
    const ratings = [4.5, 4.8, 3.5, 3.8]

    // Mock course data
    const coursesData = [
        {
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
    ]

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl font-bold text-gray-900">All Courses</h1>
                    <p className="text-gray-600 mt-2">Explore {categories.length} categories and start learning today</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Filters */}
                    <div className={"lg:block lg:w-64 shrink-0"}>
                        <div className="bg-white rounded-lg p-6 shadow-sm sticky top-8">
                            {/* Filters Header */}
                            <div className="flex items-center gap-2 mb-6">
                                <Sliders className="w-5 h-5 text-gray-700" />
                                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-8 pb-8 border-b">
                                <h3 className="font-semibold text-gray-900 mb-4">Category</h3>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategory === cat}
                                                onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                                            />
                                            <span className="text-gray-700 group-hover:text-gray-900">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range Filter */}
                            <div className="mb-8 pb-8 border-b">
                                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-gray-600">$0</span>
                                    <span className="text-sm text-gray-600">${priceRange}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                            </div>

                            {/* Level Filter */}
                            <div className="mb-8 pb-8 border-b">
                                <h3 className="font-semibold text-gray-900 mb-4">Level</h3>
                                <div className="space-y-2">
                                    {levels.map((level) => (
                                        <label key={level} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedLevel === level}
                                                onChange={() => setSelectedLevel(selectedLevel === level ? null : level)}
                                                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                                            />
                                            <span className="text-gray-700 group-hover:text-gray-900">{level}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div className="mb-8 pb-8 border-b">
                                <h3 className="font-semibold text-gray-900 mb-4">Rating</h3>
                                <div className="space-y-2">
                                    {ratings.map((rating) => (
                                        <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedRating === rating}
                                                onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                                                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                                            />
                                            <span className="text-gray-700 group-hover:text-gray-900">{rating} & up</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters Button */}
                            <button
                                onClick={() => {
                                    setSelectedCategory(null)
                                    setPriceRange(20)
                                    setSelectedLevel(null)
                                    setSelectedRating(null)
                                }}
                                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Top Bar - Results & Sort */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                            <div className="mb-4 sm:mb-0">
                                <p className="text-gray-600">Showing {coursesData.length} results</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Sort by:</span>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-900 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="popular">Most Popular</option>
                                        <option value="newest">Newest</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Highest Rated</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Courses Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {coursesData.map((course, index) => (
                                <CourseCard
                                    key={index}
                                    {...course}
                                />
                            ))}
                        </div>
                        <div className='w-full flex mt-5 mb-5 items-center justify-center'>
                            <PaginationBar />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Filters Toggle Button */}
            {/* <div className="fixed bottom-4 right-4 lg:hidden">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
                >
                    <Sliders className="w-5 h-5" />
                    {showFilters ? 'Hide' : 'Show'} Filters
                </button>
            </div> */}
        </div >
    )
}