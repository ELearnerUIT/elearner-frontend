// ============== ENUMS ==============

export type PaymentStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

export type PaymentGateway = "VNPAY" | "ZALOPAY" | "MOMO";

export type PayoutStatus =
  | "PENDING"
  | "APPROVED"
  | "PROCESSING"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELLED";

// ============== REQUEST DTOs ==============

// Payment Requests
/** Backend: CreatePaymentRequest */
export interface CreatePaymentRequest {
  courseId: number;
  amount: number;
  gateway: PaymentGateway;
  returnUrl?: string;
  cancelUrl?: string;
}

/** Backend: RefundRequest */
export interface RefundRequest {
  reason: string;
  refundAmount?: number;
}

// Payout Requests
/** Backend: CreatePayoutRequest */
export interface CreatePayoutRequest {
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  period: string; // YYYY-MM format
  notes?: string;
}

/** Backend: CompletePayoutRequest */
export interface CompletePayoutRequest {
  transactionId: string;
  transactionDate: string; // ISO date string
  notes?: string;
}

/** Backend: RejectPayoutRequest */
export interface RejectPayoutRequest {
  reason: string;
}

// Revenue Share Requests
/** Backend: CreateRevenueShareConfigRequest */
export interface CreateRevenueShareConfigRequest {
  categoryId?: number;
  teacherSharePercentage: number;
  platformSharePercentage: number;
  effectiveFrom: string; // ISO date string
  effectiveTo?: string; // ISO date string
  isActive: boolean;
  description?: string;
}

/** Backend: UpdateRevenueShareConfigRequest */
export interface UpdateRevenueShareConfigRequest {
  teacherSharePercentage?: number;
  platformSharePercentage?: number;
  effectiveTo?: string; // ISO date string
  isActive?: boolean;
  description?: string;
}

// ============== RESPONSE DTOs ==============

// Payment Responses
/** Backend: PaymentUrlResponse */
export interface PaymentUrlResponse {
  paymentUrl: string;
  transactionId: string;
  gateway: PaymentGateway;
  amount: number;
  expiresAt?: string; // ISO datetime string
}

/** Backend: PaymentTransactionResponse */
export interface PaymentTransactionResponse {
  id: number;
  transactionId: string;
  studentId: number;
  studentUsername?: string;
  studentFullName?: string;
  courseId: number;
  courseTitle?: string;
  amount: number;
  status: PaymentStatus;
  gateway: PaymentGateway;
  gatewayTransactionId?: string;
  refundAmount?: number;
  refundReason?: string;
  refundedAt?: string; // ISO datetime string
  paidAt?: string; // ISO datetime string
  createdAt: string; // ISO datetime string
  updatedAt?: string; // ISO datetime string
  errorMessage?: string;
  enrollmentId?: number;
}

/** Backend: CoursePaymentStatsResponse */
export interface CoursePaymentStatsResponse {
  courseId: number;
  courseTitle: string;
  totalPayments: number;
  completedPayments: number;
  totalRevenue: number;
  averagePaymentAmount: number;
  refundedAmount: number;
  refundCount: number;
  lastPaymentDate?: string; // ISO datetime string
}

// Payout Responses
/** Backend: PayoutResponse */
export interface PayoutResponse {
  id: number;
  teacherId: number;
  teacherUsername?: string;
  teacherFullName?: string;
  amount: number;
  status: PayoutStatus;
  period: string; // YYYY-MM
  bankName: string;
  accountNumber: string;
  accountName: string;
  transactionId?: string;
  transactionDate?: string; // ISO date string
  rejectionReason?: string;
  notes?: string;
  requestedAt: string; // ISO datetime string
  processedAt?: string; // ISO datetime string
  completedAt?: string; // ISO datetime string
}

// Revenue Responses
/** Backend: TeacherRevenueResponse */
export interface TeacherRevenueResponse {
  teacherId: number;
  teacherUsername: string;
  teacherFullName?: string;
  totalRevenue: number;
  totalPayouts: number;
  availableForPayout: number;
  pendingPayout: number;
  totalStudents: number;
  totalCourses: number;
  lastUpdated: string; // ISO datetime string
}

/** Backend: RevenueBreakdownResponse */
export interface RevenueBreakdownResponse {
  teacherId: number;
  teacherUsername: string;
  totalRevenue: number;
  courseBreakdowns: CourseRevenueBreakdown[];
}

/** Backend: CourseRevenueBreakdown */
export interface CourseRevenueBreakdown {
  courseId: number;
  courseTitle: string;
  enrollmentCount: number;
  totalRevenue: number;
  teacherShare: number;
  platformShare: number;
  sharePercentage: number;
  lastPaymentDate?: string; // ISO datetime string
}

/** Backend: MonthlyRevenueResponse */
export interface MonthlyRevenueResponse {
  teacherId: number;
  period: string; // YYYY-MM
  totalRevenue: number;
  teacherShare: number;
  platformShare: number;
  transactionCount: number;
  courseBreakdowns: CourseRevenueBreakdown[];
  dailyRevenue: DailyRevenue[];
}

/** Backend: DailyRevenue */
export interface DailyRevenue {
  date: string; // YYYY-MM-DD
  revenue: number;
  transactionCount: number;
}

// Revenue Share Responses
/** Backend: RevenueShareConfigResponse */
export interface RevenueShareConfigResponse {
  id: number;
  categoryId?: number;
  categoryName?: string;
  teacherSharePercentage: number;
  platformSharePercentage: number;
  effectiveFrom: string; // ISO date string
  effectiveTo?: string; // ISO date string
  isActive: boolean;
  description?: string;
  createdAt: string; // ISO datetime string
  updatedAt?: string; // ISO datetime string
}
