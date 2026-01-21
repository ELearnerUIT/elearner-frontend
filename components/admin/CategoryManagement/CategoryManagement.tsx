"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Eye, FolderTree } from "lucide-react";
import { ButtonColor, CustomButton } from "@/components/shared/CustomButton";
import CustomInputField, {
    InputFieldIcon,
} from "@/components/shared/CustomInputField";
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
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null,
    );

    useEffect(() => {
        fetchCategories();
    }, []);

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

    const handleSearch = () => {
        alert("Search for: " + searchInput);
    };

    const handleAddCategory = () => {
        setShowAddModal(true);
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

            if (response.success) {
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
            <>
                <tr
                    key={category.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
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
                            <button
                                onClick={() => handleEditCategory(category)}
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
                        </div>
                    </td>
                </tr>
                {category.children.map((child) =>
                    renderCategoryRow(child, level + 1),
                )}
            </>
        );
    };

    return (
        <div className="min-h-screen">
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
        </div>
    );
}
