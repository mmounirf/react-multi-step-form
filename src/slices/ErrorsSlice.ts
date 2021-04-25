import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IError } from '../interfaces/Error';

export const initialErrors: Array<IError> = [];

const errorsSlice = createSlice({
    name: 'Error',
    initialState: initialErrors,
    reducers: {
        SetErrors(state: Array<IError> | null, action: PayloadAction<Array<IError>>) {
            return action.payload;
        }
    }
});

export const errorReducer = errorsSlice.reducer;
export const { SetErrors } = errorsSlice.actions;
export default errorsSlice;