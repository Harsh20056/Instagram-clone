# 🏗️ Architecture Overview - Instagram Clone

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                    http://localhost:5173                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP Requests
                           │ (with cookies)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Pages    │  │ Components │  │   Redux    │           │
│  │            │  │            │  │   Store    │           │
│  │ - Login    │  │ - PostCard │  │            │           │
│  │ - Register │  │ - Sidebar  │  │ - auth     │           │
│  │ - Home     │  │ - Modal    │  │ - posts    │           │
│  │ - Profile  │  │ - etc.     │  │ - users    │           │
│  │ - Search   │  │            │  │ - comments │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│                                                              │
│  ┌──────────────────────────────────────────────┐          │
│  │         Axios Client (API Service)            │          │
│  │  - baseURL: http://localhost:3000             │          │
│  │  - withCredentials: true                      │          │
│  │  - Interceptors for auth                      │          │
│  └──────────────────────────────────────────────┘          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ API Calls
                           │ (JSON + FormData)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (Node.js + Express)                 │
│                    http://localhost:3000                     │
│                                                              │
│  ┌────────────────────────────────────────────────┐         │
│  │              Middlewares                        │         │
│  │  - CORS (credentials: true)                    │         │
│  │  - Cookie Parser                               │         │
│  │  - JSON Parser                                 │         │
│  │  - Auth Middleware (JWT verification)         │         │
│  │  - Error Handler                               │         │
│  └────────────────────────────────────────────────┘         │
│                                                              │
│  ┌────────────────────────────────────────────────┐         │
│  │                  Routes                         │         │
│  │  /api/auth     - Authentication                │         │
│  │  /api/users    - User management               │         │
│  │  /api/posts    - Post operations               │         │
│  │  /api/comments - Comment operations            │         │
│  └────────────────────────────────────────────────┘         │
│                                                              │
│  ┌────────────────────────────────────────────────┐         │
│  │               Controllers                       │         │
│  │  - Business logic                              │         │
│  │  - Request validation                          │         │
│  │  - Response formatting                         │         │
│  └────────────────────────────────────────────────┘         │
│                                                              │
│  ┌────────────────────────────────────────────────┐         │
│  │                 Services                        │         │
│  │  - Email Service (Nodemailer)                  │         │
│  │  - Storage Service (Cloudinary)                │         │
│  └────────────────────────────────────────────────┘         │
└──────────────┬───────────────────────┬─────────────────────┘
               │                       │
               │                       │
               ▼                       ▼
┌──────────────────────┐   ┌──────────────────────┐
│   MongoDB Database   │   │   Cloudinary CDN     │
│                      │   │                      │
│  Collections:        │   │  - Image Storage     │
│  - users             │   │  - Image Delivery    │
│  - posts             │   │  - Transformations   │
│  - comments          │   │                      │
└──────────────────────┘   └──────────────────────┘
```

---

## Data Flow Diagrams

### 1. User Registration Flow

```
User Browser
    │
    │ 1. Fill registration form
    │    (email, name, username, mobile, password)
    ▼
Frontend (Register Page)
    │
    │ 2. Validate form data
    │ 3. Dispatch registerUser action
    ▼
Redux Store (authSlice)
    │
    │ 4. Call API via Axios
    ▼
Backend (/api/auth/register)
    │
    │ 5. Validate request
    │ 6. Check if user exists
    │ 7. Hash password (bcrypt)
    │ 8. Create user in database
    │ 9. Generate JWT token
    │ 10. Set HTTP-only cookie
    ▼
MongoDB (users collection)
    │
    │ 11. Return user data
    ▼
Frontend
    │
    │ 12. Update Redux state
    │ 13. Redirect to home page
    ▼
User sees Home Feed
```

### 2. Create Post Flow

```
User Browser
    │
    │ 1. Click "Create" button
    ▼
Frontend (CreatePostModal)
    │
    │ 2. Select images (1-5)
    │ 3. Add caption (optional)
    │ 4. Click "Share"
    ▼
Redux Store (postSlice)
    │
    │ 5. Create FormData
    │ 6. Append images and caption
    │ 7. Call API via Axios
    ▼
Backend (/api/posts/create)
    │
    │ 8. Verify authentication
    │ 9. Validate files (Multer)
    │ 10. Upload to Cloudinary
    ▼
Cloudinary
    │
    │ 11. Store images
    │ 12. Return image URLs
    ▼
Backend
    │
    │ 13. Create post in database
    │ 14. Return post data
    ▼
MongoDB (posts collection)
    │
    │ 15. Update Redux state
    │ 16. Add post to feed
    ▼
Frontend
    │
    │ 17. Close modal
    │ 18. Show new post in feed
    ▼
User sees new post
```

### 3. Like Post Flow

```
User Browser
    │
    │ 1. Click heart icon
    ▼
Frontend (PostCard)
    │
    │ 2. Optimistic update (instant UI change)
    │ 3. Dispatch toggleLikePost action
    ▼
Redux Store (postSlice)
    │
    │ 4. Update local state immediately
    │ 5. Call API via Axios
    ▼
Backend (/api/posts/likes/:postId)
    │
    │ 6. Verify authentication
    │ 7. Check if already liked
    │ 8. Toggle like status
    │ 9. Update post in database
    ▼
MongoDB (posts collection)
    │
    │ 10. Return updated post
    ▼
Frontend
    │
    │ 11. Confirm state update
    │ 12. Show updated like count
    ▼
User sees updated likes
```

### 4. Search Users Flow

```
User Browser
    │
    │ 1. Type in search box
    ▼
Frontend (Search Page)
    │
    │ 2. Debounce input (300ms)
    │ 3. Check min 2 characters
    │ 4. Dispatch searchUsers action
    ▼
Redux Store (userSlice)
    │
    │ 5. Call API via Axios
    ▼
Backend (/api/users/search?query=...)
    │
    │ 6. Search in database
    │ 7. Match username or name
    │ 8. Return matching users
    ▼
MongoDB (users collection)
    │
    │ 9. Update Redux state
    │ 10. Render results
    ▼
Frontend
    │
    │ 11. Display user list
    ▼
User sees search results
```

---

## Component Hierarchy

```
App
│
├── RouterProvider
│   │
│   ├── PublicRoute
│   │   ├── Login
│   │   ├── Register
│   │   └── ForgetPassword
│   │
│   └── ProtectedRoute
│       └── ProtectedLayout
│           ├── Header (mobile only)
│           ├── Sidebar
│           │   ├── Navigation Links
│           │   └── Create Button → CreatePostModal
│           │
│           └── Pages
│               ├── Home
│               │   ├── PostCard (multiple)
│               │   │   ├── Image Carousel
│               │   │   ├── Like Button
│               │   │   ├── Comment Input
│               │   │   └── CommentSection Modal
│               │   │
│               │   └── Suggestions (desktop)
│               │
│               ├── Profile
│               │   ├── Profile Header
│               │   ├── Stats
│               │   ├── Post Grid
│               │   ├── Followers Modal
│               │   └── Following Modal
│               │
│               ├── EditProfile
│               │   └── Profile Form
│               │
│               └── Search
│                   └── User Results List
```

---

## Redux State Structure

```javascript
{
  auth: {
    user: {
      _id: "...",
      username: "...",
      email: "...",
      name: "...",
      profilePicture: "...",
      followers: [...],
      followings: [...]
    },
    status: "idle" | "loading" | "succeeded" | "failed",
    error: null | "error message"
  },
  
  posts: {
    feedPosts: [
      {
        _id: "...",
        user_id: {...},
        images: [...],
        caption: "...",
        likes: [...],
        comments: [...],
        createdAt: "..."
      }
    ],
    selectedPost: {...} | null,
    status: "idle" | "loading" | "succeeded" | "failed",
    error: null | "error message"
  },
  
  users: {
    userProfile: {...} | null,
    userPosts: [...],
    searchResults: [...],
    suggestions: [...],
    followers: [...],
    followings: [...],
    status: "idle" | "loading" | "succeeded" | "failed",
    searchStatus: "idle" | "loading" | "succeeded" | "failed",
    error: null | "error message"
  },
  
  comments: {
    comments: {
      "postId1": [...comments],
      "postId2": [...comments]
    },
    status: "idle" | "loading" | "succeeded" | "failed",
    error: null | "error message"
  }
}
```

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (required),
  password: String (hashed, required),
  name: String (required),
  mobile: String,
  profilePicture: String (URL),
  followers: [ObjectId] (ref: User),
  followings: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Posts Collection
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: User, required),
  images: [String] (URLs, required, max: 5),
  caption: String,
  likes: [ObjectId] (ref: User),
  comments: [ObjectId] (ref: Comment),
  createdAt: Date,
  updatedAt: Date
}
```

### Comments Collection
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: User, required),
  post_id: ObjectId (ref: Post, required),
  comment: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Request/Response Flow

### Example: Create Post

**Request:**
```http
POST /api/posts/create
Content-Type: multipart/form-data
Cookie: token=jwt_token_here

FormData:
  images: [File, File, File]
  caption: "Beautiful sunset 🌅"
```

**Backend Processing:**
1. Auth middleware verifies JWT token
2. Multer processes uploaded files
3. Files uploaded to Cloudinary
4. Post created in MongoDB
5. Response sent back

**Response:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "post_id",
    "user_id": {
      "_id": "user_id",
      "username": "johndoe",
      "profilePicture": "url"
    },
    "images": [
      "cloudinary_url_1",
      "cloudinary_url_2",
      "cloudinary_url_3"
    ],
    "caption": "Beautiful sunset 🌅",
    "likes": [],
    "comments": [],
    "createdAt": "2026-05-26T10:00:00.000Z"
  }
}
```

---

## Authentication Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ 1. POST /api/auth/login
       │    { username, password }
       ▼
┌─────────────────────┐
│  Backend Server     │
│                     │
│  2. Validate data   │
│  3. Find user       │
│  4. Compare password│
│  5. Generate JWT    │
│  6. Set cookie      │
└──────┬──────────────┘
       │
       │ 7. Response with user data
       │    Set-Cookie: token=jwt_token; HttpOnly
       ▼
┌─────────────┐
│   Browser   │
│             │
│  8. Store   │
│     cookie  │
└──────┬──────┘
       │
       │ 9. Subsequent requests
       │    Cookie: token=jwt_token
       ▼
┌─────────────────────┐
│  Backend Server     │
│                     │
│  10. Auth middleware│
│  11. Verify JWT     │
│  12. Attach user    │
│  13. Process request│
└─────────────────────┘
```

---

## File Upload Flow

```
User selects images
       │
       ▼
Frontend validates
(size, count, type)
       │
       ▼
Create FormData
       │
       ▼
POST to backend
       │
       ▼
Multer middleware
(parse multipart)
       │
       ▼
Cloudinary upload
       │
       ▼
Get image URLs
       │
       ▼
Save to MongoDB
       │
       ▼
Return URLs to frontend
       │
       ▼
Display images
```

---

## Security Layers

```
┌─────────────────────────────────────┐
│         Frontend Security            │
│  - No sensitive data in code        │
│  - XSS protection (React)           │
│  - Input validation                 │
│  - Protected routes                 │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│       Transport Security             │
│  - HTTPS (production)               │
│  - HTTP-only cookies                │
│  - CORS configuration               │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│        Backend Security              │
│  - JWT authentication               │
│  - Password hashing (bcrypt)        │
│  - Auth middleware                  │
│  - Input validation                 │
│  - Error handling                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│       Database Security              │
│  - MongoDB authentication           │
│  - Connection encryption            │
│  - Data validation                  │
└─────────────────────────────────────┘
```

---

## Performance Optimizations

### Frontend
- **Code Splitting**: Routes loaded on demand
- **Lazy Loading**: Images loaded as needed
- **Debouncing**: Search queries debounced
- **Optimistic Updates**: UI updates before API response
- **Skeleton Loaders**: Prevent layout shift
- **Memoization**: Prevent unnecessary re-renders

### Backend
- **Database Indexing**: Fast queries
- **Efficient Queries**: Populate only needed fields
- **File Upload**: Direct to Cloudinary
- **Error Handling**: Async error wrapper

---

## Scalability Considerations

### Current Architecture
- Monolithic backend
- Single database
- Direct file uploads
- Session-based auth

### Future Improvements
- Microservices architecture
- Database sharding
- CDN for static assets
- Redis caching
- Load balancing
- Message queues
- WebSocket for real-time features

---

## Technology Stack Summary

```
┌─────────────────────────────────────┐
│           Frontend                   │
│  - React 19                         │
│  - Redux Toolkit                    │
│  - React Router DOM                 │
│  - Axios                            │
│  - TailwindCSS                      │
│  - Vite                             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│           Backend                    │
│  - Node.js                          │
│  - Express                          │
│  - MongoDB + Mongoose               │
│  - JWT                              │
│  - Bcrypt                           │
│  - Multer                           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          Services                    │
│  - Cloudinary (images)              │
│  - Nodemailer (emails)              │
│  - MongoDB Atlas (database)         │
└─────────────────────────────────────┘
```

---

**This architecture provides a solid foundation for a scalable, maintainable Instagram clone!**
