"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, Calendar, Camera, Save, X } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, useUpdateProfile } from "@/hooks/learner/useProfile";

interface UserProfile {
    id: number;
    username: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
    phone?: string;
    birthDate?: string;
    studentCode?: string;
    createdAt: string;
}

export default function ProfilePage() {
    const { user } = useAuth();
    const studentId = user?.profile?.studentId;

    // Fetch profile from backend
    const { data: profileData, isLoading: loading, error } = useProfile(studentId || 0);
    const updateProfileMutation = useUpdateProfile(studentId || 0);

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<UserProfile>>({});
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    // Map backend data to local profile state
    useEffect(() => {
        if (profileData?.profile) {
            const mappedProfile: UserProfile = {
                id: profileData.profile.id,
                username: profileData.profile.username,
                fullName: profileData.profile.fullName,
                email: profileData.profile.email,
                avatarUrl: profileData.profile.avatarUrl,
                bio: "", // Backend doesn't have bio field yet
                phone: profileData.profile.phone,
                birthDate: profileData.profile.birthday,
                studentCode: "", // Not in backend profile yet
                createdAt: profileData.profile.joinedAt,
            };
            setProfile(mappedProfile);
            setFormData(mappedProfile);
        }
    }, [profileData]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            // TODO: Upload to server
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateProfileMutation.mutateAsync({
                fullName: formData.fullName,
                phone: formData.phone,
                birthday: formData.birthDate,
                avatarUrl: avatarPreview || formData.avatarUrl,
            });

            // Update local state
            if (profile) {
                setProfile({ ...profile, ...formData });
            }
            setEditing(false);
            // TODO: Show success toast
            console.log("Profile updated successfully");
        } catch (error) {
            console.error("Failed to update profile:", error);
            // TODO: Show error toast
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData(profile!);
        setAvatarPreview(null);
        setEditing(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 animate-pulse">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-64"></div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                        <div className="flex items-center gap-6">
                            <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-48"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-64"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="mx-auto w-full max-w-4xl p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            My Profile
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">
                            Manage your account information
                        </p>
                    </div>
                    {!editing ? (
                        <button
                            onClick={() => setEditing(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleCancel}
                                disabled={saving}
                                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                                <X className="w-4 h-4 inline mr-1" />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                                <Save className="w-4 h-4 inline mr-1" />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Profile Card */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {/* Cover */}
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                    {/* Avatar & Basic Info */}
                    <div className="px-8 pb-8">
                        <div className="flex flex-col sm:flex-row gap-6 -mt-16">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden bg-slate-200 dark:bg-slate-800">
                                    <Image
                                        src={avatarPreview || profile.avatarUrl || "/images/avatars/default.jpg"}
                                        alt={profile.fullName}
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {editing && (
                                    <label className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors">
                                        <Camera className="w-5 h-5 text-white" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>

                            {/* Name & Email */}
                            <div className="flex-1 pt-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                    {profile.fullName}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">
                                    @{profile.username}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                                    Student Code: {profile.studentCode}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Form */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                        Personal Information
                    </h3>

                    <div className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <User className="w-4 h-4 inline mr-2" />
                                Full Name
                            </label>
                            {editing ? (
                                <input
                                    type="text"
                                    value={formData.fullName || ""}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your full name"
                                />
                            ) : (
                                <p className="px-4 py-2 text-slate-900 dark:text-slate-100">
                                    {profile.fullName}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <Mail className="w-4 h-4 inline mr-2" />
                                Email Address
                            </label>
                            <p className="px-4 py-2 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                {profile.email}
                                <span className="text-xs ml-2">(Cannot be changed)</span>
                            </p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <Phone className="w-4 h-4 inline mr-2" />
                                Phone Number
                            </label>
                            {editing ? (
                                <input
                                    type="tel"
                                    value={formData.phone || ""}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="+84 123 456 789"
                                />
                            ) : (
                                <p className="px-4 py-2 text-slate-900 dark:text-slate-100">
                                    {profile.phone || "Not provided"}
                                </p>
                            )}
                        </div>

                        {/* Birth Date */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <Calendar className="w-4 h-4 inline mr-2" />
                                Birth Date
                            </label>
                            {editing ? (
                                <input
                                    type="date"
                                    value={formData.birthDate || ""}
                                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="px-4 py-2 text-slate-900 dark:text-slate-100">
                                    {profile.birthDate
                                        ? new Date(profile.birthDate).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })
                                        : "Not provided"}
                                </p>
                            )}
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                About Me
                            </label>
                            {editing ? (
                                <textarea
                                    value={formData.bio || ""}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Tell us about yourself..."
                                    maxLength={500}
                                />
                            ) : (
                                <p className="px-4 py-2 text-slate-900 dark:text-slate-100">
                                    {profile.bio || "No bio provided"}
                                </p>
                            )}
                            {editing && (
                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                    {(formData.bio || "").length}/500 characters
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Account Info */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                        Account Information
                    </h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Username:</span>
                            <span className="font-medium text-slate-900 dark:text-slate-100">
                                {profile.username}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Student Code:</span>
                            <span className="font-medium text-slate-900 dark:text-slate-100">
                                {profile.studentCode}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Member Since:</span>
                            <span className="font-medium text-slate-900 dark:text-slate-100">
                                {new Date(profile.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
