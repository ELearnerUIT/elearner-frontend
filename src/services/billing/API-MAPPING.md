# Billing Module - API Mapping

This document maps the backend APIs to frontend services for the Billing module, which includes Payment, Payout, Revenue, and Revenue Share functionality.

## Overview

- **Backend Controllers**: 4 (PaymentController, PayoutController, RevenueController, RevenueShareController)
- **Backend APIs**: 40 endpoints
- **Frontend Services**: 4 (payment.service.ts, payout.service.ts, revenue.service.ts, revenue-share.service.ts)
- **Frontend APIs**: 40 methods

---

## Payment Service (payment.service.ts)

### 1. Create Payment

- **Frontend**: `paymentService.createPayment(payload)`
- **Backend**: `POST /payments/create-payment`
- **Role**: `@StudentOnly`
- **Description**: Student initiates payment for a course. Returns payment URL for redirect to payment gateway.
- **Request**: `CreatePaymentRequest { courseId, gateway }`
- **Response**: `PaymentUrlResponse { paymentUrl, transactionId }`

### 2. Verify Payment

- **Frontend**: `paymentService.verifyPayment(params)`
- **Backend**: `POST /payments/verify-payment`
- **Role**: `@Authenticated`
- **Description**: Manual verification endpoint used for frontend to verify payment after redirect from gateway.
- **Request**: Query parameters from payment gateway
- **Response**: `PaymentTransactionResponse`

### 3. Get Payment by ID

- **Frontend**: `paymentService.getPaymentById(id)`
- **Backend**: `GET /payments/{id}`
- **Role**: `@Authenticated`
- **Description**: Retrieve payment transaction details by ID.
- **Response**: `PaymentTransactionResponse`

### 4. Get All Payments

- **Frontend**: `paymentService.getAllPayments(status, studentId, courseId, page, size)`
- **Backend**: `GET /payments`
- **Role**: `@AdminOnly`
- **Description**: Get all payment transactions with filters for admin dashboard.
- **Query Params**: `status`, `studentId`, `courseId`, `page`, `size`
- **Response**: `PageResponse<PaymentTransactionResponse>`

### 5. Get My Payment History

- **Frontend**: `paymentService.getMyPaymentHistory()`
- **Backend**: `GET /payments/my-history`
- **Role**: `@StudentOnly`
- **Description**: Get payment history for current logged-in student.
- **Response**: `PaymentTransactionResponse[]`

### 6. Refund Payment

- **Frontend**: `paymentService.refundPayment(id, payload)`
- **Backend**: `POST /payments/{id}/refund`
- **Role**: `@AdminOnly`
- **Description**: Process payment refund. Admin can refund a completed payment.
- **Request**: `RefundRequest { reason }`
- **Response**: `PaymentTransactionResponse`

### 7. Get Student Payment History

- **Frontend**: `paymentService.getStudentPaymentHistory(studentId)`
- **Backend**: `GET /payments/students/{studentId}/payment-history`
- **Role**: `@AdminOnly`
- **Description**: Get payment history for a specific student (admin view).
- **Response**: `PaymentTransactionResponse[]`

### 8. Get Course Payment Stats

- **Frontend**: `paymentService.getCoursePaymentStats(courseId)`
- **Backend**: `GET /payments/courses/{courseId}/payment-stats`
- **Role**: `@TeacherOnly` or `@AdminOnly`
- **Description**: Get payment statistics for a specific course (total revenue, enrollment count).
- **Response**: `CoursePaymentStatsResponse`

### 9. Query ZaloPay Order Status

- **Frontend**: `paymentService.queryZaloPayOrderStatus(appTransId)`
- **Backend**: `GET /payments/zalopay/query-order/{appTransId}`
- **Role**: `@Authenticated`
- **Description**: Check the status of a ZaloPay payment transaction.
- **Response**: ZaloPay order status

### 10. Query ZaloPay Refund Status

- **Frontend**: `paymentService.queryZaloPayRefundStatus(mRefundId)`
- **Backend**: `GET /payments/zalopay/query-refund/{mRefundId}`
- **Role**: `@AdminOnly`
- **Description**: Check the status of a ZaloPay refund transaction.
- **Response**: ZaloPay refund status

### 11. Retry Enrollment

- **Frontend**: `paymentService.retryEnrollment(paymentId)`
- **Backend**: `POST /payments/{paymentId}/retry-enrollment`
- **Role**: `@AdminOnly`
- **Description**: Manually retry enrollment after successful payment if enrollment failed.
- **Response**: Success message

### 12. Check Enrollment Status

- **Frontend**: `paymentService.checkEnrollmentStatus(paymentId)`
- **Backend**: `GET /payments/{paymentId}/enrollment-status`
- **Role**: `@AdminOnly`
- **Description**: Check if enrollment is pending for a payment.
- **Response**: Enrollment status info

### 13. Unified Payment Callback (Not in frontend service)

- **Backend**: `GET /payments/callback/unified`
- **Role**: No authentication (webhook)
- **Description**: Unified callback endpoint for all payment gateways (VNPay, ZaloPay, MoMo). Auto-detects gateway from parameters and processes payment verification. This is called by payment gateway servers, not by frontend.

---

## Payout Service (payout.service.ts)

### 1. Create Payout Request

- **Frontend**: `payoutService.createPayoutRequest(payload)`
- **Backend**: `POST /payouts`
- **Role**: `@TeacherOnly`
- **Description**: Teacher creates a new payout request to withdraw revenue.
- **Request**: `CreatePayoutRequest { amount, payoutMethod, bankAccountNumber, bankAccountName, bankName, notes }`
- **Response**: `PayoutResponse`

### 2. Get Payout by ID

- **Frontend**: `payoutService.getPayoutById(id)`
- **Backend**: `GET /payouts/{id}`
- **Role**: `@TeacherOnly` or `@AdminOnly`
- **Description**: Get payout request details by ID.
- **Response**: `PayoutResponse`

### 3. Get Payouts

- **Frontend**: `payoutService.getPayouts(status, teacherId, page, size)`
- **Backend**: `GET /payouts`
- **Role**: `@TeacherOnly` or `@AdminOnly`
- **Description**: Get payouts with filters.
- **Query Params**: `status`, `teacherId`, `page`, `size`
- **Response**: `PageResponse<PayoutResponse>`

### 4. Get All Payouts (Admin)

- **Frontend**: `payoutService.getAllPayouts(status, teacherId, page, size)`
- **Backend**: `GET /admin/payouts`
- **Role**: `@AdminOnly`
- **Description**: Get all payout requests with filters (admin view).
- **Query Params**: `status`, `teacherId`, `page`, `size`
- **Response**: `PageResponse<PayoutResponse>`

### 5. Get My Payouts

- **Frontend**: `payoutService.getMyPayouts()`
- **Backend**: `GET /payouts/my-payouts`
- **Role**: `@TeacherOnly`
- **Description**: Get payout requests for current logged-in teacher.
- **Response**: `PayoutResponse[]`

### 6. Get Teacher Payouts

- **Frontend**: `payoutService.getTeacherPayouts(teacherId)`
- **Backend**: `GET /admin/payouts/teachers/{teacherId}`
- **Role**: `@AdminOnly`
- **Description**: Get payout requests for a specific teacher (admin view).
- **Response**: `PayoutResponse[]`

### 7. Complete Payout

- **Frontend**: `payoutService.completePayout(id, payload)`
- **Backend**: `POST /admin/payouts/{id}/complete`
- **Role**: `@AdminOnly`
- **Description**: Mark payout request as completed after processing payment.
- **Request**: `CompletePayoutRequest { transactionReference, notes }`
- **Response**: `PayoutResponse`

### 8. Reject Payout

- **Frontend**: `payoutService.rejectPayout(id, payload)`
- **Backend**: `POST /admin/payouts/{id}/reject`
- **Role**: `@AdminOnly`
- **Description**: Reject payout request with reason.
- **Request**: `RejectPayoutRequest { rejectionReason }`
- **Response**: `PayoutResponse`

### 9. Get Pending Payouts Count

- **Frontend**: `payoutService.getPendingPayoutsCount()`
- **Backend**: `GET /admin/payouts/pending/count`
- **Role**: `@AdminOnly`
- **Description**: Get count of pending payout requests (for admin dashboard badge).
- **Response**: `number`

### 10. Get My Available Payout Amount

- **Frontend**: `payoutService.getMyAvailablePayoutAmount()`
- **Backend**: `GET /payouts/available-amount`
- **Role**: `@TeacherOnly`
- **Description**: Get available amount for payout request (total revenue - already paid out - pending payouts).
- **Response**: `number`

---

## Revenue Service (revenue.service.ts)

### 1. Get Teacher Revenue

- **Frontend**: `revenueService.getTeacherRevenue(teacherId)`
- **Backend**: `GET /revenue/teachers/{teacherId}`
- **Role**: `@AdminOnly`
- **Description**: Get revenue for a specific teacher (admin view).
- **Response**: `TeacherRevenueResponse { totalRevenue, paidOut, pendingPayout, availableForPayout }`

### 2. Get My Revenue

- **Frontend**: `revenueService.getMyRevenue()`
- **Backend**: `GET /revenue/my-revenue`
- **Role**: `@TeacherOnly`
- **Description**: Get revenue for current logged-in teacher.
- **Response**: `TeacherRevenueResponse`

### 3. Get Revenue Breakdown

- **Frontend**: `revenueService.getRevenueBreakdown(teacherId)`
- **Backend**: `GET /revenue/teachers/{teacherId}/breakdown`
- **Role**: `@AdminOnly`
- **Description**: Get revenue breakdown by courses for a specific teacher.
- **Response**: `RevenueBreakdownResponse { totalRevenue, courseBreakdowns }`

### 4. Get My Revenue Breakdown

- **Frontend**: `revenueService.getMyRevenueBreakdown()`
- **Backend**: `GET /revenue/my-revenue/breakdown`
- **Role**: `@TeacherOnly`
- **Description**: Get revenue breakdown by courses for current teacher.
- **Response**: `RevenueBreakdownResponse`

### 5. Get Monthly Revenue

- **Frontend**: `revenueService.getMonthlyRevenue(teacherId, month)`
- **Backend**: `GET /revenue/teachers/{teacherId}/monthly`
- **Role**: `@AdminOnly`
- **Description**: Get monthly revenue for a specific teacher with daily breakdown.
- **Query Params**: `month` (format: YYYY-MM)
- **Response**: `MonthlyRevenueResponse { month, totalRevenue, dailyRevenues }`

### 6. Get My Monthly Revenue

- **Frontend**: `revenueService.getMyMonthlyRevenue(month)`
- **Backend**: `GET /revenue/my-revenue/monthly`
- **Role**: `@TeacherOnly`
- **Description**: Get monthly revenue for current teacher with daily breakdown.
- **Query Params**: `month` (format: YYYY-MM)
- **Response**: `MonthlyRevenueResponse`

### 7. Get Teacher Payment Transactions

- **Frontend**: `revenueService.getTeacherPaymentTransactions(teacherId, page, size)`
- **Backend**: `GET /revenue/teachers/{teacherId}/payment-transactions`
- **Role**: `@AdminOnly`
- **Description**: Get payment transactions for a specific teacher.
- **Query Params**: `page`, `size`
- **Response**: `PageResponse<PaymentTransactionResponse>`

### 8. Get My Payment Transactions

- **Frontend**: `revenueService.getMyPaymentTransactions(page, size)`
- **Backend**: `GET /revenue/my-revenue/payment-transactions`
- **Role**: `@TeacherOnly`
- **Description**: Get payment transactions for current teacher (shows which students bought which courses).
- **Query Params**: `page`, `size`
- **Response**: `PageResponse<PaymentTransactionResponse>`

---

## Revenue Share Service (revenue-share.service.ts)

All APIs in this service are `@AdminOnly`.

### 1. Create Revenue Share Config

- **Frontend**: `revenueShareService.createRevenueShareConfig(payload)`
- **Backend**: `POST /revenue-share-configs`
- **Role**: `@AdminOnly`
- **Description**: Create a new revenue share configuration.
- **Request**: `CreateRevenueShareConfigRequest { categoryId, teacherSharePercentage, platformSharePercentage, effectiveFrom, effectiveTo, isDefault }`
- **Response**: `RevenueShareConfigResponse`

### 2. Get All Revenue Share Configs

- **Frontend**: `revenueShareService.getAllRevenueShareConfigs()`
- **Backend**: `GET /revenue-share-configs`
- **Role**: `@AdminOnly`
- **Description**: Get all revenue share configurations (active and inactive).
- **Response**: `RevenueShareConfigResponse[]`

### 3. Get Active Revenue Share Configs

- **Frontend**: `revenueShareService.getActiveRevenueShareConfigs()`
- **Backend**: `GET /revenue-share-configs/active`
- **Role**: `@AdminOnly`
- **Description**: Get all active revenue share configurations.
- **Response**: `RevenueShareConfigResponse[]`

### 4. Get Revenue Share Config by ID

- **Frontend**: `revenueShareService.getRevenueShareConfigById(id)`
- **Backend**: `GET /revenue-share-configs/{id}`
- **Role**: `@AdminOnly`
- **Description**: Get revenue share configuration by ID.
- **Response**: `RevenueShareConfigResponse`

### 5. Get Active Config for Category

- **Frontend**: `revenueShareService.getActiveConfigForCategory(categoryId)`
- **Backend**: `GET /revenue-share-configs/category/{categoryId}/active`
- **Role**: `@AdminOnly`
- **Description**: Get active revenue share configuration for a specific category.
- **Response**: `RevenueShareConfigResponse`

### 6. Get Default Config

- **Frontend**: `revenueShareService.getDefaultConfig()`
- **Backend**: `GET /revenue-share-configs/default`
- **Role**: `@AdminOnly`
- **Description**: Get default revenue share configuration (applied when no category-specific config exists).
- **Response**: `RevenueShareConfigResponse`

### 7. Update Revenue Share Config

- **Frontend**: `revenueShareService.updateRevenueShareConfig(id, payload)`
- **Backend**: `PUT /revenue-share-configs/{id}`
- **Role**: `@AdminOnly`
- **Description**: Update an existing revenue share configuration.
- **Request**: `UpdateRevenueShareConfigRequest { teacherSharePercentage, platformSharePercentage, effectiveFrom, effectiveTo }`
- **Response**: `RevenueShareConfigResponse`

### 8. Deactivate Revenue Share Config

- **Frontend**: `revenueShareService.deactivateRevenueShareConfig(id)`
- **Backend**: `POST /revenue-share-configs/{id}/deactivate`
- **Role**: `@AdminOnly`
- **Description**: Deactivate a revenue share configuration (soft delete).
- **Response**: `void`

### 9. Delete Revenue Share Config

- **Frontend**: `revenueShareService.deleteRevenueShareConfig(id)`
- **Backend**: `DELETE /revenue-share-configs/{id}`
- **Role**: `@AdminOnly`
- **Description**: Delete a revenue share configuration (hard delete).
- **Response**: `void`

---

## Summary

| Service       | Frontend APIs | Backend APIs | Missing APIs                        |
| ------------- | ------------- | ------------ | ----------------------------------- |
| Payment       | 12            | 13           | 1 (unified callback - webhook only) |
| Payout        | 10            | 9            | 0                                   |
| Revenue       | 8             | 8            | 0                                   |
| Revenue Share | 9             | 9            | 0                                   |
| **Total**     | **39**        | **40**       | **1**                               |

### Missing API

- **Unified Payment Callback**: `/payments/callback/unified` (GET) - This is a webhook endpoint called by payment gateway servers (VNPay, ZaloPay, MoMo), not used directly by frontend.

---

## Payment Gateway Integration

The system supports 3 payment gateways:

1. **VNPay**: Vietnamese payment gateway
2. **ZaloPay**: Mobile payment by Zalo
3. **MoMo**: E-wallet payment

### Payment Flow

1. Student selects course and payment gateway
2. Frontend calls `createPayment` → Backend generates payment URL
3. Student is redirected to payment gateway
4. Payment gateway processes payment
5. Gateway redirects back to frontend with result
6. Frontend calls `verifyPayment` to confirm transaction
7. Backend webhook receives callback from gateway (unified endpoint)
8. Enrollment is created automatically after successful payment

### Enrollment Retry Mechanism

- If enrollment fails after successful payment, admin can use `retryEnrollment` API
- Check enrollment status with `checkEnrollmentStatus` API

---

## Revenue Share Configuration

Revenue share can be configured:

- **Default**: Applied to all courses without specific category config
- **Category-specific**: Different revenue share for different course categories
- **Time-based**: Effective date ranges allow scheduling future changes

Example:

- Default: 70% teacher, 30% platform
- Programming category: 75% teacher, 25% platform (effective from 2024-01-01)
