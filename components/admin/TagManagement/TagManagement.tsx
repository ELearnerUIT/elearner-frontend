"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, RotateCcw } from "lucide-react";
import { ButtonColor, CustomButton } from "@/components/shared/CustomButton";
import CustomInputField, {
    InputFieldIcon,
} from "@/components/shared/CustomInputField";
import PaginationBar from "@/components/shared/PaginationBar";
import {
    API_ENDPOINTS,
    apiRequest,
    ApiResponse,
    Tag,
    PaginatedResponse,
} from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import AddTagModal from "./AddTagModal";
import EditTagModal from "./EditTagModal";

export default function TagManagement() {
    const [searchInput, setSearchInput] = useState("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [newTag, setNewTag] = useState({
        name: "",
    });
    const [errors, setErrors] = useState({
        name: "",
    });
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize] = useState(20);

    useEffect(() => {
        fetchTags();
    }, [currentPage]);

    const fetchTags = async () => {
        setIsLoading(true);
        try {
            const token = getAccessToken();
            const response: ApiResponse<PaginatedResponse<Tag>> =
                await apiRequest(
                    `${API_ENDPOINTS.TAGS.GET_ALL}?page=${currentPage - 1}&size=${pageSize}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

            if (response.success && response.data) {
                setTags(response.data.items);
                setTotalPages(response.data.totalPages);
                setTotalItems(response.data.totalItems);
            }
        } catch (error) {
            console.error("Error fetching tags:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        alert("Search for: " + searchInput);
    };

    const handleAddTag = () => {
        setNewTag({
            name: "",
        });
        setErrors({ name: "" });
        setShowAddModal(true);
    };

    const validateForm = () => {
        const newErrors = { name: "" };
        let isValid = true;

        if (!newTag.name.trim()) {
            newErrors.name = "Tag name is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleCreateTag = async () => {
        if (!validateForm()) return;

        setIsCreating(true);
        try {
            const token = getAccessToken();
            const response: ApiResponse<Tag> = await apiRequest(
                API_ENDPOINTS.TAGS.CREATE,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: newTag.name,
                    }),
                },
            );

            if (response.success && response.data) {
                alert("Tag created successfully!");
                setShowAddModal(false);
                fetchTags();
            } else {
                alert(response.message || "Failed to create tag");
            }
        } catch (error) {
            console.error("Error creating tag:", error);
            alert("An error occurred while creating the tag");
        } finally {
            setIsCreating(false);
        }
    };

    const handleEditTag = (tag: Tag) => {
        setSelectedTag(tag);
        setErrors({ name: "" });
        setShowEditModal(true);
    };

    const validateEditForm = () => {
        const newErrors = { name: "" };
        let isValid = true;

        if (!selectedTag?.name.trim()) {
            newErrors.name = "Tag name is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleUpdateTag = async () => {
        if (!validateEditForm() || !selectedTag) return;

        setIsUpdating(true);
        try {
            const token = getAccessToken();
            const response: ApiResponse<Tag> = await apiRequest(
                `${API_ENDPOINTS.TAGS.UPDATE}/${selectedTag.id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: selectedTag.name,
                    }),
                },
            );

            if (response.success) {
                alert("Tag updated successfully!");
                setShowEditModal(false);
                setSelectedTag(null);
                fetchTags();
            } else {
                alert(response.message || "Failed to update tag");
            }
        } catch (error) {
            console.error("Error updating tag:", error);
            alert("An error occurred while updating the tag");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteTag = async (tagId: number) => {
        if (!confirm("Are you sure you want to delete this tag?")) return;

        try {
            const token = getAccessToken();
            const response = await apiRequest(
                `${API_ENDPOINTS.TAGS.DELETE}/${tagId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.status === 204 || response.success) {
                alert("Tag deleted successfully");
                fetchTags();
            }
        } catch (error) {
            console.error("Error deleting tag:", error);
            alert("Failed to delete tag");
        }
    };

    const handleRestoreTag = async (tagId: number) => {
        if (!confirm("Are you sure you want to restore this tag?")) return;

        try {
            const token = getAccessToken();
            const response = await apiRequest(
                `${API_ENDPOINTS.TAGS.UPDATE}/${tagId}/restore`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.success) {
                alert("Tag restored successfully");
                fetchTags();
            }
        } catch (error) {
            console.error("Error restoring tag:", error);
            alert("Failed to restore tag");
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="mb-8 grid grid-cols-3 gap-4 items-center">
                <div className="col-span-2">
                    <h1 className="text-3xl font-medium text-gray-900 mb-2">
                        Tag Management
                    </h1>
                    <p className="text-gray-600">
                        Manage course tags and labels
                    </p>
                </div>
                <CustomButton color={ButtonColor.PURPLE} onClick={handleAddTag}>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Tag
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
                                placeholder="Search tags..."
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
                        Loading tags...
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-4 px-4 text-gray-700 font-semibold">
                                            Tag Name
                                        </th>
                                        <th className="text-left py-4 px-4 text-gray-700 font-semibold">
                                            Slug
                                        </th>
                                        <th className="text-left py-4 px-4 text-gray-700 font-semibold">
                                            Status
                                        </th>
                                        <th className="text-left py-4 px-4 text-gray-700 font-semibold">
                                            Created At
                                        </th>
                                        <th className="text-left py-4 px-4 text-gray-700 font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tags.map((tag) => (
                                        <tr
                                            key={tag.id}
                                            className={`border-b border-gray-100 hover:bg-gray-50 transition ${
                                                tag.deletedAt
                                                    ? "bg-red-50 opacity-60"
                                                    : ""
                                            }`}
                                        >
                                            <td className="py-4 px-4">
                                                <span
                                                    className={`font-medium ${
                                                        tag.deletedAt
                                                            ? "text-gray-500 line-through"
                                                            : "text-gray-900"
                                                    }`}
                                                >
                                                    {tag.name}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span
                                                    className={`text-sm ${
                                                        tag.deletedAt
                                                            ? "text-gray-400"
                                                            : "text-gray-600"
                                                    }`}
                                                >
                                                    {tag.slug}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                {tag.deletedAt ? (
                                                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                                                        Deleted
                                                    </span>
                                                ) : (
                                                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                                                        Active
                                                    </span>
                                                )}
                                            </td>
                                            <td
                                                className={`py-4 px-4 ${
                                                    tag.deletedAt
                                                        ? "text-gray-500"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                {new Date(
                                                    tag.createdAt,
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex gap-3">
                                                    {tag.deletedAt ? (
                                                        <button
                                                            onClick={() =>
                                                                handleRestoreTag(
                                                                    tag.id,
                                                                )
                                                            }
                                                            className="p-2 hover:bg-green-100 rounded-lg transition text-green-600"
                                                            title="Restore tag"
                                                        >
                                                            <RotateCcw className="w-5 h-5" />
                                                        </button>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    handleEditTag(
                                                                        tag,
                                                                    )
                                                                }
                                                                className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600"
                                                                title="Edit tag"
                                                            >
                                                                <Edit className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteTag(
                                                                        tag.id,
                                                                    )
                                                                }
                                                                className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                                                                title="Delete tag"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {tags.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No tags found. Click "Add Tag" to create
                                    one.
                                </div>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-6">
                                <PaginationBar
                                    pageIndex={currentPage - 1}
                                    totalPageCount={totalPages}
                                    onSelectedPageChanged={(index) =>
                                        handlePageChange(index + 1)
                                    }
                                />
                            </div>
                        )}
                    </>
                )}
            </div>

            <AddTagModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                tagData={newTag}
                errors={errors}
                isCreating={isCreating}
                onTagDataChange={setNewTag}
                onErrorsChange={setErrors}
                onCreate={handleCreateTag}
            />

            <EditTagModal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedTag(null);
                }}
                tag={selectedTag}
                errors={errors}
                isUpdating={isUpdating}
                onTagChange={setSelectedTag}
                onErrorsChange={setErrors}
                onUpdate={handleUpdateTag}
            />
        </div>
    );
}
