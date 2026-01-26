# User Module - Screens and User Flows

This document outlines the recommended screens and user flows for the User module, covering Student, Teacher, and Admin user management functionality.

---

## Table of Contents

1. [Student Screens](#student-screens)
2. [Teacher Screens](#teacher-screens)
3. [Admin Screens](#admin-screens)
4. [User Flows](#user-flows)

---

## Student Screens

### 1. Student Profile Page (Own Profile)

**Path**: `/learner/profile` or `/learner/settings`

**Purpose**: Student views and edits their own profile

**Components**:

- Avatar with upload button (click to change)
- Profile information display/edit:
  - Student Code (readonly)
  - Full Name
  - Email (readonly)
  - Phone
  - Birth Date
  - Gender
  - Bio
- Account information:
  - Username (readonly)
  - Account Status
  - Last Login
  - Member Since (createdAt)
- Save Changes button
- Delete Account button (with confirmation)

**APIs Used**:

- `userService.getStudentById(id)` - load profile data
- `userService.updateStudent(id, payload)` - save changes
- `userService.uploadStudentAvatar(id, file)` - upload new avatar

---

### 2. Student Profile Page (Public View)

**Path**: `/students/{code}` or `/profile/{username}`

**Purpose**: Other users view a student's public profile

**Components**:

- Avatar
- Basic information:
  - Full Name
  - Student Code
  - Bio
- Learning achievements:
  - Total courses enrolled
  - Certificates earned
  - Display certificates (grid)
- Enrolled courses list (if public)

**APIs Used**:

- `userService.getStudentByCode(code)` - get profile
- `userService.getStudentCourses(id, page, size)` - get courses
- `userService.getStudentCertificates(id, page, size)` - get certificates

---

### 3. My Courses (Student)

**Path**: `/learner/my-courses`

**Purpose**: Student views all enrolled courses with progress

**Components**:

- Course cards grid:
  - Course thumbnail
  - Course title
  - Teacher name
  - Progress bar
  - Status (In Progress, Completed)
  - "Continue Learning" button
- Filter by status (All, In Progress, Completed)
- Search by course name
- Pagination

**APIs Used**:

- `userService.getStudentCourses(id, page, size)`

---

### 4. Learning Progress Dashboard

**Path**: `/learner/progress`

**Purpose**: Student views overall learning statistics and progress

**Components**:

- Progress overview cards:
  - Total Courses Enrolled
  - Completed Courses
  - In Progress Courses
  - Total Certificates Earned
- Quiz performance:
  - Total Quizzes Taken
  - Average Quiz Score
  - Progress chart
- Overall Progress percentage (circular progress)
- Recent activity timeline
- Goals and milestones

**APIs Used**:

- `userService.getStudentProgress(id)`
- `userService.getStudentCourses(id, page, size)` - for recent courses
- `userService.getStudentCertificates(id, page, size)` - for recent certificates

---

### 5. My Certificates

**Path**: `/learner/certificates`

**Purpose**: Student views all earned certificates

**Components**:

- Certificate cards grid:
  - Certificate thumbnail/preview
  - Course title
  - Issued date
  - Download button
  - Share button (social media)
- Search by course name
- Sort by date (newest/oldest)
- Pagination

**APIs Used**:

- `userService.getStudentCertificates(id, page, size)`

---

## Teacher Screens

### 6. Teacher Profile Page (Own Profile)

**Path**: `/teacher/profile` or `/teacher/settings`

**Purpose**: Teacher views and edits their own profile

**Components**:

- Avatar with upload button
- Profile information display/edit:
  - Teacher Code (readonly)
  - Full Name
  - Email (readonly)
  - Phone
  - Birth Date
  - Gender
  - Bio
  - Specialty
  - Degree
- Account information:
  - Username (readonly)
  - Approval Status (badge: Approved/Pending/Rejected)
  - Rejection Reason (if rejected)
  - Last Login
  - Member Since
- "Request Approval" button (if not yet requested)
- Save Changes button

**APIs Used**:

- `userService.getTeacherById(id)` - load profile
- `userService.updateTeacher(id, payload)` - save changes
- `userService.uploadTeacherAvatar(id, file)` - upload avatar
- `userService.requestTeacherApproval(id)` - request approval

---

### 7. Teacher Profile Page (Public View)

**Path**: `/teachers/{code}` or `/profile/{username}`

**Purpose**: Students/public view teacher's profile

**Components**:

- Avatar
- Basic information:
  - Full Name
  - Teacher Code
  - Specialty
  - Degree
  - Bio
- Teaching statistics:
  - Total Courses
  - Total Students
  - Average Rating
- Courses list (published courses)
- Reviews/ratings from students

**APIs Used**:

- `userService.getTeacherByCode(code)` - get profile
- `userService.getTeacherStats(id)` - get statistics
- `userService.getTeacherCourses(id, page, size)` - get courses

---

### 8. My Courses (Teacher)

**Path**: `/teacher/courses`

**Purpose**: Teacher views all created courses

**Components**:

- Course cards grid:
  - Course thumbnail
  - Course title
  - Status (Draft, Published, Archived)
  - Total Enrollments
  - Average Rating
  - Edit/Manage button
- Create New Course button
- Filter by status
- Search by course name
- Pagination

**APIs Used**:

- `userService.getTeacherCourses(id, page, size)`

---

### 9. My Students (Teacher)

**Path**: `/teacher/students`

**Purpose**: Teacher views all students enrolled in their courses

**Components**:

- Student table:
  - Avatar
  - Student Name
  - Student Code
  - Email
  - Enrolled Course(s)
  - Enrolled Date
  - Progress
  - View Details button
- Search by name/code/email
- Filter by course
- Sort by enrollment date, progress
- Pagination
- Export to CSV button

**APIs Used**:

- `userService.getTeacherStudents(id, page, size)`

---

### 10. Teacher Statistics Dashboard

**Path**: `/teacher/dashboard`

**Purpose**: Teacher views overall teaching performance

**Components**:

- Statistics cards:
  - Total Courses
  - Total Students
  - Total Revenue
  - Average Rating
- Revenue chart (from billing module)
- Recent enrollments list
- Recent reviews
- Course performance comparison (bar chart)

**APIs Used**:

- `userService.getTeacherStats(id)`
- `userService.getTeacherRevenue(id)` - for revenue stats
- `userService.getTeacherCourses(id, page, size)` - for course list
- `userService.getTeacherStudents(id, page, size)` - for recent students

---

### 11. Teacher Revenue Page

**Path**: `/teacher/revenue`

**Purpose**: Teacher views detailed revenue information

**Components**:

- Revenue summary cards:
  - Total Revenue
  - Total Courses Sold
  - Total Students (paying)
- Monthly revenue chart (line/bar chart)
- Monthly breakdown table:
  - Month
  - Revenue
  - Courses Sold
- Filter by date range
- Export button

**APIs Used**:

- `userService.getTeacherRevenue(id)` - comprehensive revenue data

**Note**: This screen can integrate with billing module's revenue APIs for more detailed breakdown.

---

## Admin Screens

### 12. User Management Dashboard

**Path**: `/admin/users`

**Purpose**: Admin views and manages all users

**Components**:

- User statistics cards:
  - Total Users
  - Active Users
  - Suspended Users
  - Pending Users
- Role breakdown (donut chart):
  - Students
  - Teachers
  - Admins
- Status breakdown (bar chart)
- Recent user registrations list
- Quick actions:
  - View All Users
  - Export Users
  - User Statistics

**APIs Used**:

- `userService.getUserStats()` - for all statistics

---

### 13. All Users List

**Path**: `/admin/users/list`

**Purpose**: Admin views paginated list of all users with filters

**Components**:

- Advanced filters panel:
  - Search by keyword (username, email, full name)
  - Filter by Role (All, Student, Teacher, Admin)
  - Filter by Status (All, Active, Pending, Suspended, Inactive)
  - Filter by Teacher Approval (All, Approved, Pending, Rejected)
  - Sort by (Created At, Last Login, Username, Email)
  - Sort direction (ASC, DESC)
- User table:
  - Avatar
  - Username
  - Email
  - Full Name
  - Role (badge)
  - Status (badge)
  - Student/Teacher Code
  - Approval Status (for teachers)
  - Last Login
  - Created At
  - Actions (View, Edit, Delete)
- Bulk actions:
  - Export Selected
  - Change Status (bulk)
- Export All button
- Pagination

**APIs Used**:

- `userService.getAllUsers(filter, page, size)` - main data
- `userService.exportUsers(payload)` - export functionality

---

### 14. User Detail Page (Admin View)

**Path**: `/admin/users/{id}`

**Purpose**: Admin views detailed information about any user

**Components**:

- User profile card (all profile fields)
- Account management:
  - Change Status button (Active, Suspended, Inactive)
  - Reset Password button
  - Delete Account button
- Activity logs:
  - Login history
  - Recent actions
- For Students:
  - Enrolled courses
  - Learning progress
  - Certificates
  - Payment history
- For Teachers:
  - Approval status with history
  - Courses created
  - Students taught
  - Revenue statistics
  - Performance metrics

**APIs Used**:

- `userService.getStudentById(id)` or `userService.getTeacherById(id)`
- `userService.getStudentCourses(id)` or `userService.getTeacherCourses(id)`
- `userService.getStudentProgress(id)` - for students
- `userService.getTeacherStats(id)` - for teachers
- `userService.getTeacherRevenue(id)` - for teachers

---

### 15. Teacher Approval Management

**Path**: `/admin/teachers/pending`

**Purpose**: Admin reviews and approves/rejects teacher applications

**Components**:

- Pending teachers table:
  - Avatar
  - Teacher Name
  - Teacher Code
  - Email
  - Specialty
  - Degree
  - Requested Date
  - View Profile button
  - Quick Actions (Approve, Reject)
- Filter by request date
- Sort by date (oldest/newest)
- Pagination

**APIs Used**:

- `userService.getAllUsers({ role: 'TEACHER', teacherApproved: false })` - get pending teachers
- `userService.approveTeacher(id, { note })` - approve
- `userService.rejectTeacher(id, { reason })` - reject

---

### 16. Teacher Approval Detail Page

**Path**: `/admin/teachers/{id}/review`

**Purpose**: Admin reviews teacher profile before approval

**Components**:

- Teacher profile preview:
  - All profile information
  - Specialty and Degree
  - Bio
  - Avatar
- Approval form:
  - Approve button
  - Reject button with reason textarea
  - Optional note for approval
- Back to list button

**APIs Used**:

- `userService.getTeacherById(id)` - get teacher info
- `userService.approveTeacher(id, { note })` - approve
- `userService.rejectTeacher(id, { reason })` - reject

---

### 17. Student Detail Page (Admin View)

**Path**: `/admin/students/{id}`

**Purpose**: Admin views comprehensive student information

**Components**:

- Student profile section
- Learning statistics:
  - Total courses
  - Completed courses
  - In progress
  - Certificates earned
- Enrolled courses table with progress
- Payment history (from billing module)
- Activity timeline
- Admin actions:
  - Edit Profile
  - Delete Account
  - View Payment History

**APIs Used**:

- `userService.getStudentById(id)`
- `userService.getStudentCourses(id, page, size)`
- `userService.getStudentProgress(id)`
- `userService.getStudentCertificates(id, page, size)`

---

### 18. Teacher Detail Page (Admin View)

**Path**: `/admin/teachers/{id}`

**Purpose**: Admin views comprehensive teacher information

**Components**:

- Teacher profile section
- Approval status history:
  - Current status (Approved/Rejected/Pending)
  - Approved by (admin name)
  - Approved date
  - Rejection reason (if rejected)
- Teaching statistics:
  - Total courses
  - Total students
  - Total revenue
  - Average rating
- Courses table
- Students table
- Revenue chart
- Admin actions:
  - Edit Profile
  - Approve/Reject (if pending)
  - Delete Account
  - View Revenue Details

**APIs Used**:

- `userService.getTeacherById(id)`
- `userService.getTeacherCourses(id, page, size)`
- `userService.getTeacherStudents(id, page, size)`
- `userService.getTeacherStats(id)`
- `userService.getTeacherRevenue(id)`

---

### 19. Export Users Page

**Path**: `/admin/users/export`

**Purpose**: Admin exports user data with custom filters

**Components**:

- Export format selection:
  - CSV (radio)
  - Excel (radio)
- Filter options (same as user list filters):
  - Role filter
  - Status filter
  - Teacher approval filter
  - Date range
- Fields to export (checkboxes):
  - Select All
  - Basic Info (username, email, name)
  - Contact Info (phone)
  - Profile Info (bio, gender, birth date)
  - Account Info (status, last login, created date)
  - Role-specific fields (student code, teacher code, specialty, degree)
- Export button
- Preview count (shows how many users will be exported)

**APIs Used**:

- `userService.getAllUsers(filter)` - to show preview count
- `userService.exportUsers({ format, filters })` - download file

---

## User Flows

### Flow 1: Student Profile Management

```
1. Student logs in
   └─> Redirected to Dashboard or Profile

2. Student navigates to Profile page
   └─> Path: /learner/profile
   └─> API: userService.getStudentById(currentUserId)
   └─> Profile data loaded

3. Student views current information
   └─> Avatar, name, email, phone, bio, etc.

4. Student clicks "Edit Profile"
   └─> Form fields become editable

5. Student updates information
   └─> Changes full name, phone, bio, gender

6. Student clicks "Save Changes"
   └─> API: userService.updateStudent(id, payload)
   └─> Success message shown
   └─> Profile data refreshed

Alternative: Student uploads new avatar
   └─> Clicks on avatar
   └─> File picker opens
   └─> Selects image file (JPG/PNG/WEBP)
   └─> API: userService.uploadStudentAvatar(id, file)
   └─> Avatar updated immediately
```

---

### Flow 2: Teacher Approval Process

```
1. User registers as Teacher
   └─> Account created with TEACHER role
   └─> Profile created with approved = false

2. Teacher logs in
   └─> Redirected to Teacher Dashboard
   └─> Notice: "Your account is pending approval"

3. Teacher completes profile
   └─> Path: /teacher/profile
   └─> API: userService.getTeacherById(id)
   └─> Fills in specialty, degree, bio
   └─> API: userService.updateTeacher(id, payload)

4. Teacher clicks "Request Approval"
   └─> Confirmation dialog shown
   └─> API: userService.requestTeacherApproval(id)
   └─> Success message: "Your approval request has been submitted"
   └─> Status badge changes to "Approval Pending"

5. Admin reviews request
   └─> Admin navigates to /admin/teachers/pending
   └─> API: userService.getAllUsers({ role: 'TEACHER', teacherApproved: false })
   └─> Sees teacher in pending list

6. Admin clicks "Review" on teacher
   └─> Redirected to /admin/teachers/{id}/review
   └─> API: userService.getTeacherById(id)
   └─> Reviews teacher profile (specialty, degree, bio)

7. Admin decides to approve
   └─> Clicks "Approve" button
   └─> Optional approval note modal
   └─> API: userService.approveTeacher(id, { note })
   └─> Success message shown

8. Teacher receives notification
   └─> Email: "Your teacher account has been approved"
   └─> Next login: Status badge shows "Approved"
   └─> Can now create and publish courses
```

Alternative: Admin rejects teacher

```
7. Admin decides to reject
   └─> Clicks "Reject" button
   └─> Rejection reason modal opens (required field)
   └─> Admin enters reason: "Insufficient qualifications"
   └─> API: userService.rejectTeacher(id, { reason })
   └─> Success message shown

8. Teacher receives notification
   └─> Email: "Your teacher account has been rejected"
   └─> Reason displayed in email
   └─> Next login: Status badge shows "Rejected"
   └─> Rejection reason displayed in profile
   └─> Can update profile and request approval again
```

---

### Flow 3: Admin User Management

```
1. Admin logs in
   └─> Redirected to Admin Dashboard

2. Admin navigates to User Management
   └─> Path: /admin/users
   └─> API: userService.getUserStats()
   └─> Overview statistics shown:
      - Total users
      - Active/Suspended/Pending counts
      - Role breakdown (Students/Teachers/Admins)
      - Status breakdown

3. Admin clicks "View All Users"
   └─> Redirected to /admin/users/list
   └─> API: userService.getAllUsers({}, page, size)
   └─> Default view: All users, sorted by created date DESC

4. Admin applies filters
   └─> Selects Role: "TEACHER"
   └─> Selects Status: "ACTIVE"
   └─> Selects Teacher Approval: "Approved"
   └─> API: userService.getAllUsers({ role: 'TEACHER', status: 'ACTIVE', teacherApproved: true }, page, size)
   └─> Filtered results shown

5. Admin searches for specific user
   └─> Types keyword: "john"
   └─> API: userService.getAllUsers({ keyword: 'john' }, page, size)
   └─> Results filtered by username, email, full name

6. Admin clicks on a user to view details
   └─> Redirected to /admin/users/{id}
   └─> API: userService.getStudentById(id) or userService.getTeacherById(id)
   └─> Comprehensive user information displayed

7. Admin views additional details
   For Student:
   └─> API: userService.getStudentCourses(id)
   └─> API: userService.getStudentProgress(id)
   └─> API: userService.getStudentCertificates(id)

   For Teacher:
   └─> API: userService.getTeacherCourses(id)
   └─> API: userService.getTeacherStudents(id)
   └─> API: userService.getTeacherStats(id)
   └─> API: userService.getTeacherRevenue(id)

8. Admin performs action
   └─> Clicks "Delete Account" button
   └─> Confirmation dialog: "Are you sure you want to delete this account?"
   └─> API: userService.deleteStudent(id) or userService.deleteTeacher(id)
   └─> Success message: "Account deleted successfully"
   └─> User status changed to DEACTIVATED
```

---

### Flow 4: Student Learning Progress Tracking

```
1. Student logs in
   └─> Navigates to Learning Progress page
   └─> Path: /learner/progress

2. Progress dashboard loads
   └─> API: userService.getStudentProgress(id)
   └─> Statistics displayed:
      - Total Courses: 10
      - Completed: 3
      - In Progress: 7
      - Total Quizzes Taken: 45
      - Average Quiz Score: 85%
      - Certificates Earned: 3
      - Overall Progress: 30%

3. Student views course list
   └─> API: userService.getStudentCourses(id, page, size)
   └─> Courses displayed with progress bars

4. Student filters by status
   └─> Selects "In Progress"
   └─> Course list filtered to show only in-progress courses

5. Student clicks on a course
   └─> Redirected to course learning page
   └─> Can continue learning from last position

6. Student views certificates
   └─> Navigates to /learner/certificates
   └─> API: userService.getStudentCertificates(id, page, size)
   └─> Certificate grid displayed

7. Student downloads certificate
   └─> Clicks "Download" on certificate card
   └─> PDF certificate downloaded

8. Student shares certificate
   └─> Clicks "Share" button
   └─> Social media share dialog opens
   └─> Shares certificate on LinkedIn/Facebook
```

---

### Flow 5: Teacher Statistics Review

```
1. Teacher logs in
   └─> Redirected to Teacher Dashboard
   └─> Path: /teacher/dashboard

2. Dashboard loads with overview
   └─> API: userService.getTeacherStats(id)
   └─> Statistics cards displayed:
      - Total Courses: 5
      - Total Students: 250
      - Total Revenue: $12,500
      - Average Rating: 4.7/5

3. Teacher views revenue details
   └─> Clicks on Total Revenue card
   └─> Redirected to /teacher/revenue
   └─> API: userService.getTeacherRevenue(id)
   └─> Revenue breakdown shown:
      - Total Revenue: $12,500
      - Total Courses Sold: 250
      - Monthly Revenue Chart
      - Monthly breakdown table

4. Teacher views courses
   └─> Navigates to /teacher/courses
   └─> API: userService.getTeacherCourses(id, page, size)
   └─> Course list with statistics:
      - Each course shows enrollments
      - Average rating
      - Status (Published/Draft)

5. Teacher views students
   └─> Navigates to /teacher/students
   └─> API: userService.getTeacherStudents(id, page, size)
   └─> Student table displayed:
      - Student name, code, email
      - Enrolled course(s)
      - Progress

6. Teacher filters students by course
   └─> Selects course from dropdown
   └─> Student list filtered to show only students in that course

7. Teacher exports student list
   └─> Clicks "Export to CSV"
   └─> CSV file downloaded with student data
```

---

### Flow 6: Admin User Export

```
1. Admin navigates to User List
   └─> Path: /admin/users/list
   └─> API: userService.getAllUsers()

2. Admin applies filters
   └─> Role: "STUDENT"
   └─> Status: "ACTIVE"
   └─> Date Range: Last 30 days
   └─> Preview shows: "1,234 users will be exported"

3. Admin clicks "Export" button
   └─> Export modal opens

4. Admin selects export format
   └─> Selects "Excel" (or "CSV")

5. Admin selects fields to export
   └─> Checks: Basic Info, Contact Info, Profile Info
   └─> Unchecks: Role-specific fields (not needed)

6. Admin clicks "Export Now"
   └─> API: userService.exportUsers({ format: 'EXCEL', filters: {...} })
   └─> Progress indicator shown

7. Export completes
   └─> File download initiated
   └─> Success message: "1,234 users exported successfully"
   └─> Excel file downloads to computer

8. Admin opens file
   └─> Spreadsheet contains:
      - All selected fields
      - Filtered user data (1,234 rows)
      - Formatted columns
      - Header row with field names
```

---

## Key Considerations

### Security & Privacy

- Students can only view their own detailed profile
- Teachers can only view students enrolled in their courses
- Admins have full access to all user data
- Sensitive information (passwords) never displayed
- Soft delete preserves data for audit purposes

### User Experience

- Profile editing with inline validation
- Real-time avatar upload preview
- Progress indicators for long operations
- Confirmation dialogs for destructive actions
- Success/error notifications

### Performance

- Pagination for large lists
- Lazy loading for images
- Caching of frequently accessed data
- Optimized queries with filters

### Notifications

- Email notifications for:
  - Teacher approval/rejection
  - Account status changes
  - Important updates
- In-app notifications for real-time updates

### Accessibility

- Keyboard navigation support
- Screen reader friendly
- Clear status indicators (badges, colors)
- Descriptive labels and tooltips

---

## Summary

Total screens designed: **19 screens**

### By Role:

- **Student**: 5 screens (Profile, Public Profile, My Courses, Progress, Certificates)
- **Teacher**: 6 screens (Profile, Public Profile, My Courses, My Students, Statistics, Revenue)
- **Admin**: 8 screens (User Dashboard, User List, User Detail, Teacher Approval, Student Detail, Teacher Detail, Export Users, Pending Teachers)

### Main Flows:

- Student profile management and learning tracking
- Teacher approval workflow (Request → Review → Approve/Reject)
- Admin user management with advanced filtering and export
- Teacher statistics and revenue monitoring
- Student progress tracking and certificate management
- Admin comprehensive user oversight

### Key Features:

- Role-based access control with granular permissions
- Teacher approval workflow for quality control
- Comprehensive user statistics and analytics
- Export functionality for reporting
- Soft delete for data preservation
- Real-time profile updates with avatar upload
