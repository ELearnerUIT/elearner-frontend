# Course Module - API Mapping Documentation

Tài liệu này mapping toàn bộ API giữa Frontend và Backend cho module **Courses**, bao gồm role, chức năng và ghi chú thiếu/thừa.

---

## 📊 Tổng Quan

- **Tổng số API Frontend**: 46 APIs
- **Tổng số API Backend**: 64 APIs
- **APIs Khớp**: 46 APIs
- **APIs Thiếu ở Frontend**: 18 APIs ⚠️

---

## 1️⃣ CATEGORY MANAGEMENT MODULE

### Frontend Service: `category.service.ts`

#### 1.1. `createCategory` - Tạo category mới

- **Role**: `ADMIN`
- **Method**: POST
- **Frontend Endpoint**: `/admin/categories` ❌ **SAI PATH**
- **Backend Endpoint**: `/api/v1/categories` (với @AdminOnly annotation)
- **Status**: ⚠️ **FRONTEND PATH SAI - CẦN SỬA**
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
- **Frontend Endpoint**: `/admin/categories/{id}` ❌ **SAI PATH**
- **Backend Endpoint**: `/api/v1/categories/admin/{id}`
- **Status**: ⚠️ **FRONTEND PATH SAI - CẦN SỬA**
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
- **Frontend Endpoint**: `/admin/categories/deleted` ❌ **SAI PATH**
- **Backend Endpoint**: `/api/v1/categories/admin/deleted`
- **Status**: ⚠️ **FRONTEND PATH SAI - CẦN SỬA**
- **Description**: Admin xem danh sách categories đã xóa mềm
- **Use Case**: Admin muốn khôi phục lại category đã xóa nhầm

#### 1.6. `deleteCategory` - Xóa category

- **Role**: `ADMIN`
- **Method**: DELETE
- **Frontend Endpoint**: `/admin/categories/{id}` ❌ **SAI PATH**
- **Backend Endpoint**: `/api/v1/categories/{id}` (với @AdminOnly annotation)
- **Status**: ⚠️ **FRONTEND PATH SAI - CẦN SỬA**
- **Description**: Admin xóa mềm một category
- **Use Case**: Admin ẩn category không còn sử dụng

#### 1.7. `restoreCategory` - Khôi phục category đã xóa

- **Role**: `ADMIN`
- **Method**: PATCH
- **Frontend Endpoint**: `/admin/categories/{id}/restore` ❌ **SAI PATH**
- **Backend Endpoint**: `/api/v1/categories/{id}/restore` (với @AdminOnly annotation)
- **Status**: ⚠️ **FRONTEND PATH SAI - CẦN SỬA**
- **Description**: Admin khôi phục category đã xóa mềm
- **Use Case**: Admin khôi phục lại category đã xóa nhầm

#### 1.8. `updateCategory` - Cập nhật category

- **Role**: `ADMIN`
- **Method**: PUT
- **Frontend Endpoint**: `/admin/categories/{id}` ❌ **SAI PATH**
- **Backend Endpoint**: `/api/v1/categories/{id}` (với @AdminOnly annotation)
- **Status**: ⚠️ **FRONTEND PATH SAI - CẦN SỬA**
- **Description**: Admin chỉnh sửa thông tin category
- **Use Case**: Admin sửa tên, mô tả, thumbnail của category

#### 1.9. `getCategoryBySlug` - Lấy category theo slug

- **Role**: `PUBLIC`
- **Method**: GET
- **Endpoint**: `/api/v1/categories/slug/{slug}`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy category bằng slug thay vì ID (SEO-friendly)
- **Use Case**: Hiển thị category trên URL như /categories/web-development

### ⚠️ APIs THIẾU Ở Frontend (Category)

#### `getActiveCategories` - Lấy tất cả categories đang hoạt động

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/categories`
- **Status**: ❌ **THIẾU Ở FRONTEND**
- **Priority**: **HIGH** - Cần cho trang danh sách categories
- **Description**: Lấy tất cả categories đang visible (không bị xóa)
- **Use Case**: Hiển thị dropdown chọn category khi tạo khóa học
- **Implementation**: Thêm vào `category.service.ts`:

```typescript
getActiveCategories: async (): Promise<CategoryResponse[]> => {
  const response = await axiosClient.get<ApiResponse<CategoryResponse[]>>(
    `${CATEGORY_PREFIX}`,
  );
  return unwrapResponse(response);
};
```

#### `getCategoryStatistics` - Lấy thống kê categories

- **Role**: `ADMIN`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/categories/admin/stats`
- **Status**: ❌ **THIẾU Ở FRONTEND**
- **Priority**: **MEDIUM** - Cần cho dashboard admin
- **Description**: Thống kê số khóa học, số học viên theo từng category
- **Use Case**: Admin xem báo cáo hiệu suất của từng danh mục
- **Implementation**: Thêm vào `category.service.ts`:

```typescript
getCategoryStatistics: async (): Promise<CategoryStatsResponse[]> => {
  const response = await axiosClient.get<ApiResponse<CategoryStatsResponse[]>>(
    `/admin/categories/stats`, // Note: Phải fix path trên backend hoặc dùng /categories/admin/stats
  );
  return unwrapResponse(response);
};
```

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

### ⚠️ APIs THIẾU Ở Frontend (Course)

#### `cloneCourse` - Nhân bản khóa học

- **Role**: `TEACHER`
- **Method**: POST
- **Backend Endpoint**: `/api/v1/teacher/courses/{id}/clone`
- **Status**: ❌ **THIẾU Ở FRONTEND**
- **Priority**: **HIGH** - Tính năng hữu ích cho giáo viên
- **Description**: Tạo bản sao khóa học với tất cả nội dung (chapters, lessons, quizzes)
- **Use Case**: Giáo viên tái sử dụng khóa học cho học kỳ mới
- **Implementation**: Thêm vào `course.service.ts`:

```typescript
cloneCourse: async (
  id: number,
  newTitle?: string,
): Promise<CourseDetailResponse> => {
  const response = await axiosClient.post<ApiResponse<CourseDetailResponse>>(
    `${TEACHER_COURSE_PREFIX}/${id}/clone`,
    null,
    { params: { newTitle } },
  );
  return unwrapResponse(response);
};
```

#### `getCourseStatistics` - Lấy thống kê khóa học

- **Role**: `TEACHER`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/teacher/courses/{id}/stats`
- **Status**: ❌ **THIẾU Ở FRONTEND**
- **Priority**: **HIGH** - Cần cho dashboard giáo viên
- **Description**: Thống kê tổng học viên, rating trung bình, tỷ lệ hoàn thành, doanh thu
- **Use Case**: Giáo viên xem hiệu quả khóa học của mình
- **Implementation**: Thêm vào `course.service.ts`:

```typescript
getCourseStatistics: async (id: number): Promise<CourseStatsResponse> => {
  const response = await axiosClient.get<ApiResponse<CourseStatsResponse>>(
    `${TEACHER_COURSE_PREFIX}/${id}/stats`,
  );
  return unwrapResponse(response);
};
```

#### `getPublishedCourses` - Lấy tất cả khóa học đã publish (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/public/courses`
- **Status**: ❌ **THIẾU Ở FRONTEND**
- **Priority**: **HIGH** - Cần cho trang public
- **Description**: Lấy tất cả khóa học đã có published version
- **Use Case**: Trang chủ, trang explore courses
- **Implementation**: Thêm vào `course.service.ts`:

```typescript
getPublishedCourses: async (
  page?: number,
  size?: number,
  filter?: string,
): Promise<PageResponse<CourseResponse>> => {
  const response = await axiosClient.get<
    ApiResponse<PageResponse<CourseResponse>>
  >("/public/courses", { params: { page, size, filter } });
  return unwrapResponse(response);
};
```

#### `getPublishedCourseBySlug` - Lấy khóa học đã publish theo slug (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/public/courses/{slug}`
- **Status**: ❌ **THIẾU Ở FRONTEND**
- **Priority**: **HIGH** - Quan trọng cho trang landing
- **Description**: Lấy chi tiết khóa học đã publish (chỉ thông tin published version)
- **Use Case**: Trang landing page của khóa học cho người chưa đăng ký
- **Implementation**: Thêm vào `course.service.ts`:

```typescript
getPublishedCourseBySlug: async (
  slug: string,
): Promise<CourseDetailResponse> => {
  const response = await axiosClient.get<ApiResponse<CourseDetailResponse>>(
    `/public/courses/${slug}`,
  );
  return unwrapResponse(response);
};
```

#### `searchPublishedCourses` - Tìm kiếm khóa học đã publish (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/public/courses/search`
- **Status**: ❌ **THIẾU Ở FRONTEND**
- **Priority**: **HIGH** - Cần cho trang search
- **Description**: Tìm kiếm khóa học theo title, description, tags, category, difficulty
- **Use Case**: Người dùng tìm kiếm khóa học theo từ khóa
- **Implementation**: Thêm vào `course.service.ts`:

```typescript
searchPublishedCourses: async (
  query?: string,
  categoryId?: number,
  difficulty?: string,
  tags?: string,
  page?: number,
  size?: number,
): Promise<PageResponse<CourseResponse>> => {
  const response = await axiosClient.get<
    ApiResponse<PageResponse<CourseResponse>>
  >("/public/courses/search", {
    params: { query, categoryId, difficulty, tags, page, size },
  });
  return unwrapResponse(response);
};
```

---

## 3️⃣ COURSE REVIEW MODULE

### Frontend Service: `course-review.service.ts`

#### 3.1. `createReview` - Tạo đánh giá khóa học

- **Role**: `STUDENT`
- **Method**: POST
- **Endpoint**: `/api/v1/courses/{courseId}/reviews`
- **Status**: ✅ **MATCHED**
- **Description**: Học viên đánh giá khóa học (rating 1-5 sao và nội dung)
- **Use Case**: Học viên viết review sau khi hoàn thành khóa học

#### 3.2. `getCourseReviews` - Lấy đánh giá của khóa học

- **Role**: `PUBLIC`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/{courseId}/reviews`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy danh sách reviews của khóa học (có pagination)
- **Use Case**: Hiển thị reviews trên trang chi tiết khóa học

#### 3.3. `updateReview` - Cập nhật đánh giá

- **Role**: `STUDENT`
- **Method**: PUT
- **Endpoint**: `/api/v1/courses/{courseId}/reviews/{reviewId}`
- **Status**: ✅ **MATCHED**
- **Description**: Học viên sửa đánh giá của mình
- **Use Case**: Học viên muốn cập nhật nội dung review

#### 3.4. `deleteReview` - Xóa đánh giá

- **Role**: `STUDENT`
- **Method**: DELETE
- **Endpoint**: `/api/v1/courses/{courseId}/reviews/{reviewId}`
- **Status**: ✅ **MATCHED**
- **Description**: Học viên xóa đánh giá của mình
- **Use Case**: Học viên muốn gỡ review đã viết

#### 3.5. `getRatingSummary` - Lấy tổng kết rating

- **Role**: `PUBLIC`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/{courseId}/rating-summary`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy rating trung bình, tổng số reviews, phân bố rating (1-5 sao)
- **Use Case**: Hiển thị overview rating trên trang chi tiết khóa học

---

## 4️⃣ COURSE VERSION MODULE

### Frontend Service: `course-version.service.ts`

#### 4.1. `createCourseVersion` - Tạo version mới

- **Role**: `TEACHER`
- **Method**: POST
- **Endpoint**: `/api/v1/courses/{courseId}/versions`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên tạo version mới cho khóa học
- **Use Case**: Cập nhật nội dung khóa học, thay đổi giá, thời hạn

#### 4.2. `getCourseVersions` - Lấy tất cả versions

- **Role**: `TEACHER`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/{courseId}/versions`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên xem danh sách versions của khóa học
- **Use Case**: Trang quản lý versions của giáo viên

#### 4.3. `getDeletedCourseVersions` - Lấy versions đã xóa

- **Role**: `TEACHER`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/{courseId}/versions/deleted`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên xem versions đã xóa mềm
- **Use Case**: Khôi phục lại version đã xóa nhầm

#### 4.4. `getCourseVersionById` - Lấy version theo ID

- **Role**: `TEACHER` or `ADMIN`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/{courseId}/versions/{versionId}`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy chi tiết một version cụ thể
- **Use Case**: Xem chi tiết version trước khi submit/publish

#### 4.5. `updateCourseVersion` - Cập nhật version

- **Role**: `TEACHER`
- **Method**: PUT
- **Endpoint**: `/api/v1/courses/{courseId}/versions/{versionId}`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên sửa version (chỉ DRAFT/REJECTED)
- **Use Case**: Sửa thông tin version trước khi submit

#### 4.6. `deleteCourseVersion` - Xóa version

- **Role**: `TEACHER`
- **Method**: DELETE
- **Endpoint**: `/api/v1/courses/{courseId}/versions/{versionId}`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên xóa version (chỉ DRAFT/PENDING/REJECTED)
- **Use Case**: Xóa version không còn cần thiết

#### 4.7. `getCourseVersionsByStatus` - Lấy versions theo status

- **Role**: `TEACHER`
- **Method**: GET
- **Endpoint**: `/api/v1/courses/{courseId}/versions/status/{status}`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy versions theo trạng thái (DRAFT, PENDING, APPROVED, REJECTED, PUBLISHED)
- **Use Case**: Filter versions theo status trong dashboard

#### 4.8. `submitApproval` - Submit version để duyệt

- **Role**: `TEACHER`
- **Method**: POST
- **Endpoint**: `/api/v1/courses/{courseId}/versions/{versionId}/submit-approval`
- **Status**: ✅ **MATCHED**
- **Description**: Giáo viên gửi version cho admin duyệt
- **Use Case**: Submit version hoàn chỉnh để được phê duyệt

#### 4.9. `approveCourseVersion` - Duyệt version

- **Role**: `ADMIN`
- **Method**: POST
- **Endpoint**: `/api/v1/courses/{courseId}/versions/{versionId}/approve`
- **Status**: ✅ **MATCHED**
- **Description**: Admin phê duyệt version
- **Use Case**: Admin duyệt version đủ tiêu chuẩn

#### 4.10. `rejectCourseVersion` - Từ chối version

- **Role**: `ADMIN`
- **Method**: POST
- **Endpoint**: `/api/v1/courses/{courseId}/versions/{versionId}/reject`
- **Status**: ✅ **MATCHED**
- **Description**: Admin từ chối version (kèm lý do)
- **Use Case**: Admin từ chối version vi phạm quy định

#### 4.11. `publishCourseVersion` - Publish version

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

#### 5.2. `getTags` - Lấy tất cả tags active

- **Role**: `PUBLIC`
- **Method**: GET
- **Endpoint**: `/api/v1/tags`
- **Status**: ✅ **MATCHED**
- **Description**: Lấy danh sách tags đang active (có pagination)
- **Use Case**: Hiển thị danh sách tags để filter khóa học

#### 5.3. `getAllTags` - Lấy tất cả tags (Admin)

- **Role**: `ADMIN`
- **Method**: GET
- **Frontend Endpoint**: `/admin/tags` ❌ **SAI PATH**
- **Backend Endpoint**: `/api/v1/tags/admin`
- **Status**: ⚠️ **FRONTEND PATH SAI - CẦN SỬA**
- **Description**: Admin xem tất cả tags (kể cả đã xóa)
- **Use Case**: Admin quản lý tags trong hệ thống

#### 5.4. `updateTag` - Cập nhật tag

- **Role**: `ADMIN`
- **Method**: PUT
- **Frontend Endpoint**: `/admin/tags/{id}` ❌ **SAI PATH**
- **Backend Endpoint**: `/api/v1/tags/{id}` (với @AdminOnly annotation)
- **Status**: ⚠️ **FRONTEND PATH SAI - CẦN SỬA**
- **Description**: Admin sửa thông tin tag
- **Use Case**: Admin đổi tên tag hoặc sửa slug

#### 5.5. `deleteTag` - Xóa tag

- **Role**: `ADMIN`
- **Method**: DELETE
- **Frontend Endpoint**: `/admin/tags/{id}` ❌ **SAI PATH**
- **Backend Endpoint**: `/api/v1/tags/{id}` (với @AdminOnly annotation)
- **Status**: ⚠️ **FRONTEND PATH SAI - CẦN SỬA**
- **Description**: Admin xóa mềm tag
- **Use Case**: Admin ẩn tag không còn sử dụng

#### 5.6. `restoreTag` - Khôi phục tag

- **Role**: `ADMIN`
- **Method**: PATCH
- **Frontend Endpoint**: `/admin/tags/{id}/restore` ❌ **SAI PATH**
- **Backend Endpoint**: `/api/v1/tags/{id}/restore` (với @AdminOnly annotation)
- **Status**: ⚠️ **FRONTEND PATH SAI - CẦN SỬA**
- **Description**: Admin khôi phục tag đã xóa
- **Use Case**: Admin khôi phục lại tag đã xóa nhầm

### ⚠️ APIs THIẾU Ở Frontend (Tag)

#### `getPopularTags` - Lấy tags phổ biến

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/tags/popular`
- **Status**: ❌ **THIẾU Ở FRONTEND**
- **Priority**: **MEDIUM** - Hay dùng cho trending section
- **Description**: Lấy top tags được dùng nhiều nhất (theo số khóa học)
- **Use Case**: Hiển thị trending tags trên trang chủ
- **Implementation**: Thêm vào `tag.service.ts`:

```typescript
getPopularTags: async (limit: number = 10): Promise<TagStatsResponse[]> => {
  const response = await axiosClient.get<ApiResponse<TagStatsResponse[]>>(
    `${TAG_PREFIX}/popular`,
    { params: { limit } },
  );
  return unwrapResponse(response);
};
```

#### `searchTags` - Tìm kiếm tags

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/tags/search`
- **Status**: ❌ **THIẾU Ở FRONTEND**
- **Priority**: **HIGH** - Cần cho autocomplete
- **Description**: Tìm kiếm tags theo tên (prefix matching)
- **Use Case**: Autocomplete khi giáo viên nhập tags cho khóa học
- **Implementation**: Thêm vào `tag.service.ts`:

```typescript
searchTags: async (query: string): Promise<TagResponse[]> => {
  const response = await axiosClient.get<ApiResponse<TagResponse[]>>(
    `${TAG_PREFIX}/search`,
    { params: { query } },
  );
  return unwrapResponse(response);
};
```

#### `bulkCreateTags` - Tạo nhiều tags cùng lúc

- **Role**: `ADMIN`
- **Method**: POST
- **Backend Endpoint**: `/api/v1/tags/bulk`
- **Status**: ❌ **THIẾU Ở FRONTEND**
- **Priority**: **LOW** - Ít dùng
- **Description**: Tạo nhiều tags từ danh sách tên (tự động bỏ qua duplicates)
- **Use Case**: Admin import tags từ file CSV
- **Implementation**: Thêm vào `tag.service.ts`:

```typescript
bulkCreateTags: async (tagNames: string[]): Promise<TagResponse[]> => {
  const response = await axiosClient.post<ApiResponse<TagResponse[]>>(
    `${TAG_PREFIX}/bulk`,
    { tagNames },
  );
  return unwrapResponse(response);
};
```

#### `getTagStatistics` - Lấy thống kê tags

- **Role**: `ADMIN`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/tags/admin/stats`
- **Status**: ❌ **THIẾU Ở FRONTEND**
- **Priority**: **MEDIUM** - Cần cho dashboard admin
- **Description**: Thống kê số khóa học theo từng tag
- **Use Case**: Admin xem báo cáo sử dụng tags
- **Implementation**: Thêm vào `tag.service.ts`:

```typescript
getTagStatistics: async (): Promise<TagStatsResponse[]> => {
  const response = await axiosClient.get<ApiResponse<TagStatsResponse[]>>(
    `${TAG_PREFIX}/admin/stats`,
  );
  return unwrapResponse(response);
};
```

---

## 6️⃣ COURSE PREVIEW MODULE (Public)

### ⚠️ APIs THIẾU Ở Frontend - CẦN TẠO SERVICE MỚI

Backend có controller `CoursePreviewController` nhưng **FRONTEND CHƯA CÓ SERVICE** tương ứng.

**❗ KHUYẾN NGHỊ**: Tạo file mới `course-preview.service.ts` với các APIs sau:

#### `getCoursePreview` - Xem preview khóa học (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/public/courses/{slug}/preview`
- **Status**: ❌ **THIẾU HOÀN TOÀN**
- **Priority**: **CRITICAL** - Rất quan trọng cho landing page
- **Description**: Lấy preview chi tiết khóa học bao gồm chapters và preview lessons
- **Use Case**: Người chưa đăng ký xem nội dung mẫu của khóa học
- **Implementation**: Tạo `course-preview.service.ts`:

```typescript
getCoursePreview: async (slug: string): Promise<CoursePreviewResponse> => {
  const response = await axiosClient.get<ApiResponse<CoursePreviewResponse>>(
    `/public/courses/${slug}/preview`,
  );
  return unwrapResponse(response);
};
```

#### `getPreviewVideoStreamUrl` - Lấy URL video preview (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/public/lessons/{lessonId}/preview/stream-url`
- **Status**: ❌ **THIẾU HOÀN TOÀN**
- **Priority**: **CRITICAL** - Cần để xem video mẫu
- **Description**: Lấy streaming URL cho lesson được đánh dấu isPreview=true
- **Use Case**: Người chưa đăng ký xem video bài học mẫu miễn phí
- **Implementation**:

```typescript
getPreviewVideoStreamUrl: async (
  lessonId: number,
): Promise<PreviewVideoUrlResponse> => {
  const response = await axiosClient.get<ApiResponse<PreviewVideoUrlResponse>>(
    `/public/lessons/${lessonId}/preview/stream-url`,
  );
  return unwrapResponse(response);
};
```

#### `isCoursePublished` - Kiểm tra khóa học đã publish (Public)

- **Role**: `PUBLIC`
- **Method**: GET
- **Backend Endpoint**: `/api/v1/public/courses/{slug}/is-published`
- **Status**: ❌ **THIẾU HOÀN TOÀN**
- **Priority**: **HIGH** - Cần để check trạng thái
- **Description**: Kiểm tra nhanh xem khóa học có version published không
- **Use Case**: Điều hướng user nếu khóa học chưa publish
- **Implementation**:

```typescript
isCoursePublished: async (
  slug: string,
): Promise<CoursePublishedStatusResponse> => {
  const response = await axiosClient.get<
    ApiResponse<CoursePublishedStatusResponse>
  >(`/public/courses/${slug}/is-published`);
  return unwrapResponse(response);
};
```

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
```

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

### Phase 2 - HIGH (Trong tuần này)

5. ✅ Thêm `cloneCourse` và `getCourseStatistics` cho teacher
6. ✅ Thêm `getPublishedCourses` và `getPublishedCourseBySlug` cho public
7. ✅ Thêm `searchTags` cho autocomplete
8. ✅ Thêm `getPublishedVersionBySlug` cho pricing info

### Phase 3 - MEDIUM/LOW (Có thể làm sau)

9. ✅ Thêm `getCategoryStatistics` và `getTagStatistics` cho admin dashboard
10. ✅ Thêm `getPopularTags` cho trending section
11. ✅ Thêm `bulkCreateTags` cho admin bulk operations
12. ✅ Thêm `getPublicCourseVersionById` (ít dùng)

---

## 📝 Notes

1. **Backend Security**: Tất cả admin APIs đều có @AdminOnly annotation, không cần thêm /admin vào path
2. **Filter & Pagination**: Backend hỗ trợ SpringFilter và Pageable cho hầu hết list APIs
3. **Public APIs**: Không cần authentication, phục vụ cho landing page và SEO
4. **Course Preview**: Module mới hoàn toàn, cần tạo service từ đầu
5. **Type Definitions**: Cần thêm types mới trong `course.types.ts`:
   - `CoursePreviewResponse`
   - `PreviewVideoUrlResponse`
   - `CoursePublishedStatusResponse`
   - `PublicTeacherProfileResponse`
   - `CourseCardResponse`
   - `TagStatsResponse`
   - `CategoryStatsResponse`
   - `CourseStatsResponse`

---

**Ngày tạo**: 2026-01-23  
**Version**: 1.0  
**Module**: Courses (Category, Course, Review, Version, Tag, Preview)
