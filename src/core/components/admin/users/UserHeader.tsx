import { Users, BarChart3, Download, Upload } from "lucide-react";

interface UserHeaderProps {
  onShowStats: () => void;
  onShowExport: () => void;
  onDownloadTemplate: () => void;
  onImportStudents: () => void;
}

export function UserHeader({ onShowStats, onShowExport, onDownloadTemplate, onImportStudents }: UserHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-xl">
            <Users className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">User Management</h2>
        </div>
        <p className="text-gray-400 text-sm">
          Manage learners and instructors, control account access and permissions
        </p>
      </div>

      <div className="flex gap-3">
        <button
          className="px-4 py-2.5 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-gray-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-emerald-500/10"
          onClick={onShowStats}
        >
          <BarChart3 className="w-5 h-5" />
          Statistics
        </button>
        <button
          className="px-4 py-2.5 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/20"
          onClick={onDownloadTemplate}
        >
          <Download className="w-5 h-5" />
          Download Template
        </button>
        <button
          className="px-4 py-2.5 bg-gradient-to-br from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-orange-500/20"
          onClick={onImportStudents}
        >
          <Upload className="w-5 h-5" />
          Import Students
        </button>
        <button
          className="px-4 py-2.5 bg-gradient-to-br from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          onClick={onShowExport}
        >
          <Users className="w-5 h-5" />
          Export Users
        </button>
      </div>
    </div>
  );
}
