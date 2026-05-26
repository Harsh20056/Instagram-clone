import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Fetch Feed Posts
export const fetchFeedPosts = createAsyncThunk(
  "posts/fetchFeed",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/posts");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch posts"
      );
    }
  }
);

// Create Post
export const createPost = createAsyncThunk(
  "posts/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create post"
      );
    }
  }
);

// Toggle Like Post
export const toggleLikePost = createAsyncThunk(
  "posts/toggleLike",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/posts/likes/${postId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle like"
      );
    }
  }
);

// Fetch Single Post
export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSingle",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/posts/${postId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch post"
      );
    }
  }
);
