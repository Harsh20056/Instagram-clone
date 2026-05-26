import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Fetch Post Comments
export const fetchPostComments = createAsyncThunk(
  "comments/fetchPostComments",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/comments/post/${postId}`);
      return { postId, comments: response.data.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch comments"
      );
    }
  }
);

// Create Comment
export const createComment = createAsyncThunk(
  "comments/create",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/comments/post/${postId}`, {
        comment,
      });
      return { postId, comment: response.data.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create comment"
      );
    }
  }
);

// Update Comment
export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ commentId, postId, comment }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/comments/${commentId}`, {
        comment,
      });
      return { postId, comment: response.data.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update comment"
      );
    }
  }
);

// Delete Comment
export const deleteComment = createAsyncThunk(
  "comments/delete",
  async ({ commentId, postId }, { rejectWithValue }) => {
    try {
      await api.delete(`/api/comments/${commentId}`);
      return { postId, commentId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete comment"
      );
    }
  }
);
