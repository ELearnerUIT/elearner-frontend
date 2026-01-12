'use client'
import { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, Circle } from 'lucide-react';

export default function ChapterDropdown(
    {
        title = "Chapter title",
        lectures = [
            { title: "What is HTML", duration: 36000 },
            { title: "What is CSS", duration: 30000 },
            { title: "What is JavaScript", duration: 40000 }
        ]
    }
) {
    const [expandedChapter, setExpandedChapter] = useState(false)
    const expandChapter = () => {
        setExpandedChapter(!expandedChapter)
    }
    const lecturesCount = lectures.length
    const convertDuration = (duration: number) => {
        const minutes = Math.floor(duration / 60);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        console.log("Minutes: ", minutes, " Hours: ", hours, " Remaining Minutes: ", remainingMinutes)
        return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`
    }

    return (
        <div>
            <div
                className="rounded-2xl border border-gray-300 px-4 cursor-pointer transition-all duration-300 ease-in-out"
            >
                <div className="flex items-center justify-between h-15" onClick={() => expandChapter()}>
                    <div className="grid grid-cols-3 items-center gap-3 w-full">
                        <div className="col-span-2 flex flex-row items-start gap-3">
                            <span className="text-gray-400">
                                {expandedChapter ? <ChevronDown /> : <ChevronRight />}
                            </span>
                            <span className="font-medium">{title}</span>
                        </div>
                        <div className="w-full flex justify-end">
                            <span className="flex text-black text-sm">{lecturesCount} lectures</span>
                        </div>

                    </div>
                </div>
                {expandedChapter && (
                    <div className="p-4 space-y-3">
                        {
                            lectures.map((lecture, index) => {
                                return (
                                    <div key={index} className="grid grid-cols-3 rounded-2xl bg-white hover:bg-gray-300 border-gray-300 py-4 px-2 items-center gap-3 text-black transition cursor-pointer">
                                        <span className="col-span-2 flex flex-row items-center">
                                            <Circle size={15} className="mr-3 text-gray-500" />
                                            {lecture.title}
                                        </span>
                                        <div className="flex justify-end items-center col-span-1 gap-3">
                                            <Clock size={20} className="text-gray-500" />
                                            <span className="text-gray-500 mr-5">{convertDuration(lecture.duration)}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
            </div>

        </div>
    )
}