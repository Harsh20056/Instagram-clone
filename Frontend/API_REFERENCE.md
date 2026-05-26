# API Reference - Instagram Clone

## Base URL
```
http://localhost:3000
```

## Authentication Endpoints

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string",
  "name": "string",
  "mobile": "string"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

### Forget Password
```http
POST /api/auth/forget-password
Content-Type: application/json

{
  "email": "string"
}
```

### Update Password (Protected)
```http
POST /api/auth/update-password/:userId
Content-Type: application/json

{
  "password": "string"
}
```

### Change Password
```http
POST /api/auth/change-password/:userId
Content-Type: application/json

{
  "password": "string"
}
```

## User Endpoints

### Get Current User Profile (Protected)
```http
GET /api/users/profile
```

### Get User Profile by ID
```http
GET /api/users/profile/:userId
```

### Update Profile (Protected)
```http
PUT /api/users/profile
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "mobile": "string",
  "username": "string"
}
```

### Get User's Posts
```http
GET /api/users/posts
GET /api/users/posts/:userId
```

### Search Users
```http
GET /api/users/search?query=searchTerm
```

### Get Suggested Users (Protected)
```http
GET /api/users/suggested
```

### Get Followers
```http
GET /api/users/followers
GET /api/users/followers/:userId
```

### Get Followings
```http
GET /api/users/followings
GET /api/users/followings/:userId
```

### Follow/Unfollow User (Protected)
```http
GET /api/users/follow/:followerId
```

## Post Endpoints

### Create Post (Protected)
```http
POST /api/posts/create
Content-Type: multipart/form-data

FormData:
  - caption: "string" (optional)
  - images: File[] (1-5 images, max 5MB each)
```

### Get All Posts
```http
GET /api/posts/
```

### Get Single Post
```http
GET /api/posts/:postId
```

### Like/Unlike Post (Protected)
```http
GET /api/posts/likes/:postId
```

## Comment Endpoints

### Create Comment (Protected)
```http
POST /api/comments/post/:postId
Content-Type: application/json

{
  "comment": "string"
}
```

### Get Comments for Post
```http
GET /api/comments/post/:postId
```

### Update Comment (Protected)
```http
PUT /api/comments/:commentId
Content-Type: application/json

{
  "comment": "string"
}
```

### Delete Comment (Protected)
```http
DELETE /api/comments/:commentId
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Error details"
}
```

## Authentication

All protected endpoints require authentication via HTTP-only cookies. The `token` cookie is automatically set upon successful login/register and sent with subsequent requests when `withCredentials: true` is configured in Axios.

## CORS Configuration

The backend must have CORS configured to accept requests from the frontend:

```javascript
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
```

## Notes

- All requests must include `withCredentials: true` in Axios configuration
- File uploads use `multipart/form-data` content type
- Protected routes return 401 if not authenticated
- Search requires minimum 2 characters
- Image uploads limited to 5 files, 5MB each
