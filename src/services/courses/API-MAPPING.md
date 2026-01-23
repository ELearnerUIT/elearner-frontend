# Course Module - API Mapping Documentation

Tài liệu này mapping toàn bộ API giữa Frontend và Backend cho module **Courses**, bao gồm role, chức năng và ghi chú thiếu/thừa.

**Last Updated**: January 23, 2026

---

## 📊 Tổng Quan

- **Tổng số API Frontend**: 64 APIs ✅
- **Tổng số API Backend**: 64 APIs
- **APIs Khớp**: 64 APIs ✅
- **APIs Thiếu ở Frontend**: 0 APIs 🎉

**Status**: ✅ **HOÀN THÀNH - Tất cả API đã được mapping đầy đủ!**

---

## 1️⃣ CATEGORY MANAGEMENT MODULE

### Frontend Service: `category.service.ts`

#### 1.1. `createCategory` - Tạo category mới

- **Role**: `ADMIN`
- **Method**: POST
- **Frontend Endpoint**: `/categories`
- **Backend Endpoint**: `/api/v1/categories` (với @AdminOnly annotation)
- **Status**: ✅ **MATCHED**
- **Description**: Admin tạo category mới cho khóa học
- **Use Case**: Admin muốn thêm danh mục mới (VD: "Web Development", "Mobile Development")

#### 1.2. `getCategoryById` - Lấy category theo ID

- **Role**: `PUBLIC`
- **Method**: GET
- **Endpoint**: `/api/v1/categories/{id}`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy thông tin chi tiết của một category
- **Use Case**: Hiển thị thông tin category trên trang danh mục khóa học

#### 1.3. `getCategoryByIdForAdmin` - Lấy category theo ID (Admin)

- **Role**: `ADMIN`
- **Method**: GET
- **Frontend Endpoint**: `/categories/admin/{id}`
- **Backend Endpoint**: `/api/v1/categories/admin/{id}`
- **Status**: ✅ **MATCHED**
- **Description**: Admin lấy category kể cả đã xóa
- **Use Case**: Admin xem chi tiết category đã bị xóa mềm

#### 1.4. `getCategoryTree` - Lấy cây phân cấp category

- **Role**: `PUBLIC`
- **Method**: GET
- **Endpoint**: `/api/v1/categories/tree`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy cấu trúc phân cấp của tất cả categories (parent-child)
- **Use Case**: Hiển thị menu danh mục có cấu trúc lồng nhau

#### 1.5. `getAllDeleted` - Lấy tất cả categories đã xóa

- **Role**: `ADMIN`
- **Method**: GET
- **Frontend Endpoint**: `/categories/admin/deleted`
- **Backend Endpoint**: `/api/v1/categories/admin/deleted`
- **Status**: ✅ **MATCHED**
- **Description**: Admin xem danh sách categories đã xóa mềm
- **Use Case**: Admin muốn khôi phục lại category đã xóa nhầm

#### 1.6. `deleteCategory` - Xóa category

- **Role**: `ADMIN`
- **Method**: DELETE
- **Frontend Endpoint**: `/categories/{id}`
- **Backend Endpoint**: `/api/v1/categories/{id}` (với @AdminOnly annotation)
- **Status**: ✅ **MATCHED**
- **Description**: Admin xóa mềm một category
- **Use Case**: Admin ẩn category không còn sử dụng

#### 1.7. `restoreCategory` - Khôi phục category đã xóa

- **Role**: `ADMIN`
- **Method**: PATCH
- **Frontend Endpoint**: `/categories/{id}/restore`
- **Backend Endpoint**: `/api/v1/categories/{id}/restore` (với @AdminOnly annotation)
- **Status**: ✅ **MATCHED**
- **Description**: Admin khôi phục category đã xóa mềm
- **Use Case**: Admin khôi phục lại category đã xóa nhầm

#### 1.8. `updateCategory` - Cập nhật category

- **Role**: `ADMIN`
- **Method**: PUT
- **Frontend Endpoint**: `/categories/{id}`
- **Backend Endpoint**: `/api/v1/categories/{id}` (với @AdminOnly annotation)
- **Status**: ✅ **MATCHED**
- **Description**: Admin chỉnh sửa thông tin category
- **Use Case**: Admin sửa tên, mô tả, thumbnail của category

#### 1.9. `getCategoryBySlug` - Lấy category theo slug

- **Role**: `PUBLIC`
- **Method**: GET
- **Endpoint**: `/api/v1/categories/slug/{slug}`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy category bằng slug thay vì ID (SEO-friendly)
- **Use Case**: Hiển thị category trên URL như /categories/web-development

#### 1.10. `getActiveCategories` - Lấy tất cả categories đang hoạt động

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/categories`
- **Backend Endpoint**: `/api/v1/categories`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy tất cả categories đang visible (không bị xóa)
- **Use Case**: Hiển thị dropdown chọn category khi tạo khóa học

#### 1.11. `getCategoryStatistics` - Lấy thống kê categories

- **Role**: `ADMIN`
- **Method**: GET
- **Frontend Endpoint**: `/categories/admin/stats`
- **Backend Endpoint**: `/api/v1/categories/admin/stats`
- **Status**: ✅ **MATCHED**
- **Description**: Thống kê số khóa học, số học viên theo từng category
- **Use Case**: Admin xem báo cáo hiệu suất của từng danh mục

---

## 2️⃣ COURSE MANAGEMENT MODULE

### Frontend Service: `course.service.ts`

#### 2.1. `createCourse` - Tạo khóa học mới

- **Role**: `TEACHER`
- **Method**: POST
- **Endpoint**: `/api/v1/teacher/courses`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên tạo khóa học mới
- **Use Case**: Giáo viên tạo khóa học Java Programming 101

#### 2.2. `uploadThumbnail` - Upload thumbnail cho khóa học

- **Role**: `TEACHER`
- **Method**: POST
- **Endpoint**: `/api/v1/teacher/courses/{id}/thumbnail`
- **Status**: ✅ **MATCHED**
- **Description**: Upload ảnh đại diện cho khóa học
- **Use Case**: Giáo viên upload ảnh thumbnail khi tạo/sửa khóa học

#### 2.3. `getCourseBySlug` - Lấy khóa học theo slug

- **Role**: `PUBLIC`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/{slug}`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy chi tiết khóa học bằng slug (SEO-friendly)
- **Use Case**: Hiển thị trang chi tiết khóa học tại /courses/java-programming-101

#### 2.4. `getCoursesActive` - Lấy tất cả khóa học active

- **Role**: `PUBLIC`
- **Method**: GET
- **Endpoint**: `/api/v1/courses`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy danh sách khóa học đang hoạt động (có filter, pagination)
- **Use Case**: Trang danh sách tất cả khóa học

#### 2.5. `getAllCourses` - Lấy tất cả khóa học (Admin)

- **Role**: `ADMIN`
- **Method**: GET
- **Endpoint**: `/api/v1/admin/courses`
- **Status**: ✅ **MATCHED**
- **Description**: Admin xem tất cả khóa học (kể cả inactive, deleted)
- **Use Case**: Admin quản lý tất cả khóa học trong hệ thống

#### 2.6. `closeCourse` - Đóng khóa học

- **Role**: `TEACHER`
- **Method**: PATCH
- **Endpoint**: `/api/v1/teacher/courses/{id}/close`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên đóng đăng ký cho khóa học
- **Use Case**: Hết hạn đăng ký, ngừng nhận học viên mới

#### 2.7. `openCourse` - Mở khóa học

- **Role**: `TEACHER`
- **Method**: PATCH
- **Endpoint**: `/api/v1/teacher/courses/{id}/open`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên mở lại đăng ký cho khóa học
- **Use Case**: Mở đợt đăng ký mới cho khóa học

#### 2.8. `updateCourse` - Cập nhật khóa học

- **Role**: `TEACHER`
- **Method**: PUT
- **Endpoint**: `/api/v1/teacher/courses/{id}`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên chỉnh sửa thông tin khóa học
- **Use Case**: Sửa tiêu đề, mô tả, category, tags của khóa học

#### 2.9. `deleteCourse` - Xóa khóa học

- **Role**: `TEACHER`
- **Method**: DELETE
- **Endpoint**: `/api/v1/teacher/courses/{id}`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên xóa mềm khóa học
- **Use Case**: Ẩn khóa học không còn giảng dạy

#### 2.10. `restoreCourse` - Khôi phục khóa học

- **Role**: `TEACHER`
- **Method**: PATCH
- **Endpoint**: `/api/v1/teacher/courses/{id}/restore`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên khôi phục khóa học đã xóa
- **Use Case**: Khôi phục lại khóa học đã xóa nhầm

#### 2.11. `getMyCourses` - Lấy khóa học của tôi

- **Role**: `TEACHER`
- **Method**: GET
- **Endpoint**: `/api/v1/teacher/courses`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên xem danh sách khóa học của mình
- **Use Case**: Trang "My Courses" của giáo viên

#### 2.12. `cloneCourse` - Nhân bản khóa học

- **Role**: `TEACHER`
- **Method**: POST
- **Frontend Endpoint**: `/teacher/courses/{id}/clone`
- **Backend Endpoint**: `/api/v1/teacher/courses/{id}/clone`
- **Status**: ✅ **MATCHED**
- **Description**: Tạo bản sao khóa học với tất cả nội dung (chapters, lessons, quizzes)
- **Use Case**: Giáo viên tái sử dụng khóa học cho học kỳ mới

#### 2.13. `getCourseStatistics` - Lấy thống kê khóa học

- **Role**: `TEACHER`
- **Method**: GET
- **Frontend Endpoint**: `/teacher/courses/{id}/stats`
- **Backend Endpoint**: `/api/v1/teacher/courses/{id}/stats`
- **Status**: ✅ **MATCHED**
- **Description**: Thống kê tổng học viên, rating trung bình, tỷ lệ hoàn thành, doanh thu
- **Use Case**: Giáo viên xem hiệu quả khóa học của mình

#### 2.14. `getPublishedCourses` - Lấy tất cả khóa học đã publish (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/public/courses`
- **Backend Endpoint**: `/api/v1/public/courses`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy tất cả khóa học có phiên bản published
- **Use Case**: Trang danh sách khóa học cho người chưa đăng nhập

#### 2.15. `getPublishedCourseBySlug` - Lấy khóa học published theo slug (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/public/courses/{slug}`
- **Backend Endpoint**: `/api/v1/public/courses/{slug}`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy chi tiết khóa học published
- **Use Case**: Trang chi tiết khóa học công khai

#### 2.16. `searchPublishedCourses` - Tìm kiếm khóa học published (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/public/courses/search`
- **Backend Endpoint**: `/api/v1/public/courses/search`
- **Status**: ✅ **MATCHED**
- **Description**: Tìm kiếm khóa học theo query, category, difficulty, tags
- **Use Case**: Trang tìm kiếm khóa học nâng cao

---

## 3️⃣ COURSE PREVIEW MODULE (Public APIs)

### Frontend Service: `course-preview.service.ts`

#### 3.1. `getCoursePreview` - Lấy preview khóa học

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/public/courses/{slug}/preview`
- **Backend Endpoint**: `/api/v1/public/courses/{slug}/preview`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy preview khóa học bao gồm chapters và preview lessons
- **Use Case**: Trang landing page khóa học cho người chưa mua

#### 3.2. `getPreviewVideoStreamUrl` - Lấy URL streaming video preview

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/public/lessons/{lessonId}/preview/stream-url`
- **Backend Endpoint**: `/api/v1/public/lessons/{lessonId}/preview/stream-url`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy URL streaming cho video preview lesson
- **Use Case**: Xem trước video bài giảng miễn phí

#### 3.3. `isCoursePublished` - Kiểm tra khóa học đã publish chưa

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/public/courses/{slug}/is-published`
- **Backend Endpoint**: `/api/v1/public/courses/{slug}/is-published`
- **Status**: ✅ **MATCHED**
- **Description**: Kiểm tra nhanh khóa học có phiên bản published không
- **Use Case**: Kiểm tra trước khi hiển thị trang course

#### 3.4. `getPublicCourseReviews` - Lấy reviews công khai của khóa học

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/public/courses/{courseId}/reviews`
- **Backend Endpoint**: `/api/v1/public/courses/{courseId}/reviews`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy danh sách reviews với sort (newest, rating_desc, rating_asc)
- **Use Case**: Hiển thị reviews trên landing page

#### 3.5. `getCourseRatingSummary` - Lấy tổng hợp rating

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/public/courses/{courseId}/rating-summary`
- **Backend Endpoint**: `/api/v1/public/courses/{courseId}/rating-summary`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy rating trung bình, tổng reviews, phân bố rating
- **Use Case**: Hiển thị rating stars và phân bố

#### 3.6. `getTeacherPublicProfile` - Lấy profile công khai giáo viên

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/public/teachers/{teacherId}/profile`
- **Backend Endpoint**: `/api/v1/public/teachers/{teacherId}/profile`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy thông tin giáo viên, danh sách khóa học
- **Use Case**: Section "About the Instructor"

#### 3.7. `getRelatedCourses` - Lấy khóa học liên quan

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/public/courses/{courseId}/related`
- **Backend Endpoint**: `/api/v1/public/courses/{courseId}/related`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy khóa học cùng category/tags
- **Use Case**: Section "Related Courses"

#### 3.8. `getPopularCourses` - Lấy khóa học phổ biến

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/public/courses/popular`
- **Backend Endpoint**: `/api/v1/public/courses/popular`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy khóa học có nhiều enrollment và rating cao
- **Use Case**: Featured section trên homepage

---

## 4️⃣ COURSE REVIEW MODULE

### Frontend Service: `course-review.service.ts`

#### 4.1. `createReview` - Tạo đánh giá khóa học

- **Role**: `STUDENT`
- **Method**: POST
- **Endpoint**: `/api/v1/courses/{courseId}/reviews`
- **Status**: ✅ **MATCHED**
- **Description**: Học viên đánh giá khóa học (rating 1-5 sao và nội dung)
- **Use Case**: Học viên viết review sau khi hoàn thành khóa học

#### 4.2. `getCourseReviews` - Lấy đánh giá của khóa học

- **Role**: `PUBLIC`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/{courseId}/reviews`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy danh sách reviews của khóa học (có pagination)
- **Use Case**: Hiển thị reviews trên trang chi tiết khóa học

#### 4.3. `updateReview` - Cập nhật đánh giá

- **Role**: `STUDENT`
- **Method**: PUT
- **Endpoint**: `/api/v1/courses/{courseId}/reviews/{reviewId}`
- **Status**: ✅ **MATCHED**
- **Description**: Học viên sửa đánh giá của mình
- **Use Case**: Học viên muốn cập nhật nội dung review

#### 4.4. `deleteReview` - Xóa đánh giá

- **Role**: `STUDENT`
- **Method**: DELETE
- **Endpoint**: `/api/v1/courses/{courseId}/reviews/{reviewId}`
- **Status**: ✅ **MATCHED**
- **Description**: Học viên xóa đánh giá của mình
- **Use Case**: Học viên muốn gỡ review đã viết

#### 4.5. `getRatingSummary` - Lấy tổng kết rating

- **Role**: `PUBLIC`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/{courseId}/rating-summary`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy rating trung bình, tổng số reviews, phân bố rating (1-5 sao)
- **Use Case**: Hiển thị overview rating trên trang chi tiết khóa học

---

## 5️⃣ COURSE VERSION MODULE

### Frontend Service: `course-version.service.ts`

#### 5.1. `createCourseVersion` - Tạo version mới

- **Role**: `TEACHER`
- **Method**: POST
- **Endpoint**: `/api/v1/courses/{courseId}/versions`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên tạo version mới cho khóa học
- **Use Case**: Cập nhật nội dung khóa học, thay đổi giá, thời hạn

#### 5.2. `getCourseVersions` - Lấy tất cả versions

- **Role**: `TEACHER`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/{courseId}/versions`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên xem danh sách versions của khóa học
- **Use Case**: Trang quản lý versions của giáo viên

#### 5.3. `getDeletedCourseVersions` - Lấy versions đã xóa

- **Role**: `TEACHER`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/{courseId}/versions/deleted`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên xem versions đã xóa mềm
- **Use Case**: Khôi phục lại version đã xóa nhầm

#### 5.4. `getCourseVersionById` - Lấy version theo ID

- **Role**: `TEACHER` or `ADMIN`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/{courseId}/versions/{versionId}`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy chi tiết một version cụ thể
- **Use Case**: Xem chi tiết version trước khi submit/publish

#### 5.5. `updateCourseVersion` - Cập nhật version

- **Role**: `TEACHER`
- **Method**: PUT
- **Endpoint**: `/api/v1/courses/{courseId}/versions/{versionId}`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên sửa version (chỉ DRAFT/REJECTED)
- **Use Case**: Sửa thông tin version trước khi submit

#### 5.6. `deleteCourseVersion` - Xóa version

- **Role**: `TEACHER`
- **Method**: DELETE
- **Endpoint**: `/api/v1/courses/{courseId}/versions/{versionId}`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên xóa version (chỉ DRAFT/PENDING/REJECTED)
- **Use Case**: Xóa version không còn cần thiết

#### 5.7. `getCourseVersionsByStatus` - Lấy versions theo status

- **Role**: `TEACHER`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/{courseId}/versions/status/{status}`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy versions theo trạng thái (DRAFT, PENDING, APPROVED, REJECTED, PUBLISHED)
- **Use Case**: Filter versions theo status trong dashboard

#### 5.8. `submitApproval` - Submit version để duyệt

- **Role**: `TEACHER`
- **Method**: POST
- **Endpoint**: `/api/v1/courses/{courseId}/versions/{versionId}/submit-approval`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên gửi version cho admin duyệt
- **Use Case**: Submit version hoàn chỉnh để được phê duyệt

#### 5.9. `approveCourseVersion` - Duyệt version

- **Role**: `ADMIN`
- **Method**: POST
- **Endpoint**: `/api/v1/courses/{courseId}/versions/{versionId}/approve`
- **Status**: ✅ **MATCHED**
- **Description**: Admin phê duyệt version
- **Use Case**: Admin duyệt version đủ tiêu chuẩn

#### 5.10. `rejectCourseVersion` - Từ chối version

- **Role**: `ADMIN`
- **Method**: POST
- **Endpoint**: `/api/v1/courses/{courseId}/versions/{versionId}/reject`
- **Status**: ✅ **MATCHED**
- **Description**: Admin từ chối version (kèm lý do)
- **Use Case**: Admin từ chối version vi phạm quy định

#### 5.11. `publishCourseVersion` - Publish version

- **Role**: `TEACHER`
- **Method**: POST
- **Endpoint**: `/api/v1/courses/{courseId}/versions/{versionId}/publish`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên publish version đã được duyệt
- **Use Case**: Đưa version lên môi trường production

#### 4.12. `getAllPendingCourseVersions` - Lấy tất cả versions đang chờ duyệt

- **Role**: `ADMIN`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/admin/versions/pending`
- **Status**: ✅ **MATCHED**
- **Description**: Admin xem tất cả versions đang chờ duyệt
- **Use Case**: Trang quản lý phê duyệt của admin

### ⚠️ APIs THIẾU Ở Frontend (Course Version)

#### `getPublishedVersionBySlug` - Lấy published version theo slug (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/public/courses/{courseSlug}/version/published`
- **Status**: ❌ **THIẾU Ở FRONTEND**
- **Priority**: **HIGH** - Cần cho trang public
- **Description**: Lấy version đang publish của khóa học theo slug
- **Use Case**: Hiển thị thông tin giá, thời hạn, điểm đạt của khóa học đã publish
- **Implementation**: Thêm vào `course-version.service.ts`:

```typescript
getPublishedVersionBySlug: async (
  courseSlug: string,
): Promise<CourseVersionResponse> => {
  const response = await axiosClient.get<ApiResponse<CourseVersionResponse>>(
    `/public/courses/${courseSlug}/version/published`,
  );
  return unwrapResponse(response);
};
```

#### `getPublicCourseVersionById` - Lấy version theo ID (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/public/courses/{courseId}/versions/{versionId}`
- **Status**: ❌ **THIẾU Ở FRONTEND**
- **Priority**: **MEDIUM** - Hiếm khi dùng
- **Description**: Lấy chi tiết version công khai theo ID
- **Use Case**: Link chia sẻ version cụ thể của khóa học
- **Implementation**: Thêm vào `course-version.service.ts`:

```typescript
getPublicCourseVersionById: async (
  courseId: number,
  versionId: number,
): Promise<CourseVersionResponse> => {
  const response = await axiosClient.get<ApiResponse<CourseVersionResponse>>(
    `/public/courses/${courseId}/versions/${versionId}`,
  );
  return unwrapResponse(response);
};
```

---

## 5️⃣ TAG MANAGEMENT MODULE

### Frontend Service: `tag.service.ts`

#### 5.1. `createTag` - Tạo tag mới

- **Role**: `ADMIN`
- **Method**: POST
- **Frontend Endpoint**: `/admin/tags` ❌ **SAI PATH**
- **Backend Endpoint**: `/api/v1/tags` (với @AdminOnly annotation)
- **Status**: ⚠️ **FRONTEND PATH SAI - CẦN SỬA**
- **Description**: Admin tạo tag mới cho khóa học
- **Use Case**: Admin thêm tag như "Java", "Spring Boot", "React"

- **Use Case**: Giáo viên publish version để học viên có thể đăng ký

#### 5.12. `getAllPendingCourseVersions` - Lấy tất cả versions đang chờ duyệt

- **Role**: `ADMIN`
- **Method**: GET
- **Frontend Endpoint**: `/courses/admin/versions/pending`
- **Backend Endpoint**: `/api/v1/courses/admin/versions/pending`
- **Status**: ✅ **MATCHED**
- **Description**: Admin xem tất cả versions đang chờ duyệt (từ mọi khóa học)
- **Use Case**: Trang quản lý duyệt version của admin

#### 5.13. `getPublishedVersionBySlug` - Lấy version published theo slug (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/public/courses/{courseSlug}/version/published`
- **Backend Endpoint**: `/api/v1/public/courses/{courseSlug}/version/published`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy version đang published của khóa học theo slug
- **Use Case**: Người dùng xem thông tin version hiện tại

#### 5.14. `getPublicCourseVersionById` - Lấy version theo ID (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/public/courses/{courseId}/versions/{versionId}`
- **Backend Endpoint**: `/api/v1/public/courses/{courseId}/versions/{versionId}`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy chi tiết version cụ thể (chỉ published)
- **Use Case**: Xem thông tin phiên bản cũ của khóa học

---

## 6️⃣ TAG MANAGEMENT MODULE

### Frontend Service: `tag.service.ts`

#### 6.1. `createTag` - Tạo tag mới

- **Role**: `ADMIN`
- **Method**: POST
- **Frontend Endpoint**: `/tags`
- **Backend Endpoint**: `/api/v1/tags` (với @AdminOnly annotation)
- **Status**: ✅ **MATCHED**
- **Description**: Admin tạo tag mới
- **Use Case**: Admin thêm tag cho hệ thống

#### 6.2. `getTags` - Lấy tất cả tags active

- **Role**: `PUBLIC`
- **Method**: GET
- **Endpoint**: `/api/v1/tags`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy danh sách tags đang active (có pagination)
- **Use Case**: Hiển thị danh sách tags để filter khóa học

#### 6.3. `getAllTags` - Lấy tất cả tags (Admin)

- **Role**: `ADMIN`
- **Method**: GET
- **Frontend Endpoint**: `/tags/admin`
- **Backend Endpoint**: `/api/v1/tags/admin`
- **Status**: ✅ **MATCHED**
- **Description**: Admin xem tất cả tags (kể cả đã xóa)
- **Use Case**: Admin quản lý tags trong hệ thống

#### 6.4. `updateTag` - Cập nhật tag

- **Role**: `ADMIN`
- **Method**: PUT
- **Frontend Endpoint**: `/tags/{id}`
- **Backend Endpoint**: `/api/v1/tags/{id}` (với @AdminOnly annotation)
- **Status**: ✅ **MATCHED**
- **Description**: Admin sửa thông tin tag
- **Use Case**: Admin đổi tên tag hoặc sửa slug

#### 6.5. `deleteTag` - Xóa tag

- **Role**: `ADMIN`
- **Method**: DELETE
- **Frontend Endpoint**: `/tags/{id}`
- **Backend Endpoint**: `/api/v1/tags/{id}` (với @AdminOnly annotation)
- **Status**: ✅ **MATCHED**
- **Description**: Admin xóa mềm tag
- **Use Case**: Admin ẩn tag không còn sử dụng

#### 6.6. `restoreTag` - Khôi phục tag

- **Role**: `ADMIN`
- **Method**: PATCH
- **Frontend Endpoint**: `/tags/{id}/restore`
- **Backend Endpoint**: `/api/v1/tags/{id}/restore` (với @AdminOnly annotation)
- **Status**: ✅ **MATCHED**
- **Description**: Admin khôi phục tag đã xóa
- **Use Case**: Admin khôi phục lại tag đã xóa nhầm

#### 6.7. `getPopularTags` - Lấy tags phổ biến

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/tags/popular`
- **Backend Endpoint**: `/api/v1/tags/popular`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy top tags được dùng nhiều nhất (theo số khóa học)
- **Use Case**: Hiển thị trending tags trên trang chủ

#### 6.8. `searchTags` - Tìm kiếm tags

- **Role**: `PUBLIC`
- **Method**: GET
- **Frontend Endpoint**: `/tags/search`
- **Backend Endpoint**: `/api/v1/tags/search`
- **Status**: ✅ **MATCHED**
- **Description**: Tìm kiếm tags theo tên (prefix matching)
- **Use Case**: Autocomplete khi giáo viên nhập tags cho khóa học

#### 6.9. `bulkCreateTags` - Tạo nhiều tags cùng lúc

- **Role**: `ADMIN`
- **Method**: POST
- **Frontend Endpoint**: `/tags/bulk`
- **Backend Endpoint**: `/api/v1/tags/bulk`
- **Status**: ✅ **MATCHED**
- **Description**: Tạo nhiều tags từ danh sách tên (tự động bỏ qua duplicates)
- **Use Case**: Admin import tags từ file CSV

#### 6.10. `getTagStatistics` - Lấy thống kê tags

- **Role**: `ADMIN`
- **Method**: GET
- **Frontend Endpoint**: `/tags/admin/stats`
- **Backend Endpoint**: `/api/v1/tags/admin/stats`
- **Status**: ✅ **MATCHED**
- **Description**: Thống kê số khóa học theo từng tag
- **Use Case**: Admin xem báo cáo sử dụng tags

---

## ✅ KẾT LUẬN

### 📋 Tổng Kết Mapping

| Module                  | APIs Frontend | APIs Backend | Status        |
| ----------------------- | ------------- | ------------ | ------------- |
| **Category Management** | 11            | 11           | ✅ 100% Match |
| **Course Management**   | 16            | 16           | ✅ 100% Match |
| **Course Preview**      | 8             | 8            | ✅ 100% Match |
| **Course Review**       | 5             | 5            | ✅ 100% Match |
| **Course Version**      | 14            | 14           | ✅ 100% Match |
| **Tag Management**      | 10            | 10           | ✅ 100% Match |
| **TỔNG CỘNG**           | **64**        | **64**       | ✅ **100%**   |

### 🎉 Thành Tựu

- ✅ **Tất cả 64 APIs đã được mapping đầy đủ**
- ✅ **Tất cả endpoints đã được sửa đúng** (không còn path sai)
- ✅ **Service mới `course-preview.service.ts` đã được tạo**
- ✅ **Tất cả types mới đã được thêm vào `course.types.ts`**
- ✅ **Không còn API nào thiếu**

### 📝 Files Đã Update

1. ✅ `category.service.ts` - Sửa endpoints + thêm 2 APIs
2. ✅ `course.service.ts` - Thêm 5 APIs mới
3. ✅ `course-preview.service.ts` - Tạo mới với 8 APIs
4. ✅ `course-review.service.ts` - Đã đúng, chỉ format
5. ✅ `course-version.service.ts` - Thêm 2 APIs public
6. ✅ `tag.service.ts` - Sửa endpoints + thêm 4 APIs
7. ✅ `course.types.ts` - Thêm 10+ types mới

### 🚀 Sẵn Sàng Production

Module **Courses** đã hoàn thành mapping 100% với backend và sẵn sàng cho development!
const response = await axiosClient.get<
ApiResponse<CoursePublishedStatusResponse>

> (`/public/courses/${slug}/is-published`);
> return unwrapResponse(response);
> };

````

#### `getPublicCourseReviews` - Lấy reviews công khai (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/public/courses/{courseId}/reviews`
- **Status**: ❌ **THIẾU HOÀN TOÀN**
- **Priority**: **HIGH** - Quan trọng cho social proof
- **Description**: Lấy danh sách reviews với sorting (newest, rating_desc, rating_asc)
- **Use Case**: Hiển thị reviews trên landing page
- **Implementation**:

```typescript
getPublicCourseReviews: async (
  courseId: number,
  sort: string = "newest",
  page?: number,
  size?: number,
): Promise<PageResponse<CourseReviewResponse>> => {
  const response = await axiosClient.get<
    ApiResponse<PageResponse<CourseReviewResponse>>
  >(`/public/courses/${courseId}/reviews`, { params: { sort, page, size } });
  return unwrapResponse(response);
};
````

#### `getCourseRatingSummary` - Lấy tổng kết rating (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/public/courses/{courseId}/rating-summary`
- **Status**: ❌ **THIẾU HOÀN TOÀN**
- **Priority**: **HIGH** - Cần hiển thị overview rating
- **Description**: Lấy rating trung bình, tổng reviews, phân bố rating
- **Use Case**: Hiển thị rating summary trên landing page
- **Implementation**:

```typescript
getCourseRatingSummary: async (
  courseId: number,
): Promise<RatingSummaryResponse> => {
  const response = await axiosClient.get<ApiResponse<RatingSummaryResponse>>(
    `/public/courses/${courseId}/rating-summary`,
  );
  return unwrapResponse(response);
};
```

#### `getTeacherPublicProfile` - Lấy profile công khai của giáo viên (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/public/teachers/{teacherId}/profile`
- **Status**: ❌ **THIẾU HOÀN TOÀN**
- **Priority**: **HIGH** - Cần cho "About Instructor" section
- **Description**: Lấy thông tin giáo viên (bio, total students, avg rating, courses)
- **Use Case**: Section "Giới thiệu giảng viên" trên landing page
- **Implementation**:

```typescript
getTeacherPublicProfile: async (
  teacherId: number,
): Promise<PublicTeacherProfileResponse> => {
  const response = await axiosClient.get<
    ApiResponse<PublicTeacherProfileResponse>
  >(`/public/teachers/${teacherId}/profile`);
  return unwrapResponse(response);
};
```

#### `getRelatedCourses` - Lấy khóa học liên quan (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/public/courses/{courseId}/related`
- **Status**: ❌ **THIẾU HOÀN TOÀN**
- **Priority**: **MEDIUM** - Tăng conversion
- **Description**: Lấy khóa học gợi ý dựa trên category/tags (tối đa 6-12 khóa)
- **Use Case**: Section "Related Courses" trên landing page
- **Implementation**:

```typescript
getRelatedCourses: async (
  courseId: number,
  limit: number = 6,
): Promise<CourseCardResponse[]> => {
  const response = await axiosClient.get<ApiResponse<CourseCardResponse[]>>(
    `/public/courses/${courseId}/related`,
    { params: { limit } },
  );
  return unwrapResponse(response);
};
```

#### `getPopularCourses` - Lấy khóa học phổ biến (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/public/courses/popular`
- **Status**: ❌ **THIẾU HOÀN TOÀN**
- **Priority**: **MEDIUM** - Cần cho homepage
- **Description**: Lấy khóa học phổ biến dựa trên enrollment count và rating
- **Use Case**: Section "Featured Courses" trên trang chủ
- **Implementation**:

```typescript
getPopularCourses: async (
  limit: number = 10,
): Promise<CourseCardResponse[]> => {
  const response = await axiosClient.get<ApiResponse<CourseCardResponse[]>>(
    "/public/courses/popular",
    { params: { limit } },
  );
  return unwrapResponse(response);
};
```

---

## 🔧 CẦN SỬA NGAY (Critical Issues)

### 1. Sai Path Prefix cho Admin APIs

**Vấn đề**: Frontend đang dùng `/admin/categories`, `/admin/tags` nhưng Backend là `/api/v1/categories` (với @AdminOnly annotation).

**Service bị ảnh hưởng**:

- `category.service.ts`: 6 APIs
- `tag.service.ts`: 6 APIs

**Giải pháp**:

**Option 1** (Khuyến nghị): Sửa lại frontend để match backend

```typescript
// category.service.ts - SỬA
const CATEGORY_PREFIX = "/categories";
const ADMIN_CATEGORY_PREFIX = "/categories"; // Không cần /admin prefix

// tag.service.ts - SỬA
const TAG_PREFIX = "/tags";
const ADMIN_TAG_PREFIX = "/tags"; // Không cần /admin prefix
```

**Option 2**: Sửa backend để match frontend (không khuyến nghị vì cần sửa nhiều)

---

## 📊 Tổng Kết APIs Thiếu

| Module               | APIs Thiếu | Priority    |
| -------------------- | ---------- | ----------- |
| Category             | 2          | HIGH        |
| Course               | 5          | HIGH        |
| Course Version       | 2          | HIGH/MEDIUM |
| Tag                  | 4          | HIGH/MEDIUM |
| Course Preview (NEW) | 8          | CRITICAL    |
| **TỔNG CỘNG**        | **21**     | -           |

---

## 🎯 Khuyến Nghị Implementation

### Phase 1 - CRITICAL (Làm ngay)

1. ✅ Tạo `course-preview.service.ts` với 8 APIs cho landing page
2. ✅ Sửa path prefix cho category.service.ts và tag.service.ts
3. ✅ Thêm `getActiveCategories` cho dropdown chọn category
4. ✅ Thêm `searchPublishedCourses` cho trang search

---

## 📝 Notes

1. **Backend Security**: Tất cả admin APIs đều có @AdminOnly annotation, backend prefix là `/api/v1`, frontend chỉ cần path sau đó
2. **Base URL Configuration**: Frontend đã config base URL là `localhost/api/v1`, nên endpoints chỉ cần `/categories`, `/courses`, etc.
3. **Filter & Pagination**: Backend hỗ trợ SpringFilter và Pageable cho hầu hết list APIs
4. **Public APIs**: Không cần authentication, phục vụ cho landing page và SEO
5. **Course Preview Module**: Đã được tạo hoàn chỉnh với 8 APIs public

### Types Đã Thêm vào `course.types.ts`

- ✅ `CoursePreviewResponse`
- ✅ `PreviewVideoUrlResponse`
- ✅ `CoursePublishedStatusResponse`
- ✅ `CourseCardResponse`
- ✅ `ChapterPreview`
- ✅ `LessonPreview`
- ✅ `TagStatsResponse`
- ✅ `CategoryStatsResponse`
- ✅ `CourseStatsResponse`
- ✅ `BulkTagRequest`

---

**Ngày tạo**: 2026-01-23  
**Last Updated**: 2026-01-23  
**Version**: 2.0 - COMPLETED  
**Status**: ✅ **100% MAPPED**  
**Module**: Courses (Category, Course, Course Preview, Review, Version, Tag)
