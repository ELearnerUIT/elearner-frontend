'use client';

import { useState } from 'react';
import { FolderTree, Plus, Edit2, Trash2, RefreshCw, TrendingUp, Eye, EyeOff, X } from 'lucide-react';
import {
  useAdminCategories,
  useCategoryStatistics,
  useDeletedCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useRestoreCategory,
} from '@/hooks/admin/useAdminCategory';
import { Category } from '@/lib/learner/category/categories';
import { CategoryRequest } from '@/lib/admin/category/categories';

export default function AdminCategoryPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'stats' | 'deleted'>(
    'active'
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { data: categories, isLoading: loadingCategories } =
    useAdminCategories();
  const { data: stats, isLoading: loadingStats } = useCategoryStatistics();
  const { data: deletedCategories, isLoading: loadingDeleted } =
    useDeletedCategories();

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();
  const restoreMutation = useRestoreCategory();

  const [formData, setFormData] = useState<CategoryRequest>({
    name: '',
    code: '',
    description: '',
    visible: true,
    parentId: null,
    slug: '',
    metaTitle: '',
    metaDescription: '',
    thumbnailUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCategory) {
      await updateMutation.mutateAsync({
        id: editingCategory.id,
        data: formData,
      });
    } else {
      await createMutation.mutateAsync(formData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      code: category.code || '',
      description: category.description || '',
      visible: category.visible ?? true,
      parentId: category.parentId || null,
      slug: category.slug || '',
      metaTitle: category.metaTitle || '',
      metaDescription: category.metaDescription || '',
      thumbnailUrl: category.thumbnailUrl || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleRestore = async (id: number) => {
    if (confirm('Are you sure you want to restore this category?')) {
      await restoreMutation.mutateAsync(id);
    }
  };

  const resetForm = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      code: '',
      description: '',
      visible: true,
      parentId: null,
      slug: '',
      metaTitle: '',
      metaDescription: '',
      thumbnailUrl: '',
    });
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl">
              <FolderTree className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Category Management</h2>
          </div>
          <p className="text-gray-400 text-sm">
            Organize and manage course categories
          </p>
        </div>

        <button
          onClick={openCreateDialog}
          className="px-4 py-2.5 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20"
        >
          <Plus className="w-5 h-5" />
          Create Category
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-900/50 border border-white/10 rounded-xl">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === 'active'
              ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Active Categories
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === 'stats'
              ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Statistics
        </button>
        <button
          onClick={() => setActiveTab('deleted')}
          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === 'deleted'
              ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Deleted Categories
        </button>
      </div>

      {/* Active Categories Tab */}
      {activeTab === 'active' && (
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {loadingCategories ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-slate-700 border-t-purple-400 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading categories...</p>
            </div>
          ) : (
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
                      Code
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                      Slug
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                      Visible
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                      Parent
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {categories?.map((category) => (
                    <tr key={category.id} className="hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-sm text-gray-400">
                        #{category.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {category.code || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {category.slug || '-'}
                      </td>
                      <td className="px-6 py-4">
                        {category.visible ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-medium">
                            <Eye className="w-3 h-3" />
                            Visible
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-500/10 border border-slate-500/30 text-slate-400 rounded-lg text-xs font-medium">
                            <EyeOff className="w-3 h-3" />
                            Hidden
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {category.parentId || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="p-2 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30 text-blue-400 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="p-2 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 text-rose-400 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'stats' && (
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {loadingStats ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-slate-700 border-t-purple-400 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading statistics...</p>
            </div>
          ) : (
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
                      Code
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                      Courses
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                      Students
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {stats?.map((stat) => (
                    <tr key={stat.id} className="hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-sm text-gray-400">
                        #{stat.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        {stat.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {stat.code || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium">
                          <TrendingUp className="w-3 h-3" />
                          {stat.courseCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-medium">
                          {stat.studentCount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {stat.visible ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-medium">
                            <Eye className="w-3 h-3" />
                            Visible
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-500/10 border border-slate-500/30 text-slate-400 rounded-lg text-xs font-medium">
                            <EyeOff className="w-3 h-3" />
                            Hidden
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Deleted Categories Tab */}
      {activeTab === 'deleted' && (
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {loadingDeleted ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-slate-700 border-t-purple-400 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading deleted categories...</p>
            </div>
          ) : (
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
                      Code
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                      Deleted At
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {deletedCategories?.map((category) => (
                    <tr key={category.id} className="hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-sm text-gray-400">
                        #{category.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {category.code || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {category.deletedAt
                          ? new Date(category.deletedAt).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleRestore(category.id)}
                            className="p-2 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30 text-emerald-400 rounded-lg transition"
                            title="Restore"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Create/Edit Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h2>
              <button
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Enter category name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Code
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder="Category code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder="category-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                  placeholder="Category description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Parent Category
                </label>
                <select
                  value={formData.parentId || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      parentId: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                >
                  <option value="">None (Root Category)</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, metaTitle: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="SEO meta title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      metaDescription: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                  placeholder="SEO meta description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  value={formData.thumbnailUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnailUrl: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-800/30 border border-white/10 rounded-lg">
                <input
                  type="checkbox"
                  id="visible"
                  checked={formData.visible}
                  onChange={(e) =>
                    setFormData({ ...formData, visible: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-white/20 text-purple-500 focus:ring-purple-500 focus:ring-offset-slate-900"
                />
                <label htmlFor="visible" className="text-sm font-medium text-gray-300 cursor-pointer flex-1">
                  Make category visible to public
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="px-4 py-2.5 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
                >
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
