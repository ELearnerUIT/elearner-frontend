'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Eye, Check, X, DollarSign, TrendingUp, TrendingDown, MoveUpRight, MoveDownRight } from 'lucide-react';
import { ButtonColor, CustomButton } from '@/components/shared/CustomButton';
import CustomInputField, { InputFieldIcon } from '@/components/shared/CustomInputField';

interface Finance {
    id: number;
    type: "Payment" | "Payout" | "Refund";
    description: string;
    user: string;
    amount: number;
    dateTime: string;
    status: 'Completed' | 'Pending';
}

const financeData: Finance[] = [
    {
        id: 1,
        type: "Payment",
        description: "Payment for course",
        user: "John Doe",
        amount: 150.00,
        dateTime: "Nov 12, 2026",
        status: "Completed",
    },
    {
        id: 2,
        type: "Payment",
        description: "Payment for course",
        user: "Halley Ann",
        amount: 150.00,
        dateTime: "Nov 12, 2026",
        status: "Pending",
    },
    {
        id: 3,
        type: "Payout",
        description: "Payment for course",
        user: "John Doe",
        amount: 150.00,
        dateTime: "Nov 12, 2026",
        status: "Completed",
    },
    {
        id: 4,
        type: "Refund",
        description: "Student refund",
        user: "John Doe",
        amount: 150.00,
        dateTime: "Nov 12, 2026",
        status: "Completed",
    }
];

export default function Finance() {

    const totalIncome = 487239;
    const changesTotalIncome = 12.5;
    const pendingPayouts = 94320;
    const teachersWaiting = 18;
    const totalRefunds = 12847;
    const refundPercentage = 2.3;

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const getTypeIcon = (type: "Payment" | "Payout" | "Refund") => {
        switch (type) {
            case "Payment":
                return (
                    <div className="h-10 w-10 flex rounded-xl items-center justify-center bg-[rgb(209,250,229)] text-[rgb(16,185,129)]">
                        <MoveUpRight />
                    </div>
                )
            case "Payout":
                return (
                    <div className="h-10 w-10 flex rounded-xl items-center justify-center bg-[rgb(254,243,199)] text-[rgb(245,158,11)]">
                        <MoveDownRight />
                    </div>
                )
            case "Refund":
                return (
                    <div className="h-10 w-10 flex rounded-xl items-center justify-center bg-[rgb(254,199,199)] text-[rgb(255,0,0)]">
                        <MoveDownRight />
                    </div>
                )
            default:
        }
    }

    const getStatusStyles = (status: "Completed" | "Pending") => {
        switch (status) {
            case 'Completed':
                return 'bg-gray-900 text-white';
            case 'Pending':
                return 'bg-gray-200 text-gray-700';
            default:
                return 'bg-gray-200';
        }
    };

    const handleViewCourse = (courseId: number) => {
        console.log('View course:', courseId);
    };

    const handleApproveCourse = (courseId: number) => {
        console.log('Approve course:', courseId);
    };

    const handleRejectCourse = (courseId: number) => {
        console.log('Reject course:', courseId);
    };

    const handleSearch = () => {
        alert("Search from: " + fromDate + " to: " + toDate)
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-medium text-gray-900 mb-2">Finance & Transactions</h1>
                <p className="text-gray-600">Track all financial activities on the platform</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/*Total Income Card*/}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[rgb(113,113,130)] text-xl font-normal">Total Income</p>
                            <p className="text-2xl font-medium text-gray-900 mt-2">${totalIncome.toLocaleString()}</p>
                            <p className={"text-base mt-2" + (changesTotalIncome >= 0 ? ' text-green-500' : ' text-red-500')}>{changesTotalIncome >= 0 ? '+' : '-'}{changesTotalIncome}% from last month</p>
                        </div>
                        <div className={`bg-[rgb(209,250,229)] text-[rgb(16,185,129)] w-12 h-12 rounded-lg flex items-center justify-center text-xl`}>
                            <TrendingUp />
                        </div>
                    </div>
                </div>

                {/*Pending Payouts Card*/}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[rgb(113,113,130)] text-xl font-normal">Pending Payouts</p>
                            <p className="text-2xl font-medium text-gray-900 mt-2">${pendingPayouts.toLocaleString()}</p>
                            <p className={"text-base mt-2 text-[rgb(113,113,130)]"}>{teachersWaiting.toLocaleString()} teachers waiting</p>
                        </div>
                        <div className={`bg-[rgb(254,243,199)] text-[rgb(245,158,11)] w-12 h-12 rounded-lg flex items-center justify-center text-xl`}>
                            <DollarSign />
                        </div>
                    </div>
                </div>

                {/*Total Refunds Card*/}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[rgb(113,113,130)] text-xl font-normal">Total Refunds</p>
                            <p className="text-2xl font-medium text-gray-900 mt-2">${totalRefunds.toLocaleString()}</p>
                            <p className={"text-base mt-2" + (refundPercentage > 0 ? ' text-red-500' : 'text-green-500')}>{refundPercentage}% of total income</p>
                        </div>
                        <div className={`bg-[rgb(254,199,199)] text-[rgb(255,0,0)] w-12 h-12 rounded-lg flex items-center justify-center text-xl`}>
                            <TrendingDown />
                        </div>
                    </div>
                </div>

            </div>

            <div className="p-6 bg-white rounded-lg shadow">
                {/* Search and Filter Section */}
                <div className="mb-8 flex gap-4 items-center justify-start w-full">
                    <div className="justify-center">
                        From:
                        <input
                            type="datetime-local"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className=" mx-6 border-2 h-10 p-4 border-transparent rounded-xl bg-[rgb(243,243,245)] hover:border-[rgb(99,102,241)]"
                        />
                        To:
                        <input
                            type="datetime-local"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className=" mx-6 border-2 h-10 p-4 border-transparent rounded-xl bg-[rgb(243,243,245)] hover:border-[rgb(99,102,241)]"
                        />

                    </div>
                    <CustomButton
                        color={ButtonColor.PURPLE}
                        width="w-15"
                        onClick={() => handleSearch()}
                    >
                        <Search />
                    </CustomButton>
                </div>

                {/* Finance Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Type</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Description</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">User</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Amount</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Date & Time</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {financeData.map((finance) => (
                                <tr key={finance.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="py-4 px-4 flex flex-row items-center">
                                        {getTypeIcon(finance.type)}
                                        <div className="text-base text-black ml-2">{finance.type}</div>
                                    </td>
                                    <td className="py-4 px-4 text-gray-700">{finance.description}</td>
                                    <td className="py-4 px-4 text-gray-700">{finance.user}</td>
                                    <td className={"py-4 px-4 " + (finance.type === "Payment" ? "text-green-500" : "text-red-500")}>${finance.amount.toLocaleString()}</td>
                                    <td className="py-4 px-4 text-gray-700">{finance.dateTime}</td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(finance.status)}`}>
                                            {finance.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {financeData.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No finance data found.
                    </div>
                )}
            </div>


        </div>
    );
}