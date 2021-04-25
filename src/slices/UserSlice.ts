import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/User';


export const initialUserState: IUser = {
    jwt: ""
}

const userSlice = createSlice({
    name: 'User',
    initialState: initialUserState,
    reducers: {
        SetUser(state: IUser, action: PayloadAction<IUser>) {
            return {
                jwt: action.payload.jwt
            }
        }
    }
});

export const userReducer = userSlice.reducer;
export const { SetUser } = userSlice.actions;
export default userSlice;