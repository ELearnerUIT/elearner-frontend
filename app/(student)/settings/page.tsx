'use client';

import ProfileTab from '@/components/Settings/ProfileTab';
import { useState } from 'react';

export default function Settings() {
    const [activeTab, setActiveTab] = useState("Profile");

    // const [formData, setFormData] = useState({
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     email: 'john.doe@example.com',
    //     username: 'johndoe',
    //     bio: '',
    // });

    const tabs = [
        "Profile",
        "Security",
        "Notifications",
        "Preferences"
    ]

    return (
        <div className="min-h-screen bg-[rgb(250,250,250)] py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-medium text-black">Account Settings</h1>
                    <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="flex h-10 px-1 justify-center items-center bg-[rgb(243,244,246)] rounded-2xl">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 h-8 rounded-xl align-middle text-center font-medium transition-colors ${activeTab === tab
                                    ? 'bg-white'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-8 mt-5 bg-white rounded-2xl border-2 border-gray-100">
                        {/* Profile Tab */}
                        {activeTab === "Profile" &&
                            <ProfileTab />
                        }

                        {/* Security Tab */}
                        {activeTab === 'security' && (
                            <div className="text-center py-8">
                                <p className="text-gray-600">Security settings coming soon...</p>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div className="text-center py-8">
                                <p className="text-gray-600">Notifications settings coming soon...</p>
                            </div>
                        )}

                        {/* Preferences Tab */}
                        {activeTab === 'preferences' && (
                            <div className="text-center py-8">
                                <p className="text-gray-600">Preferences settings coming soon...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}