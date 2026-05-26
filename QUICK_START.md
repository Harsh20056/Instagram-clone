# 🚀 Quick Start Guide - Instagram Clone

## ⚡ 3-Step Setup

### Step 1: Start Backend
```bash
cd Backend
npm start
```
✅ Backend running on http://localhost:3000

### Step 2: Start Frontend
```bash
cd Frontend
npm run dev
```
✅ Frontend running on http://localhost:5173

### Step 3: Open Browser
```
http://localhost:5173
```

---

## 🎯 First Time Usage

### 1. Create Account
- Click "Sign up" on login page
- Fill in: Email, Name, Username, Mobile, Password
- Click "Sign up" button
- ✅ Automatically logged in!

### 2. Create Your First Post
- Click **Create** button (+ icon in sidebar)
- Select 1-5 images
- Add caption (optional)
- Click **Share**
- ✅ Post appears in feed!

### 3. Explore
- **Like** posts by clicking ❤️
- **Comment** on posts
- **Follow** users
- **Search** for users
- **View** profiles

---

## 📱 Features at a Glance

| Feature | Location | Action |
|---------|----------|--------|
| **Home Feed** | `/` | View all posts |
| **Create Post** | Sidebar → Create | Upload images + caption |
| **Profile** | Sidebar → Profile | View your posts & stats |
| **Search** | Sidebar → Search | Find users |
| **Edit Profile** | Profile → Edit Profile | Update info |
| **Logout** | Sidebar → Logout | Sign out |

---

## 🎨 UI Overview

### Desktop Layout
```
┌─────────────┬──────────────────┬─────────────┐
│             │                  │             │
│  Sidebar    │   Feed Posts     │ Suggestions │
│             │                  │             │
│  - Home     │   [Post Card]    │ - Profile   │
│  - Search   │   [Post Card]    │ - Suggested │
│  - Create   │   [Post Card]    │   Users     │
│  - Profile  │   [Post Card]    │             │
│  - Logout   │                  │             │
│             │                  │             │
└─────────────┴──────────────────┴─────────────┘
```

### Mobile Layout
```
┌─────────────────────────────────┐
│  Header (Logo + Icons)          │
├─────────────────────────────────┤
│                                 │
│        Feed Posts               │
│                                 │
│        [Post Card]              │
│        [Post Card]              │
│        [Post Card]              │
│                                 │
├─────────────────────────────────┤
│  Bottom Nav (Home|Search|+|👤)  │
└─────────────────────────────────┘
```

---

## 🔑 Key Shortcuts

| Action | Desktop | Mobile |
|--------|---------|--------|
| Go Home | Click Home | Tap Home icon |
| Create Post | Click Create | Tap + icon |
| Search Users | Click Search | Tap 🔍 icon |
| View Profile | Click Profile | Tap 👤 icon |

---

## 🐛 Troubleshooting

### Problem: Can't login
**Solution**: Make sure backend is running on port 3000

### Problem: Images won't upload
**Solution**: Check file size (max 5MB per image)

### Problem: "Network Error"
**Solution**: 
1. Check backend is running
2. Check CORS is configured in backend
3. Clear browser cookies and try again

### Problem: Page is blank
**Solution**: 
1. Open browser console (F12)
2. Check for errors
3. Make sure you're on http://localhost:5173

---

## 📊 Test Data

### Sample Users (Create these for testing)
```
User 1:
- Username: john_doe
- Email: john@example.com
- Password: password123

User 2:
- Username: jane_smith
- Email: jane@example.com
- Password: password123
```

---

## 🎓 Learning Path

### Beginner
1. ✅ Register and login
2. ✅ Create a post
3. ✅ Like and comment
4. ✅ View profiles

### Intermediate
1. ✅ Follow/unfollow users
2. ✅ Edit your profile
3. ✅ Search for users
4. ✅ View followers/following

### Advanced
1. ✅ Understand Redux state flow
2. ✅ Explore API integration
3. ✅ Customize styling
4. ✅ Add new features

---

## 📚 Documentation

- **Frontend README**: `Frontend/README.md`
- **API Reference**: `Frontend/API_REFERENCE.md`
- **Setup Guide**: `FRONTEND_SETUP.md`
- **Implementation Summary**: `IMPLEMENTATION_SUMMARY.md`

---

## 🎉 You're Ready!

The Instagram clone is fully functional and ready to use. Enjoy exploring and learning!

### Quick Links
- 🌐 Frontend: http://localhost:5173
- 🔌 Backend: http://localhost:3000
- 📖 Docs: See files above

---

**Happy Coding! 🚀**
