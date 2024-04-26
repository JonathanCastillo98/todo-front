import { configureStore } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/user.interface'; 
import userSliceReducer from './states/user';

export interface AppStore {
  user: IUser;
}

export default configureStore<AppStore>({
  reducer: {
    user: userSliceReducer
  }
});
