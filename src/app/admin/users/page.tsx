"use client";
import { useState, useMemo, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  useGetAllAccounts,
  useSuspendAccount,
  useUnlockAccount,
  useApproveTeacherAccount,
  useDeactivateAccount,
  useRejectTeacherAccount,
  useAccountStats,
} from "@/hooks/useAdminAccounts";
import { AccountResponse } from "@/services/account/account.types";
import { accountService } from "@/services/account/account.service";
import AdminExportUsersScreen from "./export/page";
import { AdminUserStatsScreen } from "./stats/page";
import { toast } from "sonner";

import {
  UserHeader, UserStatsCards,
  UserSearchBar,
  UserTabs,
  UserTable,
  UserActionModal,
} from "@/core/components/admin/users";
function AdminUsersScreenContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get page and size from URL query params
  const pageParam = searchParams.get("page");
  const sizeParam = searchParams.get("size");
  const initialPage = pageParam ? Number(pageParam) - 1 : 0;
  const initialSize = sizeParam ? Number(sizeParam) : 50;

  // State management
  const [selectedTab, setSelectedTab] = useState("all");
  const [page, setPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [showExportPopup, setShowExportPopup] = useState(false);
  const [showStatsView, setShowStatsView] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AccountResponse | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  // export type AccountActionType =
  // | "APPROVE"
  // | "REJECT"
  // | "SUSPEND"
  // | "UNLOCK"
  // | "DEACTIVATE"
  // | "UNKNOWN";

  const [actionType, setActionType] = useState<"approve" | "reject" | "deactivate" | null>(null);
  const [actionReason, setActionReason] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Build filter params based on selected tab
  const filterParams = useMemo(() => {
    const params: any = { page, size: initialSize, searchQuery };

    if (selectedTab === "learners") {
      params.role = "STUDENT";
      setPage(0);
    } else if (selectedTab === "instructors") {
      params.role = "TEACHER";
      setPage(0);
    } else if (selectedTab === "suspended") {
      params.status = "SUSPENDED";
      setPage(0);
    } else if (selectedTab === "pending") {
      params.status = "PENDING_APPROVAL";
      setPage(0);
    }

    return params;
  }, [selectedTab, page, searchQuery, initialSize]);

  // API hooks
  const { data, isLoading, error } = useGetAllAccounts(filterParams);
  const suspendMutation = useSuspendAccount();
  const unlockMutation = useUnlockAccount();
  const approveMutation = useApproveTeacherAccount();
  const rejectMutation = useRejectTeacherAccount();
  const deactivateMutation = useDeactivateAccount();

  const users = data?.items || [];

  // Fetch account statistics from API
  const { data: statsData } = useAccountStats();

  // Map API stats to UI stats format
  const stats = useMemo(() => ({
    totalUsers: statsData?.totalUsers ?? 0,
    learners: statsData?.totalLearners ?? 0,
    instructors: statsData?.totalInstructors ?? 0,
    suspended: statsData?.totalSuspended ?? 0,
    pending: statsData?.totalPending ?? 0,
  }), [statsData]);


  // Filter users by tab
  // const filteredUsers = useMemo(() => {
  //   return users.filter((user: AccountResponse) => {
  //     if (selectedTab === "all") return true;
  //     if (selectedTab === "learners") return user.role === "STUDENT";
  //     if (selectedTab === "instructors") return user.role === "TEACHER";
  //     if (selectedTab === "suspended") return user.status === "SUSPENDED";
  //     if (selectedTab === "pending") return user.status === "PENDING_APPROVAL";
  //     return true;
  //   });
  // }, [users, selectedTab]);

  // Action handlers
  const handleLock = async (userId: number) => {
    suspendMutation.mutate({ id: userId });
  };

  const handleUnlock = async (userId: number) => {
    unlockMutation.mutate({ id: userId });
  };

  const openActionModal = (user: AccountResponse, type: "approve" | "reject" | "deactivate") => {
    setSelectedUser(user);
    setActionType(type);
    setActionReason("");
    setShowActionModal(true);
  };

  const closeActionModal = () => {
    setShowActionModal(false);
    setSelectedUser(null);
    setActionType(null);
    setActionReason("");
  };

  const handleActionConfirm = () => {
    if (!selectedUser || !actionType) return;

    if (actionType === "approve") {
      approveMutation.mutate(selectedUser.accountId, {
        onSuccess: () => closeActionModal(),
      });
    } else if (actionType === "reject") {
      rejectMutation.mutate(
        { id: selectedUser.accountId, reason: actionReason },
        { onSuccess: () => closeActionModal() }
      );
    } else if (actionType === "deactivate") {
      deactivateMutation.mutate(
        { id: selectedUser.accountId, payload: { reason: actionReason } },
        { onSuccess: () => closeActionModal() }
      );
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      toast.info("Downloading import template...");
      const blob = await accountService.downloadImportTemplate();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "student-import-template.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Template downloaded successfully!");
    } catch (error) {
      console.error("Error downloading template:", error);
      toast.error("Failed to download template");
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      toast.error("Please select a valid Excel file (.xlsx or .xls)");
      return;
    }

    setIsImporting(true);
    toast.info("Importing students...");

    try {
      const result = await accountService.importStudents(file);
      console.log(result);

      // Show import results
      const successCount = result.successCount || 0;
      const failureCount = result.failureCount || 0;

      if (failureCount === 0) {
        toast.success(`Successfully imported ${successCount} student(s)!`);
      } else {
        toast.warning(
          `Import completed with ${successCount} success(es) and ${failureCount} failure(s). Check console for details.`
        );
        if (result.errors && result.errors.length > 0) {
          console.error("Import errors:", result.errors);
        }
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      console.error("Error importing students:", error);
      toast.error(error?.response?.data?.message || "Failed to import students");
    } finally {
      setIsImporting(false);
    }
  };

  const handleNextPage = () => {
    if (data?.hasNext) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (data?.hasPrevious) {
      setPage(page - 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const isProcessing =
    suspendMutation.isPending || unlockMutation.isPending;

  const isModalProcessing =
    approveMutation.isPending || rejectMutation.isPending || deactivateMutation.isPending;

  // Show stats view
  if (showStatsView) {
    return (
      <div className="min-h-screen bg-[#0a1123]">
        <AdminUserStatsScreen />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileImport}
        className="hidden"
        disabled={isImporting}
      />

      {/* Action Modal */}
      <UserActionModal
        isOpen={showActionModal}
        selectedUser={selectedUser}
        actionType={actionType}
        actionReason={actionReason}
        isProcessing={isModalProcessing}
        onReasonChange={setActionReason}
        onConfirm={handleActionConfirm}
        onClose={closeActionModal}
      />

      {/* Export Popup */}
      {showExportPopup && (
        <AdminExportUsersScreen
          open={showExportPopup}
          onClose={() => setShowExportPopup(false)}
        />
      )}

      {/* Header */}
      <UserHeader
        onShowStats={() => setShowStatsView(true)}
        onShowExport={() => setShowExportPopup(true)}
        onDownloadTemplate={handleDownloadTemplate}
        onImportStudents={handleImportClick}
      />

      {/* Stats Cards */}
      <UserStatsCards stats={stats} />

      {/* Search Bar */}
      <UserSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Tabs */}
      <UserTabs selectedTab={selectedTab} onTabChange={setSelectedTab} stats={stats} />

      {/* Users Table */}
      <UserTable
        users={users}
        loading={isLoading}
        error={error}
        isProcessing={isProcessing}
        onLock={handleLock}
        onUnlock={handleUnlock}
        onApprove={(user) => openActionModal(user, "approve")}
        onReject={(user) => openActionModal(user, "reject")}
        onDeactivate={(user) => openActionModal(user, "deactivate")}
      />

      {/* Pagination Controls */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50 border border-gray-700 rounded-xl">
          <div className="text-sm text-gray-400">
            Page {data.page + 1} of {data.totalPages} • {data.totalItems} total users
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={!data.hasPrevious}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={!data.hasNext}
              className="px-4 py-2 bg-gradient-to-br from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-gray-600 disabled:cursor-not-allowed text-slate-950 disabled:text-gray-600 rounded-lg font-bold transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminUsersScreen() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 animate-spin text-[var(--brand-600)]" />
      </div>
    }>
      <AdminUsersScreenContent />
    </Suspense>
  );
}
