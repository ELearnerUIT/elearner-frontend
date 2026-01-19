'use client'

import { useState } from 'react'
import CourseCard from '@/components/Home/CourseCard'
import { ChevronDown, Sliders } from 'lucide-react'
import PaginationBar from '@/components/shared/PaginationBar'
import CustomInputField, { InputFieldIcon } from '@/components/shared/CustomInputField'
import CheckboxList from '@/components/shared/CheckboxList'
import CustomDropdown from '@/components/shared/CustomDropdown'

export default function Courses() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [minPrice, setMinPrice] = useState(0)
    const [minPriceError, setMinPriceError] = useState("")
    const [maxPriceError, setMaxPriceError] = useState("")
    const [maxPrice, setMaxPrice] = useState(200)
    const [selectedLevels, setSelectedLevels] = useState<string[]>([])
    const [selectedRatings, setSelectedRatings] = useState<string[]>([])
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
    const ratings = ["5 stars", "4 stars", "3 stars", "2 stars", "1 star"]

    const sortCriteria = [
        "Most Popular",
        "Newest",
        "Price: Low to High",
        "Price: High to Low",
        "Highest Rated"

    ]

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

    // Used to display courses
    const numberOfCoursesPerPage = 2;
    const [pageIndex, setPageIndex] = useState(0);
    const getCurrentPageCourses = () => {
        const startIndex = Math.max(pageIndex * numberOfCoursesPerPage, 0);
        const endIndex = Math.min(startIndex + numberOfCoursesPerPage, coursesData.length - 1);
        let result = []
        for (let i = startIndex; i < endIndex; i++) {
            if (i < coursesData.length) {
                result.push(coursesData[i]);
            }
        }
        return result;
    }
    const currentPageCourses = getCurrentPageCourses();

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl font-medium text-black">All Courses</h1>
                    <p className="text-xl font-normal text-gray-600 mt-2">Explore {categories.length} categories and start learning today</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Filters */}
                    <div className={"lg:block lg:w-80 shrink-0"}>
                        <div className="bg-white rounded-lg p-6 shadow-sm sticky top-8">
                            {/* Filters Header */}
                            <div className="flex items-center gap-2 mb-3">
                                <Sliders className="w-5 h-5 text-gray-700" />
                                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                            </div>
                            <hr className='mb-3 text-[rgba(0,0,0,0.1)] h-2' />

                            {/* Category Filter */}
                            <div className="pb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">Category</h3>
                                <CheckboxList
                                    options={categories}
                                    selectedValues={selectedCategories}
                                    onSelectedValueChanged={(values) => { setSelectedCategories(values); }}
                                />
                            </div>
                            <hr className='mb-3 text-[rgba(0,0,0,0.1)] h-2' />

                            {/* Price Range Filter */}
                            <div className="pb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <CustomInputField
                                        placeholder="From"
                                        initValue={minPrice.toLocaleString()}
                                        icon={InputFieldIcon.DOLLAR}
                                        errorMessage={minPriceError}
                                        onValueChange={(event) => {
                                            if (!Number.isNaN(Number(event.target.value))) {
                                                setMinPrice(Number(event.target.value))
                                            }
                                        }}
                                        onValidate={(event) => {
                                            if (!Number.isNaN(Number(event.target.value)) && Number(event.target.value) > maxPrice) setMinPriceError("Invalid price range!")
                                            else { setMinPriceError(""); setMaxPriceError("") }
                                        }}
                                    />
                                    <CustomInputField
                                        placeholder="To"
                                        initValue={maxPrice.toLocaleString()}
                                        icon={InputFieldIcon.DOLLAR}
                                        errorMessage={maxPriceError}
                                        onValueChange={(event) => {
                                            if (!Number.isNaN(Number(event.target.value))) {
                                                setMaxPrice(Number(event.target.value))
                                            }
                                        }}
                                        onValidate={(event) => {
                                            console.log("min: ", minPrice, " max: ", Number(event.target.value))
                                            if (!Number.isNaN(Number(event.target.value)) && Number(event.target.value) < minPrice) setMaxPriceError("Invalid price range!")
                                            else { setMinPriceError(""); setMaxPriceError("") }
                                        }}
                                    />
                                </div>
                            </div>
                            <hr className='mb-3 text-[rgba(0,0,0,0.1)] h-2' />

                            {/* Level Filter */}
                            <div className="pb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">Level</h3>
                                <CheckboxList
                                    options={levels}
                                    selectedValues={selectedLevels}
                                    onSelectedValueChanged={(values) => { setSelectedLevels(values); }}
                                />
                            </div>
                            <hr className='mb-3 text-[rgba(0,0,0,0.1)] h-2' />

                            {/* Rating Filter */}
                            <div className="pb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">Rating</h3>
                                <CheckboxList
                                    options={ratings}
                                    selectedValues={selectedRatings}
                                    onSelectedValueChanged={(values) => { setSelectedRatings(values); console.log(values) }}
                                />
                            </div>
                            <hr className='mb-3 text-[rgba(0,0,0,0.1)] h-2' />

                            {/* Clear Filters Button */}
                            <button
                                onClick={() => {
                                    setSelectedCategories([])
                                    setMinPrice(0)
                                    setMaxPrice(2000)
                                    setSelectedLevels([])
                                    setSelectedRatings([])
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
                                <CustomDropdown
                                    value={sortBy}
                                    options={sortCriteria}
                                    onSelectedChanged={(value) => { setSortBy(value) }}
                                />
                            </div>
                        </div>

                        {/* Courses Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {currentPageCourses.map((course, index) => (
                                <CourseCard
                                    key={index}
                                    {...course}
                                />
                            ))}
                        </div>
                        <div className='w-full flex mt-5 mb-5 items-center justify-center'>
                            <PaginationBar
                                pageIndex={pageIndex}
                                totalPageCount={Math.ceil(coursesData.length / numberOfCoursesPerPage)}
                                maxPageShown={6}
                                onSelectedPageChanged={(index) => setPageIndex(index)}
                            />
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