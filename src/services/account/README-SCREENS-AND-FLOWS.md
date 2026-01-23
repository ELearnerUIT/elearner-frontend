# Account Module - Screens and User Flows

This document outlines the recommended screens and user flows for the Account module, covering profile management and admin account management functionality.

---

## Table of Contents

1. [User Profile Screens](#user-profile-screens)
2. [Admin Account Management Screens](#admin-account-management-screens)
3. [Import/Export Screens](#importexport-screens)
4. [User Flows](#user-flows)

---

## User Profile Screens

### 1. My Profile Page

**Path**: `/profile` or `/settings/profile`

**Purpose**: Current user views and edits their own profile

**Components**:

- Profile header:
  - Avatar with hover effect
  - Click to change avatar (file upload dialog)
  - User role badge (Student/Teacher/Admin)
  - Account status badge (Active/Pending/Suspended)
- Basic account information (readonly):
  - Username
  - Email
  - Account ID
  - Member Since (createdAt)
  - Last Login
- Editable profile fields:
  - Full Name
  - Phone
  - Birth Date (date picker)
  - Gender (dropdown: Male, Female, Other)
  - Bio (textarea)
- **For Teachers only**:
  - Specialty (text input)
  - Degree (text input)
  - Approval Status (readonly badge)
  - Rejection Reason (if rejected, readonly)
- **For Students only**:
  - Student Code (readonly)
- Action buttons:
  - Save Changes (enabled only when form is dirty)
  - Cancel (reset form)

**APIs Used**:

- `accountService.getProfile()` - load current user profile
- `accountService.updateProfile(payload)` - save changes
- `accountService.uploadAvatar(file)` - upload new avatar

**Validation**:

- Full name: min 2 characters
- Phone: valid phone format
- Birth date: must be in past, user must be at least 13 years old
- Bio: max 500 characters

---

### 2. Avatar Upload Modal

**Triggered by**: Clicking avatar on profile page

**Purpose**: Upload and crop avatar image

**Components**:

- File upload area (drag & drop or click to browse)
- Image preview with crop tool
- Accepted formats: JPG, PNG, WEBP
- Max file size: 5MB
- Crop controls:
  - Zoom slider
  - Rotate buttons
  - Aspect ratio: 1:1 (square)
- Action buttons:
  - Upload & Save
  - Cancel

**APIs Used**:

- `accountService.uploadAvatar(file)`

**Flow**:

1. User selects image file
2. Preview shown with crop tool
3. User adjusts crop/zoom/rotation
4. Click "Upload & Save"
5. API call with cropped image
6. Avatar updated in profile
7. Success notification shown

---

## Admin Account Management Screens

### 3. Account Management Dashboard

**Path**: `/admin/accounts`

**Purpose**: Admin overview of all accounts in the system

**Components**:

- Statistics cards:
  - Total Accounts
  - Active Accounts
  - Suspended Accounts
  - Pending Verification
- Role distribution chart (pie/donut):
  - Students
  - Teachers
  - Admins
- Status distribution chart (bar chart)
- Recent account activity list:
  - New registrations (last 7 days)
  - Recent suspensions
  - Recent activations
- Quick actions:
  - View All Accounts
  - Import Students
  - Export Accounts
  - Download Template

**APIs Used**:

- Custom statistics endpoint (or aggregate from getAllAccounts)

---

### 4. All Accounts List

**Path**: `/admin/accounts/list`

**Purpose**: Admin views paginated list of all accounts with advanced filtering

**Components**:

- Advanced filter panel (collapsible):
  - Search by keyword (username, email, name)
  - Filter by Role (All, Student, Teacher, Admin)
  - Filter by Status (All, Active, Pending, Suspended, Deactivated, Inactive)
  - Filter by Date Range (created date)
  - Spring Filter text input (advanced users)
  - Clear All Filters button
- Accounts table:
  - Avatar thumbnail
  - Username
  - Email
  - Full Name
  - Role (badge)
  - Status (badge with color coding)
  - Student/Teacher Code (if applicable)
  - Last Login
  - Created At
  - Actions dropdown:
    - View Details
    - Change Status
    - Suspend (if active)
    - Unlock (if suspended)
    - Deactivate (if active)
    - View Logs
    - Delete (with confirmation)
- Bulk actions (checkboxes):
  - Select multiple accounts
  - Bulk Export Selected
  - Bulk Change Status (with confirmation)
- Pagination controls
- Per-page size selector (10, 20, 50, 100)
- Export All button (with current filters)

**APIs Used**:

- `accountService.getAllAccounts(page, size, filter)` - main data
- `accountService.exportAccounts(filter, type)` - export functionality

**Status Badge Colors**:

- ACTIVE: Green
- PENDING: Yellow/Orange
- SUSPENDED: Red
- DEACTIVATED: Gray
- INACTIVE: Light gray

---

### 5. Account Detail Page

**Path**: `/admin/accounts/{id}`

**Purpose**: Admin views comprehensive information about a specific account

**Components**:

- Account header:
  - Large avatar
  - Username
  - Email
  - Role badge
  - Status badge
  - Quick actions (Suspend, Unlock, Deactivate, Delete)
- Account information tabs:
  - **Profile Tab**:
    - All profile fields (readonly)
    - Account ID, created date, last login
    - For students: student code, enrolled courses count
    - For teachers: teacher code, specialty, degree, approval status
  - **Activity Logs Tab**:
    - Paginated activity log table
    - Filter by action type
    - Columns: Date, Action, Performed By, Reason, Status Change, IP Address
    - Export logs button
  - **Related Data Tab** (links to other modules):
    - For students: Enrolled courses, Payment history, Certificates
    - For teachers: Created courses, Students taught, Revenue
- Admin action panel:
  - Change Status form:
    - Status dropdown
    - Reason textarea
    - Submit button
  - Quick action buttons:
    - Suspend Account
    - Unlock Account
    - Deactivate Account
    - Delete Account (with strong confirmation)

**APIs Used**:

- `accountService.getAccountById(id)` - account details
- `accountService.getAccountActivityLogs(id, actionType, page, size)` - activity logs
- `accountService.changeAccountStatus(id, payload)` - change status
- `accountService.suspendAccount(id, payload)` - suspend
- `accountService.unlockAccount(id, payload)` - unlock
- `accountService.deactivateAccount(id, payload)` - deactivate
- `accountService.deleteAccountById(id)` - delete

---

### 6. Change Account Status Modal

**Triggered by**: "Change Status" action on account detail page

**Purpose**: Admin changes account status with reason

**Components**:

- Current status display (readonly)
- New status selector (dropdown):
  - ACTIVE
  - SUSPENDED
  - DEACTIVATED
  - INACTIVE
- Reason textarea (optional but recommended)
- Warning message for destructive actions
- Action buttons:
  - Confirm Change
  - Cancel

**APIs Used**:

- `accountService.changeAccountStatus(id, { status, reason })`

**Validation**:

- Cannot change to same status
- Some transitions may be restricted (shown in warning)

---

### 7. Account Action Confirmation Dialog

**Triggered by**: Suspend, Unlock, Deactivate, Delete actions

**Purpose**: Confirm destructive admin actions

**Components**:

- Warning icon
- Action description (e.g., "You are about to suspend this account")
- Account info summary (username, email)
- Reason input (optional for suspend/unlock/deactivate, not shown for delete)
- Warning message (especially for delete: "This action is IRREVERSIBLE")
- Confirmation checkbox: "I understand the consequences"
- Action buttons:
  - Confirm [Action] (red button)
  - Cancel

**Flow**:

1. Admin clicks action button
2. Confirmation dialog appears
3. Admin reads warning and enters reason
4. Admin checks confirmation checkbox
5. Clicks confirm button
6. API call executes
7. Success/error notification
8. Page refreshes with updated data

---

### 8. Activity Logs Viewer

**Can be**: Tab in account detail page or separate modal

**Purpose**: View detailed activity logs for an account

**Components**:

- Filter controls:
  - Action Type dropdown (All, Approve, Reject, Suspend, Unlock, Deactivate)
  - Date Range picker
  - Search by performer username
- Activity log table:
  - Date & Time
  - Action Type (badge with icon)
  - Performed By (username of admin)
  - Reason
  - Status Change (Old → New)
  - IP Address
- Pagination controls
- Export Logs button (CSV)

**APIs Used**:

- `accountService.getAccountActivityLogs(id, actionType, page, size)`

---

## Import/Export Screens

### 9. Student Import Page

**Path**: `/admin/accounts/import`

**Purpose**: Admin bulk imports students from Excel file

**Components**:

- Instructions panel:
  - Step-by-step guide
  - Required fields list
  - Optional fields list
  - Data format requirements
  - Sample data examples
- Download template button:
  - "Download Excel Template" (prominent button)
  - Shows template file name
- File upload area:
  - Drag & drop zone
  - "Choose File" button
  - Shows selected file name and size
  - Accepts .xlsx only
- Import preview (after file selected):
  - Shows first 5 rows
  - Column mapping preview
  - Total rows count
- Import button (enabled only after file selected)
- Import progress:
  - Progress bar during upload/processing
  - "Processing X of Y rows..."
- Import results (after completion):
  - Success count (green)
  - Failure count (red)
  - Total processed
  - Detailed error table:
    - Row number
    - Field
    - Error message
    - Value
  - Download Error Report (CSV)
  - Import Another File button

**APIs Used**:

- `accountService.downloadImportTemplate()` - download template
- `accountService.importStudents(file)` - import file

**Validation**:

- File must be .xlsx format
- File size limit: 10MB
- Max rows: 1000 per import

---

### 10. Account Export Page

**Path**: `/admin/accounts/export`

**Purpose**: Admin exports filtered account data

**Components**:

- Export format selection:
  - Excel (radio button, default)
  - CSV (radio button)
- Filter options (same as account list):
  - Role filter
  - Status filter
  - Date range
  - Spring Filter text input
- Fields to export (checkboxes):
  - Select All checkbox
  - **Basic fields**:
    - Account ID
    - Username
    - Email
    - Role
    - Status
  - **Profile fields**:
    - Full Name
    - Phone
    - Birth Date
    - Gender
    - Bio
  - **Student fields** (if role includes student):
    - Student Code
  - **Teacher fields** (if role includes teacher):
    - Teacher Code
    - Specialty
    - Degree
    - Approval Status
  - **Account fields**:
    - Created At
    - Last Login At
- Preview section:
  - Shows count: "X accounts will be exported"
  - Shows file size estimate
- Export button
- Download progress indicator

**APIs Used**:

- `accountService.getAllAccounts(page, size, filter)` - preview count
- `accountService.exportAccounts(filter, type)` - download file

**Flow**:

1. Admin selects format (Excel/CSV)
2. Admin applies filters
3. Admin selects fields to export
4. Preview shows account count
5. Click "Export" button
6. File downloads automatically
7. Success notification shown

---

## User Flows

### Flow 1: User Profile Update

```
1. User navigates to profile page
   └─> Path: /profile
   └─> API: accountService.getProfile()
   └─> Profile data loaded and displayed

2. User views current information
   └─> Avatar, name, email, phone, bio, etc.
   └─> All fields populated with current values

3. User clicks "Edit" or fields are directly editable
   └─> Form fields become enabled

4. User updates information
   └─> Changes full name from "John Doe" to "John Smith"
   └─> Updates phone number
   └─> Adds bio text
   └─> Form validation runs on blur

5. User clicks "Save Changes"
   └─> Validation runs on all fields
   └─> If valid:
      └─> API: accountService.updateProfile(payload)
      └─> Loading state shown on button
   └─> If invalid:
      └─> Error messages shown next to invalid fields
      └─> Form stays in edit mode

6. Update succeeds
   └─> Success notification: "Profile updated successfully"
   └─> Form returns to readonly mode
   └─> Updated data displayed
   └─> User can see new information
```

---

### Flow 2: Avatar Upload

```
1. User on profile page
   └─> Hovers over avatar
   └─> "Change Avatar" tooltip appears

2. User clicks on avatar
   └─> Avatar upload modal opens
   └─> File picker ready

3. User selects image file
   └─> Drag & drop or click "Choose File"
   └─> File selected: "profile.jpg" (2.3 MB)

4. Image preview loads
   └─> Image displayed in crop tool
   └─> Zoom slider at 100%
   └─> Crop area shown (square aspect ratio)

5. User adjusts crop
   └─> Drags crop area to focus on face
   └─> Adjusts zoom to 120%
   └─> Rotates 90° if needed

6. User clicks "Upload & Save"
   └─> Image cropped to selection
   └─> API: accountService.uploadAvatar(file)
   └─> Progress bar shown

7. Upload completes
   └─> API returns: { avatarUrl, thumbnailUrl }
   └─> Modal closes
   └─> Avatar updated in profile
   └─> Success notification: "Avatar updated successfully"
   └─> New avatar visible immediately
```

---

### Flow 3: Admin Account Search and Management

```
1. Admin logs in
   └─> Redirected to Admin Dashboard

2. Admin navigates to Account Management
   └─> Path: /admin/accounts
   └─> Dashboard statistics shown

3. Admin clicks "View All Accounts"
   └─> Redirected to /admin/accounts/list
   └─> API: accountService.getAllAccounts(page, size)
   └─> Default view: All accounts, page 1, size 20

4. Admin applies filters
   └─> Opens filter panel
   └─> Selects Role: "Teacher"
   └─> Selects Status: "Suspended"
   └─> API: accountService.getAllAccounts(0, 20, "role:'TEACHER' and status:'SUSPENDED'")
   └─> Filtered results shown
   └─> "X results found" message displayed

5. Admin searches for specific user
   └─> Types in search box: "john@example.com"
   └─> Search triggers on Enter or after typing stops
   └─> API: accountService.getAllAccounts(0, 20, "email~'*john@example.com*'")
   └─> Results filtered to matching accounts

6. Admin clicks on an account to view details
   └─> Redirected to /admin/accounts/{id}
   └─> API: accountService.getAccountById(id)
   └─> Comprehensive account information displayed

7. Admin reviews account details
   └─> Sees profile information
   └─> Checks activity logs tab
   └─> API: accountService.getAccountActivityLogs(id)
   └─> Views history of admin actions

8. Admin decides to unlock suspended account
   └─> Clicks "Unlock Account" button
   └─> Confirmation dialog appears
   └─> Admin enters reason: "User resolved issue"
   └─> Checks confirmation checkbox
   └─> Clicks "Confirm Unlock"
   └─> API: accountService.unlockAccount(id, { reason: "User resolved issue" })

9. Unlock succeeds
   └─> Success notification: "Account unlocked successfully"
   └─> Status badge changes from "Suspended" to "Active"
   └─> Activity log shows new entry: "UNLOCK by admin.username"
   └─> User can now login again
```

---

### Flow 4: Bulk Student Import

```
1. Admin navigates to Import page
   └─> Path: /admin/accounts/import
   └─> Instructions displayed

2. Admin downloads template
   └─> Clicks "Download Excel Template"
   └─> API: accountService.downloadImportTemplate()
   └─> File downloaded: "student_import_template.xlsx"
   └─> Opens in Excel

3. Admin prepares import file
   └─> Fills in student data following template
   └─> Row 2: john.doe, john@example.com, password123, John Doe, 555-1234, 2000-01-01, Male, Biology student
   └─> Row 3: jane.smith, jane@example.com, password456, Jane Smith, 555-5678, 2001-02-15, Female, Chemistry student
   └─> ... (adds 50 students total)
   └─> Saves file as "students_batch1.xlsx"

4. Admin uploads file
   └─> Returns to import page
   └─> Drag & drops "students_batch1.xlsx" into upload area
   └─> File selected message: "students_batch1.xlsx (45 KB)"
   └─> Preview shows first 5 rows
   └─> Total rows: 50 (excluding header)

5. Admin reviews preview
   └─> Checks columns are mapped correctly
   └─> Data looks good
   └─> Clicks "Import Students" button

6. Import processing
   └─> API: accountService.importStudents(file)
   └─> Progress bar shown: "Processing 25 of 50 rows..."
   └─> Takes ~30 seconds

7. Import completes
   └─> Results displayed:
      - Success: 48 students
      - Failures: 2 students
      - Total Processed: 50
   └─> Error table shown:
      Row 15: email - "Email already exists" - "john@example.com"
      Row 32: password - "Password too short" - "pass"

8. Admin handles errors
   └─> Downloads error report (CSV)
   └─> Fixes issues in original file:
      - Row 15: Changes email to "john.doe2@example.com"
      - Row 32: Changes password to "password123"
   └─> Prepares new file with only 2 corrected rows
   └─> Re-imports corrected file

9. Second import succeeds
   └─> Success: 2 students
   └─> Total imported across both batches: 50 students
   └─> All students receive verification emails
   └─> Success notification: "Import completed successfully"
```

---

### Flow 5: Account Export with Filters

```
1. Admin on accounts list page
   └─> Path: /admin/accounts/list
   └─> Viewing filtered list of teachers

2. Admin wants to export this data
   └─> Clicks "Export" button in toolbar
   └─> Export modal/page opens
   └─> OR navigates to /admin/accounts/export

3. Export page loads
   └─> Current filters pre-applied:
      - Role: Teacher
      - Status: Active
   └─> Preview shows: "243 accounts will be exported"

4. Admin configures export
   └─> Selects format: Excel (default)
   └─> Reviews filter settings (already set from list page)
   └─> Selects fields to export:
      ✅ Account ID
      ✅ Username
      ✅ Email
      ✅ Full Name
      ✅ Phone
      ✅ Teacher Code
      ✅ Specialty
      ✅ Degree
      ✅ Approval Status
      ❌ Birth Date (unchecked)
      ❌ Bio (unchecked)

5. Admin reviews preview
   └─> Count confirmed: 243 accounts
   └─> Estimated file size: ~1.2 MB
   └─> Fields selected: 9 columns

6. Admin clicks "Export" button
   └─> API: accountService.exportAccounts(filter, 'EXCEL')
   └─> Progress indicator shown
   └─> "Generating export file..."

7. Export completes
   └─> File downloads automatically
   └─> Filename: "accounts_export_2026-01-23_14-30-45.xlsx"
   └─> Success notification: "243 accounts exported successfully"

8. Admin opens file
   └─> Excel file contains:
      - Header row with column names
      - 243 data rows
      - All selected fields present
      - Formatted columns
      - Filters on header row
      - Frozen header row
   └─> Admin can now analyze data offline
```

---

### Flow 6: Admin Suspends Abusive Account

```
1. Admin receives report of abusive user
   └─> Report: User "baduser" posting spam

2. Admin searches for account
   └─> Path: /admin/accounts/list
   └─> Searches keyword: "baduser"
   └─> API: accountService.getAllAccounts(0, 20, "username:'baduser'")
   └─> Account found in results

3. Admin opens account details
   └─> Clicks on account row
   └─> Redirected to /admin/accounts/{id}
   └─> API: accountService.getAccountById(id)
   └─> Account information displayed
   └─> Current status: ACTIVE

4. Admin reviews account
   └─> Checks activity logs
   └─> API: accountService.getAccountActivityLogs(id)
   └─> Confirms suspicious activity
   └─> Decides to suspend account

5. Admin clicks "Suspend Account" button
   └─> Confirmation dialog appears:
      - Warning: "You are about to suspend this account"
      - Account info: "Username: baduser, Email: bad@example.com"
      - Reason input field
      - Checkbox: "I understand this will prevent user login"

6. Admin fills in reason
   └─> Enters: "Posting spam content. Multiple user reports."
   └─> Checks confirmation checkbox
   └─> Clicks "Confirm Suspend" (red button)

7. Suspend action executes
   └─> API: accountService.suspendAccount(id, { reason: "..." })
   └─> Loading state on button

8. Suspension succeeds
   └─> Success notification: "Account suspended successfully"
   └─> Status badge changes: ACTIVE → SUSPENDED (red)
   └─> Activity logs tab updates automatically:
      - New entry: "SUSPEND by admin.username at 2026-01-23 14:45:30"
      - Reason: "Posting spam content. Multiple user reports."
      - Status change: ACTIVE → SUSPENDED
      - IP address: 192.168.1.100

9. Immediate effects
   └─> User "baduser" immediately logged out from all sessions
   └─> Future login attempts blocked
   └─> Email notification sent to user: "Your account has been suspended"
   └─> User can contact support to appeal

10. Later: User resolves issue
    └─> User contacts support
    └─> Support team reviews case
    └─> Admin decides to unlock account
    └─> Clicks "Unlock Account" button
    └─> Enters reason: "User acknowledged violation and agreed to terms"
    └─> API: accountService.unlockAccount(id, { reason: "..." })
    └─> Status: SUSPENDED → ACTIVE
    └─> User can login again
    └─> Email notification: "Your account has been unlocked"
```

---

## Key Considerations

### Security & Privacy

- Users can only view/edit their own profile
- Admins have full access to all accounts
- All admin actions logged with audit trail
- Passwords never displayed anywhere
- Sensitive operations require confirmation
- IP addresses tracked for security

### User Experience

- Inline form validation with helpful messages
- Loading states during API calls
- Success/error notifications
- Confirmation dialogs for destructive actions
- Progress indicators for long operations (import, export)
- Preview before executing (import preview, export count)

### Performance

- Paginated lists for large datasets
- Lazy loading for images (avatars)
- Efficient filtering using backend queries
- Chunked file uploads for large imports
- Streaming downloads for large exports

### Accessibility

- Keyboard navigation support
- Screen reader friendly labels
- Color-blind safe status colors
- Focus indicators
- Alt text for avatars

### Error Handling

- Clear error messages for validation
- Detailed import error reports
- Graceful handling of network failures
- Retry mechanisms for failed uploads
- Rollback for failed batch operations

### Notifications

- Email notifications for:
  - Account status changes (user)
  - Suspension/unlock (user)
  - Successful import (admin)
  - Failed verification (user)
- In-app notifications for real-time updates

---

## Summary

Total screens designed: **10 screens**

### By Role:

- **All Authenticated Users**: 2 screens (My Profile, Avatar Upload Modal)
- **Admin Only**: 8 screens (Dashboard, List, Detail, Modals, Import, Export)

### Main Flows:

- User profile update (any authenticated user)
- Avatar upload with crop tool
- Admin account search and filtering
- Admin account status management (suspend, unlock, deactivate)
- Bulk student import from Excel
- Filtered account export (Excel/CSV)

### Key Features:

- Role-aware profile fields (Student vs Teacher)
- Comprehensive admin account management
- Activity logging for all admin actions
- Bulk operations (import, export)
- Advanced filtering with Spring Filter support
- File upload/download with progress indicators
- Confirmation dialogs for destructive actions
- Detailed error reporting for imports

### Status Management:

Five account statuses with controlled transitions:

- **ACTIVE**: Normal operating status
- **PENDING**: Awaiting email verification
- **SUSPENDED**: Temporarily blocked by admin
- **DEACTIVATED**: Soft deleted
- **INACTIVE**: System-marked inactive

### Import/Export Features:

- Excel template download
- Batch student import with validation
- Detailed error reporting
- Multiple export formats (Excel, CSV)
- Filtered exports matching list view
- Customizable field selection
