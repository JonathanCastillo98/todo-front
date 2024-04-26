import { createSlice } from '@reduxjs/toolkit';
import { clearLocalStorage, persistLocalStorage } from '../../utils/localStorage.util';
import { IUser } from '../../interfaces/user.interface';

export const EmptyUserState: IUser = {
  id: '',
  firstname: '',
  lastname: '',
  age: 0,
  email: '',
  username: '',
  role: '',
  tasks: [],
};

export const UserKey = 'user';

export const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : EmptyUserState,
  reducers: {
    createUser: (_state, action) => {
      persistLocalStorage<IUser>(UserKey, action.payload);
      return action.payload;
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<IUser>(UserKey, result);
      return result;
    },
    resetUser: () => {
      clearLocalStorage(UserKey);
      return EmptyUserState;
    }
  }
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
