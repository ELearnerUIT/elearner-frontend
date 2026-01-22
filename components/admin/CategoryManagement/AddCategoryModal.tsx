import React from "react";
import { X, Plus } from "lucide-react";
import { ButtonColor, CustomButton } from "@/components/shared/CustomButton";
import CustomInputField from "@/components/shared/CustomInputField";
import CustomTextArea from "@/components/shared/CustomTextArea";
import ToggleSwitch from "@/components/shared/ToggleSwitch";

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryData: {
        name: string;
        description: string;
        visible: boolean;
    };
    errors: {
        name: string;
        description: string;
    };
    isCreating: boolean;
    onCategoryDataChange: (data: {
        name: string;
        description: string;
        visible: boolean;
    }) => void;
    onErrorsChange: (errors: { name: string; description: string }) => void;
    onCreate: () => void;
}

export default function AddCategoryModal({
    isOpen,
    onClose,
    categoryData,
    errors,
    isCreating,
    onCategoryDataChange,
    onErrorsChange,
    onCreate,
}: AddCategoryModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Add New Category
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
                            Category Name *
                        </label>
                        <CustomInputField
                            placeholder="e.g., Web Development"
                            initValue={categoryData.name}
                            errorMessage={errors.name}
                            onValueChange={(e) =>
                                onCategoryDataChange({
                                    ...categoryData,
                                    name: e.target.value,
                                })
                            }
                            onValidate={() => {
                                if (!categoryData.name.trim()) {
                                    onErrorsChange({
                                        ...errors,
                                        name: "Category name is required",
                                    });
                                } else {
                                    onErrorsChange({
                                        ...errors,
                                        name: "",
                                    });
                                }
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <CustomTextArea
                            placeholder="Describe this category..."
                            initValue={categoryData.description}
                            errorMessage={errors.description}
                            rows={4}
                            onValueChange={(e) =>
                                onCategoryDataChange({
                                    ...categoryData,
                                    description: e.target.value,
                                })
                            }
                            onValidate={() => {
                                if (!categoryData.description.trim()) {
                                    onErrorsChange({
                                        ...errors,
                                        description: "Description is required",
                                    });
                                } else {
                                    onErrorsChange({
                                        ...errors,
                                        description: "",
                                    });
                                }
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Category Visibility
                            </label>
                            <p className="text-sm text-gray-500">
                                Make this category visible to users
                            </p>
                        </div>
                        <ToggleSwitch
                            checked={categoryData.visible}
                            onChange={(checked) =>
                                onCategoryDataChange({
                                    ...categoryData,
                                    visible: checked,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium"
                        disabled={isCreating}
                    >
                        Cancel
                    </button>
                    <CustomButton
                        color={ButtonColor.PURPLE}
                        onClick={onCreate}
                        enabled={!isCreating}
                    >
                        {isCreating ? "Creating..." : "Create Category"}
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}
