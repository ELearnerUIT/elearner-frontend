"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/core/components/admin/AdminContext";
import {
  useGetAllTags,
  useGetTagOverview,
  useGetTagStatistics,
  useCreateTag,
  useUpdateTag,
  useDeleteTag,
  useRestoreTag,
  useBulkCreateTags,
} from "@/hooks/admin/useAdminTags";
import { TagResponse, TagRequest } from "@/services/courses/course.types";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  RefreshCw,
  Upload,
  X,
  TrendingUp,
  Tag as TagIcon,
} from "lucide-react";

export default function AdminTagsScreen() {
  const router = useRouter();
  const { darkMode } = useAdmin();

  // State management
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState<TagResponse | null>(null);
  const [filterDeleted, setFilterDeleted] = useState<"all" | "active" | "deleted">("all");

  // API hooks
  const { data, isLoading, error } = useGetAllTags({ page, size });
  const { data: overview } = useGetTagOverview();
  const { data: stats } = useGetTagStatistics(); // For individual tag course counts in table
  console.log("Tag stats:", overview);
  const createMutation = useCreateTag();
  const updateMutation = useUpdateTag();
  const deleteMutation = useDeleteTag();
  const restoreMutation = useRestoreTag();
  const bulkCreateMutation = useBulkCreateTags();

  const tags = data?.items || [];
  const totalPages = data?.totalPages || 0;

  // Filter tags based on deleted status
  const filteredTags = useMemo(() => {
    let filtered = tags;

    if (searchQuery) {
      filtered = filtered.filter((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterDeleted === "active") {
      filtered = filtered.filter((tag) => !tag.deletedAt);
    } else if (filterDeleted === "deleted") {
      filtered = filtered.filter((tag) => tag.deletedAt);
    }

    return filtered;
  }, [tags, searchQuery, filterDeleted]);

  // Calculate statistics
  const tagStats = useMemo(() => {
    if (overview) {
      return {
        total: overview.totalTags,
        active: overview.activeTags,
        deleted: overview.deletedTags,
      };
    }
    // Fallback to local calculation
    const total = tags.length;
    const active = tags.filter((t) => !t.deletedAt).length;
    const deleted = tags.filter((t) => t.deletedAt).length;

    return { total, active, deleted };
  }, [overview]);
  // Handlers
  const handleCreate = (name: string) => {
    createMutation.mutate(
      { name },
      {
        onSuccess: () => {
          setShowCreateModal(false);
        },
      }
    );
  };

  const handleUpdate = (name: string) => {
    if (!selectedTag) return;
    updateMutation.mutate(
      { id: selectedTag.id, payload: { name } },
      {
        onSuccess: () => {
          setShowEditModal(false);
          setSelectedTag(null);
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this tag?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleRestore = (id: number) => {
    restoreMutation.mutate(id);
  };

  const handleBulkCreate = (tagNames: string[]) => {
    bulkCreateMutation.mutate(
      { tagNames },
      {
        onSuccess: () => {
          setShowBulkModal(false);
        },
      }
    );
  };

  const openEditModal = (tag: TagResponse) => {
    setSelectedTag(tag);
    setShowEditModal(true);
  };

  if (error) {
    return (
      <div className="p-8">
        <div className={`${darkMode ? "bg-red-900/20 border-red-800" : "bg-red-50 border-red-200"} border rounded-lg p-4`}>
          <p className={darkMode ? "text-red-400" : "text-red-800"}>Error loading tags: {(error as any)?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Tag Management</h1>
          <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Manage course tags and categories
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowBulkModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Upload className="w-4 h-4" />
            Bulk Import
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4" />
            Create Tag
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Tags"
          value={tagStats.total}
          icon={<TagIcon className="w-6 h-6 text-blue-600" />}
          bgColor="bg-blue-50"
          darkMode={darkMode}
        />
        <StatCard
          title="Active Tags"
          value={tagStats.active}
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          bgColor="bg-green-50"
          darkMode={darkMode}
        />
        <StatCard
          title="Deleted Tags"
          value={tagStats.deleted}
          icon={<Trash2 className="w-6 h-6 text-red-600" />}
          bgColor="bg-red-50"
          darkMode={darkMode}
        />
        <StatCard
          title="Most Popular"
          value={overview?.mostPopularTag?.courseCount || 0}
          subtitle={overview?.mostPopularTag?.name || "N/A"}
          icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
          bgColor="bg-purple-50"
          darkMode={darkMode}
        />
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
          <input
            type="text"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>
        <select
          value={filterDeleted}
          onChange={(e) => setFilterDeleted(e.target.value as any)}
          className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <option value="all">All Tags</option>
          <option value="active">Active Only</option>
          <option value="deleted">Deleted Only</option>
        </select>
      </div>

      {/* Tags Table */}
      <div className={`rounded-lg shadow-sm border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? "border-gray-700 bg-gray-900/50" : "border-gray-200 bg-gray-50"}`}>
                <th className={`text-left py-4 px-6 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  ID
                </th>
                <th className={`text-left py-4 px-6 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Name
                </th>
                <th className={`text-left py-4 px-6 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Slug
                </th>
                <th className={`text-left py-4 px-6 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Course Count
                </th>
                <th className={`text-left py-4 px-6 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Status
                </th>
                <th className={`text-left py-4 px-6 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Created At
                </th>
                <th className={`text-right py-4 px-6 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Loading tags...
                  </td>
                </tr>
              ) : filteredTags.length === 0 ? (
                <tr>
                  <td colSpan={7} className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    No tags found
                  </td>
                </tr>
              ) : (
                filteredTags.map((tag) => (
                  <tr
                    key={tag.id}
                    className={`border-b transition ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-700/50"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <td className={`py-4 px-6 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {tag.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          darkMode
                            ? "bg-indigo-900/40 text-indigo-300"
                            : "bg-indigo-100 text-indigo-700"
                        }`}>
                          #{tag.name}
                        </span>
                      </div>
                    </td>
                    <td className={`py-4 px-6 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {tag.slug || "-"}
                    </td>
                    <td className={`py-4 px-6 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {stats?.find((s) => s.id === tag.id)?.courseCount || 0}
                    </td>
                    <td className="py-4 px-6">
                      {tag.deletedAt ? (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          darkMode
                            ? "bg-red-900/40 text-red-300"
                            : "bg-red-100 text-red-700"
                        }`}>
                          Deleted
                        </span>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          darkMode
                            ? "bg-green-900/40 text-green-300"
                            : "bg-green-100 text-green-700"
                        }`}>
                          Active
                        </span>
                      )}
                    </td>
                    <td className={`py-4 px-6 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {tag.createdAt
                        ? new Date(tag.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        {!tag.deletedAt ? (
                          <>
                            <button
                              onClick={() => openEditModal(tag)}
                              className={`p-2 rounded-lg transition ${
                                darkMode
                                  ? "text-blue-400 hover:bg-blue-900/20"
                                  : "text-blue-600 hover:bg-blue-50"
                              }`}
                              title="Edit tag"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(tag.id)}
                              className={`p-2 rounded-lg transition ${
                                darkMode
                                  ? "text-red-400 hover:bg-red-900/20"
                                  : "text-red-600 hover:bg-red-50"
                              }`}
                              title="Delete tag"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleRestore(tag.id)}
                            className={`p-2 rounded-lg transition ${
                              darkMode
                                ? "text-green-400 hover:bg-green-900/20"
                                : "text-green-600 hover:bg-green-50"
                            }`}
                            title="Restore tag"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={`flex items-center justify-between px-6 py-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Page {page + 1} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className={`px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition ${
                  darkMode
                    ? "border-gray-700 hover:bg-gray-700 text-gray-300"
                    : "border-gray-300 hover:bg-gray-50 text-gray-900"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className={`px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition ${
                  darkMode
                    ? "border-gray-700 hover:bg-gray-700 text-gray-300"
                    : "border-gray-300 hover:bg-gray-50 text-gray-900"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <TagModal
          title="Create Tag"
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreate}
          isLoading={createMutation.isPending}
          darkMode={darkMode}
        />
      )}

      {showEditModal && selectedTag && (
        <TagModal
          title="Edit Tag"
          defaultValue={selectedTag.name}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTag(null);
          }}
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          darkMode={darkMode}
        />
      )}

      {showBulkModal && (
        <BulkImportModal
          onClose={() => setShowBulkModal(false)}
          onSubmit={handleBulkCreate}
          isLoading={bulkCreateMutation.isPending}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  subtitle,
  icon,
  bgColor,
  darkMode,
}: {
  title: string;
  value: number;
  subtitle?: string;
  icon: React.ReactNode;
  bgColor: string;
  darkMode: boolean;
}) {
  return (
    <div className={`rounded-lg shadow-sm border p-6 ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    }`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{title}</p>
          <p className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{value}</p>
          {subtitle && (
            <p className={`text-xs mt-1 truncate ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{subtitle}</p>
          )}
        </div>
        <div className={`${darkMode ? bgColor.replace('50', '900/40') : bgColor} p-3 rounded-lg`}>{icon}</div>
      </div>
    </div>
  );
}

// Tag Modal Component
function TagModal({
  title,
  defaultValue = "",
  onClose,
  onSubmit,
  isLoading,
  darkMode,
}: {
  title: string;
  defaultValue?: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
  isLoading: boolean;
  darkMode: boolean;
}) {
  const [tagName, setTagName] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagName.trim()) {
      onSubmit(tagName.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-xl max-w-md w-full mx-4 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <div className={`flex items-center justify-between p-6 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}>
          <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{title}</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <X className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Tag Name
            </label>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Enter tag name..."
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
              autoFocus
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 border rounded-lg transition ${
                darkMode
                  ? "border-gray-700 hover:bg-gray-700 text-gray-300"
                  : "border-gray-300 hover:bg-gray-50 text-gray-900"
              }`}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !tagName.trim()}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Bulk Import Modal Component
function BulkImportModal({
  onClose,
  onSubmit,
  isLoading,
  darkMode,
}: {
  onClose: () => void;
  onSubmit: (tagNames: string[]) => void;
  isLoading: boolean;
  darkMode: boolean;
}) {
  const [tagText, setTagText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagNames = tagText
      .split("\n")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    if (tagNames.length > 0) {
      onSubmit(tagNames);
    }
  };

  const tagCount = tagText
    .split("\n")
    .filter((tag) => tag.trim().length > 0).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-xl max-w-2xl w-full mx-4 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <div className={`flex items-center justify-between p-6 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}>
          <div>
            <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Bulk Import Tags
            </h2>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Enter one tag name per line
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <X className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <textarea
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
              placeholder="JavaScript&#10;React&#10;Node.js&#10;Python&#10;..."
              className={`w-full h-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
              autoFocus
            />
          </div>

          {tagCount > 0 && (
            <div className={`mb-4 p-3 border rounded-lg ${
              darkMode
                ? "bg-blue-900/20 border-blue-800"
                : "bg-blue-50 border-blue-200"
            }`}>
              <p className={`text-sm ${darkMode ? "text-blue-300" : "text-blue-800"}`}>
                <strong>{tagCount}</strong> tag{tagCount !== 1 ? "s" : ""} will
                be created
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 border rounded-lg transition ${
                darkMode
                  ? "border-gray-700 hover:bg-gray-700 text-gray-300"
                  : "border-gray-300 hover:bg-gray-50 text-gray-900"
              }`}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || tagCount === 0}
            >
              {isLoading ? "Creating..." : `Create ${tagCount} Tag${tagCount !== 1 ? "s" : ""}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
