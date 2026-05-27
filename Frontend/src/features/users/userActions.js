import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Fetch User Profile
export const fetchUserProfile = createAsyncThunk(
  "users/fetchProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const url = userId ? `/api/users/profile/${userId}` : "/api/users/profile";
      const response = await api.get(url);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// Update Profile
export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      // If profileData is FormData, axios will automatically set the correct Content-Type
      const config = profileData instanceof FormData 
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : {};
      
      const response = await api.put("/api/users/profile", profileData, config);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// Search Users
export const searchUsers = createAsyncThunk(
  "users/search",
  async (query, { rejectWithValue }) => {
    try {
      if (query.length < 2) return [];
      const response = await api.get(`/api/users/search?query=${query}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Search failed"
      );
    }
  }
);

// Fetch Suggestions
export const fetchSuggestions = createAsyncThunk(
  "users/fetchSuggestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users/suggested");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch suggestions"
      );
    }
  }
);

// Toggle Follow User
export const toggleFollowUser = createAsyncThunk(
  "users/toggleFollow",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/users/follow/${userId}`);
      return { userId, followers: response.data.data?.followers || [] };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle follow"
      );
    }
  }
);

// Fetch Followers
export const fetchFollowers = createAsyncThunk(
  "users/fetchFollowers",
  async (userId, { rejectWithValue }) => {
    try {
      const url = userId ? `/api/users/followers/${userId}` : "/api/users/followers";
      const response = await api.get(url);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch followers"
      );
    }
  }
);

// Fetch Followings
export const fetchFollowings = createAsyncThunk(
  "users/fetchFollowings",
  async (userId, { rejectWithValue }) => {
    try {
      const url = userId ? `/api/users/followings/${userId}` : "/api/users/followings";
      const response = await api.get(url);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch followings"
      );
    }
  }
);

// Fetch User Posts
export const fetchUserPosts = createAsyncThunk(
  "users/fetchPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const url = userId ? `/api/users/posts/${userId}` : "/api/users/posts";
      const response = await api.get(url);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user posts"
      );
    }
  }
);
