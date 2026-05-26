# Instagram Clone Backend

A complete Instagram-like backend built with Node.js, Express, MongoDB, and modern JavaScript practices.

## 🚀 Features

- **User Authentication**: Register, login, password reset with JWT
- **Social Features**: Follow/unfollow users, like posts, comment system
- **Post Management**: Create posts with multiple images, get feeds
- **File Upload**: Image upload with validation using Multer & ImageKit
- **Search & Discovery**: User search, suggested users, user profiles
- **Error Handling**: Consistent error responses with proper status codes
- **Security**: Password hashing, JWT authentication, input validation

## 📁 Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── multer.js          # File upload configuration
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── user.controller.js    # User management
│   │   ├── post.controller.js    # Post operations
│   │   └── comment.controller.js # Comment operations
│   ├── middlewares/
│   │   ├── auth.middleware.js    # Authentication middleware
│   │   └── error.middleware.js   # Global error handler
│   ├── model/
│   │   ├── user.model.js      # User schema
│   │   ├── post.model.js      # Post schema
│   │   └── comment.model.js   # Comment schema
│   ├── routes/
│   │   ├── auth.routes.js     # Authentication routes
│   │   ├── user.routes.js     # User routes
│   │   ├── post.routes.js     # Post routes
│   │   └── comment.routes.js  # Comment routes
│   ├── services/
│   │   ├── mail.service.js    # Email service (Nodemailer)
│   │   └── storage.service.js # Image upload service (ImageKit)
│   └── utils/
│       ├── apiError.js        # Custom error class
│       ├── apiResponse.js     # Standard response format
│       └── asyncHandler.js    # Async error handler wrapper
├── public/                    # Static files
├── views/                     # EJS templates
├── .env                       # Environment variables
├── .env.example              # Environment template
├── package.json              # Dependencies
├── server.js                 # Application entry point
└── README.md                 # This file
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret_key
   
   SMTP_USER=your_email@gmail.com
   SMTP_APP_PASS=your_app_password
   
   BASE_URL=http://localhost:3000
   
   IK_URL=your_imagekit_url
   IK_PUB_KEY=your_imagekit_public_key
   IK_PRI_KEY=your_imagekit_private_key
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development with nodemon
   npm run dev
   ```

## 📦 Dependencies

### Core Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `multer` - File upload middleware
- `dotenv` - Environment variables

### Additional Dependencies
- `cookie-parser` - Cookie handling
- `nodemailer` - Email service
- `@imagekit/nodejs` - Image upload service
- `ejs` - Template engine (for password reset)

## 🔌 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| POST | `/forget-password` | Request password reset | No |
| POST | `/update-password/:userId` | Update password | Yes |
| POST | `/change-password/:userId` | Change password | No |
| GET | `/reset-password/:token` | Password reset page | No |

### Users (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile` | Get current user profile | Yes |
| GET | `/profile/:userId` | Get other user profile | No |
| PUT | `/profile` | Update user profile | Yes |
| GET | `/posts` | Get current user's posts | Yes |
| GET | `/posts/:userId` | Get other user's posts | No |
| GET | `/search?query=...` | Search users by name/username | No |
| GET | `/suggested` | Get suggested users to follow | Yes |
| GET | `/followers` | Get current user's followers | Yes |
| GET | `/followers/:userId` | Get other user's followers | No |
| GET | `/followings` | Get current user's followings | Yes |
| GET | `/followings/:userId` | Get other user's followings | No |
| GET | `/follow/:followerId` | Follow/unfollow user | Yes |

### Posts (`/api/posts`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create` | Create new post (with images) | Yes |
| GET | `/` | Get all posts | No |
| GET | `/:postId` | Get single post | No |
| GET | `/likes/:postId` | Like/unlike post | Yes |

### Comments (`/api/comments`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/post/:postId` | Create comment on post | Yes |
| GET | `/post/:postId` | Get all comments for post | No |
| PUT | `/:commentId` | Update comment | Yes |
| DELETE | `/:commentId` | Delete comment | Yes |

## 📊 Database Models

### User Model
```javascript
{
  username: String,      // Unique, required
  name: String,          // Required
  email: String,         // Unique, required
  mobile: String,        // Optional, 10 digits
  password: String,      // Required, min 6 chars
  followers: [ObjectId], // References to User
  followings: [ObjectId], // References to User
  posts: [ObjectId],     // References to Post
  isActive: Boolean,     // Default: true
  refreshToken: String
}
```

### Post Model
```javascript
{
  user_id: ObjectId,     // References User
  caption: String,       // Optional
  imageUrl: [String],    // Required array
  likes: [ObjectId],     // References to User
  comments: [ObjectId]   // References to Comment
}
```

### Comment Model
```javascript
{
  post_id: ObjectId,     // References Post
  user_id: ObjectId,     // References User
  comment: String        // Required
}
```

## 🔐 Authentication Flow

1. **Registration**: User provides credentials → Password hashed → JWT token generated → Token stored in cookie
2. **Login**: User provides credentials → Validation → JWT token generated → Token stored in cookie
3. **Protected Routes**: Middleware checks for valid JWT token in cookies
4. **Password Reset**: Email sent with reset link → Token validation → Password update

## 📁 File Upload

### Configuration
- **Max file size**: 5MB per image
- **Max files**: 5 images per post
- **Allowed types**: Only image files (jpg, png, gif, etc.)
- **Storage**: ImageKit cloud storage

### Upload Process
1. Multer middleware validates and processes files
2. Files converted to buffer in memory
3. Uploaded to ImageKit with folder organization
4. URLs stored in database for retrieval

## 🚦 Error Handling

### Error Types Handled
- **Validation Errors**: Mongoose schema validation
- **Authentication Errors**: Invalid/expired tokens
- **Authorization Errors**: Insufficient permissions
- **File Upload Errors**: Size, type, count limits
- **Database Errors**: Connection issues, duplicates
- **Service Errors**: Email, image upload failures

### Response Format
```json
{
  "success": false,
  "message": "Error description"
}
```

### Success Response Format
```json
{
  "success": true,
  "message": "Success message",
  "data": {} // Optional data
}
```

## 🧪 Testing the API

### Using Postman/Insomnia

1. **Register a user**
   ```
   POST http://localhost:3000/api/auth/register
   Body: {
     "username": "testuser",
     "email": "test@example.com",
     "password": "password123",
     "name": "Test User"
   }
   ```

2. **Login**
   ```
   POST http://localhost:3000/api/auth/login
   Body: {
     "username": "testuser",
     "password": "password123"
   }
   ```

3. **Create a post** (with form-data)
   ```
   POST http://localhost:3000/api/posts/create
   Headers: Cookie: token=<jwt_token>
   Body (form-data):
     caption: "My first post"
     images: [file1.jpg, file2.jpg]
   ```

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET_KEY` | JWT signing secret | `your-secret-key` |
| `SMTP_USER` | Email for sending emails | `your@gmail.com` |
| `SMTP_APP_PASS` | App password for email | `your-app-password` |
| `BASE_URL` | Base URL for reset links | `http://localhost:3000` |
| `IK_URL` | ImageKit URL endpoint | `https://ik.imagekit.io/...` |
| `IK_PUB_KEY` | ImageKit public key | `public_...` |
| `IK_PRI_KEY` | ImageKit private key | `private_...` |

## 🚀 Deployment

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas or local MongoDB
- ImageKit account for image storage
- Gmail account for email service

### Steps
1. Set up MongoDB database (Atlas recommended)
2. Create ImageKit account and get credentials
3. Configure Gmail app password
4. Update environment variables for production
5. Deploy to platform (Render, Railway, Heroku, AWS)

### Production Considerations
- Use HTTPS
- Set secure cookie options
- Implement rate limiting
- Add CORS configuration
- Use environment-specific configurations
- Implement logging
- Set up monitoring

## 📝 Code Style

- **Controllers**: Use `asyncHandler` for error handling
- **Error Handling**: Use `ApiError` class with proper status codes
- **Responses**: Use `ApiResponse` for consistent format
- **Variables**: Use `let` for mutable, `const` for immutable
- **Imports**: Group by external → internal → relative
- **Naming**: camelCase for variables/functions, PascalCase for classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Express.js team
- MongoDB team
- ImageKit for image hosting
- All open-source contributors

## 📞 Support

For issues, questions, or suggestions:
1. Check existing issues
2. Create a new issue with detailed description
3. Provide steps to reproduce

---

**Happy Coding!** 🚀