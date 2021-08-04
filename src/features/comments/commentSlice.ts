import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import axios from 'axios/axiosInstance';
import IUser from 'features/users/usersSlice';

interface IComment {
  id: string;
  message: string;
  owner: typeof IUser;
  publishDate: string;
}

interface CommentsState {
  comments: IComment[];
  status: 'idle' | 'loading' | 'failed';
}

export const initialState: CommentsState = {
  comments: [],
  status: 'idle'
};

export const fetchCommentsAsync = createAsyncThunk(
  'comments/fetchComment',
  async (postId: string) => {
    try {
      const res = await axios.get(`/post/${postId}/comment`);
      console.log(res.data);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommentsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comments = action.payload;
      });
  }
});

export const { clearComments } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.comments;

export default commentsSlice.reducer;
