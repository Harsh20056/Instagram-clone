# Instagram Clone - Frontend

A modern, responsive Instagram clone built with React, Redux Toolkit, and TailwindCSS.

## 🚀 Features

- **Authentication**: Login, Register, Forget Password
- **Feed**: View posts from all users with image carousel support
- **Posts**: Create posts with multiple images (up to 5), like/unlike posts
- **Comments**: Add, view, and delete comments on posts
- **Profile**: View user profiles with post grid, followers/following lists
- **Search**: Search for users by username or name
- **Suggestions**: Discover new users to follow
- **Responsive Design**: Mobile-first design with bottom navigation on mobile

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **TailwindCSS** - Styling
- **React Icons** - Icon library

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure the backend is running on `http://localhost:3000`

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
Frontend/
├── src/
│   ├── assets/              # Static assets
│   ├── components/          # Reusable components
│   │   ├── common/          # Common UI components (Button, Input, Skeleton)
│   │   ├── layout/          # Layout components (Sidebar, Header, ProtectedLayout)
│   │   └── posts/           # Post-related components
│   ├── features/            # Redux slices and actions
│   │   ├── auth/            # Authentication state
│   │   ├── posts/           # Posts state
│   │   ├── users/           # Users state
│   │   └── comments/        # Comments state
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   ├── routes/              # Routing configuration
│   ├── services/            # API client configuration
│   ├── store/               # Redux store configuration
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Key Features Implementation

### Authentication
- Cookie-based authentication with HTTP-only cookies
- Automatic session restoration on app load
- Protected routes with redirect to login

### Posts
- Multi-image carousel with navigation dots
- Optimistic UI updates for likes
- Real-time comment submission
- Image preview before posting

### Profile
- User stats (posts, followers, following)
- Post grid layout with hover effects
- Follow/unfollow functionality
- Edit profile settings

### Search
- Debounced search with minimum 2 characters
- Real-time user search results
- Direct navigation to user profiles

## 🔧 Configuration

### API Base URL
The API base URL is configured in `src/services/api.js`:
```javascript
baseURL: "http://localhost:3000"
```

### Vite Proxy
The Vite proxy is configured in `vite.config.js` to forward API requests:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  },
}
```

## 📱 Responsive Design

- **Desktop**: Sidebar navigation on the left, feed in center, suggestions on right
- **Mobile**: Bottom navigation bar, full-width feed, collapsible header

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Environment Variables

No environment variables are required for the frontend. All configuration is done in the source files.

## 🐛 Troubleshooting

### CORS Issues
Make sure the backend has CORS configured with:
```javascript
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
```

### Cookie Issues
Ensure `withCredentials: true` is set in the Axios configuration and the backend is sending cookies with the correct domain and path.

### Port Conflicts
If port 5173 is already in use, Vite will automatically use the next available port.

## 📄 License

This project is for educational purposes only.
