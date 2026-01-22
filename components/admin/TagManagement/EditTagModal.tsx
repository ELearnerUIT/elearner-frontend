import React from "react";
import { X } from "lucide-react";
import { ButtonColor, CustomButton } from "@/components/shared/CustomButton";
import CustomInputField from "@/components/shared/CustomInputField";
import { Tag } from "@/lib/api";

interface EditTagModalProps {
    isOpen: boolean;
    onClose: () => void;
    tag: Tag | null;
    errors: {
        name: string;
    };
    isUpdating: boolean;
    onTagChange: (tag: Tag) => void;
    onErrorsChange: (errors: { name: string }) => void;
    onUpdate: () => void;
}

export default function EditTagModal({
    isOpen,
    onClose,
    tag,
    errors,
    isUpdating,
    onTagChange,
    onErrorsChange,
    onUpdate,
}: EditTagModalProps) {
    if (!isOpen || !tag) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Edit Tag
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tag Name *
                        </label>
                        <CustomInputField
                            placeholder="e.g., JavaScript"
                            initValue={tag.name}
                            errorMessage={errors.name}
                            onValueChange={(e) =>
                                onTagChange({
                                    ...tag,
                                    name: e.target.value,
                                })
                            }
                            onValidate={() => {
                                if (!tag.name.trim()) {
                                    onErrorsChange({
                                        name: "Tag name is required",
                                    });
                                } else {
                                    onErrorsChange({
                                        name: "",
                                    });
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium"
                        disabled={isUpdating}
                    >
                        Cancel
                    </button>
                    <CustomButton
                        color={ButtonColor.PURPLE}
                        onClick={onUpdate}
                        enabled={!isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Update Tag"}
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}
