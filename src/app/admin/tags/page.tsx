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
      <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-6">
          <p className="text-rose-400 font-medium">Error loading tags: {(error as any)?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 rounded-xl">
              <TagIcon className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Tag Management</h2>
          </div>
          <p className="text-gray-400 text-sm">
            Manage course tags and categories
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowBulkModal(true)}
            className="px-4 py-2.5 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-white/10 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-indigo-500/10"
          >
            <Upload className="w-5 h-5" />
            Bulk Import
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-gradient-to-br from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <Plus className="w-5 h-5" />
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
        />
        <StatCard
          title="Active Tags"
          value={tagStats.active}
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          bgColor="bg-green-50"
        />
        <StatCard
          title="Deleted Tags"
          value={tagStats.deleted}
          icon={<Trash2 className="w-6 h-6 text-red-600" />}
          bgColor="bg-red-50"
        />
        <StatCard
          title="Most Popular"
          value={overview?.mostPopularTag?.courseCount || 0}
          subtitle={overview?.mostPopularTag?.name || "N/A"}
          icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
          bgColor="bg-purple-50"
        />
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
        <select
          value={filterDeleted}
          onChange={(e) => setFilterDeleted(e.target.value as any)}
          className="px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        >
          <option value="all">All Tags</option>
          <option value="active">Active Only</option>
          <option value="deleted">Deleted Only</option>
        </select>
      </div>

      {/* Tags Table */}
      <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Slug
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Course Count
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                  Created At
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-slate-700 border-t-indigo-400 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading tags...</p>
                  </td>
                </tr>
              ) : filteredTags.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <TagIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No tags found</p>
                  </td>
                </tr>
              ) : (
                filteredTags.map((tag) => (
                  <tr key={tag.id} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4 text-sm text-gray-400">
                      #{tag.id}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-lg text-sm font-medium">
                        #{tag.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {tag.slug || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {stats?.find((s) => s.id === tag.id)?.courseCount || 0}
                    </td>
                    <td className="px-6 py-4">
                      {tag.deletedAt ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg text-xs font-medium">
                          Deleted
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-medium">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {tag.createdAt
                        ? new Date(tag.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {!tag.deletedAt ? (
                          <>
                            <button
                              onClick={() => openEditModal(tag)}
                              className="p-2 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30 text-blue-400 rounded-lg transition"
                              title="Edit tag"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(tag.id)}
                              className="p-2 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 text-rose-400 rounded-lg transition"
                              title="Delete tag"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleRestore(tag.id)}
                            className="p-2 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30 text-emerald-400 rounded-lg transition"
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
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
            <div className="text-sm text-gray-400">
              Page {page + 1} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-4 py-2 bg-slate-800 border border-white/10 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="px-4 py-2 bg-slate-800 border border-white/10 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
        />
      )}

      {showBulkModal && (
        <BulkImportModal
          onClose={() => setShowBulkModal(false)}
          onSubmit={handleBulkCreate}
          isLoading={bulkCreateMutation.isPending}
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
}: {
  title: string;
  value: number;
  subtitle?: string;
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/10 rounded-2xl shadow-xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm mb-1 text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {subtitle && (
            <p className="text-xs mt-1 truncate text-gray-500">{subtitle}</p>
          )}
        </div>
        <div className={`${bgColor.replace('50', '500/10')} border border-${bgColor.replace('bg-', '').replace('-50', '')}-500/30 p-3 rounded-xl`}>{icon}</div>
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
}: {
  title: string;
  defaultValue?: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
  isLoading: boolean;
}) {
  const [tagName, setTagName] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagName.trim()) {
      onSubmit(tagName.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tag Name
            </label>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Enter tag name..."
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
              autoFocus
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 border border-white/10 text-white rounded-lg hover:bg-slate-700 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 bg-gradient-to-br from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 text-white rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-xl font-bold text-white">
              Bulk Import Tags
            </h2>
            <p className="text-sm mt-1 text-gray-400">
              Enter one tag name per line
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <textarea
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
              placeholder="JavaScript&#10;React&#10;Node.js&#10;Python&#10;..."
              className="w-full h-64 px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-mono text-sm"
              required
              autoFocus
            />
          </div>

          {tagCount > 0 && (
            <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-300">
                <strong>{tagCount}</strong> tag{tagCount !== 1 ? "s" : ""} will
                be created
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 border border-white/10 text-white rounded-lg hover:bg-slate-700 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 bg-gradient-to-br from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 text-white rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
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
