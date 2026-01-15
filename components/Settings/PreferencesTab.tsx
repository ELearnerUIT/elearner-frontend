'use client';

import { useState } from 'react';
import CustomDropdown from '@/components/shared/CustomDropdown';
import ToggleSwitch from '@/components/shared/ToggleSwitch';
import { CustomButton } from '@/components/shared/CustomButton';

export default function PreferencesTab() {
    const [language, setLanguage] = useState('English');
    const [timezone, setTimezone] = useState('Eastern Time (ES)');
    const [autoPlayNextLesson, setAutoPlayNextLesson] = useState(true);
    const [showSubtitlesByDefault, setShowSubtitlesByDefault] = useState(false);
    const [videoQuality, setVideoQuality] = useState('Auto');

    const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];
    const timezones = ['Eastern Time (EST)', 'Central Time (CST)', 'Mountain Time (MST)', 'Pacific Time (PST)', 'GMT'];
    const videoQualities = ['Auto', '1080p', '720p', '480p', '360p'];

    const handleSavePreferences = () => {
        alert("Preferences saved")
    };

    const handleDeleteAccount = () => {
        alert("Account deleted")
    };

    const selectLanguage = (language: string) => {
        setLanguage(language);
    };

    return (
        <div className="space-y-8">
            {/* Language & Region Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Language & Region</h2>
                <p className="text-gray-600 text-sm mb-6">Set your language and regional preferences</p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <CustomDropdown
                            options={languages}
                            value={language}
                            onSelectedChanged={(value) => setLanguage(value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                        <CustomDropdown
                            options={timezones}
                            value={timezone}
                            onSelectedChanged={(value) => setTimezone(value)}
                        />
                    </div>
                </div>

                <button
                    onClick={handleSavePreferences}
                    className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                    Save Preferences
                </button>
            </div>

            {/* Learning Preferences Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">Learning Preferences</h2>
                <p className="text-gray-600 text-sm mb-6">Customize your learning experience</p>

                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium text-gray-900">Auto-play next lesson</p>
                            <p className="text-gray-600 text-sm">Automatically start the next lesson when one finishes</p>
                        </div>
                        <ToggleSwitch
                            checked={autoPlayNextLesson}
                            onChange={setAutoPlayNextLesson}
                        />
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium text-gray-900">Show subtitles by default</p>
                            <p className="text-gray-600 text-sm">Display subtitles when watching video lessons</p>
                        </div>
                        <ToggleSwitch
                            checked={showSubtitlesByDefault}
                            onChange={setShowSubtitlesByDefault}
                        />
                    </div>

                    <div className="py-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Video Quality</label>
                        <CustomDropdown
                            options={videoQualities}
                            value={videoQuality}
                            onSelectedChanged={(value) => setVideoQuality(value)}
                        />
                    </div>
                </div>
            </div>

            {/* Danger Zone Section */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2 text-red-600">Danger Zone</h2>
                <p className="text-gray-600 text-sm mb-4">Irreversible and destructive actions</p>

                <div className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">Delete Account</p>
                            <p className="text-gray-600 text-sm">Permanently delete your account and all data</p>
                        </div>
                        <button
                            onClick={handleDeleteAccount}
                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}