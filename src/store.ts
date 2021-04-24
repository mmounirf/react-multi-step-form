import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { stepperReducer as stepper } from './slices/StepperSlice';

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
  }
});

export default store;