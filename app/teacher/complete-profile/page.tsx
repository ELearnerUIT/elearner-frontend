"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Loader2,
    CheckCircle,
    AlertCircle,
    User,
    BookOpen,
    GraduationCap,
    FileText,
    Phone,
    Calendar,
} from "lucide-react";
import { getAccessToken, logout } from "@/lib/auth";
import { apiRequest, ApiResponse } from "@/lib/api";
import CustomInputField, {
    InputFieldIcon,
} from "@/components/shared/CustomInputField";
import { ButtonColor, CustomButton } from "@/components/shared/CustomButton";

interface TeacherProfile {
    studentId: number | null;
    teacherId: number;
    studentCode: string | null;
    teacherCode: string;
    fullName: string;
    phone: string;
    birthDate: string;
    bio: string;
    gender: string;
    specialty: string;
    degree: string;
    approved: boolean;
    approvedBy: number | null;
    approvedAt: string | null;
    rejectionReason: string | null;
    createdAt: string;
    updatedAt: string;
}

interface UserInfo {
    accountId: number;
    username: string;
    email: string;
    lastLoginAt: string;
    role: string;
    status: string;
    avatarUrl: string;
    profile: TeacherProfile | null;
}

export default function CompleteProfilePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        birthDate: "",
        bio: "",
        gender: "MALE",
        specialty: "",
        degree: "",
    });

    const [errors, setErrors] = useState({
        fullName: "",
        phone: "",
        birthDate: "",
        bio: "",
        gender: "",
        specialty: "",
        degree: "",
    });

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const token = getAccessToken();
            const response: ApiResponse<UserInfo> = await apiRequest(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/accounts/me`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.success && response.data) {
                setUserInfo(response.data);

                if (response.data.profile) {
                    setFormData({
                        fullName: response.data.profile.fullName || "",
                        phone: response.data.profile.phone || "",
                        birthDate: response.data.profile.birthDate || "",
                        bio: response.data.profile.bio || "",
                        gender: response.data.profile.gender || "MALE",
                        specialty: response.data.profile.specialty || "",
                        degree: response.data.profile.degree || "",
                    });
                }

                if (response.data.status === "ACTIVE") {
                    router.push("/teacher/dashboard");
                }
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            setErrorMessage("Failed to load your profile information.");
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {
            fullName: "",
            phone: "",
            birthDate: "",
            bio: "",
            gender: "",
            specialty: "",
            degree: "",
        };
        let isValid = true;

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
            isValid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
            isValid = false;
        }

        if (!formData.birthDate.trim()) {
            newErrors.birthDate = "Birth date is required";
            isValid = false;
        }

        if (
            !formData.gender ||
            !["MALE", "FEMALE", "OTHER"].includes(formData.gender)
        ) {
            newErrors.gender = "Gender is required";
            isValid = false;
        }

        if (!formData.bio.trim()) {
            newErrors.bio = "Bio is required";
            isValid = false;
        }

        if (!formData.specialty.trim()) {
            newErrors.specialty = "Specialty is required for approval";
            isValid = false;
        }

        if (!formData.degree.trim()) {
            newErrors.degree = "Degree is required for approval";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSaveProfile = async () => {
        if (!validateForm()) return;

        setIsSaving(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const token = getAccessToken();
            const response = await apiRequest(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/accounts/me`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                },
            );

            if (response.success) {
                setSuccessMessage("Profile saved successfully!");
                await fetchUserInfo();
                return true;
            } else {
                setErrorMessage(response.message || "Failed to save profile");
                return false;
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            setErrorMessage("Failed to save profile. Please try again.");
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    const handleRequestApproval = async () => {
        if (!validateForm()) {
            setErrorMessage(
                "Please fill in all required fields before requesting approval.",
            );
            return;
        }

        setIsRequesting(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const token = getAccessToken();

            const saved = await handleSaveProfile();

            if (!saved) {
                setIsRequesting(false);
                return;
            }

            if (!userInfo?.profile?.teacherId) {
                setErrorMessage("Teacher profile not found. Please try again.");
                setIsRequesting(false);
                return;
            }

            const response = await apiRequest(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/teachers/${userInfo.profile.teacherId}/request-approval`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.success) {
                setSuccessMessage(
                    "Approval request submitted successfully! Logging you out...",
                );
                setTimeout(() => {
                    handleLogout();
                }, 3000);
            } else {
                setErrorMessage(
                    response.message || "Failed to request approval",
                );
            }
        } catch (error) {
            console.error("Error requesting approval:", error);
            setErrorMessage("Failed to request approval. Please try again.");
        } finally {
            setIsRequesting(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-block px-4 py-2 mb-4 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                            Profile Incomplete
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Complete Your Instructor Profile
                        </h1>
                        <p className="text-gray-600">
                            Fill in your teaching credentials to request account
                            approval from our admin team.
                        </p>
                    </div>

                    {/* Messages */}
                    {errorMessage && (
                        <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {errorMessage}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-600 text-sm flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            {successMessage}
                        </div>
                    )}

                    {/* Form */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                                        errors.fullName
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            fullName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            {errors.fullName && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.fullName}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                                            errors.phone
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        placeholder="+1234567890"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Birth Date *
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="date"
                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                                            errors.birthDate
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        value={formData.birthDate}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                birthDate: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                {errors.birthDate && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.birthDate}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender *
                            </label>
                            <div className="flex gap-4">
                                {["MALE", "FEMALE", "OTHER"].map((gender) => (
                                    <label
                                        key={gender}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={gender}
                                            checked={formData.gender === gender}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    gender: e.target.value,
                                                })
                                            }
                                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-sm text-gray-700">
                                            {gender.charAt(0) +
                                                gender.slice(1).toLowerCase()}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.gender && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.gender}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Specialty / Area of Expertise *
                            </label>
                            <div className="relative">
                                <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                                        errors.specialty
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="e.g., Web Development, Data Science, UI/UX Design"
                                    value={formData.specialty}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            specialty: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            {errors.specialty && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.specialty}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Highest Degree *
                            </label>
                            <div className="relative">
                                <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                                        errors.degree
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="e.g., Bachelor's in Computer Science, Master's in Education"
                                    value={formData.degree}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            degree: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            {errors.degree && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.degree}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Professional Bio *
                            </label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <textarea
                                    className={`w-full pl-10 pt-3 pr-4 pb-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none min-h-[120px] text-sm ${
                                        errors.bio
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="Tell us about your teaching experience, background, and what makes you a great instructor..."
                                    value={formData.bio}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            bio: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            {errors.bio && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.bio}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleSaveProfile}
                            disabled={isSaving}
                            className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSaving && (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            )}
                            {isSaving ? "Saving..." : "Save for Later"}
                        </button>

                        <button
                            onClick={handleRequestApproval}
                            disabled={isRequesting || isSaving}
                            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isRequesting && (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            )}
                            {isRequesting
                                ? "Submitting..."
                                : "Request Approval"}
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            onClick={handleLogout}
                            className="text-sm text-gray-600 hover:text-gray-900 underline"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
