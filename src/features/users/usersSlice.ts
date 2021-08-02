import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import axiosInstance from 'axios/axiosInstance';

interface IUser {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    picture: string;
    title: string;
}

export interface UsersState {
  users: IUser[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'idle'
};

export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
      try {
          const response = await axiosInstance.get('/user');
          console.log(response.data)
          return response.data.data;
      } catch (error) {
          console.error(error);
      }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      });
  }
});

export const { clearUsers } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
