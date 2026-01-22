import { X } from "lucide-react";
import { ButtonColor, CustomButton } from "@/components/shared/CustomButton";
import CustomInputField from "@/components/shared/CustomInputField";
import CustomTextArea from "@/components/shared/CustomTextArea";
import ToggleSwitch from "@/components/shared/ToggleSwitch";

interface Category {
    id: number;
    name: string;
    code: string | null;
    description: string;
    visible: boolean;
    parentId: number | null;
    deletedAt: string | null;
    children: Category[];
    slug: string;
    metaTitle: string;
    metaDescription: string;
    thumbnailUrl: string | null;
}

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: Category | null;
    errors: {
        name: string;
        description: string;
    };
    isUpdating: boolean;
    onCategoryChange: (category: Category) => void;
    onErrorsChange: (errors: { name: string; description: string }) => void;
    onUpdate: () => void;
}

export default function EditCategoryModal({
    isOpen,
    onClose,
    category,
    errors,
    isUpdating,
    onCategoryChange,
    onErrorsChange,
    onUpdate,
}: EditCategoryModalProps) {
    if (!isOpen || !category) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Edit Category
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
                            initValue={category.name}
                            errorMessage={errors.name}
                            onValueChange={(e) =>
                                onCategoryChange({
                                    ...category,
                                    name: e.target.value,
                                })
                            }
                            onValidate={() => {
                                if (!category.name.trim()) {
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
                            initValue={category.description}
                            errorMessage={errors.description}
                            rows={4}
                            onValueChange={(e) =>
                                onCategoryChange({
                                    ...category,
                                    description: e.target.value,
                                })
                            }
                            onValidate={() => {
                                if (!category.description.trim()) {
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
                            checked={category.visible}
                            onChange={(checked) =>
                                onCategoryChange({
                                    ...category,
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
                        disabled={isUpdating}
                    >
                        Cancel
                    </button>
                    <CustomButton
                        color={ButtonColor.PURPLE}
                        onClick={onUpdate}
                        enabled={!isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Update Category"}
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}
