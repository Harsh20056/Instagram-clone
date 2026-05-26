# 📸 Instagram Clone - Full Stack Application

A complete Instagram clone built with React, Redux Toolkit, TailwindCSS (Frontend) and Node.js, Express, MongoDB (Backend).

![Status](https://img.shields.io/badge/Status-Complete-success)
![Frontend](https://img.shields.io/badge/Frontend-React%2019-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)

---

## ✨ Features

### 🔐 Authentication
- User registration with validation
- Login with username/email and password
- Password reset via email
- Cookie-based authentication
- Automatic session restoration

### 📱 Social Features
- **Posts**: Create posts with up to 5 images
- **Feed**: View posts from all users
- **Likes**: Like and unlike posts
- **Comments**: Add, view, and delete comments
- **Follow System**: Follow/unfollow users
- **Profile**: View user profiles with post grid
- **Search**: Search for users by username or name
- **Suggestions**: Discover new users to follow

### 🎨 UI/UX
- Instagram-like design and layout
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Loading states with skeleton loaders
- Optimistic UI updates
- Image carousel for multiple images
- Modal overlays for comments and followers

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or cloud)
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd Instagram
```

### 2. Setup Backend
```bash
cd Backend
npm install
cp sample.env .env
# Edit .env with your MongoDB URI and other configs
npm start
```
Backend runs on: http://localhost:3000

### 3. Setup Frontend
```bash
cd Frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

### 4. Open Browser
Navigate to: http://localhost:5173

---

## 📁 Project Structure

```
Instagram/
├── Backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── config/         # Database and configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Auth and error middlewares
│   │   ├── model/          # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Email and storage services
│   │   └── utils/          # Utility functions
│   └── package.json
│
├── Frontend/               # React + Redux frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── features/      # Redux slices
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Routing configuration
│   │   ├── services/      # API client
│   │   └── store/         # Redux store
│   └── package.json
│
└── Documentation files
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **TailwindCSS** - Styling
- **Vite** - Build tool
- **React Icons** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **Nodemailer** - Email service
- **Cloudinary** - Image storage

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICK_START.md](QUICK_START.md) | Quick start guide |
| [FRONTEND_SETUP.md](FRONTEND_SETUP.md) | Detailed frontend setup |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | Complete implementation details |
| [Frontend/README.md](Frontend/README.md) | Frontend documentation |
| [Frontend/API_REFERENCE.md](Frontend/API_REFERENCE.md) | API endpoints reference |
| [Backend/README.md](Backend/README.md) | Backend documentation |

---

## 🎯 Key Features Implemented

### Authentication & Authorization
- ✅ User registration with validation
- ✅ Login with username/email
- ✅ Password reset via email
- ✅ Cookie-based JWT authentication
- ✅ Protected routes
- ✅ Automatic session restoration

### Posts & Feed
- ✅ Create posts with multiple images (1-5)
- ✅ View all posts in feed
- ✅ Image carousel with navigation
- ✅ Like/unlike posts
- ✅ Optimistic UI updates
- ✅ Post creation modal

### Comments
- ✅ Add comments to posts
- ✅ View all comments
- ✅ Delete own comments
- ✅ Comment modal with scrolling
- ✅ Real-time comment updates

### User Profiles
- ✅ View user profiles
- ✅ Post grid layout (3 columns)
- ✅ User stats (posts, followers, following)
- ✅ Edit profile information
- ✅ Follow/unfollow users
- ✅ View followers/following lists

### Search & Discovery
- ✅ Search users by username/name
- ✅ Debounced search queries
- ✅ Suggested users sidebar
- ✅ User discovery

### Responsive Design
- ✅ Desktop layout with sidebar
- ✅ Mobile layout with bottom nav
- ✅ Tablet-optimized views
- ✅ Touch-friendly interactions

---

## 🎨 Screenshots

### Desktop View
- Left sidebar navigation
- Center feed with posts
- Right suggestions panel

### Mobile View
- Top header with logo
- Full-width feed
- Bottom navigation bar

---

## 🔧 Configuration

### Backend Environment Variables
Create `.env` file in Backend folder:
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### Frontend Configuration
API base URL is configured in `Frontend/src/services/api.js`:
```javascript
baseURL: "http://localhost:3000"
```

---

## 🧪 Testing

### Manual Testing Checklist
- [x] User registration
- [x] User login
- [x] Password reset
- [x] Create post with images
- [x] Like/unlike posts
- [x] Add/delete comments
- [x] Follow/unfollow users
- [x] Edit profile
- [x] Search users
- [x] View profiles
- [x] Responsive design

---

## 🚧 Future Enhancements

Potential features to add:
- [ ] Stories functionality
- [ ] Direct messaging
- [ ] Notifications system
- [ ] Video posts
- [ ] Post editing
- [ ] Profile picture upload
- [ ] Infinite scroll
- [ ] Post sharing
- [ ] Saved posts
- [ ] Explore page
- [ ] Hashtags
- [ ] Mentions
- [ ] Dark mode

---

## 🐛 Known Issues

None at the moment. If you find any issues, please report them.

---

## 📖 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forget-password` - Request password reset

### Users
- `GET /api/users/profile` - Get current user profile
- `GET /api/users/profile/:userId` - Get user profile by ID
- `PUT /api/users/profile` - Update profile
- `GET /api/users/search?query=` - Search users
- `GET /api/users/suggested` - Get suggested users
- `GET /api/users/follow/:userId` - Follow/unfollow user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts/create` - Create new post
- `GET /api/posts/:postId` - Get single post
- `GET /api/posts/likes/:postId` - Like/unlike post

### Comments
- `GET /api/comments/post/:postId` - Get post comments
- `POST /api/comments/post/:postId` - Create comment
- `PUT /api/comments/:commentId` - Update comment
- `DELETE /api/comments/:commentId` - Delete comment

For complete API documentation, see [Frontend/API_REFERENCE.md](Frontend/API_REFERENCE.md)

---

## 🤝 Contributing

This is an educational project. Feel free to fork and modify as needed!

---

## 📄 License

This project is for educational purposes only.

---

## 👨‍💻 Development

### Backend Development
```bash
cd Backend
npm run dev  # If nodemon is configured
```

### Frontend Development
```bash
cd Frontend
npm run dev
```

### Build for Production
```bash
cd Frontend
npm run build
```

---

## 🎓 Learning Resources

This project demonstrates:
- Full-stack application development
- RESTful API design
- Authentication and authorization
- State management with Redux
- Responsive design
- File uploads
- Real-time UI updates
- Modern React patterns

---

## 📞 Support

For questions or issues:
1. Check the documentation files
2. Review the implementation specification
3. Check the API reference
4. Review the code comments

---

## 🎉 Acknowledgments

- Instagram for design inspiration
- React team for amazing tools
- Redux team for state management
- TailwindCSS for styling utilities

---

**Built with ❤️ for learning purposes**

---

## 📊 Project Stats

- **Total Files**: 60+
- **Lines of Code**: ~5,000+
- **Components**: 15+
- **Pages**: 7
- **API Endpoints**: 20+
- **Features**: 30+

---

**Ready to start? See [QUICK_START.md](QUICK_START.md) for a 3-step setup guide!**
