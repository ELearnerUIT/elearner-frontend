"use client";

import { useState } from "react";
import { UserRole } from "@/services/auth/auth.types";
import { GraduationCap, Users } from "lucide-react";

interface RoleSelectionModalProps {
    open: boolean;
    onSelectRole: (role: UserRole) => void;
    onClose: () => void;
}

export function RoleSelectionModal({
    open,
    onSelectRole,
    onClose,
}: RoleSelectionModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4">
                <h2 className="text-xl font-semibold mb-2">Choose Your Role</h2>
                <p className="text-sm text-slate-400 mb-6">
                    Select how you want to use the platform
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => onSelectRole("STUDENT")}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-slate-800/40 hover:bg-slate-800/70 transition text-left"
                    >
                        <div className="p-2 rounded-lg bg-blue-500/20">
                            <GraduationCap className="size-6 text-blue-400" />
                        </div>
                        <div>
                            <div className="font-medium">Student</div>
                            <div className="text-sm text-slate-400">
                                Learn and take courses
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => onSelectRole("TEACHER")}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-slate-800/40 hover:bg-slate-800/70 transition text-left"
                    >
                        <div className="p-2 rounded-lg bg-green-500/20">
                            <Users className="size-6 text-green-400" />
                        </div>
                        <div>
                            <div className="font-medium">Teacher</div>
                            <div className="text-sm text-slate-400">
                                Create and teach courses
                            </div>
                        </div>
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-4 py-2 text-sm text-slate-400 hover:text-white transition"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
