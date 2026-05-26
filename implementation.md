# Instagram Frontend Implementation Specification

This document serves as a complete blueprint for implementing a professional, modern React.js frontend for the Instagram clone, fully integrated with the backend API.

---

## 🛠️ Technology Stack & Libraries

- **Build Tool**: Vite (React + JS template)
- **Styling**: TailwindCSS (v4 or v3) for a clean, modern Instagram layout with responsive sidebars and feed cards.
- **Icons**: `react-icons` (Lucide/Fi/Fa packs) for Instagram-like navigation, actions, and status symbols.
- **Routing**: React Router DOM (Data routing using `createBrowserRouter`).
- **State Management**: Redux Toolkit (`@reduxjs/toolkit` and `react-redux`) for global state management (Authentication state, Feed posts, Suggested users, User profile caching).
- **API Client**: Axios (configured with `withCredentials: true` to handle secure JWT tokens in cookies).
- **Skeleton Loader**: Tailored Tailwind CSS animations (`animate-pulse`) for skeletons of posts, profiles, and suggestions lists.

---

## 🗂️ Professional Folder Structure

```
Frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── logo.png             # Instagram typography logo
│   │   └── default-avatar.png   # Default placeholder profile image
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx       # Custom styled action buttons
│   │   │   ├── Input.jsx        # Custom input fields with validation states
│   │   │   └── Skeleton.jsx     # Base skeleton components (Card, Circle, Line)
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx      # Navigation sidebar (Left-side on desktop, bottom-bar on mobile)
│   │   │   ├── Header.jsx       # Top bar for mobile containing search and logo
│   │   │   └── ProtectedLayout.jsx # Wrapper with Sidebar and layout rules
│   │   └── posts/
│   │       ├── PostCard.jsx     # Individual feed item (carousel, likes, comments, caption)
│   │       ├── PostSkeleton.jsx # PostCard skeleton loading placeholder
│   │       ├── CommentSection.jsx # Overlay or drawer containing post comments
│   │       └── CreatePostModal.jsx # Multi-image upload modal with caption field
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.js     # Redux slice for login status, token, current user info
│   │   │   └── authActions.js   # Async thunks for register, login, logout
│   │   ├── posts/
│   │   │   ├── postSlice.js     # Redux slice for global feed, likes, posts updates
│   │   │   └── postActions.js   # Async thunks for fetchAll, createPost, toggleLike
│   │   ├── users/
│   │   │   ├── userSlice.js     # Redux slice for search, profile page, suggestions
│   │   │   └── userActions.js   # Async thunks for profiles, search, suggestions, follow/unfollow
│   │   └── comments/
│   │       ├── commentSlice.js  # Redux slice for comments handling
│   │       └── commentActions.js # Async thunks for fetchComments, createComment, deleteComment
│   ├── hooks/
│   │   ├── useAuth.js           # Quick helper to extract auth state
│   │   └── useOutsideClick.js   # Helper hook to close modals/menus on outside click
│   ├── pages/
│   │   ├── Login.jsx            # Sign In page
│   │   ├── Register.jsx         # Sign Up page
│   │   ├── ForgetPassword.jsx   # Request password reset page
│   │   ├── Home.jsx             # Main feed + suggestions list
│   │   ├── Profile.jsx          # Profile page grid (Posts, Followers/Following lists)
│   │   ├── EditProfile.jsx      # Settings/Edit profile fields page
│   │   ├── Search.jsx           # Search users feed (mobile optimized)
│   │   └── ResetPasswordPending.jsx # Temporary landing for password-reset status
│   ├── routes/
│   │   ├── AppRoutes.jsx        # Route registry and hierarchy
│   │   ├── ProtectedRoute.jsx   # Guard component redirecting unauthenticated users
│   │   └── PublicRoute.jsx      # Guard component redirecting authenticated users to feed
│   ├── services/
│   │   └── api.js               # Axios instance config with defaults and interceptors
│   ├── store/
│   │   └── store.js             # Redux Store configuration
│   ├── App.jsx                  # Main router provider container
│   ├── index.css                # Global Tailwind CSS configurations
│   └── main.jsx                 # Entry point setting up Provider & Root rendering
├── index.html
├── package.json
├── tailwind.config.js           # TailwindCSS configurations (if v3)
└── vite.config.js               # Vite configurations (proxy setup)
```

---

## 🔌 API Mapping & Client Integration

All requests to the backend must be made with `withCredentials: true` because the backend validates authentication via the `token` cookie. 

### ⚠️ Backend Adjustment Required
To allow cross-origin cookie-based auth, ensure `Backend/src/app.js` has the following middleware configured (install `cors` in backend if not already done):
```javascript
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true
}));
```

### ⚡ Axios Client & Interceptors Config (`src/services/api.js`)

Below is the standard setup for the Axios client. It uses a response interceptor to catch `401 Unauthorized` or `404 Unauthorized token` errors from the backend. If an unauthorized error is intercepted, it automatically redirects the user to the login page.

```javascript
import axios from "axios";

// Create Axios Instance
const api = axios.create({
  baseURL: "http://localhost:3000", // Target backend server port
  timeout: 15000,
  withCredentials: true, // Crucial for sending and receiving HTTP-Only cookies (token)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to globally handle auth failures
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    
    if (error.response) {
      const { status } = error.response;
      
      // If 401 (Unauthorized) or 404 (with unauthorized token message):
      if (status === 401 || (status === 404 && error.response.data?.message?.toLowerCase().includes("token"))) {
        // Prevent redirection loop during login/register attempts
        if (!originalRequest.url.includes("/api/auth/login") && !originalRequest.url.includes("/api/auth/register")) {
          // Clear any local storage and force redirect to login
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
```


### 1. Authentication Client Operations (`/api/auth`)
- **Register**: `POST /api/auth/register`
  - Payload: `{ username, email, password, name, mobile }`
  - Success behavior: Automatically sets cookie `token`. Store user object in Redux, redirect to Home (`/`).
- **Login**: `POST /api/auth/login`
  - Payload: `{ username, password }`
  - Success behavior: Sets cookie `token`. Store user in Redux, redirect to Home (`/`).
- **Forget Password**: `POST /api/auth/forget-password`
  - Payload: `{ email }`
  - Behavior: Sends reset link to user's email. Show verification notification.
- **Update Password**: `POST /api/auth/update-password/:userId` (Protected)
  - Payload: `{ password }`
- **Change Password**: `POST /api/auth/change-password/:userId`
  - Payload: `{ password }`
  - *Note:* The backend sends an email with a link pointing to the EJS template at `GET /api/auth/reset-password/:token`, which renders a form that submits directly to `/api/auth/change-password/:userId`. No separate frontend page is strictly needed for the final reset step, but `ForgetPassword` is required on the frontend to trigger the flow.

### 2. User Client Operations (`/api/users`)
- **Get Current User Profile**: `GET /api/users/profile` (Protected)
  - Fetches current authenticated user data including followers/following IDs and user posts lists.
- **Get User Profile by ID**: `GET /api/users/profile/:userId`
  - Fetches target user details (public profiles).
- **Update Profile**: `PUT /api/users/profile` (Protected)
  - Payload: `{ name, email, mobile, username }`
- **Get User's Posts**: `GET /api/users/posts` / `GET /api/users/posts/:userId`
  - Fetches all posts belonging to the specified user.
- **Search Users**: `GET /api/users/search?query=...`
  - Fetches users based on username/name matching search queries (min 2 characters).
- **Suggested Users**: `GET /api/users/suggested` (Protected)
  - Fetches list of users who are not followed by the current user. Sorted by follower count.
- **Get Followers list**: `GET /api/users/followers` / `GET /api/users/followers/:userId`
- **Get Followings list**: `GET /api/users/followings` / `GET /api/users/followings/:userId`
- **Follow/Unfollow user**: `GET /api/users/follow/:followerId` (Protected)
  - Toggles follow/unfollow state. Updates Redux store.

### 3. Post Client Operations (`/api/posts`)
- **Create Post**: `POST /api/posts/create` (Protected)
  - Content-Type: `multipart/form-data`
  - Payload: Form Data containing `caption` (optional) and `images` (array of 1-5 image files).
- **Get All Posts**: `GET /api/posts/`
  - Fetches public timeline posts.
- **Get Single Post**: `GET /api/posts/:postId`
- **Like/Unlike Post**: `GET /api/posts/likes/:postId` (Protected)
  - Toggles the like state on the selected post.

### 4. Comment Client Operations (`/api/comments`)
- **Create Comment**: `POST /api/comments/post/:postId` (Protected)
  - Payload: `{ comment }`
- **Get Comments for Post**: `GET /api/comments/post/:postId`
- **Update Comment**: `PUT /api/comments/:commentId` (Protected)
  - Payload: `{ comment }`
- **Delete Comment**: `DELETE /api/comments/:commentId` (Protected)

---

## 🗃️ Global State Management (Redux Store)

### 1. Store Config (`src/store/store.js`)
```javascript
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/posts/postSlice";
import userReducer from "../features/users/userSlice";
import commentReducer from "../features/comments/commentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    users: userReducer,
    comments: commentReducer,
  },
});
```

### 2. Slice Actions and Schema Details
- **`authSlice`**:
  - `user`: Authenticated user details or `null`.
  - `status`: `'idle' | 'loading' | 'succeeded' | 'failed'`.
  - `error`: String error message or `null`.
  - Actions: `login`, `register`, `logout` (clears cookie token/state), `fetchCurrentUserProfile`.
- **`postSlice`**:
  - `feedPosts`: Array of all posts currently fetched for user timeline.
  - `selectedPost`: Current single post view.
  - `status`: `'idle' | 'loading' | 'succeeded' | 'failed'`.
  - Actions: `fetchFeedPosts`, `createNewPost`, `toggleLikePost` (optimistic state updates).
- **`userSlice`**:
  - `userProfile`: Currently viewed user's profile details.
  - `searchResults`: Array of users matching search queries.
  - `suggestions`: Array of suggested users.
  - `status`: Loading states for search and profile fetches.
  - Actions: `fetchUserProfile`, `searchUsers`, `fetchSuggestions`, `toggleFollowUser`.
- **`commentSlice`**:
  - `comments`: Record matching `{ [postId]: Array of comment objects }`.
  - `status`: Loading states.
  - Actions: `fetchCommentsByPost`, `addCommentToPost`, `deleteCommentFromPost`.

---

## 🎨 Styling, Layout, and Skeleton UI Guidelines

### Sidebar Layout (`Sidebar.jsx`)
- Fixed left sidebar navigation (resembles standard Instagram web layout) containing links: Home, Search, Explore (optional), Create Post (opens Modal), Profile, and Logout.
- Seamlessly collapses into a bottom navigation bar on mobile screen layouts (`sm` / `md` breakpoint rules).
- Active route highlighted with bold icons and text weights.

### Skeleton Loading Components
Ensure skeleton placeholders reflect exact layout configurations with `animate-pulse` styling to prevent layout shifts.

1. **Feed Skeleton (`PostSkeleton.jsx`)**:
   - Circular placeholder for profile avatar.
   - Rectangular placeholder for username + time details.
   - Large square block (4:5 ratio matching Instagram standards) for the image container.
   - Multiple text line blocks mimicking captions and comment placeholders.
2. **Profile Skeleton (`ProfileSkeleton.jsx`)**:
   - Large circular placeholder for profile avatar (top segment).
   - Horizontal detail blocks for stats columns (Posts, Followers, Following count).
   - Uniform grid layout (3x3 blocks) representing loading post tiles.
3. **Suggestions Skeleton**:
   - Vertical listing of avatars paired with double-line loading labels.

---

## 🤖 Prompt Blueprints to Code the Frontend (Give to AI)

Use the following step-by-step prompt blocks to implement the entire codebase sequentially.

### Prompt 1: Project Initialization, Routing, & Axios Service Setup
```
Implement a Vite-React-Tailwind application in the "Frontend" folder.
Initialize packages: react-router-dom, @reduxjs/toolkit, react-redux, axios, react-icons.
Configure TailwindCSS inside index.css and tailwind.config.js (or v4 setup).
Create index.css with core styles, reset parameters, and scrollbars hide rule.
Implement src/services/api.js:
- Set up an axios client instance.
- Base URL should target "http://localhost:3000".
- Set default headers to application/json.
- MUST add "withCredentials: true" to ensure cookies are sent with all calls.
Implement Router structure in src/routes/:
- ProtectedRoute.jsx: checks for existence of "auth.user" in state. If empty/loading, redirect to "/login".
- PublicRoute.jsx: checks if user is logged in, redirects authenticated users to "/".
- AppRoutes.jsx: Setup browser data routing:
  - "/" -> Main Home Feed Layout
  - "/login" -> Login Page
  - "/register" -> Register Page
  - "/forget-password" -> Forget Password
  - "/profile/:userId?" -> Profile page (optional userId, defaults to logged-in user profile if empty)
  - "/edit-profile" -> Settings edit profile page
  - "/search" -> Mobile search tab
Ensure root App.jsx incorporates RouterProvider and binds Redux Provider.
```

### Prompt 2: State Management Configuration (Redux Slices)
```
Create Redux structure inside src/features/ and src/store/:
1. authSlice.js & authActions.js:
   - Async Thunks for registerUser, loginUser, logoutUser, fetchCurrentUser.
   - Current user fetch triggers on app initialization (App.jsx useEffect) to restore session via cookie tokens.
2. postSlice.js & postActions.js:
   - Thunks: fetchFeedPosts (GET /api/posts), createPost (POST /api/posts/create - handles Multipart Form Data for images), and toggleLikePost (GET /api/posts/likes/:postId).
   - In toggleLikePost, implement optimistic UI updating: toggle the user id in the post's likes list immediately and fall back if API fails.
3. userSlice.js & userActions.js:
   - Thunks: fetchUserProfile (GET /api/users/profile/:userId), updateProfile (PUT /api/users/profile), searchUsers (GET /api/users/search), fetchSuggestions (GET /api/users/suggested), toggleFollowUser (GET /api/users/follow/:followerId).
4. commentSlice.js & commentActions.js:
   - Thunks: fetchPostComments, createComment, deleteComment.
Configure store.js to bind all reducers. Make sure to export thunks and action dispatches for components.
```

### Prompt 3: Authentication Layouts & Pages
```
Implement Sign In, Sign Up, and Forget Password pages:
1. Login.jsx:
   - High fidelity modern UI matching Instagram web branding.
   - Fields: Username/Email, Password.
   - Integration: Dispatches loginUser thunk. Redirects to "/" on success.
   - Links to /register and /forget-password.
2. Register.jsx:
   - Fields: Email, Full Name, Username, Mobile Number, Password.
   - Validation: Require all fields, password min 6 chars, mobile 10 digits.
   - Integration: Dispatches registerUser. On success redirect to "/".
3. ForgetPassword.jsx:
   - Input for email address. Dispatches forgetPassword. Show beautiful success alert: "Reset link has been dispatched to your email address".
All pages should display loading indicators during submission and clear backend error states if errors are returned. Use Tailwind classes.
```

### Prompt 4: App Layout & Navigation Sidebar
```
Create the base UI frame wrapping the application:
1. Sidebar.jsx:
   - Desktop layout: Sidebar aligned to the left of the screen, fixed width, sticky position.
   - Mobile layout: Fixed bottom row (bottom bar navigation).
   - Items: Home (icon), Search (icon), Create Post (icon), Profile (avatar circle + username/icon), Logout (button/icon).
   - "Create Post" button should NOT navigate, but open the CreatePostModal.
2. Header.jsx:
   - Shown only on mobile screens (hidden on desktop).
   - Contains Logo typography on left, search icon / profile shortcut on right.
3. ProtectedLayout.jsx:
   - Wraps protected routes.
   - Grid layout: Left-side Sidebar (hidden on mobile), Content container in the center/right (with custom bottom margin on mobile to account for bottom navigation).
```

### Prompt 5: Feeds, Post Creation & Carousel
```
Implement Home.jsx timeline, PostCard.jsx, and CreatePostModal.jsx:
1. Home.jsx:
   - Grid structure: Left side contains the post feed scroll. Right side contains user's mini profile snippet & Suggested Users panel (hidden on tablets/mobile screens).
   - Displays feed posts or PostSkeleton placeholders when loading.
2. PostCard.jsx:
   - Header: user avatar, username, follow/unfollow toggle button if not current user.
   - Image display: Custom slider supporting 1 to 5 images (since backend allows multiple files per post). Use dot indicators for navigation.
   - Actions bar: Like button (icon toggle), Comment icon, Share icon.
   - Details: Like count ("Liked by x users"), Caption with username bold, comments toggle ("View all x comments").
   - Comment input bar inside the card to submit comments instantly.
3. CreatePostModal.jsx:
   - Triggered by Sidebar's "Create" button.
   - Stage 1: File drop/picker supporting multiple file selection (max 5). Check file sizes (<5MB).
   - Stage 2: Preview carousel of picked images, plus caption input textarea.
   - Dispatches createPost (using FormData). Closes modal on success, appends post to feed.
```

### Prompt 6: Comments, Search, Profiles & Edit Profile
```
Implement remaining sub-features:
1. CommentSection.jsx:
   - Drawer/Modal matching Instagram style.
   - Displays scrollable list of comments with user avatars and comment strings.
   - Allows deletion of comments if comment.user_id matches logged-in user.
2. Profile.jsx:
   - Top layout: User Avatar, Name, Stats (Post Count, Followers Count, Following Count).
   - Actions: If own profile, show "Edit Profile" button. If other user profile, show "Follow/Unfollow" active button.
   - List click: Clicking "Followers" or "Following" opens overlay list of users.
   - Lower layout: Grid gallery layout (3 columns). Displays post images. Hovering on a tile shows Likes and Comments overlay.
3. EditProfile.jsx:
   - Settings form pre-populated with current profile details (Name, Username, Email, Mobile).
   - Submits payload to update API. Updates Redux user store, notifies user of updates.
4. Search.jsx (Mobile Search view):
   - Input field. Query fetches results after 2 characters.
   - Lists matched users with avatars, names, and links to their profiles.
```

### Prompt 7: skeleton Loaders & Polish
```
Add skeleton loader states and micro-interactions:
1. Apply PostSkeleton to timeline while loading feed posts.
2. Apply ProfileSkeleton to profile screen when fetching posts/stats.
3. Apply circular placeholder animations to Suggestions listing.
4. Build standard Tailwind error alert components for global API error toasts.
5. Setup smooth animations for image carousels, modal transitions, and navigation bar active status.
```
