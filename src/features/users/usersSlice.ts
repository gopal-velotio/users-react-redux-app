import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import axios from 'axios/axiosInstance';

export interface IUser {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  picture: string;
  title: string;
}

export interface UsersState {
  users: IUser[];
  userDetails: IUser;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  userDetails: {
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    picture: '',
    title: ''
  },
  status: 'idle'
};

export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    try {
      const response = await axios.get('/user');
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchUserDetailsAsync = createAsyncThunk(
  'users/fetchUserDetails',
  async (userId: string) => {
    try {
      const response = await axios.get(`/user/${userId}`);
      console.log('user details: ', response);
      return response.data;
    } catch (error) {
      console.error('error getting user details', error);
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
      })
      .addCase(fetchUserDetailsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetailsAsync.fulfilled, (state, action) => {
        console.log('detail full', action);
        state.status = 'idle';
        if (action.payload) {
          state.userDetails = {
            id: action.payload.id,
            email: action.payload.email,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            picture: action.payload.picture,
            title: action.payload.title
          };
        }
      });
  }
});

export const { clearUsers } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export const selectUserDetails = (state: RootState) => state.users.userDetails;

export default usersSlice.reducer;
