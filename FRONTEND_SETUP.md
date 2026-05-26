# Instagram Clone - Frontend Setup Guide

## 🎉 Complete Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:3000`

### Step 1: Start the Backend
```bash
cd Backend
npm install
npm start
```
The backend should be running on `http://localhost:3000`

### Step 2: Start the Frontend
```bash
cd Frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`

## 🎨 Features Implemented

### ✅ Authentication
- **Login Page** (`/login`) - Sign in with username/email and password
- **Register Page** (`/register`) - Create new account with email, name, username, mobile, password
- **Forget Password** (`/forget-password`) - Request password reset link via email
- Cookie-based authentication with automatic session restoration

### ✅ Home Feed
- **Main Feed** (`/`) - View all posts from users
- **Post Cards** with:
  - User profile picture and username
  - Multi-image carousel (up to 5 images per post)
  - Like/unlike functionality with heart animation
  - Comment count and view comments button
  - Add comment directly from post card
  - Follow/unfollow button for other users
- **Suggestions Sidebar** (desktop only) - Discover new users to follow
- **Skeleton Loaders** - Smooth loading experience

### ✅ Create Post
- **Create Post Modal** - Triggered from sidebar "Create" button
- Upload up to 5 images (max 5MB each)
- Add caption to posts
- Image preview before posting
- Drag and drop support

### ✅ Profile
- **Profile Page** (`/profile/:userId`) - View any user's profile
- **Profile Header** with:
  - Profile picture
  - Username and full name
  - Post count, followers count, following count
  - Edit Profile button (own profile)
  - Follow/Unfollow button (other profiles)
- **Post Grid** - 3-column grid of user's posts
- **Hover Effects** - Show likes and comments count on hover
- **Followers/Following Lists** - Modal to view followers and following

### ✅ Edit Profile
- **Edit Profile Page** (`/edit-profile`)
- Update name, username, email, mobile number
- Form validation
- Success notification and redirect

### ✅ Search
- **Search Page** (`/search`) - Search for users
- Real-time search with debouncing
- Minimum 2 characters required
- Display user profile picture, username, and name
- Direct navigation to user profiles

### ✅ Comments
- **Comment Section Modal** - Full-screen modal for viewing and adding comments
- View all comments with user info and timestamps
- Add new comments
- Delete own comments
- Scrollable comment list

### ✅ Responsive Design
- **Desktop Layout**:
  - Left sidebar navigation
  - Center feed
  - Right suggestions panel
- **Mobile Layout**:
  - Top header with logo and icons
  - Bottom navigation bar
  - Full-width feed
  - Hidden suggestions panel

## 🎯 Instagram-like UI Features

### Design Elements
- ✅ Instagram color scheme (blue: #0095f6, gray borders, etc.)
- ✅ Instagram typography and font weights
- ✅ Card-based layout with borders
- ✅ Circular profile pictures with gradient borders
- ✅ Heart icon animation for likes
- ✅ Dot indicators for image carousels
- ✅ Hover effects on interactive elements
- ✅ Modal overlays for comments and followers

### Navigation
- ✅ Fixed sidebar on desktop
- ✅ Bottom navigation bar on mobile
- ✅ Active route highlighting
- ✅ Smooth transitions

### Interactions
- ✅ Optimistic UI updates (likes update immediately)
- ✅ Loading states with spinners
- ✅ Skeleton loaders for content
- ✅ Error handling with user-friendly messages
- ✅ Form validation with inline errors

## 📱 Pages Overview

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | Login | Sign in page |
| `/register` | Register | Sign up page |
| `/forget-password` | ForgetPassword | Password reset request |
| `/` | Home | Main feed with posts and suggestions |
| `/profile/:userId?` | Profile | User profile (own or others) |
| `/edit-profile` | EditProfile | Edit profile settings |
| `/search` | Search | Search for users |

## 🔧 Technical Implementation

### State Management (Redux Toolkit)
- **auth** - User authentication state
- **posts** - Feed posts and post operations
- **users** - User profiles, search, suggestions
- **comments** - Post comments

### API Integration
- Axios client with interceptors
- Cookie-based authentication
- Automatic token refresh
- Error handling with redirects

### Routing
- React Router DOM with data routing
- Protected routes (require authentication)
- Public routes (redirect if authenticated)
- Nested layouts

### Styling
- TailwindCSS utility classes
- Custom Instagram-themed colors
- Responsive breakpoints
- Custom animations

## 🚀 Usage Guide

### 1. Register a New Account
1. Go to `http://localhost:5173/register`
2. Fill in all required fields
3. Click "Sign up"
4. You'll be automatically logged in and redirected to the home feed

### 2. Create Your First Post
1. Click the "Create" button in the sidebar (or bottom nav on mobile)
2. Select 1-5 images from your computer
3. Add a caption (optional)
4. Click "Share"
5. Your post will appear at the top of the feed

### 3. Interact with Posts
- **Like**: Click the heart icon
- **Comment**: Type in the comment box and click "Post"
- **View Comments**: Click "View all comments"
- **Follow User**: Click "Follow" button on post header

### 4. Explore Profiles
1. Click on any username or profile picture
2. View their posts in a grid layout
3. See their followers and following counts
4. Click on counts to see lists
5. Follow/unfollow from their profile

### 5. Search for Users
1. Click "Search" in the navigation
2. Type at least 2 characters
3. Click on a user to view their profile

### 6. Edit Your Profile
1. Go to your profile
2. Click "Edit Profile"
3. Update your information
4. Click "Save Changes"

## 🎨 Customization

### Change Colors
Edit `Frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'instagram-blue': '#0095f6',
      'instagram-border': '#dbdbdb',
      'instagram-gray': '#8e8e8e',
    },
  },
}
```

### Change API URL
Edit `Frontend/src/services/api.js`:
```javascript
baseURL: "http://localhost:3000"
```

## 🐛 Common Issues

### Issue: "Network Error" or "Failed to fetch"
**Solution**: Make sure the backend is running on port 3000

### Issue: "Unauthorized" errors
**Solution**: Check that CORS is configured in the backend with `credentials: true`

### Issue: Images not uploading
**Solution**: Check file size (max 5MB) and format (images only)

### Issue: Cookies not being set
**Solution**: Ensure `withCredentials: true` in Axios config and backend CORS settings

## 📊 Performance Optimizations

- ✅ Lazy loading of images
- ✅ Debounced search queries
- ✅ Optimistic UI updates
- ✅ Skeleton loaders to prevent layout shift
- ✅ Efficient Redux state updates
- ✅ React.memo for expensive components (can be added)

## 🔐 Security Features

- ✅ HTTP-only cookies for authentication
- ✅ Protected routes with authentication checks
- ✅ Automatic logout on token expiration
- ✅ Input validation on forms
- ✅ XSS protection through React's built-in escaping

## 🎓 Learning Resources

This project demonstrates:
- Modern React patterns (hooks, context, etc.)
- Redux Toolkit for state management
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling
- Responsive design principles
- Authentication flows
- File uploads
- Real-time UI updates

## 📝 Next Steps (Future Enhancements)

- [ ] Add stories feature
- [ ] Add direct messaging
- [ ] Add notifications
- [ ] Add video posts
- [ ] Add post editing
- [ ] Add profile picture upload
- [ ] Add infinite scroll for feed
- [ ] Add post sharing
- [ ] Add saved posts
- [ ] Add explore page
- [ ] Add hashtags
- [ ] Add mentions

## 🤝 Contributing

This is an educational project. Feel free to fork and modify as needed!

## 📄 License

Educational purposes only.

---

**Enjoy your Instagram clone! 🎉**
