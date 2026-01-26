# Account Module - API Mapping

This document maps the backend APIs to frontend services for the Account module, which includes profile management and admin account management functionality.

## Overview

- **Backend Controller**: 1 (AccountController)
- **Backend APIs**: 14 endpoints
- **Frontend Services**: 1 (account.service.ts)
- **Frontend APIs**: 14 methods

---

## Profile Management APIs

### 1. Get Current User Profile

- **Frontend**: `accountService.getProfile()`
- **Backend**: `GET /accounts/me`
- **Role**: `@Authenticated`
- **Description**: Retrieve the profile information of the currently authenticated user. Returns account details including role-specific profile data (student or teacher).
- **Response**: `AccountProfileResponse { accountId, username, email, role, status, avatarUrl, lastLoginAt, profile }`

### 2. Upload User Avatar

- **Frontend**: `accountService.uploadAvatar(file)`
- **Backend**: `POST /accounts/me/avatar`
- **Role**: `@Authenticated`
- **Description**: Upload a new avatar image for the authenticated user. Accepts JPG, PNG, and WEBP formats. Returns both full-size and thumbnail URLs.
- **Request**: `FormData` with file
- **Response**: `UploadAvatarResponse { avatarUrl, thumbnailUrl }`

### 3. Update User Profile

- **Frontend**: `accountService.updateProfile(payload)`
- **Backend**: `PUT /accounts/me`
- **Role**: `@Authenticated`
- **Description**: Update profile information for the currently authenticated user. Fields vary by role (students can update basic info, teachers can also update specialty and degree).
- **Request**: `UpdateProfileRequest { fullName, birthDate, phone, bio, gender, specialty?, degree? }`
- **Response**: `AccountProfileResponse`

---

## Admin Account Management APIs

### 4. Get All Accounts

- **Frontend**: `accountService.getAllAccounts(page, size, filter)`
- **Backend**: `GET /admin/accounts`
- **Role**: `@AdminOnly`
- **Description**: Retrieve a paginated list of all user accounts with filtering support. Supports complex filtering using Spring Filter syntax.
- **Query Params**:
  - `page` - Page number (0-indexed)
  - `size` - Page size
  - `filter` - Spring Filter specification string (e.g., "role:'TEACHER' and status:'ACTIVE'")
- **Response**: `PageResponse<AccountResponse>`

### 5. Get Account by ID

- **Frontend**: `accountService.getAccountById(id)`
- **Backend**: `GET /admin/accounts/{id}`
- **Role**: `@AdminOnly`
- **Description**: Retrieve detailed information about a specific account by its ID. Includes full profile data with role-specific fields.
- **Response**: `AccountProfileResponse`

### 6. Change Account Status

- **Frontend**: `accountService.changeAccountStatus(id, payload)`
- **Backend**: `PATCH /admin/accounts/{id}/status`
- **Role**: `@AdminOnly`
- **Description**: Update the status of an account (e.g., ACTIVE, SUSPENDED, DEACTIVATED, PENDING, INACTIVE). Creates activity log entry.
- **Request**: `UpdateStatusRequest { status, reason? }`
- **Response**: `AccountProfileResponse`

### 7. Suspend Account

- **Frontend**: `accountService.suspendAccount(id, payload?)`
- **Backend**: `POST /admin/accounts/{id}/suspend`
- **Role**: `@AdminOnly`
- **Description**: Suspend an active account with optional reason. Sets status to SUSPENDED and logs the action.
- **Request**: `AccountActionRequest { reason? }`
- **Response**: `AccountProfileResponse`

### 8. Unlock Suspended Account

- **Frontend**: `accountService.unlockAccount(id, payload?)`
- **Backend**: `POST /admin/accounts/{id}/unlock`
- **Role**: `@AdminOnly`
- **Description**: Unlock a suspended account with optional reason. Restores account to ACTIVE status.
- **Request**: `AccountActionRequest { reason? }`
- **Response**: `AccountProfileResponse`

### 9. Deactivate Account

- **Frontend**: `accountService.deactivateAccount(id, payload?)`
- **Backend**: `POST /admin/accounts/{id}/deactivate`
- **Role**: `@AdminOnly`
- **Description**: Deactivate an active account with optional reason. Sets status to DEACTIVATED (soft delete).
- **Request**: `AccountActionRequest { reason? }`
- **Response**: `AccountProfileResponse`

### 10. Get Account Activity Logs

- **Frontend**: `accountService.getAccountActivityLogs(id, actionType?, page, size)`
- **Backend**: `GET /admin/accounts/{id}/logs`
- **Role**: `@AdminOnly`
- **Description**: Retrieve paginated activity logs for a specific account with optional filtering by action type. Shows all admin actions performed on the account.
- **Query Params**:
  - `actionType` - Filter by action type (APPROVE, REJECT, SUSPEND, UNLOCK, DEACTIVATE)
  - `page`, `size` - Pagination
- **Response**: `PageResponse<AccountActionLogResponse>`

### 11. Delete Account

- **Frontend**: `accountService.deleteAccountById(id)`
- **Backend**: `DELETE /admin/accounts/{id}`
- **Role**: `@AdminOnly`
- **Description**: Permanently delete an account by its ID. This action is irreversible. Use with extreme caution.
- **Response**: `void` (204 No Content)

---

## Import/Export APIs (Admin Only)

### 12. Download Student Import Template

- **Frontend**: `accountService.downloadImportTemplate()`
- **Backend**: `GET /admin/accounts/import-template`
- **Role**: `@AdminOnly`
- **Description**: Download Excel template file for bulk student import. The template includes sample data and proper formatting for all required fields.
- **Response**: `Blob` (Excel file download)

### 13. Bulk Import Students

- **Frontend**: `accountService.importStudents(file)`
- **Backend**: `POST /admin/accounts/import`
- **Role**: `@AdminOnly`
- **Description**: Import multiple students from Excel file. The file should follow the template format. Returns a detailed report with success/failure counts and error details for failed rows. Successfully imported students will receive verification emails.
- **Request**: `FormData` with Excel file (.xlsx)
- **Response**: `ImportResultResponse { successCount, failureCount, totalProcessed, errors[] }`

### 14. Export Accounts

- **Frontend**: `accountService.exportAccounts(filter?, type)`
- **Backend**: `GET /admin/accounts/export`
- **Role**: `@AdminOnly`
- **Description**: Export filtered list of accounts to Excel or CSV format. Supports the same filtering capabilities as the account list endpoint. The export includes account details and role-specific information.
- **Query Params**:
  - `filter` - Spring Filter specification string
  - `type` - Export format: EXCEL or CSV (default: EXCEL)
- **Response**: `Blob` (Excel/CSV file download)

---

## Summary

| API Category       | Frontend APIs | Backend APIs | Missing APIs | Extra APIs |
| ------------------ | ------------- | ------------ | ------------ | ---------- |
| Profile Management | 3             | 3            | 0            | 0          |
| Account Management | 8             | 8            | 0            | 0          |
| Import/Export      | 3             | 3            | 0            | 0          |
| **Total**          | **14**        | **14**       | **0**        | **0**      |

### Status: ✅ Complete Mapping

All backend APIs have been successfully mapped to frontend services.

### Changes Made:

- ✅ Added 3 missing APIs: downloadImportTemplate, importStudents, exportAccounts
- ✅ Removed 2 extra APIs: approveTeacherAccount, rejectTeacherAccount (these were incorrectly placed in account service - teacher approval is handled via teacher service)

---

## Role-Based Access Control

### Authenticated User Permissions

- View own profile
- Update own profile
- Upload own avatar

### Admin Permissions

- All authenticated user permissions
- View all accounts with advanced filtering
- View any account details
- Change account status
- Suspend/unlock accounts
- Deactivate accounts
- View account activity logs
- Delete accounts permanently
- Download import template
- Bulk import students
- Export accounts data

---

## Key Features

### Profile Management

- Role-aware profile structure (Student vs Teacher fields)
- Avatar upload with thumbnail generation
- Flexible profile updates (only provided fields are updated)
- Last login tracking

### Account Status Management

- Multiple status types: ACTIVE, PENDING, SUSPENDED, DEACTIVATED, INACTIVE
- Reason tracking for status changes
- Activity logging for audit purposes
- Separate endpoints for common actions (suspend, unlock, deactivate)

### Activity Logging

- Tracks all admin actions on accounts
- Records: action type, reason, old/new status, performer, IP address
- Filterable by action type
- Paginated results

### Bulk Operations

- Excel template for standardized imports
- Batch student import with detailed error reporting
- Flexible export with filtering
- Multiple export formats (Excel, CSV)

---

## API Conventions

### URL Patterns

- User-facing APIs: `/api/v1/accounts/*`
- Admin APIs: `/api/v1/admin/accounts/*`

### Response Formats

- Single resource: Direct object (e.g., `AccountProfileResponse`)
- Multiple resources: `PageResponse<T>` with pagination metadata
- File downloads: `Blob` type with appropriate Content-Type
- Void operations: `void` (204 No Content)

### Error Handling

- 401 Unauthorized: Authentication required
- 403 Forbidden: Insufficient permissions (non-admin trying admin endpoint)
- 404 Not Found: Account not found
- 400 Bad Request: Validation errors or invalid status transitions
- 409 Conflict: Cannot perform action in current state

### File Upload/Download

- Upload: FormData with `multipart/form-data`
- Download: Blob with `responseType: 'blob'`
- Supported image formats: JPG, PNG, WEBP
- Supported import format: Excel (.xlsx)
- Supported export formats: Excel (.xlsx), CSV (.csv)

---

## Account Status Transitions

Valid status transitions:

- PENDING → ACTIVE (after verification)
- ACTIVE → SUSPENDED (by admin)
- SUSPENDED → ACTIVE (by admin unlock)
- ACTIVE → DEACTIVATED (by admin or user)
- ACTIVE → INACTIVE (by system or user)

Invalid transitions will return 400 Bad Request.

---

## Import/Export Details

### Import Template Structure

- Required fields: username, email, password, fullName
- Optional fields: phone, birthDate, gender, bio
- Sample row included in template
- Proper column headers and data formatting

### Import Process

1. Upload Excel file following template format
2. Backend validates each row
3. Creates accounts for valid rows
4. Sends verification emails to new accounts
5. Returns detailed report:
   - Success count
   - Failure count
   - Error details per row (row number, field, message, value)

### Export Features

- Applies same filters as account list
- Includes account details and profile information
- Role-specific fields (student code, teacher code, specialty, degree)
- Formatted columns with headers
- Choice of Excel (rich formatting) or CSV (compatibility)

---

## Security Considerations

### Authentication & Authorization

- All endpoints require authentication (Bearer token)
- Admin endpoints enforce @AdminOnly check
- Users can only access their own profile data
- Activity logs track who performed actions

### Data Privacy

- Passwords never returned in responses
- Sensitive operations require admin role
- IP addresses logged for audit trail
- Account deletion is permanent (use deactivate for soft delete)

### File Upload Security

- File type validation (images: JPG/PNG/WEBP, import: XLSX)
- File size limits enforced
- Malicious file scanning
- Secure file storage with unique names

---

## Best Practices

### For Frontend Developers

1. Use `getProfile()` to fetch current user data
2. Use appropriate status change endpoints instead of generic `changeAccountStatus()`
3. Handle file downloads properly (create blob URL, trigger download, revoke URL)
4. Show detailed import errors to help admins correct issues
5. Implement confirmation dialogs for destructive actions (suspend, deactivate, delete)

### For Backend Developers

1. Always validate status transitions
2. Log all admin actions for audit purposes
3. Send appropriate notifications (email) for status changes
4. Validate import data thoroughly before creating accounts
5. Use transactions for bulk operations

---

## Related Modules

- **Auth Module**: Login, registration, password management
- **User Module**: Student and teacher-specific operations (getStudentById, getTeacherById)
- **Billing Module**: Payment history tied to accounts

**Note**: Teacher approval workflow (approve/reject) is handled in the **Teacher Management** endpoints, not in Account Management.
