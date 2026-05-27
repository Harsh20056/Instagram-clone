import { createSlice } from "@reduxjs/toolkit";
import { fetchFeedPosts, createPost, toggleLikePost, fetchSinglePost } from "./postActions";
import { toggleFollowUser } from "../users/userActions";

const initialState = {
  feedPosts: [],
  selectedPost: null,
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updatePostInFeed: (state, action) => {
      const index = state.feedPosts.findIndex(post => post._id === action.payload._id);
      if (index !== -1) {
        state.feedPosts[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Feed Posts
      .addCase(fetchFeedPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.feedPosts = action.payload;
      })
      .addCase(fetchFeedPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.feedPosts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Toggle Like Post
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        const post = state.feedPosts.find(p => p._id === action.payload._id);
        if (post) {
          post.likes = action.payload.likes;
        }
        if (state.selectedPost && state.selectedPost._id === action.payload._id) {
          state.selectedPost.likes = action.payload.likes;
        }
      })
      // Fetch Single Post
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
      })
      // Toggle Follow User (keep author followers array in sync across all feed posts)
      .addCase(toggleFollowUser.fulfilled, (state, action) => {
        const { userId, followers } = action.payload;
        state.feedPosts.forEach((post) => {
          if (post.user_id && post.user_id._id === userId) {
            post.user_id.followers = followers;
          }
        });
        if (state.selectedPost && state.selectedPost.user_id && state.selectedPost.user_id._id === userId) {
          state.selectedPost.user_id.followers = followers;
        }
      });
  },
});

export const { clearError, updatePostInFeed } = postSlice.actions;
export default postSlice.reducer;
