import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { stepperReducer as stepper } from './slices/StepperSlice';
import { userReducer as user } from './slices/UserSlice';
import { errorReducer as errors } from './slices/ErrorsSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const store = configureStore({
  devTools: true,
  reducer: {
    stepper,
    user,
    errors
  }
});

export default store;