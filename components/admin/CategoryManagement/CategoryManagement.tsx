"use client";

import React, { useState, useEffect } from "react";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Eye,
    FolderTree,
    X,
    RotateCcw,
    Trash,
} from "lucide-react";
import { ButtonColor, CustomButton } from "@/components/shared/CustomButton";
import CustomInputField, {
    InputFieldIcon,
} from "@/components/shared/CustomInputField";
import CustomTextArea from "@/components/shared/CustomTextArea";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { API_ENDPOINTS, apiRequest, ApiResponse } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";

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

export default function CategoryManagement() {
    const [searchInput, setSearchInput] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleted, setShowDeleted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null,
    );
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: "",
        visible: true,
    });
    const [errors, setErrors] = useState({
        name: "",
        description: "",
    });
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (showDeleted) {
            fetchDeletedCategories();
        } else {
            fetchCategories();
        }
    }, [showDeleted]);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const token = getAccessToken();
            const response: ApiResponse<Category[]> = await apiRequest(
                API_ENDPOINTS.CATEGORIES.GET_TREE,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.success && response.data) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDeletedCategories = async () => {
        setIsLoading(true);
        try {
            const token = getAccessToken();
            const response: ApiResponse<Category[]> = await apiRequest(
                API_ENDPOINTS.CATEGORIES.GET_DELETED,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.success && response.data) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Error fetching deleted categories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        alert("Search for: " + searchInput);
    };

    const handleAddCategory = () => {
        setNewCategory({
            name: "",
            description: "",
            visible: true,
        });
        setErrors({ name: "", description: "" });
        setShowAddModal(true);
    };

    const validateForm = () => {
        const newErrors = { name: "", description: "" };
        let isValid = true;

        if (!newCategory.name.trim()) {
            newErrors.name = "Category name is required";
            isValid = false;
        }

        if (!newCategory.description.trim()) {
            newErrors.description = "Description is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleCreateCategory = async () => {
        if (!validateForm()) return;

        setIsCreating(true);
        try {
            const token = getAccessToken();
            const response: ApiResponse<Category> = await apiRequest(
                API_ENDPOINTS.CATEGORIES.CREATE,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: newCategory.name,
                        description: newCategory.description,
                        visible: newCategory.visible,
                    }),
                },
            );

            if (response.success && response.data) {
                alert("Category created successfully!");
                setShowAddModal(false);
                fetchCategories();
            } else {
                alert(response.message || "Failed to create category");
            }
        } catch (error) {
            console.error("Error creating category:", error);
            alert("An error occurred while creating the category");
        } finally {
            setIsCreating(false);
        }
    };

    const handleRestoreCategory = async (categoryId: number) => {
        if (!confirm("Are you sure you want to restore this category?")) return;

        try {
            const token = getAccessToken();
            const response = await apiRequest(
                `${API_ENDPOINTS.CATEGORIES.RESTORE}/${categoryId}/restore`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.success) {
                alert("Category restored successfully");
                fetchDeletedCategories();
            }
        } catch (error) {
            console.error("Error restoring category:", error);
            alert("Failed to restore category");
        }
    };

    const handlePermanentDelete = async (categoryId: number) => {
        if (
            !confirm(
                "Are you sure you want to PERMANENTLY delete this category? This action cannot be undone!",
            )
        )
            return;

        try {
            const token = getAccessToken();
            const response = await apiRequest(
                `${API_ENDPOINTS.CATEGORIES.DELETE}/${categoryId}/permanent`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.success) {
                alert("Category permanently deleted");
                fetchDeletedCategories();
            }
        } catch (error) {
            console.error("Error permanently deleting category:", error);
            alert("Failed to permanently delete category");
        }
    };

    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category);
        setShowEditModal(true);
    };

    const handleDeleteCategory = async (categoryId: number) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        try {
            const token = getAccessToken();
            const response = await apiRequest(
                `${API_ENDPOINTS.CATEGORIES.DELETE}/${categoryId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.status === 204) {
                alert("Category deleted successfully");
                fetchCategories();
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Failed to delete category");
        }
    };

    const handleToggleVisibility = async (category: Category) => {
        try {
            const token = getAccessToken();
            const response = await apiRequest(
                `${API_ENDPOINTS.CATEGORIES.UPDATE}/${category.id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...category,
                        visible: !category.visible,
                    }),
                },
            );

            if (response.success) {
                fetchCategories();
            }
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const renderCategoryRow = (
        category: Category,
        level: number = 0,
    ): React.ReactNode => {
        return (
            <React.Fragment key={category.id}>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4">
                        <div
                            className="flex items-center gap-2"
                            style={{ paddingLeft: `${level * 24}px` }}
                        >
                            {level > 0 && (
                                <span className="text-gray-400">└─</span>
                            )}
                            {category.children.length > 0 && (
                                <FolderTree className="w-4 h-4 text-gray-400" />
                            )}
                            <span className="font-medium text-gray-900">
                                {category.name}
                            </span>
                        </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{category.slug}</td>
                    <td className="py-4 px-4">
                        <div className="text-sm text-gray-600 line-clamp-1">
                            {category.description}
                        </div>
                    </td>
                    <td className="py-4 px-4">
                        <button
                            onClick={() => handleToggleVisibility(category)}
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                category.visible
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {category.visible ? "Visible" : "Hidden"}
                        </button>
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                        {category.children.length} subcategories
                    </td>
                    <td className="py-4 px-4">
                        <div className="flex gap-3">
                            {showDeleted ? (
                                <>
                                    <button
                                        onClick={() =>
                                            handleRestoreCategory(category.id)
                                        }
                                        className="p-2 hover:bg-green-100 rounded-lg transition text-green-600"
                                        title="Restore category"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handlePermanentDelete(category.id)
                                        }
                                        className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                                        title="Permanently delete"
                                    >
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() =>
                                            handleEditCategory(category)
                                        }
                                        className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600"
                                        title="Edit category"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteCategory(category.id)
                                        }
                                        className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                                        title="Delete category"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>
                    </td>
                </tr>
                {category.children.map((child) =>
                    renderCategoryRow(child, level + 1),
                )}
            </React.Fragment>
        );
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                        {showDeleted
                            ? "Deleted Categories"
                            : "Active Categories"}
                    </span>
                    <ToggleSwitch
                        checked={showDeleted}
                        onChange={(checked) => setShowDeleted(checked)}
                    />
                    <span className="text-sm text-gray-500">
                        {showDeleted ? "Showing deleted" : "Show deleted"}
                    </span>
                </div>
            </div>

            <div className="mb-8 grid grid-cols-3 gap-4 items-center">
                <div className="col-span-2">
                    <h1 className="text-3xl font-medium text-gray-900 mb-2">
                        Category Management
                    </h1>
                    <p className="text-gray-600">
                        Manage course categories and subcategories
                    </p>
                </div>
                <CustomButton
                    color={ButtonColor.PURPLE}
                    onClick={handleAddCategory}
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Category
                </CustomButton>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
                <div className="mb-8 flex gap-4 items-center justify-center w-full">
                    <div className="flex-1 justify-center">
                        <div
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSearch();
                            }}
                        >
                            <CustomInputField
                                icon={InputFieldIcon.SEARCH}
                                placeholder="Search categories..."
                                initValue={searchInput}
                                onValueChange={(e) =>
                                    setSearchInput(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <CustomButton
                        color={ButtonColor.PURPLE}
                        width="w-15"
                        onClick={() => handleSearch()}
                    >
                        <Search />
                    </CustomButton>
                </div>

                {isLoading ? (
                    <div className="text-center py-8 text-gray-500">
                        Loading categories...
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">
                                        Category Name
                                    </th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">
                                        Slug
                                    </th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">
                                        Description
                                    </th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">
                                        Visibility
                                    </th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">
                                        Children
                                    </th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) =>
                                    renderCategoryRow(category),
                                )}
                            </tbody>
                        </table>

                        {categories.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No categories found. Click "Add Category" to
                                create one.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Add New Category
                            </h2>
                            <button
                                onClick={() => setShowAddModal(false)}
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
                                    initValue={newCategory.name}
                                    errorMessage={errors.name}
                                    onValueChange={(e) =>
                                        setNewCategory({
                                            ...newCategory,
                                            name: e.target.value,
                                        })
                                    }
                                    onValidate={() => {
                                        if (!newCategory.name.trim()) {
                                            setErrors({
                                                ...errors,
                                                name: "Category name is required",
                                            });
                                        } else {
                                            setErrors({
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
                                    initValue={newCategory.description}
                                    errorMessage={errors.description}
                                    rows={4}
                                    onValueChange={(e) =>
                                        setNewCategory({
                                            ...newCategory,
                                            description: e.target.value,
                                        })
                                    }
                                    onValidate={() => {
                                        if (!newCategory.description.trim()) {
                                            setErrors({
                                                ...errors,
                                                description:
                                                    "Description is required",
                                            });
                                        } else {
                                            setErrors({
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
                                    checked={newCategory.visible}
                                    onChange={(checked) =>
                                        setNewCategory({
                                            ...newCategory,
                                            visible: checked,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium"
                                disabled={isCreating}
                            >
                                Cancel
                            </button>
                            <CustomButton
                                color={ButtonColor.PURPLE}
                                onClick={handleCreateCategory}
                                enabled={!isCreating}
                            >
                                {isCreating ? "Creating..." : "Create Category"}
                            </CustomButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
