# Billing Module - Screens and User Flows

This document outlines the recommended screens and user flows for the Billing module, covering Payment, Payout, Revenue, and Revenue Share functionality.

---

## Table of Contents

1. [Student Screens](#student-screens)
2. [Teacher Screens](#teacher-screens)
3. [Admin Screens](#admin-screens)
4. [User Flows](#user-flows)

---

## Student Screens

### 1. Course Payment Page

**Path**: `/learner/courses/{courseId}/checkout`

**Purpose**: Student initiates payment for a course

**Components**:

- Course summary (title, price, thumbnail)
- Payment gateway selection (VNPay, ZaloPay, MoMo)
- Payment button

**APIs Used**:

- `paymentService.createPayment(courseId, gateway)`

**Flow**:

1. Student clicks "Enroll" on course page
2. Redirected to checkout page
3. Selects payment gateway
4. Clicks "Pay Now"
5. Redirected to payment gateway
6. After payment, redirected back to success/failure page

---

### 2. Payment Success/Failure Page

**Path**: `/learner/payment/callback`

**Purpose**: Handle payment gateway callback and show result

**Components**:

- Payment status (success/failed)
- Transaction details (amount, transaction ID, course name)
- "Go to My Courses" button (success)
- "Try Again" button (failed)

**APIs Used**:

- `paymentService.verifyPayment(params)` - called automatically on page load

**Flow**:

1. Payment gateway redirects to this page with query params
2. Page automatically calls verifyPayment
3. Show success/failure message
4. Update enrollment status if successful

---

### 3. My Payment History

**Path**: `/learner/payments`

**Purpose**: View all past payment transactions

**Components**:

- Payment history table (date, course, amount, status, gateway)
- Filter by status (all, completed, pending, failed, refunded)
- Pagination

**APIs Used**:

- `paymentService.getMyPaymentHistory()`

---

## Teacher Screens

### 4. Revenue Dashboard

**Path**: `/teacher/revenue`

**Purpose**: Overview of teacher's revenue

**Components**:

- Revenue summary cards:
  - Total Revenue
  - Paid Out
  - Pending Payout
  - Available for Payout
- Monthly revenue chart
- Revenue breakdown by courses (table)

**APIs Used**:

- `revenueService.getMyRevenue()` - for summary cards
- `revenueService.getMyMonthlyRevenue(month)` - for chart (last 6 months)
- `revenueService.getMyRevenueBreakdown()` - for course breakdown table

---

### 5. Revenue Breakdown by Courses

**Path**: `/teacher/revenue/breakdown`

**Purpose**: Detailed revenue breakdown by each course

**Components**:

- Course revenue table (course name, enrollments, total revenue, teacher share, platform share)
- Sort by revenue
- Search by course name

**APIs Used**:

- `revenueService.getMyRevenueBreakdown()`

---

### 6. Monthly Revenue Details

**Path**: `/teacher/revenue/monthly/{month}`

**Purpose**: Daily revenue breakdown for a specific month

**Components**:

- Month selector
- Daily revenue chart (bar chart)
- Daily revenue table (date, revenue)
- Export to CSV button

**APIs Used**:

- `revenueService.getMyMonthlyRevenue(month)`

---

### 7. My Payment Transactions

**Path**: `/teacher/revenue/transactions`

**Purpose**: View all payment transactions from students

**Components**:

- Transaction table (date, student, course, amount, status)
- Filter by course
- Pagination

**APIs Used**:

- `revenueService.getMyPaymentTransactions(page, size)`

---

### 8. Course Payment Statistics

**Path**: `/teacher/courses/{courseId}/payments`

**Purpose**: Payment statistics for a specific course

**Components**:

- Total enrollments via payment
- Total revenue
- Average price per enrollment
- Payment status breakdown (completed, pending, failed)

**APIs Used**:

- `paymentService.getCoursePaymentStats(courseId)`

---

### 9. Payout Request Page

**Path**: `/teacher/payouts/create`

**Purpose**: Teacher creates a payout request

**Components**:

- Available amount display
- Amount input (with max validation)
- Payout method selection (Bank Transfer, etc.)
- Bank details form:
  - Bank Name
  - Account Number
  - Account Name
- Notes textarea
- Submit button

**APIs Used**:

- `payoutService.getMyAvailablePayoutAmount()` - to show max amount
- `payoutService.createPayoutRequest(payload)`

**Validation**:

- Amount must be > 0
- Amount must be ≤ available amount
- Bank details required if method is Bank Transfer

---

### 10. My Payout Requests

**Path**: `/teacher/payouts`

**Purpose**: View all payout requests

**Components**:

- Payout request table (date, amount, status, bank info, notes)
- Status badges (Pending, Approved, Processing, Completed, Rejected, Cancelled)
- Filter by status
- "New Payout Request" button
- View details modal

**APIs Used**:

- `payoutService.getMyPayouts()`
- `payoutService.getPayoutById(id)` - for details modal

---

### 11. Payout Request Details

**Path**: `/teacher/payouts/{id}`

**Purpose**: View single payout request details

**Components**:

- Payout information:
  - Amount
  - Status
  - Requested date
  - Completed date (if applicable)
  - Bank details
  - Transaction reference (if completed)
  - Notes
  - Rejection reason (if rejected)
- Status history timeline

**APIs Used**:

- `payoutService.getPayoutById(id)`

---

## Admin Screens

### 12. Admin Payment Dashboard

**Path**: `/admin/payments`

**Purpose**: Overview and management of all payments

**Components**:

- Payment statistics cards (total, completed, pending, failed, refunded)
- Payment table (date, student, course, amount, status, gateway)
- Filters:
  - Status dropdown
  - Student search
  - Course search
  - Date range
- Actions:
  - View details
  - Refund (for completed payments)
  - Retry enrollment (for successful payments with failed enrollment)
- Pagination

**APIs Used**:

- `paymentService.getAllPayments(status, studentId, courseId, page, size)`
- `paymentService.refundPayment(id, reason)`
- `paymentService.retryEnrollment(paymentId)`
- `paymentService.checkEnrollmentStatus(paymentId)`

---

### 13. Student Payment History (Admin View)

**Path**: `/admin/students/{studentId}/payments`

**Purpose**: View payment history for a specific student

**Components**:

- Student info header
- Payment history table (similar to student view)
- Refund action for each completed payment

**APIs Used**:

- `paymentService.getStudentPaymentHistory(studentId)`

---

### 14. Admin Payout Dashboard

**Path**: `/admin/payouts`

**Purpose**: Manage teacher payout requests

**Components**:

- Payout statistics cards (pending count, total paid out this month)
- Payout request table (date, teacher, amount, status, bank info)
- Filters:
  - Status dropdown
  - Teacher search
  - Date range
- Actions:
  - Approve (change status to Approved)
  - Complete (enter transaction reference)
  - Reject (enter rejection reason)
- Pagination

**APIs Used**:

- `payoutService.getAllPayouts(status, teacherId, page, size)`
- `payoutService.getPendingPayoutsCount()` - for badge
- `payoutService.completePayout(id, { transactionReference, notes })`
- `payoutService.rejectPayout(id, { rejectionReason })`

---

### 15. Teacher Payout History (Admin View)

**Path**: `/admin/teachers/{teacherId}/payouts`

**Purpose**: View payout history for a specific teacher

**Components**:

- Teacher info header
- Payout history table
- Actions for pending payouts

**APIs Used**:

- `payoutService.getTeacherPayouts(teacherId)`

---

### 16. Teacher Revenue Dashboard (Admin View)

**Path**: `/admin/teachers/{teacherId}/revenue`

**Purpose**: View revenue for a specific teacher

**Components**:

- Revenue summary cards (same as teacher view)
- Monthly revenue chart
- Course breakdown table
- Payment transactions table

**APIs Used**:

- `revenueService.getTeacherRevenue(teacherId)`
- `revenueService.getMonthlyRevenue(teacherId, month)`
- `revenueService.getRevenueBreakdown(teacherId)`
- `revenueService.getTeacherPaymentTransactions(teacherId, page, size)`

---

### 17. Revenue Share Configuration

**Path**: `/admin/revenue-share`

**Purpose**: Manage revenue share configurations

**Components**:

- Active configs table:
  - Category (or "Default")
  - Teacher Share %
  - Platform Share %
  - Effective From
  - Effective To
  - Status
- Actions:
  - Create new config
  - Edit config
  - Deactivate config
  - Delete config
- View all configs (including inactive)

**APIs Used**:

- `revenueShareService.getActiveRevenueShareConfigs()`
- `revenueShareService.getAllRevenueShareConfigs()`

---

### 18. Create/Edit Revenue Share Config

**Path**: `/admin/revenue-share/create` or `/admin/revenue-share/{id}/edit`

**Purpose**: Create or edit revenue share configuration

**Components**:

- Category selector (or "Default" checkbox)
- Teacher share percentage input
- Platform share percentage input (auto-calculated to sum to 100%)
- Effective date range picker (from, to)
- Save button

**APIs Used**:

- `revenueShareService.createRevenueShareConfig(payload)`
- `revenueShareService.updateRevenueShareConfig(id, payload)`
- `revenueShareService.getRevenueShareConfigById(id)` - for edit mode

**Validation**:

- Teacher share + Platform share must = 100%
- Effective from must be before effective to
- Cannot overlap with existing configs for same category

---

### 19. ZaloPay Transaction Management

**Path**: `/admin/payments/zalopay`

**Purpose**: Query ZaloPay transaction and refund status

**Components**:

- Order status query:
  - App Trans ID input
  - "Query" button
  - Status display
- Refund status query:
  - M Refund ID input
  - "Query" button
  - Status display

**APIs Used**:

- `paymentService.queryZaloPayOrderStatus(appTransId)`
- `paymentService.queryZaloPayRefundStatus(mRefundId)`

---

## User Flows

### Flow 1: Student Course Purchase (Happy Path)

```
1. Student browses courses
   └─> Clicks "Enroll" on course detail page

2. Redirected to Checkout Page
   └─> Course summary displayed
   └─> Selects payment gateway (VNPay/ZaloPay/MoMo)
   └─> Clicks "Pay Now"
   └─> API: paymentService.createPayment(courseId, gateway)

3. Redirected to Payment Gateway
   └─> Student enters payment details
   └─> Completes payment

4. Payment Gateway redirects back to app
   └─> Redirected to /learner/payment/callback
   └─> API: paymentService.verifyPayment(params) - auto-called
   └─> Backend webhook receives callback from gateway (unified endpoint)
   └─> Backend creates enrollment automatically

5. Payment Success Page shown
   └─> "Payment Successful" message
   └─> "Go to My Courses" button

6. Student clicks "Go to My Courses"
   └─> Redirected to /learner/my-courses
   └─> Newly enrolled course appears
```

---

### Flow 2: Teacher Revenue Check and Payout Request

```
1. Teacher logs in
   └─> Navigates to Revenue Dashboard (/teacher/revenue)
   └─> API: revenueService.getMyRevenue()
   └─> See summary: Total Revenue, Paid Out, Available for Payout

2. Teacher checks revenue breakdown
   └─> Views course revenue table on same page
   └─> API: revenueService.getMyRevenueBreakdown()
   └─> Sees revenue per course

3. Teacher clicks "Request Payout"
   └─> Redirected to /teacher/payouts/create
   └─> API: payoutService.getMyAvailablePayoutAmount()
   └─> Available amount shown

4. Teacher fills payout form
   └─> Enters amount (≤ available amount)
   └─> Selects payout method (Bank Transfer)
   └─> Enters bank details
   └─> Adds notes (optional)
   └─> Clicks "Submit Request"
   └─> API: payoutService.createPayoutRequest(payload)

5. Payout request created
   └─> Success message shown
   └─> Redirected to /teacher/payouts
   └─> API: payoutService.getMyPayouts()
   └─> New request shown with status "Pending"

6. Teacher waits for admin approval
   └─> Can view status in "My Payout Requests"
   └─> Email notification when status changes
```

---

### Flow 3: Admin Payout Approval Process

```
1. Admin logs in
   └─> Navigates to Payout Dashboard (/admin/payouts)
   └─> API: payoutService.getAllPayouts()
   └─> API: payoutService.getPendingPayoutsCount() - for badge
   └─> Sees pending payout requests (badge shows count)

2. Admin reviews payout request
   └─> Clicks on pending request to view details
   └─> See teacher info, amount, bank details, notes
   └─> Verifies available amount
   └─> API: revenueService.getTeacherRevenue(teacherId)

3. Admin decides to approve
   └─> Clicks "Complete Payout" button
   └─> Modal opens with form:
      - Transaction reference input
      - Notes input
   └─> Admin processes actual bank transfer (outside system)
   └─> Admin enters transaction reference from bank
   └─> Clicks "Confirm Completion"
   └─> API: payoutService.completePayout(id, payload)

4. Payout marked as completed
   └─> Status changes to "Completed"
   └─> Teacher receives email notification
   └─> Teacher's available amount updated
   └─> Teacher can see completed payout in their dashboard
```

Alternative: Admin rejects payout

```
3. Admin decides to reject
   └─> Clicks "Reject Payout" button
   └─> Modal opens with rejection reason input
   └─> Admin enters reason (e.g., "Insufficient information")
   └─> Clicks "Confirm Rejection"
   └─> API: payoutService.rejectPayout(id, payload)

4. Payout marked as rejected
   └─> Status changes to "Rejected"
   └─> Teacher receives email notification with reason
   └─> Amount becomes available again for new request
```

---

### Flow 4: Admin Revenue Share Configuration

```
1. Admin navigates to Revenue Share Config page
   └─> Path: /admin/revenue-share
   └─> API: revenueShareService.getActiveRevenueShareConfigs()
   └─> See current active configs for each category + default

2. Admin wants to create new config for "Programming" category
   └─> Clicks "Create New Config"
   └─> Redirected to /admin/revenue-share/create

3. Admin fills config form
   └─> Selects category: "Programming"
   └─> Sets teacher share: 75%
   └─> Platform share auto-calculated: 25%
   └─> Sets effective from: 2024-06-01
   └─> Sets effective to: 2024-12-31
   └─> Clicks "Save"
   └─> API: revenueShareService.createRevenueShareConfig(payload)

4. Config created
   └─> Success message shown
   └─> Redirected back to config list
   └─> New config shown in active configs table

5. Config becomes effective on 2024-06-01
   └─> All new payments for Programming courses use 75/25 split
   └─> Old configs still apply to payments before effective date

6. Admin wants to update config
   └─> Clicks "Edit" on config
   └─> Redirected to /admin/revenue-share/{id}/edit
   └─> API: revenueShareService.getRevenueShareConfigById(id)
   └─> Changes teacher share to 80%
   └─> Clicks "Save"
   └─> API: revenueShareService.updateRevenueShareConfig(id, payload)

7. Admin wants to deactivate old config
   └─> Clicks "Deactivate" on expired config
   └─> Confirmation dialog shown
   └─> Clicks "Confirm"
   └─> API: revenueShareService.deactivateRevenueShareConfig(id)
   └─> Config removed from active list
```

---

### Flow 5: Payment Failure and Retry

```
1. Student completes payment successfully
   └─> Payment gateway confirms payment
   └─> Backend receives webhook callback
   └─> Backend tries to create enrollment
   └─> ❌ Enrollment creation fails (e.g., database error)
   └─> Payment status: COMPLETED
   └─> Enrollment status: PENDING

2. Student sees success message but no enrollment
   └─> Student contacts support

3. Admin investigates
   └─> Navigates to Payment Dashboard
   └─> API: paymentService.getAllPayments()
   └─> Searches for student's payment
   └─> Clicks "Check Enrollment Status"
   └─> API: paymentService.checkEnrollmentStatus(paymentId)
   └─> See "Enrollment Pending" status

4. Admin retries enrollment
   └─> Clicks "Retry Enrollment" button
   └─> Confirmation dialog shown
   └─> Clicks "Confirm"
   └─> API: paymentService.retryEnrollment(paymentId)

5. Enrollment created successfully
   └─> Success message shown
   └─> Student can now access course
   └─> Admin notifies student via email
```

---

### Flow 6: Payment Refund Process

```
1. Student requests refund (via email/support)
   └─> Admin reviews request

2. Admin navigates to Payment Dashboard
   └─> Path: /admin/payments
   └─> API: paymentService.getAllPayments()
   └─> Searches for student's payment by student ID or course

3. Admin clicks on payment to view details
   └─> Verifies payment is eligible for refund:
      - Status: COMPLETED
      - Within refund policy period
      - Student hasn't accessed too much content

4. Admin initiates refund
   └─> Clicks "Refund" button
   └─> Refund modal opens
   └─> Admin enters refund reason
   └─> Clicks "Confirm Refund"
   └─> API: paymentService.refundPayment(id, { reason })

5. Backend processes refund
   └─> Calls payment gateway API to refund
   └─> Updates payment status to REFUNDED
   └─> Removes student's enrollment
   └─> Adjusts teacher's revenue

6. Refund completed
   └─> Success message shown to admin
   └─> Payment status changes to "Refunded"
   └─> Student receives refund notification
   └─> Money returned to student's account (via gateway)

7. Teacher sees revenue adjustment
   └─> Teacher's revenue dashboard updated
   └─> API: revenueService.getMyRevenue()
   └─> Available payout amount decreased
   └─> Refunded transaction shown in payment transactions
```

---

## Key Considerations

### Security

- All payment callbacks from gateways verified with signatures
- Student can only see their own payments and payouts
- Teacher can only see their own revenue and create their own payouts
- Admin has full access to all billing data

### Error Handling

- Payment gateway errors: Show user-friendly message, log details for admin
- Enrollment failure after payment: Automatic retry mechanism + admin manual retry
- Payout validation: Check available amount before allowing request
- Revenue share validation: Prevent overlapping configs for same category

### Notifications

- Email notifications for:
  - Student: Payment success/failure, refund processed
  - Teacher: Payout status changes (approved, completed, rejected), revenue milestones
  - Admin: New payout requests, failed enrollments

### Performance

- Use pagination for large lists (payments, payouts, transactions)
- Cache revenue calculations for better performance
- Index database queries by student ID, teacher ID, course ID, status

### Audit Trail

- Log all payment state changes
- Log all payout state changes
- Log all revenue share config changes
- Track who approved/rejected payouts

---

## Summary

Total screens designed: **19 screens**

### By Role:

- **Student**: 3 screens
- **Teacher**: 8 screens
- **Admin**: 8 screens

### Main Flows:

- Payment flow (student → gateway → verification → enrollment)
- Revenue tracking (teacher views revenue breakdown and history)
- Payout flow (teacher requests → admin approves → completion)
- Revenue share configuration (admin manages split percentages)
- Error handling (enrollment retry, refund process)
