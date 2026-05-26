# 🧪 Testing Guide - Instagram Clone

## Quick Test Scenarios

### Scenario 1: Complete User Journey (5 minutes)

#### Step 1: Create First User
1. Open http://localhost:5173/register
2. Fill in:
   - Email: `john@test.com`
   - Name: `John Doe`
   - Username: `johndoe`
   - Mobile: `1234567890`
   - Password: `password123`
3. Click "Sign up"
4. ✅ Should redirect to home feed

#### Step 2: Create First Post
1. Click "Create" button in sidebar (+ icon)
2. Select 2-3 images from your computer
3. Add caption: "My first post! 🎉"
4. Click "Share"
5. ✅ Post should appear at top of feed

#### Step 3: Create Second User
1. Click "Logout" in sidebar
2. Click "Sign up" on login page
3. Fill in:
   - Email: `jane@test.com`
   - Name: `Jane Smith`
   - Username: `janesmith`
   - Mobile: `0987654321`
   - Password: `password123`
4. Click "Sign up"
5. ✅ Should redirect to home feed

#### Step 4: Interact with Posts
1. See John's post in feed
2. Click ❤️ to like the post
3. Type a comment: "Great post!"
4. Click "Post" to submit comment
5. Click "View all comments" to see comment modal
6. ✅ Like count should increase, comment should appear

#### Step 5: Follow User
1. Click "Follow" button on John's post
2. ✅ Button should change to "Unfollow"
3. Click on John's username
4. ✅ Should navigate to John's profile

#### Step 6: View Profile
1. On John's profile, see:
   - Profile picture
   - Username and name
   - Post count (1)
   - Followers count (1)
   - Following count (0)
   - Post grid with 1 post
2. Click on "1 followers"
3. ✅ Should see Jane in followers list

#### Step 7: Search Users
1. Click "Search" in sidebar
2. Type "john"
3. ✅ Should see John Doe in results
4. Click on John's result
5. ✅ Should navigate to John's profile

#### Step 8: Edit Profile
1. Go to your profile (Jane's profile)
2. Click "Edit Profile"
3. Change name to "Jane Smith Updated"
4. Click "Save Changes"
5. ✅ Should see success message and redirect

---

## Feature Testing Checklist

### ✅ Authentication
- [ ] Register with valid data
- [ ] Register with duplicate username (should fail)
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Request password reset
- [ ] Logout successfully

### ✅ Posts
- [ ] Create post with 1 image
- [ ] Create post with 5 images
- [ ] Try to upload 6 images (should fail)
- [ ] Try to upload file > 5MB (should fail)
- [ ] View post carousel (navigate between images)
- [ ] Like a post
- [ ] Unlike a post
- [ ] View post in feed

### ✅ Comments
- [ ] Add comment to post
- [ ] View all comments
- [ ] Delete own comment
- [ ] Try to delete other's comment (should not show delete button)

### ✅ Profile
- [ ] View own profile
- [ ] View other user's profile
- [ ] See correct post count
- [ ] See correct followers/following count
- [ ] Click on post in grid
- [ ] Hover over post (should show likes/comments)

### ✅ Follow System
- [ ] Follow a user
- [ ] Unfollow a user
- [ ] View followers list
- [ ] View following list
- [ ] See updated counts

### ✅ Search
- [ ] Search with 1 character (should show message)
- [ ] Search with 2+ characters
- [ ] Search for existing user
- [ ] Search for non-existing user
- [ ] Click on search result

### ✅ Edit Profile
- [ ] Update name
- [ ] Update username
- [ ] Update email
- [ ] Update mobile
- [ ] Save changes
- [ ] Cancel changes

### ✅ Responsive Design
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768x1024)
- [ ] Test on mobile (375x667)
- [ ] Check sidebar on desktop
- [ ] Check bottom nav on mobile
- [ ] Check suggestions panel (desktop only)

### ✅ UI/UX
- [ ] Loading states show correctly
- [ ] Skeleton loaders appear while loading
- [ ] Error messages display properly
- [ ] Success messages display properly
- [ ] Animations are smooth
- [ ] Icons render correctly
- [ ] Images load properly

---

## Edge Cases to Test

### Authentication
- [ ] Try to access protected routes without login
- [ ] Try to access login page when already logged in
- [ ] Session persists after page refresh
- [ ] Session expires after token timeout

### Posts
- [ ] Create post without caption (should work)
- [ ] Create post without images (should fail)
- [ ] Upload non-image file (should fail)
- [ ] Like post multiple times (should toggle)

### Comments
- [ ] Add empty comment (should not submit)
- [ ] Add very long comment (should work)
- [ ] Delete comment and verify it's removed

### Profile
- [ ] View profile with no posts
- [ ] View profile with many posts (grid layout)
- [ ] Follow/unfollow same user multiple times

### Search
- [ ] Search with special characters
- [ ] Search with numbers
- [ ] Search with spaces
- [ ] Clear search and search again

---

## Performance Testing

### Load Times
- [ ] Initial page load < 3 seconds
- [ ] Feed loads within 2 seconds
- [ ] Profile loads within 2 seconds
- [ ] Search results appear within 1 second

### Interactions
- [ ] Like/unlike is instant (optimistic update)
- [ ] Comment submission is fast
- [ ] Navigation is smooth
- [ ] Modal open/close is smooth

---

## Browser Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Samsung Internet

---

## API Testing

### Authentication Endpoints
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"password123","name":"Test User","mobile":"1234567890"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}' \
  -c cookies.txt

# Logout
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

### User Endpoints
```bash
# Get current user profile
curl http://localhost:3000/api/users/profile -b cookies.txt

# Search users
curl "http://localhost:3000/api/users/search?query=john"

# Get suggested users
curl http://localhost:3000/api/users/suggested -b cookies.txt
```

### Post Endpoints
```bash
# Get all posts
curl http://localhost:3000/api/posts

# Like a post
curl http://localhost:3000/api/posts/likes/POST_ID -b cookies.txt
```

---

## Common Issues & Solutions

### Issue: Can't login after registration
**Solution**: Check if backend is setting cookies correctly. Verify CORS configuration.

### Issue: Images not uploading
**Solution**: 
1. Check file size (< 5MB)
2. Check file format (images only)
3. Verify Cloudinary credentials in backend .env

### Issue: Feed is empty
**Solution**: Create some posts first. Feed shows all posts from all users.

### Issue: Search not working
**Solution**: Type at least 2 characters. Check backend is running.

### Issue: Profile shows 0 posts but posts exist
**Solution**: Refresh the page. Check if posts belong to the correct user.

### Issue: Follow button not working
**Solution**: Make sure you're not trying to follow yourself. Check authentication.

---

## Test Data Generator

### Quick Test Users
```javascript
// User 1
{
  email: "alice@test.com",
  name: "Alice Johnson",
  username: "alicejohnson",
  mobile: "1111111111",
  password: "password123"
}

// User 2
{
  email: "bob@test.com",
  name: "Bob Williams",
  username: "bobwilliams",
  mobile: "2222222222",
  password: "password123"
}

// User 3
{
  email: "charlie@test.com",
  name: "Charlie Brown",
  username: "charliebrown",
  mobile: "3333333333",
  password: "password123"
}
```

### Test Post Captions
- "Beautiful sunset 🌅"
- "Coffee time ☕"
- "Weekend vibes 🎉"
- "Nature is amazing 🌿"
- "Good morning! ☀️"

---

## Automated Testing (Future)

### Unit Tests
- Component rendering
- Redux actions and reducers
- API client functions
- Utility functions

### Integration Tests
- Authentication flow
- Post creation flow
- Comment flow
- Follow flow

### E2E Tests
- Complete user journey
- Multi-user interactions
- Error scenarios

---

## Performance Benchmarks

### Target Metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimization Checklist
- [ ] Images are optimized
- [ ] Code is minified
- [ ] Lazy loading implemented
- [ ] Caching configured
- [ ] Bundle size optimized

---

## Security Testing

### Authentication
- [ ] Passwords are hashed
- [ ] JWT tokens are secure
- [ ] Cookies are HTTP-only
- [ ] CORS is properly configured

### Input Validation
- [ ] XSS protection
- [ ] SQL injection prevention
- [ ] File upload validation
- [ ] Form input sanitization

### Authorization
- [ ] Protected routes require auth
- [ ] Users can only delete own content
- [ ] API endpoints validate permissions

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activate buttons
- [ ] Escape closes modals

### Screen Reader
- [ ] Images have alt text
- [ ] Buttons have labels
- [ ] Forms have labels
- [ ] Landmarks are defined

### Visual
- [ ] Sufficient color contrast
- [ ] Focus indicators visible
- [ ] Text is readable
- [ ] Icons have tooltips

---

**Happy Testing! 🧪**

Report any bugs or issues you find during testing.
