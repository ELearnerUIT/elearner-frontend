# Course Module - Screen Design & User Flows

Tài liệu đề xuất các màn hình và mô tả luồng hoạt động cho module **Courses** (Category, Course, Review, Version, Tag, Preview).

---

## 📱 Tổng Quan Màn Hình

Module Courses bao gồm **20 màn hình** chính:

### Public Screens (6 màn hình)

1. **Course Landing Page** - Trang chi tiết khóa học công khai
2. **Course Catalog/Explore** - Danh sách khóa học
3. **Course Search** - Tìm kiếm khóa học nâng cao
4. **Category Page** - Khóa học theo danh mục
5. **Teacher Public Profile** - Hồ sơ giảng viên công khai
6. **Home Page (Featured Courses)** - Khóa học nổi bật trang chủ

### Teacher Screens (8 màn hình)

7. **My Courses Dashboard** - Dashboard quản lý khóa học
8. **Create Course** - Tạo khóa học mới
9. **Edit Course** - Chỉnh sửa thông tin khóa học
10. **Course Versions Management** - Quản lý versions
11. **Create/Edit Version** - Tạo/sửa version
12. **Course Statistics** - Thống kê khóa học
13. **Version Approval Status** - Theo dõi trạng thái duyệt
14. **Clone Course** - Nhân bản khóa học

### Student Screens (2 màn hình)

15. **My Learning** - Khóa học đã đăng ký
16. **Course Review Form** - Viết đánh giá khóa học

### Admin Screens (4 màn hình)

17. **Category Management** - Quản lý danh mục
18. **Tag Management** - Quản lý tags
19. **Course Approval Queue** - Hàng đợi duyệt khóa học
20. **Admin Analytics Dashboard** - Thống kê tổng quan

---

## 🔵 PUBLIC SCREENS

### 1. Course Landing Page

**Mục đích**: Trang giới thiệu chi tiết khóa học cho người chưa đăng ký, tối ưu conversion rate.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Navigation Bar (Logo | Browse | Search | Login/Sign Up)     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────┬──────────────────────────┐   │
│  │                          │  [Course Thumbnail]       │   │
│  │  Course Title (H1)       │                           │   │
│  │  Short Description       │  [Preview Video Player]   │   │
│  │                          │                           │   │
│  │  ⭐ 4.5 (234 reviews)    │  [▶ Play Preview]        │   │
│  │  👥 1,234 students       │                           │   │
│  │  📖 45 lessons           │                           │   │
│  │  ⏱ 12 hours              │                           │   │
│  │                          │                           │   │
│  │  By: [Teacher Avatar]    │                           │   │
│  │       John Doe           │                           │   │
│  │                          │                           │   │
│  │  Tags: #Java #Spring     │                           │   │
│  │        #Backend          │                           │   │
│  └──────────────────────────┴──────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [Enrollment Card - Sticky]                         │   │
│  │  💰 $99.99  ~~$199.99~~ (50% OFF)                  │   │
│  │  ⏰ Offer ends in 2 days                            │   │
│  │  📅 Valid for 90 days                               │   │
│  │  [🛒 Enroll Now] [🤍 Add to Wishlist]              │   │
│  │  ✓ 30-day money-back guarantee                     │   │
│  │  ✓ Full lifetime access                            │   │
│  │  ✓ Certificate of completion                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────── TABS ───────────────────────────────────────┐   │
│  │ Overview | Curriculum | Reviews | Instructor | FAQ  │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  📝 WHAT YOU'LL LEARN                               │   │
│  │  ✓ Build REST APIs with Spring Boot                │   │
│  │  ✓ Implement JWT authentication                    │   │
│  │  ✓ Deploy to AWS                                   │   │
│  │  ...                                                │   │
│  │                                                      │   │
│  │  👤 REQUIREMENTS                                    │   │
│  │  • Basic Java knowledge                            │   │
│  │  • IDE installed (IntelliJ/Eclipse)                │   │
│  │                                                      │   │
│  │  🎯 COURSE DESCRIPTION                             │   │
│  │  [Full rich text description...]                   │   │
│  │                                                      │   │
│  │  📚 CURRICULUM (Expandable Chapters)               │   │
│  │  Chapter 1: Introduction (3 lessons - 45 min)      │   │
│  │    ├── 1.1 Welcome to the Course [🎬 Preview]     │   │
│  │    ├── 1.2 Setup Development Environment [🔒]     │   │
│  │    └── 1.3 First Spring Boot App [🔒]             │   │
│  │                                                      │   │
│  │  Chapter 2: Core Concepts (5 lessons - 2 hours)    │   │
│  │    ├── 2.1 Dependency Injection [🔒]              │   │
│  │    └── ...                                          │   │
│  │                                                      │   │
│  │  ⭐ STUDENT REVIEWS                                │   │
│  │  [Sort: Most Recent ▼]                             │   │
│  │                                                      │   │
│  │  [Rating Distribution Bar Chart]                   │   │
│  │  ⭐⭐⭐⭐⭐ 150 (64%)  ████████████████             │   │
│  │  ⭐⭐⭐⭐   60 (26%)  ███████                       │   │
│  │  ⭐⭐⭐    20 (9%)   ███                            │   │
│  │  ⭐⭐      3 (1%)   █                              │   │
│  │  ⭐       1 (0%)   █                              │   │
│  │                                                      │   │
│  │  [Review Card 1]                                   │   │
│  │  ⭐⭐⭐⭐⭐                                          │   │
│  │  "Great course! Very practical..."                │   │
│  │  - Sarah Johnson, 2 weeks ago                     │   │
│  │  👍 Helpful (23)                                   │   │
│  │                                                      │   │
│  │  [Review Card 2]                                   │   │
│  │  ...                                                │   │
│  │                                                      │   │
│  │  [Load More Reviews]                               │   │
│  │                                                      │   │
│  │  👨‍🏫 ABOUT THE INSTRUCTOR                          │   │
│  │  [Teacher Avatar] John Doe                         │   │
│  │  Senior Backend Developer at Google               │   │
│  │  ⭐ 4.7 Instructor Rating                          │   │
│  │  📚 12 Courses                                      │   │
│  │  👥 15,234 Students                                 │   │
│  │  [Bio text...]                                      │   │
│  │                                                      │   │
│  │  Other Courses by John:                            │   │
│  │  [Course Card] [Course Card] [Course Card]         │   │
│  │                                                      │   │
│  │  ❓ FAQ                                            │   │
│  │  [Accordion of common questions]                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  💡 RELATED COURSES                                         │
│  [Course Card] [Course Card] [Course Card] [Course Card]   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `getCoursePreview(slug)` - Lấy thông tin khóa học + chapters + preview lessons
- `getPublishedVersionBySlug(slug)` - Lấy giá, thời hạn, điểm đạt
- `getPublicCourseReviews(courseId, sort, page, size)` - Lấy reviews
- `getCourseRatingSummary(courseId)` - Rating summary
- `getTeacherPublicProfile(teacherId)` - Thông tin giảng viên
- `getRelatedCourses(courseId, limit=4)` - Khóa học liên quan
- `getPreviewVideoStreamUrl(lessonId)` - URL video preview (khi click play)
- `isCoursePublished(slug)` - Check xem khóa học có published không

**User Interactions**:

1. **View Preview Video**: Click lesson có 🎬 icon → Modal player với preview video
2. **Expand Chapter**: Click chapter → Expand/collapse danh sách lessons
3. **Switch Tabs**: Click tab → Load content tương ứng
4. **Sort Reviews**: Dropdown → Re-fetch reviews với sort param
5. **Load More Reviews**: Pagination button → Fetch next page
6. **Enroll Now**: Button → Redirect to checkout/payment (module khác)
7. **Add to Wishlist**: Heart icon → Save to wishlist (module khác)
8. **View Teacher Profile**: Click teacher name → Navigate to Teacher Public Profile

**Responsive Design**:

- Mobile: Stack sidebar card below hero, tabs vertical
- Tablet: Same as desktop but narrower
- Desktop: Sidebar sticky during scroll

---

### 2. Course Catalog/Explore Page

**Mục đích**: Danh sách tất cả khóa học đã publish, có filter và pagination.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Navigation Bar                                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  EXPLORE COURSES                                            │
│  Discover our collection of courses                         │
│                                                              │
│  ┌──────────┬──────────────────────────────────────────┐   │
│  │ FILTERS  │  [Grid View] [List View]  Sort: Popular ▼│   │
│  │          │                                           │   │
│  │ Category │  [Course Card]  [Course Card]  [Course Card] │
│  │ □ Web Dev│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ □ Mobile │  │[Img]     │  │[Img]     │  │[Img]     │   │
│  │ □ Data   │  │Java 101  │  │React Pro │  │Python ML │   │
│  │          │  │⭐4.5(120)│  │⭐4.8(89) │  │⭐4.7(234)│   │
│  │ Price    │  │👥1,234   │  │👥567     │  │👥3,456   │   │
│  │ ○ Free   │  │$99.99    │  │$149.99   │  │$199.99   │   │
│  │ ○ Paid   │  └──────────┘  └──────────┘  └──────────┘   │
│  │ ○ All    │                                           │   │
│  │          │  [Course Card]  [Course Card]  [Course Card] │
│  │ Level    │  ...                                      │   │
│  │ □ Begin. │                                           │   │
│  │ □ Inter. │  [Pagination]                            │   │
│  │ □ Adv.   │  « 1 2 3 4 5 »                            │   │
│  │          │                                           │   │
│  │ Tags     │                                           │   │
│  │ [Search] │                                           │   │
│  │ #Java    │                                           │   │
│  │ #Spring  │                                           │   │
│  │ #React   │                                           │   │
│  │ ...      │                                           │   │
│  └──────────┴──────────────────────────────────────────┘   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `getPublishedCourses(page, size, filter)` - Lấy danh sách khóa học với filter
- `getCategoryTree()` - Lấy categories cho filter
- `getTags(page, size)` - Lấy tags cho filter
- `getPopularTags(limit=20)` - Trending tags

**Query Params**:

```
/explore?category=web-development&difficulty=BEGINNER&price=paid&tags=react,javascript&page=1&sort=popular
```

**User Interactions**:

1. **Filter by Category**: Checkbox → Update filter + refetch
2. **Filter by Price**: Radio → Update filter + refetch
3. **Filter by Level**: Checkbox → Update filter + refetch
4. **Filter by Tags**: Click tag chip → Add to filter + refetch
5. **Sort**: Dropdown (Popular, Newest, Price Low-High, Rating) → Refetch with sort
6. **View Toggle**: Switch between grid/list layout (CSS only, no API call)
7. **Pagination**: Click page number → Fetch with page param
8. **Click Course Card**: Navigate to Course Landing Page

**State Management**:

```typescript
interface ExploreState {
  courses: PageResponse<CourseResponse>;
  filters: {
    categoryIds: number[];
    difficulty: Difficulty[];
    priceType: "free" | "paid" | "all";
    tags: string[];
  };
  sort: "popular" | "newest" | "price_asc" | "price_desc" | "rating";
  view: "grid" | "list";
  page: number;
  size: number;
}
```

---

### 3. Course Search Page

**Mục đích**: Tìm kiếm khóa học nâng cao với auto-suggest và filters.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Navigation Bar                                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔍  [Search courses...             ] [Search]      │   │
│  │                                                      │   │
│  │  Suggestions:                                       │   │
│  │  • Java Programming                                 │   │
│  │  • Spring Boot Microservices                       │   │
│  │  • React Hooks Tutorial                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Search results for "spring boot" (47 courses)             │
│                                                              │
│  ┌──────────┬──────────────────────────────────────────┐   │
│  │ FILTERS  │  Sort by: Relevance ▼                    │   │
│  │ ...      │                                           │   │
│  │          │  [Course List Item]                      │   │
│  │          │  ┌────────────────────────────────────┐  │   │
│  │          │  │ [Thumbnail] Spring Boot Masterclass │  │   │
│  │          │  │             ⭐4.8 (567 reviews)      │  │   │
│  │          │  │             👥2,345 students         │  │   │
│  │          │  │             12 hours · All Levels   │  │   │
│  │          │  │             $129.99                  │  │   │
│  │          │  │             [Enroll Now]             │  │   │
│  │          │  └────────────────────────────────────┘  │   │
│  │          │                                           │   │
│  │          │  [Course List Item]                      │   │
│  │          │  ...                                      │   │
│  └──────────┴──────────────────────────────────────────┘   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `searchPublishedCourses(query, categoryId, difficulty, tags, page, size)` - Main search
- `getCategoryTree()` - Categories for filter
- `searchTags(query)` - Auto-suggest tags khi typing

**Search Flow**:

1. User types in search box
2. Debounce 300ms → Show suggestions dropdown
3. User selects suggestion or presses Enter
4. Navigate to `/search?q=spring+boot`
5. Fetch results with `searchPublishedCourses()`
6. Display results with filters sidebar

**URL Structure**:

```
/search?q=spring+boot&category=1&difficulty=INTERMEDIATE&tags=java,spring&page=1
```

---

### 4. Category Page

**Mục đích**: Hiển thị tất cả khóa học trong một category cụ thể.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Navigation Bar                                               │
├─────────────────────────────────────────────────────────────┤
│  Home > Categories > Web Development                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [Category Thumbnail/Banner]                        │   │
│  │  WEB DEVELOPMENT                                     │   │
│  │  Learn to build modern web applications            │   │
│  │  👥 12,345 students · 📚 87 courses                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  SUBCATEGORIES                                              │
│  [Frontend] [Backend] [Full Stack] [DevOps]                │
│                                                              │
│  COURSES IN WEB DEVELOPMENT                                 │
│  Sort by: Popular ▼   [Grid] [List]                        │
│                                                              │
│  [Course Card] [Course Card] [Course Card] [Course Card]   │
│  ...                                                         │
│                                                              │
│  [Pagination]                                               │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `getCategoryBySlug(slug)` - Lấy thông tin category
- `getPublishedCourses(page, size, filter="categoryId:5")` - Courses trong category
- `getCategoryTree()` - Lấy subcategories

**URL**: `/categories/web-development`

**User Interactions**:

1. Click subcategory chip → Filter courses by subcategory
2. Sort dropdown → Refetch with sort param
3. Grid/List toggle → Change layout
4. Pagination → Next/prev page

---

### 5. Teacher Public Profile Page

**Mục đích**: Hiển thị hồ sơ công khai của giảng viên (About Instructor section).

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Navigation Bar                                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  [Cover Photo/Banner]                                │  │
│  │                                                       │  │
│  │  [Large Avatar]                                      │  │
│  │  JOHN DOE                                            │  │
│  │  Senior Backend Developer at Google                 │  │
│  │  ⭐ 4.8 Instructor Rating                            │  │
│  │  👥 25,345 Students                                   │  │
│  │  📚 12 Courses                                        │  │
│  │  [Follow] [Message]                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────── TABS ────────────────────────────────────────┐  │
│  │ About | Courses | Reviews                            │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  ABOUT                                               │  │
│  │  [Full bio text with rich formatting...]            │  │
│  │                                                       │  │
│  │  EXPERTISE                                           │  │
│  │  #Java #Spring Boot #Microservices #AWS #Docker      │  │
│  │                                                       │  │
│  │  SOCIAL LINKS                                        │  │
│  │  🔗 LinkedIn  🐦 Twitter  💻 GitHub                  │  │
│  │                                                       │  │
│  │  COURSES (12)                                        │  │
│  │  [Course Card] [Course Card] [Course Card]           │  │
│  │  ...                                                  │  │
│  │                                                       │  │
│  │  STUDENT FEEDBACK                                    │  │
│  │  ⭐⭐⭐⭐⭐ Excellent instructor!                      │  │
│  │  - Sarah J., 1 week ago                             │  │
│  │  ...                                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `getTeacherPublicProfile(teacherId)` - Lấy profile + bio + stats + courses
- `getPublicCourseReviews()` cho từng course (nếu cần hiển thị reviews)

**URL**: `/teachers/john-doe` hoặc `/teachers/{teacherId}`

**User Interactions**:

1. Switch tabs → Show different content
2. Click course card → Navigate to Course Landing Page
3. Follow button → Save to followed teachers (module khác)
4. Message button → Open chat (module khác)

---

### 6. Home Page - Featured Courses Section

**Mục đích**: Section hiển thị khóa học nổi bật trên trang chủ.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Hero Section                                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🔥 POPULAR COURSES                                          │
│  What our students are learning                             │
│                                                              │
│  [Course Card] [Course Card] [Course Card] [Course Card]    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │[Img]     │ │[Img]     │ │[Img]     │ │[Img]     │      │
│  │Java 101  │ │React Pro │ │Python ML │ │AWS Cloud │      │
│  │⭐4.8(567)│ │⭐4.9(234)│ │⭐4.7(890)│ │⭐4.6(345)│      │
│  │👥5,234   │ │👥2,345   │ │👥8,901   │ │👥1,234   │      │
│  │$99.99    │ │$149.99   │ │$199.99   │ │$129.99   │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                              │
│  [View All Courses →]                                       │
│                                                              │
│  💡 TRENDING TOPICS                                          │
│  #JavaScript #React #Python #Java #AWS #Docker ...          │
│                                                              │
│  📚 BROWSE BY CATEGORY                                       │
│  [Web Dev] [Mobile] [Data Science] [DevOps] ...            │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Other sections...                                            │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `getPopularCourses(limit=8)` - Featured courses
- `getPopularTags(limit=15)` - Trending tags
- `getCategoryTree()` - Browse by category

**User Interactions**:

1. Click course card → Course Landing Page
2. Click "View All" → Navigate to Explore page
3. Click tag → Navigate to Search page with tag filter
4. Click category → Navigate to Category page

---

## 🟢 TEACHER SCREENS

### 7. My Courses Dashboard (Teacher)

**Mục đích**: Dashboard tổng quan quản lý tất cả khóa học của giáo viên.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Teacher Navigation (Courses | Students | Analytics | $)     │
├─────────────────────────────────────────────────────────────┤
│  MY COURSES                                                  │
│  [+ Create New Course]  [🔍 Search]  [Filter ▼]  [Sort ▼]  │
│                                                              │
│  ┌────── COURSE LIST (Table View) ──────────────────────┐  │
│  │ Thumbnail | Title       | Status    | Students | ⚙️  │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ [Img]     | Java 101    | Published | 1,234    | ...│  │
│  │           | 3 versions  | ⭐4.8     | $12.3K   | ⚙️  │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ [Img]     | Spring Boot | Pending   | 0        | ...│  │
│  │           | 1 version   | -         | -        | ⚙️  │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ [Img]     | React Hooks | Draft     | 567      | ...│  │
│  │           | 2 versions  | ⭐4.5     | $5.6K    | ⚙️  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  [Pagination: 1 2 3 ... 10]                                 │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**Dropdown Menu (⚙️)**:

- ✏️ Edit Course
- 📋 Manage Versions
- 📊 View Statistics
- 👥 View Students
- 📋 Clone Course
- 🗑️ Delete Course

**APIs Used**:

- `getMyCourses(page, size, filter)` - Lấy danh sách khóa học của teacher
- `getCourseStatistics(courseId)` - Stats cho từng khóa (lazy load khi hover)
- `deleteCourse(courseId)` - Xóa khóa học
- `cloneCourse(courseId, newTitle)` - Nhân bản khóa học

**Filters**:

- Status: All | Published | Draft | Pending | Closed
- Sort: Newest | Oldest | Most Students | Highest Rating | Revenue

**User Interactions**:

1. **Create New Course**: Button → Navigate to Create Course page
2. **Search**: Type → Filter courses by title
3. **Filter/Sort**: Dropdown → Refetch with params
4. **Click Row**: Navigate to Course Detail/Edit page
5. **Dropdown Actions**:
   - Edit → Edit Course page
   - Manage Versions → Versions Management page
   - Statistics → Course Statistics page
   - Clone → Modal confirm → API call → Refresh list
   - Delete → Modal confirm → API call → Refresh list

**State Management**:

```typescript
interface MyCoursesState {
  courses: PageResponse<CourseResponse>;
  filters: {
    status: CourseStatus | "all";
    search: string;
  };
  sort: "newest" | "oldest" | "students" | "rating" | "revenue";
  page: number;
}
```

---

### 8. Create Course Page (Teacher)

**Mục đích**: Form tạo khóa học mới (chỉ thông tin cơ bản, chưa có version).

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Teacher Navigation                                           │
├─────────────────────────────────────────────────────────────┤
│  CREATE NEW COURSE                                          │
│  [← Back to My Courses]                                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  STEP 1: Basic Information                           │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │  │
│  │                                                       │  │
│  │  Course Title *                                      │  │
│  │  [_____________________________________________]      │  │
│  │                                                       │  │
│  │  Short Description *                                 │  │
│  │  [_____________________________________________]      │  │
│  │  [_____________________________________________]      │  │
│  │  Brief description for course cards (max 200 chars) │  │
│  │                                                       │  │
│  │  Category *                                          │  │
│  │  [Select Category ▼                        ]         │  │
│  │                                                       │  │
│  │  Difficulty Level *                                  │  │
│  │  ○ Beginner  ○ Intermediate  ○ Advanced             │  │
│  │                                                       │  │
│  │  Tags (comma-separated)                              │  │
│  │  [Start typing to search...              ]           │  │
│  │  [#Java] [#Spring Boot] [×]                          │  │
│  │  Suggestions: #Backend #Microservices #REST          │  │
│  │                                                       │  │
│  │  Course Thumbnail                                    │  │
│  │  ┌───────────────────┐                               │  │
│  │  │  [Upload Image]   │  Recommended: 1280x720px     │  │
│  │  │  or Drag & Drop   │  Max size: 5MB               │  │
│  │  └───────────────────┘  Formats: JPG, PNG, WEBP     │  │
│  │                                                       │  │
│  │  SEO Settings (Optional)                             │  │
│  │  [▼ Expand]                                          │  │
│  │  Meta Title: [____________________________]          │  │
│  │  Meta Description: [____________________]            │  │
│  │  SEO Keywords: [_________________________]           │  │
│  │  □ Index this course (allow search engines)         │  │
│  │                                                       │  │
│  │  [Cancel]                    [Create Course]         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `getCategoryTree()` - Load categories cho dropdown
- `searchTags(query)` - Auto-suggest tags khi typing
- `createCourse(payload)` - Tạo khóa học mới
- `uploadThumbnail(courseId, file)` - Upload thumbnail sau khi tạo

**Validation Rules**:

- Title: Required, 10-200 characters
- Short Description: Required, 50-200 characters
- Category: Required
- Difficulty: Required
- Tags: Optional, max 10 tags
- Thumbnail: Optional but recommended

**Form Flow**:

1. User fills form
2. Real-time validation on blur
3. Click "Create Course" → Validate all fields
4. If valid → API call `createCourse()`
5. If thumbnail uploaded → API call `uploadThumbnail()`
6. Success → Redirect to Edit Course page hoặc Create Version page
7. Error → Show error messages inline

**State Management**:

```typescript
interface CreateCourseForm {
  title: string;
  shortDescription: string;
  categoryId: number;
  difficulty: Difficulty;
  tags: string[];
  thumbnail: File | null;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string;
  isIndexed: boolean;
}
```

---

### 9. Edit Course Page (Teacher)

**Mục đích**: Chỉnh sửa thông tin cơ bản của khóa học (không phải content version).

**Layout**: Giống Create Course nhưng:

- Pre-fill data từ `getCourseBySlug()`
- Title: "Edit Course: [Course Title]"
- Button: "Save Changes" thay vì "Create Course"
- Thêm tabs: Basic Info | Versions | Students | Settings

**APIs Used**:

- `getCourseBySlug(slug)` - Load course data
- `updateCourse(id, payload)` - Update course
- `uploadThumbnail(id, file)` - Update thumbnail
- `deleteCourse(id)` - Danger zone delete
- `restoreCourse(id)` - Restore nếu đã xóa

**Additional Actions**:

- **Close/Open Enrollment**: Toggle switch → API call `closeCourse()` / `openCourse()`
- **Delete Course**: Danger zone button → Modal confirm → API call

---

### 10. Course Versions Management (Teacher)

**Mục đích**: Quản lý tất cả versions của một khóa học cụ thể.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Teacher Navigation                                           │
├─────────────────────────────────────────────────────────────┤
│  COURSE: Java Programming 101                               │
│  [← Back]  Tabs: [Info] [Versions] [Students] [Stats]      │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  VERSIONS MANAGEMENT                                   │ │
│  │  [+ Create New Version]  [🔍 Filter by Status ▼]      │ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ VERSION LIST (Timeline View)                     │ │ │
│  │  ├──────────────────────────────────────────────────┤ │ │
│  │  │ ● Version 3 - "Spring Boot Masterclass v3"      │ │ │
│  │  │   Status: 🟢 PUBLISHED (Active)                 │ │ │
│  │  │   Published: Jan 15, 2026                       │ │ │
│  │  │   Price: $129.99 | Duration: 90 days            │ │ │
│  │  │   👥 1,234 students enrolled                     │ │ │
│  │  │   [📊 View Stats] [📋 Details]                   │ │ │
│  │  ├──────────────────────────────────────────────────┤ │ │
│  │  │ ⏳ Version 4 - "New Content Update"             │ │ │
│  │  │   Status: 🟡 PENDING APPROVAL                   │ │ │
│  │  │   Submitted: Jan 20, 2026                       │ │ │
│  │  │   Price: $149.99 | Duration: 120 days           │ │ │
│  │  │   [✏️ Edit] [❌ Cancel]                          │ │ │
│  │  ├──────────────────────────────────────────────────┤ │ │
│  │  │ ✅ Version 2 - "Spring Boot Advanced"           │ │ │
│  │  │   Status: ⚪ APPROVED (Not Published)           │ │ │
│  │  │   Approved: Dec 10, 2025                        │ │ │
│  │  │   [🚀 Publish] [✏️ Edit] [🗑️ Delete]            │ │ │
│  │  ├──────────────────────────────────────────────────┤ │ │
│  │  │ ❌ Version 1 - "First Draft"                     │ │ │
│  │  │   Status: 🔴 REJECTED                            │ │ │
│  │  │   Reason: Content quality issues...             │ │ │
│  │  │   [✏️ Revise] [🗑️ Delete]                        │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `getCourseVersions(courseId)` - Lấy tất cả versions
- `getCourseVersionsByStatus(courseId, status)` - Filter by status
- `getCourseVersionById(courseId, versionId)` - View details
- `deleteCourseVersion(courseId, versionId)` - Delete version
- `submitApproval(courseId, versionId)` - Submit DRAFT → PENDING
- `publishCourseVersion(courseId, versionId)` - Publish APPROVED → PUBLISHED

**Status Colors**:

- 🟢 PUBLISHED (green)
- 🟡 PENDING (yellow)
- ⚪ APPROVED (white/gray)
- 🔴 REJECTED (red)
- ⚫ DRAFT (black)

**User Interactions**:

1. **Create New Version**: Button → Navigate to Create Version page
2. **Filter by Status**: Dropdown → API call `getCourseVersionsByStatus()`
3. **View Stats**: Button → Navigate to Course Statistics page (for published version)
4. **Details**: Button → Navigate to Version Details page
5. **Edit**: Button → Navigate to Edit Version page (only DRAFT/REJECTED)
6. **Publish**: Button → Modal confirm → API call → Reload list
7. **Delete**: Button → Modal confirm → API call → Reload list
8. **Cancel Submission**: For PENDING, change back to DRAFT
9. **Revise Rejected**: Edit REJECTED version → Change to DRAFT

---

### 11. Create/Edit Version Page (Teacher)

**Mục đích**: Tạo hoặc chỉnh sửa version của khóa học (pricing, duration, passing score, etc.).

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Teacher Navigation                                           │
├─────────────────────────────────────────────────────────────┤
│  CREATE NEW VERSION - Java Programming 101                  │
│  [← Back to Versions]                                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  VERSION DETAILS                                     │  │
│  │                                                       │  │
│  │  Version Title *                                     │  │
│  │  [_____________________________________________]      │  │
│  │  e.g., "Spring Boot Masterclass v3"                 │  │
│  │                                                       │  │
│  │  Description                                         │  │
│  │  [Rich Text Editor with formatting tools]           │  │
│  │  What's new in this version...                       │  │
│  │                                                       │  │
│  │  ┌─── PRICING & ACCESS ───────────────────────────┐ │  │
│  │  │ Price ($) *                                     │ │  │
│  │  │ [______] USD                                    │ │  │
│  │  │                                                  │ │  │
│  │  │ Duration (days) *                               │ │  │
│  │  │ [______] days                                   │ │  │
│  │  │ How long students have access after enrollment │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  │  ┌─── PASSING REQUIREMENTS ────────────────────────┐ │  │
│  │  │ Pass Score (%) *                                │ │  │
│  │  │ [______] %                                      │ │  │
│  │  │                                                  │ │  │
│  │  │ Final Weight (%) *                              │ │  │
│  │  │ [______] %                                      │ │  │
│  │  │ Weight of final exam in total score            │ │  │
│  │  │                                                  │ │  │
│  │  │ Minimum Progress (%) *                          │ │  │
│  │  │ [______] %                                      │ │  │
│  │  │ % of content student must complete             │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  │  Internal Notes (Private)                            │  │
│  │  [_____________________________________________]      │  │
│  │  [_____________________________________________]      │  │
│  │                                                       │  │
│  │  [Cancel]  [Save as Draft]  [Submit for Approval]   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `createCourseVersion(courseId, payload)` - Tạo version mới
- `updateCourseVersion(courseId, versionId, payload)` - Update version
- `getCourseVersionById(courseId, versionId)` - Load data (nếu edit)
- `submitApproval(courseId, versionId)` - Submit for approval

**Validation Rules**:

- Title: Required, 10-200 characters
- Price: Required, > 0 (hoặc 0 nếu free course)
- Duration: Required, 1-365 days
- Pass Score: Required, 0-100
- Final Weight: Required, 0-100
- Min Progress: Required, 0-100

**Button Actions**:

- **Save as Draft**: Status = DRAFT, có thể edit tiếp sau
- **Submit for Approval**: Status = DRAFT → PENDING, không edit được nữa

**State Management**:

```typescript
interface VersionFormState {
  title: string;
  description: string;
  price: number;
  durationDays: number;
  passScore: number;
  finalWeight: number;
  minProgressPct: number;
  notes: string;
}
```

---

### 12. Course Statistics Page (Teacher)

**Mục đích**: Dashboard thống kê chi tiết hiệu suất khóa học.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Teacher Navigation                                           │
├─────────────────────────────────────────────────────────────┤
│  STATISTICS - Java Programming 101                          │
│  [← Back]  [📅 Date Range: Last 30 Days ▼]                 │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  KEY METRICS                                           │ │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐         │ │
│  │  │ 👥     │ │ ⭐     │ │ ✓      │ │ 💰     │         │ │
│  │  │ 1,234  │ │ 4.8    │ │ 67%    │ │ $12.3K │         │ │
│  │  │Students│ │Rating  │ │Complete│ │Revenue │         │ │
│  │  └────────┘ └────────┘ └────────┘ └────────┘         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  ENROLLMENT TREND                                      │ │
│  │  [Line Chart: Students over time]                     │ │
│  │  Y-axis: # Students                                   │ │
│  │  X-axis: Date                                          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  RATING DISTRIBUTION                                   │ │
│  │  [Bar Chart: Stars 1-5]                               │ │
│  │  ⭐⭐⭐⭐⭐ 150 (64%)  ████████████████                │ │
│  │  ⭐⭐⭐⭐   60 (26%)  ███████                          │ │
│  │  ⭐⭐⭐    20 (9%)   ███                               │ │
│  │  ⭐⭐      3 (1%)   █                                 │ │
│  │  ⭐       1 (0%)   █                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  COMPLETION BREAKDOWN                                  │ │
│  │  [Pie Chart]                                           │ │
│  │  • Completed: 67% (827 students)                      │ │
│  │  • In Progress: 28% (346 students)                    │ │
│  │  • Dropped: 5% (61 students)                          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  REVENUE TIMELINE                                      │ │
│  │  [Area Chart: Revenue over time]                      │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  TOP PERFORMING CHAPTERS                               │ │
│  │  1. Chapter 3: Advanced Concepts - 95% completion     │ │
│  │  2. Chapter 1: Introduction - 98% completion          │ │
│  │  3. Chapter 2: Core Topics - 89% completion           │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  [📊 Export Report (PDF)]  [📈 Export Data (CSV)]          │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `getCourseStatistics(courseId)` - Main stats data
- Export APIs (nếu có)

**Response Type**:

```typescript
interface CourseStatsResponse {
  totalStudents: number;
  averageRating: number;
  completionRate: number;
  totalRevenue: number;
  enrollmentTrend: Array<{ date: string; count: number }>;
  ratingDistribution: {
    oneStar: number;
    twoStar: number;
    threeStar: number;
    fourStar: number;
    fiveStar: number;
  };
  completionBreakdown: {
    completed: number;
    inProgress: number;
    dropped: number;
  };
  revenueTrend: Array<{ date: string; amount: number }>;
  topChapters: Array<{
    chapterId: number;
    title: string;
    completionRate: number;
  }>;
}
```

**User Interactions**:

1. **Date Range Filter**: Dropdown → Refetch stats với date range
2. **Export PDF**: Button → Generate PDF report
3. **Export CSV**: Button → Download raw data

---

### 13. Version Approval Status Page (Teacher)

**Mục đích**: Theo dõi trạng thái duyệt của versions đang pending.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Teacher Navigation                                           │
├─────────────────────────────────────────────────────────────┤
│  PENDING APPROVALS                                          │
│                                                              │
│  You have 3 versions waiting for admin review              │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 🟡 Java 101 - Version 4                                │ │
│  │    Status: PENDING APPROVAL                            │ │
│  │    Submitted: Jan 20, 2026 (3 days ago)               │ │
│  │    [View Details]                                      │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ 🟡 React Hooks - Version 2                             │ │
│  │    Status: PENDING APPROVAL                            │ │
│  │    Submitted: Jan 18, 2026 (5 days ago)               │ │
│  │    [View Details]                                      │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ ✅ Spring Boot - Version 3                             │ │
│  │    Status: APPROVED                                    │ │
│  │    Approved: Jan 15, 2026                             │ │
│  │    [🚀 Publish Now]                                    │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ ❌ Python ML - Version 1                               │ │
│  │    Status: REJECTED                                    │ │
│  │    Reason: "Content does not meet quality standards.  │ │
│  │            Please revise chapters 3-5."               │ │
│  │    [✏️ Revise]                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `getMyCourses()` + filter versions by PENDING/APPROVED/REJECTED
- `getCourseVersions(courseId)` cho từng course
- `publishCourseVersion(courseId, versionId)` - Publish approved version

**User Interactions**:

1. **View Details**: Navigate to Version Details page
2. **Publish Now**: Button → Modal confirm → API call → Reload
3. **Revise**: Navigate to Edit Version page

---

### 14. Clone Course Page (Teacher)

**Mục đích**: Nhân bản khóa học hiện có để tạo khóa học mới.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Teacher Navigation                                           │
├─────────────────────────────────────────────────────────────┤
│  CLONE COURSE                                               │
│  [← Back to My Courses]                                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  You are cloning: Java Programming 101                │  │
│  │                                                        │  │
│  │  ℹ️ A copy will be created with all content          │  │
│  │    (chapters, lessons, quizzes, assignments)          │  │
│  │                                                        │  │
│  │  ⚠️ Student enrollments will NOT be copied           │  │
│  │                                                        │  │
│  │  New Course Title *                                   │  │
│  │  [Java Programming 101 - Copy               ]         │  │
│  │                                                        │  │
│  │  What will be cloned:                                 │  │
│  │  ✓ Course information (title, description, tags)     │  │
│  │  ✓ Category and difficulty level                     │  │
│  │  ✓ Thumbnail image                                    │  │
│  │  ✓ Course version settings (price, duration, etc.)   │  │
│  │  ✓ All chapters and lessons                          │  │
│  │  ✓ All quizzes and assignments                       │  │
│  │  ✓ All course materials                              │  │
│  │                                                        │  │
│  │  What will NOT be cloned:                            │  │
│  │  ✗ Student enrollments and progress                  │  │
│  │  ✗ Course reviews and ratings                        │  │
│  │  ✗ Version approval history                          │  │
│  │                                                        │  │
│  │  [Cancel]              [Clone Course]                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `getCourseBySlug(slug)` - Load source course info
- `cloneCourse(courseId, newTitle)` - Clone API

**Flow**:

1. From My Courses → Click "Clone" in dropdown
2. Navigate to Clone Course page with courseId
3. Pre-fill new title = original title + " - Copy"
4. User can edit title
5. Click "Clone Course" → Show loading → API call
6. Success → Navigate to Edit Course page of new course
7. Error → Show error message

**Loading State**: Show progress message "Cloning course... This may take a few minutes."

---

## 🔵 STUDENT SCREENS

### 15. My Learning Page (Student)

**Mục đích**: Danh sách tất cả khóa học mà học viên đã đăng ký.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Student Navigation (My Learning | Browse | Wishlist)        │
├─────────────────────────────────────────────────────────────┤
│  MY LEARNING                                                 │
│  [🔍 Search]  [Filter: All Courses ▼]  [Sort: Recent ▼]    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  [Course Card with Progress]                           │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ [Thumbnail]  Java Programming 101                │ │ │
│  │  │              By: John Doe                         │ │ │
│  │  │              ▓▓▓▓▓▓▓▓░░░░ 67% Complete           │ │ │
│  │  │              Last accessed: 2 days ago           │ │ │
│  │  │              [Continue Learning →]                │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                                                        │ │
│  │  [Course Card with Progress]                           │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ [Thumbnail]  React Hooks Masterclass             │ │ │
│  │  │              By: Sarah Johnson                    │ │ │
│  │  │              ▓▓▓▓▓▓▓▓▓▓▓▓ 100% Complete ✓        │ │ │
│  │  │              Completed: Jan 10, 2026             │ │ │
│  │  │              [📜 View Certificate] [⭐ Review]    │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                                                        │ │
│  │  [Course Card with Progress]                           │ │
│  │  ...                                                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- Enrollment/Learning APIs (thuộc module khác, không có trong Course module)
- `getCourseBySlug()` - Lấy thông tin khóa học

**Filters**:

- All Courses | In Progress | Completed | Not Started
- Sort: Recent | A-Z | Progress | Completion Date

**User Interactions**:

1. **Continue Learning**: Navigate to lesson player (module Learning)
2. **View Certificate**: Download/View certificate (module Learning)
3. **Review**: Navigate to Course Review Form
4. **Click Card**: Navigate to course learning page

---

### 16. Course Review Form (Student)

**Mục đích**: Học viên viết/sửa đánh giá cho khóa học đã hoàn thành.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Student Navigation                                           │
├─────────────────────────────────────────────────────────────┤
│  REVIEW COURSE                                              │
│  [← Back to My Learning]                                    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Java Programming 101                                │  │
│  │  By: John Doe                                         │  │
│  │  [Thumbnail]                                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  YOUR REVIEW                                          │  │
│  │                                                        │  │
│  │  Rating *                                             │  │
│  │  ☆☆☆☆☆ (Click to rate)                               │  │
│  │                                                        │  │
│  │  Review Title                                         │  │
│  │  [_____________________________________________]       │  │
│  │  e.g., "Great course for beginners"                  │  │
│  │                                                        │  │
│  │  Your Review                                          │  │
│  │  [_____________________________________________]       │  │
│  │  [_____________________________________________]       │  │
│  │  [_____________________________________________]       │  │
│  │  Share your experience with this course...           │  │
│  │  (500 characters remaining)                           │  │
│  │                                                        │  │
│  │  [Cancel]                    [Submit Review]         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `createReview(courseId, payload)` - Tạo review mới
- `updateReview(courseId, reviewId, payload)` - Update review hiện có
- `deleteReview(courseId, reviewId)` - Xóa review

**Validation**:

- Rating: Required, 1-5 stars
- Title: Optional, max 100 characters
- Content: Optional, max 500 characters

**Flow**:

1. Load review data nếu đã review trước đó (Edit mode)
2. User fills form
3. Click "Submit Review" → Validate → API call
4. Success → Show success message → Navigate back to My Learning
5. Error → Show error message

**Edit Mode**: Nếu đã có review, pre-fill data và thay button thành "Update Review" + "Delete Review"

---

## 🔴 ADMIN SCREENS

### 17. Category Management Page (Admin)

**Mục đích**: Admin quản lý tất cả categories (CRUD operations).

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Admin Navigation (Dashboard | Courses | Users | Settings)   │
├─────────────────────────────────────────────────────────────┤
│  CATEGORY MANAGEMENT                                        │
│  [+ Create Category]  [🔍 Search]  [View: Tree 🌳 | List]  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  CATEGORY TREE                                         │ │
│  │                                                        │ │
│  │  📁 Web Development (45 courses)          [⚙️]         │ │
│  │    ├─ 📁 Frontend (20 courses)           [⚙️]         │ │
│  │    │   ├─ React (8)                      [⚙️]         │ │
│  │    │   ├─ Vue (5)                        [⚙️]         │ │
│  │    │   └─ Angular (7)                    [⚙️]         │ │
│  │    ├─ 📁 Backend (18 courses)            [⚙️]         │ │
│  │    │   ├─ Node.js (10)                   [⚙️]         │ │
│  │    │   └─ Spring Boot (8)                [⚙️]         │ │
│  │    └─ 📁 Full Stack (7 courses)          [⚙️]         │ │
│  │                                                        │ │
│  │  📁 Mobile Development (23 courses)       [⚙️]         │ │
│  │    ├─ iOS (10)                           [⚙️]         │ │
│  │    └─ Android (13)                       [⚙️]         │ │
│  │                                                        │ │
│  │  📁 Data Science (34 courses)             [⚙️]         │ │
│  │    └─ ...                                             │ │
│  │                                                        │ │
│  │  [📊 View Statistics]                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**Dropdown Menu (⚙️)**:

- ✏️ Edit Category
- ➕ Add Subcategory
- 👁️ View Courses
- 🗑️ Delete Category
- 📊 View Statistics

**APIs Used**:

- `getCategoryTree()` - Load tree structure
- `createCategory(payload)` - Create new category
- `updateCategory(id, payload)` - Update category
- `deleteCategory(id)` - Delete category
- `restoreCategory(id)` - Restore deleted
- `getCategoryStatistics()` - Stats by category
- `getAllDeleted()` - View deleted categories

**Create/Edit Category Modal**:

```
┌────────────────────────────────────┐
│  CREATE CATEGORY                   │
│                                    │
│  Name *                            │
│  [___________________________]     │
│                                    │
│  Code                              │
│  [___________________________]     │
│                                    │
│  Description                       │
│  [___________________________]     │
│  [___________________________]     │
│                                    │
│  Parent Category                   │
│  [Select Category ▼        ]       │
│  (Leave empty for root)            │
│                                    │
│  Thumbnail URL                     │
│  [___________________________]     │
│                                    │
│  □ Visible to public               │
│                                    │
│  [Cancel]        [Create]          │
└────────────────────────────────────┘
```

**User Interactions**:

1. **Create Category**: Button → Open modal → Fill form → API call
2. **Edit**: Dropdown → Open modal with pre-filled data → Update
3. **Add Subcategory**: Pre-select parent in create modal
4. **Delete**: Dropdown → Confirm modal → API call → Reload tree
5. **View Courses**: Navigate to filtered course list
6. **View Statistics**: Show modal with category stats
7. **Toggle Visibility**: Checkbox → API call

---

### 18. Tag Management Page (Admin)

**Mục đích**: Admin quản lý tất cả tags (CRUD operations).

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Admin Navigation                                             │
├─────────────────────────────────────────────────────────────┤
│  TAG MANAGEMENT                                             │
│  [+ Create Tag]  [📋 Bulk Create]  [🔍 Search]             │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  TAG LIST (Table View)                                 │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │ ID | Name      | Slug         | Courses | ⚙️    │  │ │
│  │  ├─────────────────────────────────────────────────┤  │ │
│  │  │ 1  | Java      | java         | 45      | ...   │  │ │
│  │  │ 2  | React     | react        | 32      | ...   │  │ │
│  │  │ 3  | Python    | python       | 67      | ...   │  │ │
│  │  │ 4  | AWS       | aws          | 28      | ...   │  │ │
│  │  │ 5  | Docker    | docker       | 19      | ...   │  │ │
│  │  │ ...                                              │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  │                                                        │ │
│  │  [Pagination: 1 2 3 ... 10]                           │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  📊 TAG STATISTICS                                     │ │
│  │  Total Tags: 124                                       │ │
│  │  Popular Tags (Top 10):                                │ │
│  │  #Java (45) | #React (32) | #Python (67) ...          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**Dropdown Menu (⚙️)**:

- ✏️ Edit Tag
- 🗑️ Delete Tag
- 👁️ View Courses

**APIs Used**:

- `getAllTags(page, size)` - Lấy tất cả tags
- `createTag(payload)` - Tạo tag mới
- `bulkCreateTags(tagNames)` - Tạo nhiều tags
- `updateTag(id, payload)` - Update tag
- `deleteTag(id)` - Xóa tag
- `restoreTag(id)` - Khôi phục tag
- `getTagStatistics()` - Thống kê tags
- `getPopularTags(limit)` - Top tags

**Create Tag Modal**:

```
┌────────────────────────────────────┐
│  CREATE TAG                        │
│                                    │
│  Tag Name *                        │
│  [___________________________]     │
│                                    │
│  [Cancel]        [Create]          │
└────────────────────────────────────┘
```

**Bulk Create Modal**:

```
┌────────────────────────────────────┐
│  BULK CREATE TAGS                  │
│                                    │
│  Enter tag names (one per line):  │
│  [___________________________]     │
│  [___________________________]     │
│  [___________________________]     │
│  [___________________________]     │
│  ...                               │
│                                    │
│  Or paste comma-separated:         │
│  [___________________________]     │
│                                    │
│  ℹ️ Duplicates will be skipped    │
│                                    │
│  [Cancel]        [Create All]      │
└────────────────────────────────────┘
```

**User Interactions**:

1. **Create Tag**: Button → Open modal → API call
2. **Bulk Create**: Button → Open modal → Parse input → API call
3. **Edit**: Dropdown → Open modal → Update
4. **Delete**: Dropdown → Confirm → API call
5. **Search**: Type → Filter table
6. **View Courses**: Navigate to filtered course list

---

### 19. Course Approval Queue (Admin)

**Mục đích**: Admin duyệt hoặc từ chối course versions đang pending.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Admin Navigation                                             │
├─────────────────────────────────────────────────────────────┤
│  COURSE APPROVAL QUEUE                                      │
│  [🔍 Search]  [Filter: All ▼]  [Sort: Oldest First ▼]      │
│                                                              │
│  🟡 3 pending approvals                                      │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  [Pending Version Card]                                │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ [Thumbnail] Java Programming 101 - Version 4     │ │ │
│  │  │             By: John Doe                          │ │ │
│  │  │             Submitted: Jan 20, 2026 (3 days ago) │ │ │
│  │  │                                                   │ │ │
│  │  │  Version Details:                                │ │ │
│  │  │  • Price: $129.99                                │ │ │
│  │  │  • Duration: 90 days                             │ │ │
│  │  │  • Pass Score: 70%                               │ │ │
│  │  │  • Chapters: 8                                   │ │ │
│  │  │  • Lessons: 45                                   │ │ │
│  │  │                                                   │ │ │
│  │  │  Changes from previous version:                 │ │ │
│  │  │  • Added 3 new chapters                         │ │ │
│  │  │  • Updated pricing                              │ │ │
│  │  │                                                   │ │ │
│  │  │  [View Full Details]                            │ │ │
│  │  │  [✅ Approve] [❌ Reject]                        │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                                                        │ │
│  │  [Pending Version Card]                                │ │
│  │  ...                                                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `getAllPendingCourseVersions(page, size, filter)` - Lấy pending versions
- `getCourseVersionById(courseId, versionId)` - View details
- `approveCourseVersion(courseId, versionId)` - Approve
- `rejectCourseVersion(courseId, versionId, payload)` - Reject với lý do

**Approve Flow**:

1. Admin clicks "Approve"
2. Confirm modal: "Are you sure you want to approve this version?"
3. API call → Success → Remove from list → Show success toast

**Reject Flow**:

1. Admin clicks "Reject"
2. Modal form:

```
┌────────────────────────────────────┐
│  REJECT VERSION                    │
│                                    │
│  Rejection Reason *                │
│  [___________________________]     │
│  [___________________________]     │
│  [___________________________]     │
│                                    │
│  This will be sent to the teacher │
│                                    │
│  [Cancel]        [Reject]          │
└────────────────────────────────────┘
```

3. Fill reason → Submit → API call → Remove from list

**User Interactions**:

1. **Search**: Filter by course title or teacher name
2. **Filter**: All | Oldest First | Newest First | By Teacher
3. **View Details**: Expand accordion or open modal
4. **Approve**: Button → Confirm → API call
5. **Reject**: Button → Modal form → API call

---

### 20. Admin Analytics Dashboard

**Mục đích**: Tổng quan thống kê toàn hệ thống khóa học.

**Layout Components**:

```
┌─────────────────────────────────────────────────────────────┐
│ Admin Navigation                                             │
├─────────────────────────────────────────────────────────────┤
│  ANALYTICS DASHBOARD - COURSES                              │
│  [📅 Date Range: Last 30 Days ▼]                            │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  OVERVIEW                                              │ │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │ │
│  │  │ 📚   │ │ 👥   │ │ 💰   │ │ ⭐   │ │ 🟡   │        │ │
│  │  │ 234  │ │ 15.2K│ │ $156K│ │ 4.6  │ │ 12   │        │ │
│  │  │Course│ │Enroll│ │ Rev  │ │Rating│ │Pend. │        │ │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  COURSES BY CATEGORY                                   │ │
│  │  [Bar Chart]                                           │ │
│  │  Web Dev:     ████████████ 87 courses                 │ │
│  │  Data Science:███████████ 67 courses                  │ │
│  │  Mobile:      ██████ 34 courses                       │ │
│  │  DevOps:      ████ 23 courses                         │ │
│  │  Other:       ███ 23 courses                          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  TOP CATEGORIES BY REVENUE                             │ │
│  │  1. Web Development - $56K                            │ │
│  │  2. Data Science - $45K                               │ │
│  │  3. Mobile Development - $34K                         │ │
│  │  ...                                                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  TOP TAGS                                              │ │
│  │  #Java (87) | #React (76) | #Python (65) ...          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  RECENT ACTIVITIES                                     │ │
│  │  • John Doe created "Java Advanced" (2 hours ago)     │ │
│  │  • Sarah J. submitted Version 3 for approval (3h ago) │ │
│  │  • Admin approved "React Hooks" (5 hours ago)         │ │
│  │  ...                                                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└─────────────────────────────────────────────────────────────┘
```

**APIs Used**:

- `getAllCourses()` với aggregation
- `getCategoryStatistics()` - Stats by category
- `getTagStatistics()` - Stats by tag
- Custom admin dashboard APIs (có thể cần thêm)

---

## 🔄 USER FLOWS

### Flow 1: Teacher Creates and Publishes a Course

```
START
  │
  ├─> [My Courses Dashboard]
  │     │
  │     └─> Click "Create New Course"
  │           │
  │           └─> [Create Course Page]
  │                 │
  │                 ├─> Fill form (title, description, category, tags, thumbnail)
  │                 └─> Click "Create Course"
  │                       │
  │                       └─> API: createCourse() + uploadThumbnail()
  │                             │
  │                             └─> Success → Redirect to [Edit Course Page]
  │                                   │
  │                                   └─> Navigate to "Versions" tab
  │                                         │
  │                                         └─> [Course Versions Management]
  │                                               │
  │                                               └─> Click "Create New Version"
  │                                                     │
  │                                                     └─> [Create Version Page]
  │                                                           │
  │                                                           ├─> Fill pricing & requirements
  │                                                           └─> Click "Submit for Approval"
  │                                                                 │
  │                                                                 └─> API: createCourseVersion() + submitApproval()
  │                                                                       │
  │                                                                       └─> Status: PENDING
  │                                                                             │
  │                                                                             └─> Wait for Admin Review...
  │                                                                                   │
  │                                                                                   ├─> [APPROVED]
  │                                                                                   │     │
  │                                                                                   │     └─> Notification: "Your version was approved!"
  │                                                                                   │           │
  │                                                                                   │           └─> [Versions Management]
  │                                                                                   │                 │
  │                                                                                   │                 └─> Click "Publish"
  │                                                                                   │                       │
  │                                                                                   │                       └─> API: publishCourseVersion()
  │                                                                                   │                             │
  │                                                                                   │                             └─> Status: PUBLISHED ✅
  │                                                                                   │                                   │
  │                                                                                   │                                   └─> Course now visible to public!
  │                                                                                   │
  │                                                                                   └─> [REJECTED]
  │                                                                                         │
  │                                                                                         └─> Notification: "Version rejected. Reason: ..."
  │                                                                                               │
  │                                                                                               └─> Teacher revises → Resubmit
END
```

### Flow 2: Student Browses and Enrolls in a Course

```
START (Not logged in)
  │
  ├─> [Home Page]
  │     │
  │     ├─> View "Popular Courses" section
  │     │     │
  │     │     └─> API: getPopularCourses(limit=8)
  │     │
  │     └─> Click course card
  │           │
  │           └─> [Course Landing Page]
  │                 │
  │                 ├─> API: getCoursePreview(slug)
  │                 ├─> API: getPublishedVersionBySlug(slug) → Get price
  │                 ├─> API: getCourseRatingSummary(courseId)
  │                 ├─> API: getPublicCourseReviews(courseId)
  │                 │
  │                 ├─> View preview video
  │                 │     │
  │                 │     └─> Click lesson with 🎬
  │                 │           │
  │                 │           └─> API: getPreviewVideoStreamUrl(lessonId)
  │                 │                 │
  │                 │                 └─> Modal player with video
  │                 │
  │                 ├─> Read reviews
  │                 ├─> View instructor profile
  │                 ├─> Check curriculum
  │                 │
  │                 └─> Click "Enroll Now"
  │                       │
  │                       ├─> IF not logged in
  │                       │     │
  │                       │     └─> Redirect to Login
  │                       │           │
  │                       │           └─> After login → Return to course page
  │                       │
  │                       └─> IF logged in
  │                             │
  │                             └─> Redirect to Checkout/Payment page (Module khác)
  │                                   │
  │                                   └─> Complete payment
  │                                         │
  │                                         └─> Enrollment successful! ✅
  │                                               │
  │                                               └─> [My Learning Page]
  │                                                     │
  │                                                     └─> Click "Continue Learning"
  │                                                           │
  │                                                           └─> Start lesson (Module Learning)
END
```

### Flow 3: Admin Reviews and Approves Course Version

```
START
  │
  ├─> [Admin Dashboard]
  │     │
  │     └─> Notification: "3 pending approvals"
  │           │
  │           └─> Click notification
  │                 │
  │                 └─> [Course Approval Queue]
  │                       │
  │                       └─> API: getAllPendingCourseVersions()
  │                             │
  │                             └─> View pending versions list
  │                                   │
  │                                   └─> Click "View Full Details"
  │                                         │
  │                                         ├─> API: getCourseVersionById()
  │                                         │
  │                                         └─> Review content:
  │                                               ├─ Check pricing
  │                                               ├─ Check chapters/lessons count
  │                                               ├─ Check requirements
  │                                               └─ Decision:
  │                                                     │
  │                                                     ├─> [APPROVE]
  │                                                     │     │
  │                                                     │     └─> Click "Approve"
  │                                                     │           │
  │                                                     │           └─> Confirm modal
  │                                                     │                 │
  │                                                     │                 └─> API: approveCourseVersion()
  │                                                     │                       │
  │                                                     │                       └─> Success → Remove from queue
  │                                                     │                             │
  │                                                     │                             └─> Teacher receives notification
  │                                                     │
  │                                                     └─> [REJECT]
  │                                                           │
  │                                                           └─> Click "Reject"
  │                                                                 │
  │                                                                 └─> Modal: Enter rejection reason
  │                                                                       │
  │                                                                       └─> API: rejectCourseVersion(reason)
  │                                                                             │
  │                                                                             └─> Success → Remove from queue
  │                                                                                   │
  │                                                                                   └─> Teacher receives reason
END
```

### Flow 4: Student Writes Review After Completing Course

```
START
  │
  ├─> [My Learning Page]
  │     │
  │     ├─> API: getMyEnrollments() (Module Learning)
  │     │
  │     └─> View completed courses
  │           │
  │           └─> Course card shows "100% Complete ✓"
  │                 │
  │                 └─> Button: "⭐ Write Review"
  │                       │
  │                       └─> [Course Review Form]
  │                             │
  │                             ├─> Click stars to rate (1-5)
  │                             ├─> Type review title (optional)
  │                             ├─> Type review content
  │                             │
  │                             └─> Click "Submit Review"
  │                                   │
  │                                   ├─> Validate (rating required)
  │                                   │
  │                                   └─> API: createReview(courseId, payload)
  │                                         │
  │                                         └─> Success
  │                                               │
  │                                               ├─> Show success message
  │                                               └─> Redirect to My Learning
  │                                                     │
  │                                                     └─> Review now appears on course landing page
END
```

### Flow 5: Teacher Clones Course for New Semester

```
START
  │
  ├─> [My Courses Dashboard]
  │     │
  │     └─> Find course to clone: "Java 101 - Spring 2025"
  │           │
  │           └─> Click ⚙️ dropdown
  │                 │
  │                 └─> Select "Clone Course"
  │                       │
  │                       └─> [Clone Course Page]
  │                             │
  │                             ├─> API: getCourseBySlug() → Load source info
  │                             │
  │                             ├─> Pre-fill title: "Java 101 - Spring 2025 - Copy"
  │                             ├─> Edit title to: "Java 101 - Fall 2026"
  │                             │
  │                             └─> Click "Clone Course"
  │                                   │
  │                                   ├─> Show loading: "Cloning... Please wait"
  │                                   │
  │                                   └─> API: cloneCourse(courseId, newTitle)
  │                                         │
  │                                         └─> Success
  │                                               │
  │                                               ├─> New course created with:
  │                                               │   ✓ All chapters & lessons
  │                                               │   ✓ All quizzes & assignments
  │                                               │   ✓ All settings
  │                                               │   ✗ No student enrollments
  │                                               │
  │                                               └─> Redirect to [Edit Course Page]
  │                                                     │
  │                                                     └─> Teacher can now:
  │                                                           ├─ Update content
  │                                                           ├─ Adjust pricing
  │                                                           └─ Create new version
END
```

### Flow 6: Public User Searches and Filters Courses

```
START
  │
  ├─> [Home Page]
  │     │
  │     └─> Type in search bar: "spring boot"
  │           │
  │           └─> Debounce 300ms
  │                 │
  │                 └─> API: searchTags("spring boot") → Show suggestions
  │                       │
  │                       └─> Press Enter or click suggestion
  │                             │
  │                             └─> Navigate to [Course Search Page]
  │                                   │
  │                                   ├─> API: searchPublishedCourses(query="spring boot")
  │                                   │
  │                                   └─> Show 47 results
  │                                         │
  │                                         ├─> Apply filters:
  │                                         │     ├─ Category: Backend
  │                                         │     ├─ Difficulty: Intermediate
  │                                         │     ├─ Price: Paid
  │                                         │     └─ Tags: #java, #microservices
  │                                         │           │
  │                                         │           └─> API: searchPublishedCourses(
  │                                         │                 query, categoryId, difficulty, tags
  │                                         │               )
  │                                         │                 │
  │                                         │                 └─> Results refined to 12 courses
  │                                         │
  │                                         ├─> Sort by: "Highest Rated"
  │                                         │     │
  │                                         │     └─> Refetch with sort param
  │                                         │
  │                                         └─> Click course card
  │                                               │
  │                                               └─> [Course Landing Page]
END
```

---

## 🎨 Design Guidelines

### Color Coding

**Status Colors**:

- 🟢 Published: `#10B981` (green-500)
- 🟡 Pending: `#F59E0B` (yellow-500)
- ⚪ Approved: `#6B7280` (gray-500)
- 🔴 Rejected: `#EF4444` (red-500)
- ⚫ Draft: `#374151` (gray-700)
- 🔵 Active: `#3B82F6` (blue-500)

**Role Colors**:

- Teacher: `#8B5CF6` (purple-500)
- Student: `#10B981` (green-500)
- Admin: `#F59E0B` (yellow-500)
- Public: `#6B7280` (gray-500)

### Typography

- **Page Title (H1)**: 32px, Bold, Gray-900
- **Section Title (H2)**: 24px, Semibold, Gray-800
- **Card Title (H3)**: 18px, Semibold, Gray-900
- **Body Text**: 16px, Regular, Gray-700
- **Caption**: 14px, Regular, Gray-600
- **Label**: 14px, Medium, Gray-900

### Spacing

- Container padding: 24px (desktop), 16px (mobile)
- Card padding: 20px
- Section margin: 32px
- Element gap: 16px (standard), 8px (tight), 24px (loose)

### Components

**Course Card**:

- Aspect ratio: 16:9 for thumbnail
- Border radius: 8px
- Shadow: `0 1px 3px rgba(0,0,0,0.1)`
- Hover: Lift effect with shadow increase

**Button Styles**:

- Primary: Blue-600, hover: Blue-700
- Secondary: Gray-200, hover: Gray-300
- Danger: Red-600, hover: Red-700
- Success: Green-600, hover: Green-700

**Form Inputs**:

- Height: 40px
- Border: 1px solid Gray-300
- Focus: Blue-500 ring
- Error: Red-500 border + error message below

### Responsive Breakpoints

- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md, lg)
- Desktop: > 1024px (xl, 2xl)

**Mobile Adaptations**:

- Stack sidebar filters below content
- Single column course cards
- Hamburger menu for navigation
- Bottom navigation bar for main actions

---

## 🔗 API Integration Summary

### Public APIs (No Auth)

```typescript
// Course Preview & Discovery
getCoursePreview(slug);
getPreviewVideoStreamUrl(lessonId);
isCoursePublished(slug);
getPublicCourseReviews(courseId, sort, page, size);
getCourseRatingSummary(courseId);
getTeacherPublicProfile(teacherId);
getRelatedCourses(courseId, limit);
getPopularCourses(limit);
getPublishedCourses(page, size, filter);
getPublishedCourseBySlug(slug);
searchPublishedCourses(query, categoryId, difficulty, tags, page);
getPublishedVersionBySlug(slug);

// Category & Tags
getCategoryById(id);
getCategoryTree();
getCategoryBySlug(slug);
getActiveCategories();
getTags(page, size);
getPopularTags(limit);
searchTags(query);
```

### Teacher APIs (Auth Required)

```typescript
// Course CRUD
createCourse(payload);
getCourseBySlug(slug);
updateCourse(id, payload);
deleteCourse(id);
restoreCourse(id);
uploadThumbnail(id, file);
closeCourse(id);
openCourse(id);
getMyCourses(page, size, filter);
cloneCourse(id, newTitle);
getCourseStatistics(id);

// Version Management
createCourseVersion(courseId, payload);
getCourseVersions(courseId);
getDeletedCourseVersions(courseId);
getCourseVersionById(courseId, versionId);
updateCourseVersion(courseId, versionId, payload);
deleteCourseVersion(courseId, versionId);
getCourseVersionsByStatus(courseId, status);
submitApproval(courseId, versionId);
publishCourseVersion(courseId, versionId);
```

### Student APIs (Auth Required)

```typescript
// Reviews
createReview(courseId, payload);
updateReview(courseId, reviewId, payload);
deleteReview(courseId, reviewId);
getCourseReviews(courseId, page, size);
getRatingSummary(courseId);
```

### Admin APIs (Auth Required)

```typescript
// Course Management
getAllCourses(page, size, filter);
getAllPendingCourseVersions(page, size, filter);
approveCourseVersion(courseId, versionId);
rejectCourseVersion(courseId, versionId, payload);

// Category Management
createCategory(payload);
getCategoryByIdForAdmin(id);
updateCategory(id, payload);
deleteCategory(id);
restoreCategory(id);
getAllDeleted();
getCategoryStatistics();

// Tag Management
createTag(payload);
bulkCreateTags(tagNames);
getAllTags(page, size);
updateTag(id, payload);
deleteTag(id);
restoreTag(id);
getTagStatistics();
```

---

## 📝 Implementation Priorities

### Phase 1 - MVP (Launch Ready)

**Public Features**:

1. Course Landing Page (with preview)
2. Course Catalog/Explore
3. Course Search
4. Home Page featured section

**Teacher Features**: 5. My Courses Dashboard 6. Create/Edit Course 7. Create/Edit Version 8. Version Management

**Student Features**: 9. My Learning (basic) 10. Course Review Form

**Admin Features**: 11. Course Approval Queue

### Phase 2 - Enhanced Features

12. Category Page
13. Teacher Public Profile
14. Course Statistics (detailed)
15. Category Management (admin)
16. Tag Management (admin)

### Phase 3 - Advanced Features

17. Clone Course
18. Version Approval Status (detailed tracking)
19. Admin Analytics Dashboard
20. Advanced search filters

---

## 🚀 Technical Recommendations

### State Management

- Use **React Query** (TanStack Query) cho API caching và refetching
- Use **Zustand** hoặc **Context API** cho global state (filters, auth)
- Use **React Hook Form** cho form management

### Performance Optimizations

- Lazy load course cards (React.lazy + Suspense)
- Image lazy loading với placeholder
- Debounce search input (300ms)
- Pagination instead of infinite scroll (better UX)
- Cache API responses với React Query (5 minutes stale time)

### SEO Optimizations

- Server-side rendering (SSR) cho public pages
- Dynamic meta tags từ course data
- Structured data (JSON-LD) cho course schema
- Canonical URLs
- XML sitemap generation

### Accessibility (A11y)

- Semantic HTML
- ARIA labels cho interactive elements
- Keyboard navigation support
- Focus management cho modals
- Screen reader friendly
- Color contrast WCAG AA compliant

### Security

- XSS protection (sanitize user inputs)
- CSRF tokens
- Rate limiting cho API calls
- Input validation (frontend + backend)
- Secure file uploads

---

**Ngày tạo**: 2026-01-23  
**Version**: 1.0  
**Module**: Courses (Full Module)  
**Tổng số màn hình**: 20 screens  
**Estimated Development Time**: 8-12 weeks (full team)
