import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import axios from 'axios/axiosInstance';
import IUser from 'features/users/usersSlice';

interface IPost {
  id: string;
  text: string;
  image: string;
  likes: number;
  link: string;
  tags: string[];
  publishDate: string;
  owner: typeof IUser;
}

interface PostState {
  posts: IPost[];
  status: 'idle' | 'loading' | 'failed';
}

export const initialState: PostState = {
  posts: [],
  status: 'idle'
};

export const fetchPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: string) => {
    try {
      const res = await axios.get(`/user/${userId}/post`);
      console.log(res.data);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      });
  }
});

export const selectPosts = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
