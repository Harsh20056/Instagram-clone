import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPostComments,
  createComment,
  deleteComment,
  updateComment,
} from "./commentActions";

const initialState = {
  comments: {}, // { [postId]: [comments array] }
  status: "idle",
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Post Comments
      .addCase(fetchPostComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments[action.payload.postId] = action.payload.comments;
      })
      .addCase(fetchPostComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Create Comment
      .addCase(createComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        if (!state.comments[postId]) {
          state.comments[postId] = [];
        }
        state.comments[postId].push(comment);
      })
      // Delete Comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        if (state.comments[postId]) {
          state.comments[postId] = state.comments[postId].filter(
            (c) => c._id !== commentId
          );
        }
      })
      // Update Comment
      .addCase(updateComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        if (state.comments[postId]) {
          const index = state.comments[postId].findIndex(
            (c) => c._id === comment._id
          );
          if (index !== -1) {
            state.comments[postId][index] = comment;
          }
        }
      });
  },
});

export const { clearError } = commentSlice.actions;
export default commentSlice.reducer;
