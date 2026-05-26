import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserProfile,
  updateProfile,
  searchUsers,
  fetchSuggestions,
  toggleFollowUser,
  fetchFollowers,
  fetchFollowings,
  fetchUserPosts,
} from "./userActions";

const initialState = {
  userProfile: null,
  userPosts: [],
  searchResults: [],
  suggestions: [],
  followers: [],
  followings: [],
  status: "idle",
  searchStatus: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      // Search Users
      .addCase(searchUsers.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.error = action.payload;
      })
      // Fetch Suggestions
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      })
      // Toggle Follow User
      .addCase(toggleFollowUser.fulfilled, (state, action) => {
        if (state.userProfile && state.userProfile._id === action.payload.userId) {
          state.userProfile.followers = action.payload.followers;
        }
      })
      // Fetch Followers
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
      })
      // Fetch Followings
      .addCase(fetchFollowings.fulfilled, (state, action) => {
        state.followings = action.payload;
      })
      // Fetch User Posts
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts = action.payload;
      });
  },
});

export const { clearError, clearSearchResults } = userSlice.actions;
export default userSlice.reducer;
